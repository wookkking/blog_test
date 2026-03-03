class ProductCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const template = document.createElement('template');
        const salePrice = this.hasAttribute('sale-price');
        let priceHtml = salePrice ?
            `<span class="original-price">${this.getAttribute('price')}</span>
             <span class="sale-price">${this.getAttribute('sale-price')}</span>` :
            `<span class="price">${this.getAttribute('price')}</span>`;

        template.innerHTML = `
            <style>
                :host {
                    display: block;
                    background: #fff;
                    border-radius: 15px;
                    border: 1px solid #e9ecef;
                    overflow: hidden;
                    transition: transform 0.3s, box-shadow 0.3s;
                }
                 :host(:hover) {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                }
                .product-image-wrapper {
                    width: 100%;
                    height: 220px;
                }
                .product-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .product-content {
                    padding: 20px;
                }
                .product-title {
                    font-size: 18px;
                    font-weight: 700;
                    margin-bottom: 10px;
                }
                .product-description {
                    font-size: 14px;
                    color: #555;
                    height: 40px;
                    margin-bottom: 15px;
                }
                .product-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 15px;
                    border-top: 1px solid #e9ecef;
                }
                .price-wrapper {
                    display: flex; 
                    flex-direction: column; 
                    font-weight: 700;
                }
                .price, .sale-price {
                    font-size: 18px;
                }
                .original-price {
                    text-decoration: line-through;
                    color: #aaa;
                    font-size: 14px;
                }
                .btn-add-to-cart {
                    background-color: var(--primary-color, #ff6b6b);
                    color: #fff;
                    padding: 10px 15px;
                    border-radius: 8px;
                    font-weight: 700;
                    font-size: 14px;
                    cursor: pointer;
                }
            </style>
             <div class="product-image-wrapper">
                <img class="product-image" src="${this.getAttribute('image')}" alt="${this.getAttribute('title')}">
            </div>
            <div class="product-content">
                <h4 class="product-title">${this.getAttribute('title')}</h4>
                <p class="product-description">${this.getAttribute('description')}</p>
                <div class="product-footer">
                    <div class="price-wrapper">${priceHtml}</div>
                    <button class="btn-add-to-cart"><i class="fa-solid fa-cart-plus"></i> 담기</button>
                </div>
            </div>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('product-card', ProductCard);

document.addEventListener('DOMContentLoaded', () => {
    const productData = [
        {
            title: '친환경 무농약 상추 200g',
            description: '아삭하고 신선한 쌈채소의 대표주자',
            image: 'https://images.unsplash.com/photo-1557844352-761f2565b576?q=80&w=1974&auto=format&fit=crop',
            category: '신선식품',
            price: '3,500원',
        },
        {
            title: '간편하게 끓이는 된장찌개 키트',
            description: '재료 손질 없이 10분이면 완성!',
            image: 'https://plus.unsplash.com/premium_photo-1667240397410-e7a9173a1154?q=80&w=2070&auto=format&fit=crop',
            category: '가공식품',
            price: '6,900원',
            salePrice: '5,900원'
        },
        {
            title: '부드러운 프리미엄 화장지 30롤',
            description: '도톰하고 부드러워 피부에 자극 없는',
            image: 'https://images.unsplash.com/photo-1588612198906-44443190a6a4?q=80&w=1974&auto=format&fit=crop',
            category: '생필품',
            price: '18,000원'
        },
        {
            title: '관절 건강 MSM 영양제 (90정)',
            description: '활기찬 하루를 위한 관절 건강 솔루션',
            image: 'https://plus.unsplash.com/premium_photo-1679426317551-78c6692a4a98?q=80&w=2070&auto=format&fit=crop',
            category: '건강용품',
            price: '25,000원',
            salePrice: '19,900원'
        },
        {
            title: '새벽 직송 유기농 계란 10구',
            description: '자연 방사로 키워 더욱 건강하고 고소한',
            image: 'https://images.unsplash.com/photo-1587486913049-52fc829c9379?q=80&w=2070&auto=format&fit=crop',
            category: '신선식품',
            price: '7,000원'
        }
    ];

    const productContainer = document.getElementById('product-list');
    const filterButtons = document.querySelectorAll('.filters .filter-btn');

    function renderProductCards(filter = 'all') {
        productContainer.innerHTML = '';
        const filteredData = filter === 'all' ? productData : productData.filter(item => item.category === filter);

        if (filteredData.length === 0) {
            productContainer.innerHTML = '<p>해당 카테고리의 상품이 아직 없습니다.</p>';
            return;
        }

        filteredData.forEach(item => {
            const card = document.createElement('product-card');
            card.setAttribute('title', item.title);
            card.setAttribute('description', item.description);
            card.setAttribute('image', item.image);
            card.setAttribute('price', item.price);
            if (item.salePrice) {
                card.setAttribute('sale-price', item.salePrice);
            }
            productContainer.appendChild(card);
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.getAttribute('data-filter');
            renderProductCards(filter);
        });
    });

    renderProductCards();
});
