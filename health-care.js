document.addEventListener('DOMContentLoaded', () => {
    // 주간 건강 변화 차트
    const ctx = document.getElementById('healthChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['월', '화', '수', '목', '금', '토', '일'],
                datasets: [{
                    label: '혈압 (최고)',
                    data: [120, 122, 125, 123, 128, 125, 122],
                    borderColor: '#ff6384',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    yAxisID: 'y-axis-1',
                }, {
                    label: '혈당 (식전)',
                    data: [95, 98, 100, 97, 102, 105, 101],
                    borderColor: '#36a2eb',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    yAxisID: 'y-axis-2',
                }]
            },
            options: {
                scales: {
                    'y-axis-1': {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        ticks: { beginAtZero: false }
                    },
                    'y-axis-2': {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        grid: {
                            drawOnChartArea: false, 
                        },
                        ticks: { beginAtZero: false }
                    }
                }
            }
        });
    }

    // 복약 상태 토글
    const medItems = document.querySelectorAll('.med-item');
    medItems.forEach(item => {
        const statusBtn = item.querySelector('.status-btn');
        if (statusBtn) {
            statusBtn.addEventListener('click', () => {
                item.classList.toggle('completed');
                if (item.classList.contains('completed')) {
                    statusBtn.textContent = '✓ 복용';
                } else {
                    statusBtn.textContent = '완료';
                }
            });
        }
    });
});
