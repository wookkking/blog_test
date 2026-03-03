class CustomCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }
                .card-image {
                    width: 100%;
                    height: 180px;
                    object-fit: cover;
                }
                .card-content {
                    padding: 20px;
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                }
                .card-title {
                    font-size: 20px;
                    font-weight: 700;
                    margin-bottom: 10px;
                    color: #333;
                }
                .card-description {
                    font-size: 16px;
                    color: #666;
                    flex-grow: 1;
                    margin-bottom: 20px;
                }
                .card-footer {
                    font-size: 14px;
                    color: #999;
                }
            </style>
            <img class="card-image" src="${this.getAttribute('image')}" alt="${this.getAttribute('title')}">
            <div class="card-content">
                <h4 class="card-title">${this.getAttribute('title')}</h4>
                <p class="card-description">${this.getAttribute('description')}</p>
                <div class="card-footer">
                    <span>${this.getAttribute('footer')}</span>
                </div>
            </div>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('custom-card', CustomCard);


document.addEventListener('DOMContentLoaded', () => {
    const sections = {
        jobs: {
            container: document.querySelector('#jobs .card-container'),
            data: [
                {
                    title: '시니어 바리스타',
                    description: '향긋한 커피와 함께 인생 2막을 시작하세요. 주 3회, 유연 근무 가능.',
                    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=1974&auto=format&fit=crop',
                    footer: '서울시 강남구 | 월 150만원'
                },
                {
                    title: '아이 돌보미',
                    description: '아이들의 성장을 돕는 보람 있는 일, 당신의 따뜻한 마음이 필요합니다.',
                    image: 'https://images.unsplash.com/photo-1518833162-0143891c5cbf?q=80&w=2070&auto=format&fit=crop',
                    footer: '전국 | 시급 12,000원'
                },
                {
                    title: '공예 강사',
                    description: '자신만의 손재주를 나누고 수강생들과 소통하며 즐거움을 찾아보세요.',
                    image: 'https://images.unsplash.com/photo-1610424213739-446a782a1c22?q=80&w=2070&auto=format&fit=crop',
                    footer: '온라인/오프라인 | 협의'
                }
            ]
        },
        classes: {
            container: document.querySelector('#classes .card-container'),
            data: [
                {
                    title: '스마트폰 활용 교실',
                    description: '손주와 영상통화, 온라인 쇼핑까지! 스마트폰 완전 정복 프로젝트.',
                    image: 'https://images.unsplash.com/photo-1585060544838-c5b6b379b3a3?q=80&w=2070&auto=format&fit=crop',
                    footer: '매주 화요일 | 30,000원'
                },
                {
                    title: '노래 교실',
                    description: '신나는 트로트부터 감성 발라드까지, 스트레스를 날려버리세요.',
                    image: 'https://images.unsplash.com/photo-1589578523447-731b1b9d4a46?q=80&w=2070&auto=format&fit=crop',
                    footer: '매주 금요일 | 20,000원'
                },
                 {
                    title: '몸펴기 생활운동',
                    description: '굳은 몸을 풀어주고 활력을 되찾는 시간, 건강한 노년을 준비하세요.',
                    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2120&auto=format&fit=crop',
                    footer: '상시 모집 | 무료'
                }
            ]
        },
        community: {
            container: document.querySelector('#community .card-container'),
            data: [
                 {
                    title: '등산 동호회 '산울림'',
                    description: '매주 주말, 서울 근교의 아름다운 산을 함께 오릅니다.',
                    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop',
                    footer: '활동 지역: 서울/경기'
                },
                {
                    title: ''맛있는 인생' 요리 모임',
                    description: '나만의 특별한 레시피를 공유하고, 함께 맛있는 음식을 만들어봐요.',
                    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop',
                    footer: '매월 셋째 주 토요일'
                },
                {
                    title: '여행 스케치',
                    description: '그림을 그리며 여행의 감동을 두 배로! 초보자도 환영합니다.',
                    image: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=2070&auto=format&fit=crop',
                    footer: '분기별 1회 정기 출사'
                }
            ]
        },
        market: {
            container: document.querySelector('#market .card-container'),
            data: [
                {
                    title: '유기농 채소 꾸러미',
                    description: '제철을 맞은 신선한 유기농 채소를 집 앞까지 배송해 드립니다.',
                    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop',
                    footer: '주 1회 | 25,000원'
                },
                {
                    title: '국내산 제철 과일',
                    description: '산지 직송으로 더욱 신선하고 맛있는 제철 과일을 만나보세요.',
                    image: 'https://images.unsplash.com/photo-1594261713555-9b27a3a3a93c?q=80&w=2050&auto=format&fit=crop',
                    footer: '상시 판매'
                },
                {
                    title: '건강 보조 식품',
                    description: '부족한 영양을 채워 활기찬 하루를 만드는 건강 보조 식품 모음.',
                    image: 'https://images.unsplash.com/photo-1607619056574-7d8d3ee536b2?q=80&w=2146&auto=format&fit=crop',
                    footer: '특별 할인가'
                }
            ]
        }
    };

    for (const section in sections) {
        const { container, data } = sections[section];
        if (container) {
            data.forEach(item => {
                const card = document.createElement('custom-card');
                card.setAttribute('title', item.title);
                card.setAttribute('description', item.description);
                card.setAttribute('image', item.image);
                card.setAttribute('footer', item.footer);
                container.appendChild(card);
            });
        }
    }
});