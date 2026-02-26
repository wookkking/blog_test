document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;

    // 다크 모드 토글
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');

            // 아이콘 변경
            if (body.classList.contains('dark-mode')) {
                darkModeToggle.textContent = '☀️';
            } else {
                darkModeToggle.textContent = '🌙';
            }
        });
    }

    // 활성 네비게이션 링크 표시
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('header nav a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});
