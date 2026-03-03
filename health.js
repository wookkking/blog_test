document.addEventListener('DOMContentLoaded', () => {
    // Mock Data
    let healthData = {
        bloodPressure: [
            { date: '2024-05-15', systolic: 125, diastolic: 82 },
            { date: '2024-05-16', systolic: 128, diastolic: 85 },
            { date: '2024-05-17', systolic: 122, diastolic: 80 },
            { date: '2024-05-18', systolic: 130, diastolic: 88 },
            { date: '2024-05-19', systolic: 126, diastolic: 84 },
        ],
        bloodSugar: [
            { date: '2024-05-15', value: 95 },
            { date: '2024-05-16', value: 102 },
            { date: '2024-05-17', value: 98 },
            { date: '2024-05-18', value: 105 },
            { date: '2024-05-19', value: 100 },
        ]
    };

    const dataTypeSelect = document.getElementById('dataType');
    const bpInputs = document.getElementById('bp-inputs');
    const bsInput = document.getElementById('bs-input');
    const healthForm = document.getElementById('health-form');
    const historyList = document.getElementById('health-history-list');
    const ctx = document.getElementById('healthChart').getContext('2d');
    let healthChart;

    // Handle form input display based on data type
    dataTypeSelect.addEventListener('change', () => {
        if (dataTypeSelect.value === 'blood-pressure') {
            bpInputs.style.display = 'block';
            bsInput.style.display = 'none';
        } else {
            bpInputs.style.display = 'none';
            bsInput.style.display = 'block';
        }
    });

    // Chart Initialization
    function createChart() {
        if (healthChart) {
            healthChart.destroy();
        }
        const labels = [...new Set([...healthData.bloodPressure.map(d => d.date), ...healthData.bloodSugar.map(d => d.date)])].sort();

        healthChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: '수축기 혈압 (SYS)',
                        data: healthData.bloodPressure.map(d => ({x: d.date, y: d.systolic})),
                        borderColor: '#ff6b6b',
                        backgroundColor: '#ff6b6b',
                        tension: 0.3,
                        yAxisID: 'y-bp',
                    },
                    {
                        label: '이완기 혈압 (DIA)',
                        data: healthData.bloodPressure.map(d => ({x: d.date, y: d.diastolic})),
                        borderColor: '#fca311',
                        backgroundColor: '#fca311',
                        tension: 0.3,
                        yAxisID: 'y-bp',
                    },
                    {
                        label: '공복 혈당 (mg/dL)',
                        data: healthData.bloodSugar.map(d => ({x: d.date, y: d.value})),
                        borderColor: '#1e90ff',
                        backgroundColor: '#1e90ff',
                        tension: 0.3,
                        yAxisID: 'y-bs',
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day',
                            tooltipFormat: 'yyyy-MM-dd'
                        }
                    },
                    'y-bp': {
                        position: 'left',
                        title: { display: true, text: '혈압 (mmHg)' }
                    },
                    'y-bs': {
                        position: 'right',
                        title: { display: true, text: '혈당 (mg/dL)' },
                        grid: { drawOnChartArea: false } 
                    }
                }
            }
        });
    }

    // Render History List
    function renderHistory() {
        historyList.innerHTML = '';
        const allRecords = [
            ...healthData.bloodPressure.map(d => ({...d, type: '혈압'})),
            ...healthData.bloodSugar.map(d => ({...d, type: '혈당'}))
        ].sort((a, b) => new Date(b.date) - new Date(a.date));

        allRecords.forEach(record => {
            const item = document.createElement('div');
            item.className = 'history-item';
            let valueText = record.type === '혈압' ? 
                `${record.systolic} / ${record.diastolic} mmHg` :
                `${record.value} mg/dL`;

            item.innerHTML = `
                <span class="history-date">${record.date}</span>
                <span class="history-type">${record.type}</span>
                <span class="history-value">${valueText}</span>
            `;
            historyList.appendChild(item);
        });
    }

    // Form Submission
    healthForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const date = document.getElementById('recordDate').value;
        if (!date) {
            alert('날짜를 선택해주세요.');
            return;
        }

        if (dataTypeSelect.value === 'blood-pressure') {
            const systolic = document.getElementById('systolic').value;
            const diastolic = document.getElementById('diastolic').value;
            if (systolic && diastolic) {
                healthData.bloodPressure.push({ date, systolic: parseInt(systolic), diastolic: parseInt(diastolic) });
            }
        } else {
            const sugar = document.getElementById('bloodSugar').value;
            if (sugar) {
                healthData.bloodSugar.push({ date, value: parseInt(sugar) });
            }
        }
        
        // Sort data by date after adding
        healthData.bloodPressure.sort((a,b) => new Date(a.date) - new Date(b.date));
        healthData.bloodSugar.sort((a,b) => new Date(a.date) - new Date(b.date));

        createChart();
        renderHistory();
        healthForm.reset();
        bsInput.style.display = 'none';
        bpInputs.style.display = 'block';
    });

    // Initial Render
    document.getElementById('recordDate').valueAsDate = new Date(); // Set today as default
    createChart();
    renderHistory();
});
