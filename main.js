class CustomCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const type = this.getAttribute('type') || 'default';
        const image = this.getAttribute('image');
        const title = this.getAttribute('title');
        const meta = this.getAttribute('meta');
        const content_text = this.getAttribute('content_text');
        const price = this.getAttribute('price');
        const button_text = this.getAttribute('button_text');

        const style = `
            :host {
                display: flex;
                flex-direction: column;
                background-color: #fff;
                border-radius: 12px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                overflow: hidden;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            :host(:hover) {
                transform: translateY(-5px);
                box-shadow: 0 8px 20px rgba(0,0,0,0.12);
            }
            img {
                width: 100%;
                height: 180px;
                object-fit: cover;
            }
            .content {
                padding: 1.5rem;
                display: flex;
                flex-direction: column;
                flex-grow: 1;
            }
            h3 {
                font-size: 1.3rem;
                margin: 0 0 0.5rem 0;
                color: #2C3E50;
            }
            .meta {
                font-size: 0.9rem;
                color: #777;
                margin-bottom: 1rem;
            }
            .content-text {
                color: #333;
                margin-bottom: 1rem;
                line-height: 1.5;
            }
            .price {
                font-size: 1.2rem;
                font-weight: 700;
                color: #333;
                margin-bottom: 1rem;
            }
            .community-footer {
                display: flex;
                gap: 1rem;
                color: #777;
                margin-top: auto;
            }
            button {
                width: 100%;
                padding: 0.75rem;
                background-color: #2C3E50;
                color: white;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-size: 1rem;
                font-weight: 600;
                transition: background-color 0.3s ease;
                margin-top: auto;
            }
            button:hover {
                background-color: #1a2533;
            }
        `;

        let innerHTML = `
            ${image ? `<img src="${image}" alt="${title}">` : ''}
            <div class="content">
                ${title ? `<h3>${title}</h3>` : ''}
                ${meta ? `<div class="meta">${meta}</div>` : ''}
                ${content_text ? `<p class="content-text">${content_text}</p>` : ''}
                ${price ? `<div class="price">${price}</div>` : ''}
        `;

        if (type === 'community') {
            innerHTML += `
                <div class="community-footer">
                    <span>좋아요 12</span>
                    <span>댓글 5</span>
                </div>
            `;
        } else {
            innerHTML += `<button>${button_text || '자세히 보기'}</button>`;
        }

        innerHTML += `</div>`;

        this.shadowRoot.innerHTML = `
            <style>${style}</style>
            ${innerHTML}
        `;
    }
}

customElements.define('custom-card', CustomCard);

document.addEventListener('DOMContentLoaded', () => {
    const jobsData = [
        {
            image: 'https://images.unsplash.com/photo-1558021211-6514f4939332?q=80&w=2070&auto=format&fit=crop',
            title: '도서관 보조',
            meta: '아르바이트 | 2시간 전',
            price: '시급 12,000원',
            button_text: '지원하기'
        },
        {
            image: 'https://images.unsplash.com/photo-1531804055935-76742b884592?q=80&w=1974&auto=format&fit=crop',
            title: '생태 가이드',
            meta: '계약직 | 5시간 전',
            price: '시급 15,000원',
            button_text: '지원하기'
        },
        {
            image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069&auto=format&fit=crop',
            title: '시니어 비즈니스 컨설턴트',
            meta: '정규직 | 1일 전',
            price: '시급 45,000원',
            button_text: '지원하기'
        }
    ];

    const classesData = [
        {
            image: 'https://images.unsplash.com/photo-1591357989474-1e59461d56e0?q=80&w=2070&auto=format&fit=crop',
            title: '기초 의자 요가',
            meta: '강사: 서서히 | 45분',
            button_text: '수강신청하기'
        },
        {
            image: 'https://images.unsplash.com/photo-1596726138344-93b81152de6f?q=80&w=2070&auto=format&fit=crop',
            title: '영상 통화 마스터하기',
            meta: '강사: 사라 필러 | 60분',
            button_text: '수강신청하기'
        },
        {
            image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=2066&auto=format&fit=crop',
            title: '아침 수채화 교실',
            meta: '강사: 로버트 존슨 | 90분',
            button_text: '수강신청하기'
        }
    ];

    const communityData = [
        {
            type: 'community',
            image: 'https://images.unsplash.com/photo-1470071459639-91e7a57e62a9?q=80&w=2070&auto=format&fit=crop',
            title: '오늘 남산 둘레길 같이 걸으실 분 계신가요?',
            meta: '행복한 산책가 | 15분 전',
            content_text: '날씨가 너무 좋아서 집에만 있기 아깝네요. 오후 2시에 국립극장 쪽에서 만나서 천천히 한 바퀴 돌고 시원한 냉면 한 그릇 하실 분들 댓글 남겨주세요!',
        },
        {
            type: 'community',
            image: 'https://images.unsplash.com/photo-1598230329432-094154b1a473?q=80&w=1964&auto=format&fit=crop',
            title: '베란다에서 상추 키우는 꿀팁 공유합니다',
            meta: '꽃할매 정원사 | 1시간 전',
            content_text: '벌써 세 번째 수확했어요! 가장 중요한 건 통풍과 물주기 시간인 것 같아요. 제가 정리한 몇 가지 노하우 보시고 다들 싱싱한 상추 키워보세요.',
        },
    ];

    const marketData = [
        {
            image: 'https://images.unsplash.com/photo-1568252540022-541283a3036e?q=80&w=2070&auto=format&fit=crop',
            title: '제철 유기농 건강 채소 바구니',
            price: '34,500원',
            button_text: '장바구니 담기'
        },
        {
            image: 'https://images.unsplash.com/photo-1541592106381-b5864ce61798?q=80&w=2070&auto=format&fit=crop',
            title: '저염식 명란젓',
            price: '18,900원',
            button_text: '장바구니 담기'
        },
        {
            image: 'https://images.unsplash.com/photo-1628102494296-56545213d2f7?q=80&w=1935&auto=format&fit=crop',
            title: '오메가-3 트리플 스트렝스 (90캡슐)',
            price: '24,000원',
            button_text: '장바구니 담기'
        }
    ];

    function renderCards(containerId, data) {
        const container = document.querySelector(containerId);
        data.forEach(item => {
            const card = document.createElement('custom-card');
            for (const key in item) {
                card.setAttribute(key, item[key]);
            }
            container.appendChild(card);
        });
    }

    renderCards('#jobs .card-container', jobsData);
    renderCards('#classes .card-container', classesData);
    renderCards('#community .card-container', communityData);
    renderCards('#market .card-container', marketData);
});