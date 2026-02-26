document.addEventListener('DOMContentLoaded', () => {
    // 다크 모드 토글
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
    }

    if(darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            if (body.classList.contains('dark-mode')) {
                disableDarkMode();
            } else {
                enableDarkMode();
            }
        });
    }

    function enableDarkMode() {
        body.classList.add('dark-mode');
        if(darkModeToggle) darkModeToggle.textContent = '라이트 모드';
        localStorage.setItem('darkMode', 'enabled');
    }

    function disableDarkMode() {
        body.classList.remove('dark-mode');
        if(darkModeToggle) darkModeToggle.textContent = '다크 모드';
        localStorage.setItem('darkMode', 'disabled');
    }

    // 걸음 수 위젯 프로그레스 바
    const progressCircle = document.querySelector('.progress-ring__circle');
    if(progressCircle) {
        const radius = progressCircle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        const progress = progressCircle.closest('.progress-circle').dataset.progress;

        progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
        progressCircle.style.strokeDashoffset = circumference;

        const offset = circumference - progress / 100 * circumference;
        progressCircle.style.strokeDashoffset = offset;
    }
});
