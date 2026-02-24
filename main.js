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

const portfolioItems = [
  {
    title: '푸드 스타일링',
    description: '광택과 질감을 살린 제품/메뉴 촬영.',
    category: 'FOOD',
    region: '서울',
    price: '₩400,000~',
    tags: ['STUDIO', 'BRANDING'],
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: '웨딩 스토리',
    description: '자연광 중심의 클래식 톤 웨딩 스냅.',
    category: 'WEDDING',
    region: '부산',
    price: '₩850,000~',
    tags: ['SNAP', 'PRE-WEDDING'],
    image:
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: '해외 로케이션',
    description: '여행 스토리를 담은 시네마틱 컷.',
    category: 'OVERSEAS',
    region: '파리/로마',
    price: '₩1,200,000~',
    tags: ['OUTDOOR', 'GUIDE'],
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: '라이프스타일',
    description: '자연스러운 움직임을 담는 감성 촬영.',
    category: 'LIFESTYLE',
    region: '제주',
    price: '₩520,000~',
    tags: ['DAYLIGHT', 'COUPLE'],
    image:
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80',
  },
];

const thumbGrid = document.getElementById('thumb-grid');
if (thumbGrid) {
  thumbGrid.innerHTML = portfolioItems
    .map(
      (item) => `
        <article class="thumb-card">
          <div class="thumb-image" style="background-image: linear-gradient(135deg, rgba(108, 99, 255, 0.18), rgba(255, 255, 255, 0.6)), url('${item.image}')"></div>
          <div class="thumb-info">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <div class="thumb-meta">
              <span class="thumb-pill">${item.category}</span>
              <span class="thumb-pill">${item.region}</span>
              <span class="thumb-price">${item.price}</span>
            </div>
            <span>${item.tags.join(' · ')}</span>
          </div>
        </article>
      `
    )
    .join('');
}

const buttons = document.querySelectorAll('button, .btn');
buttons.forEach((button) => {
  button.addEventListener('mouseenter', () => {
    button.classList.add('hovering');
  });
  button.addEventListener('mouseleave', () => {
    button.classList.remove('hovering');
  });
});
