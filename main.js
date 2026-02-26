const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

// 로컬 스토리지에서 다크 모드 설정 불러오기
if (localStorage.getItem('darkMode') === 'enabled') {
    enableDarkMode();
}

darkModeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
});

function enableDarkMode() {
    body.classList.add('dark-mode');
    darkModeToggle.textContent = '라이트 모드';
    localStorage.setItem('darkMode', 'enabled');
}

function disableDarkMode() {
    body.classList.remove('dark-mode');
    darkModeToggle.textContent = '다크 모드';
    localStorage.setItem('darkMode', 'disabled');
}
