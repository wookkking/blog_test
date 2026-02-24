const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.section, .hero-content, .hero-cards').forEach((el) => {
  el.classList.add('reveal');
  observer.observe(el);
});

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('mouseenter', () => {
    button.classList.add('hovering');
  });
  button.addEventListener('mouseleave', () => {
    button.classList.remove('hovering');
  });
});
