document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('header nav ul li a');
    const currentPath = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        
        // The main page could be index.html or empty path
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
