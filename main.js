class ClassCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const template = document.createElement('template');
        const tagBgColor = this.getAttribute('tag') === '현재 실시간' ? '#ff6b6b' : '#555';
        template.innerHTML = `
            <style>
                :host {
                    display: block;
                    background: var(--white-color, #fff);
                    border-radius: 15px;
                    border: 1px solid var(--border-color, #e9ecef);
                    overflow: hidden;
                    transition: transform 0.3s, box-shadow 0.3s;
                    cursor: pointer;
                }
                :host(:hover) {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                }
                .card-image-wrapper {
                    position: relative;
                    width: 100%;
                    height: 200px;
                }
                .card-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .tag {
                    position: absolute;
                    top: 15px;
                    left: 15px;
                    background-color: ${tagBgColor};
                    color: #fff;
                    padding: 5px 10px;
                    border-radius: 5px;
                    font-size: 13px;
                    font-weight: 700;
                }
                 .instructor {
                    position: absolute;
                    bottom: 10px;
                    left: 15px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: white;
                    font-size: 14px;
                    text-shadow: 0 1px 3px rgba(0,0,0,0.5);
                }
                .instructor img {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    border: 1px solid #fff;
                }
                .card-content {
                    padding: 20px;
                }
                .card-title {
                    font-size: 20px;
                    font-weight: 700;
                    margin-bottom: 10px;
                    color: var(--text-color, #333);
                }
                .card-description {
                    font-size: 15px;
                    color: var(--text-secondary, #555);
                    margin-bottom: 20px;
                    height: 45px; /* Clamp to 2 lines */
                    overflow: hidden;
                }
                .card-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 15px;
                    border-top: 1px solid var(--border-color, #e9ecef);
                }
                .duration, .action .btn-apply {
                     font-size: 15px;
                     font-weight: 500;
                }
                .btn-apply {
                    background-color: var(--dark-blue, #2c3e50);
                    color: #fff;
                    padding: 10px 20px;
                    border-radius: 8px;
                    text-align: center;
                    transition: background-color 0.3s;
                }
                .btn-apply:hover {
                    background-color: #455a64;
                }
            </style>
            <div class="card-image-wrapper">
                <img class="card-image" src="${this.getAttribute('image')}" alt="${this.getAttribute('title')}">
                <span class="tag">${this.getAttribute('tag')}</span>
                <div class="instructor">
                    <img src="${this.getAttribute('instructor-avatar')}" alt="${this.getAttribute('instructor')}">
                    <span>강사: ${this.getAttribute('instructor')}</span>
                </div>
            </div>
            <div class="card-content">
                <h4 class="card-title">${this.getAttribute('title')}</h4>
                <p class="card-description">${this.getAttribute('description')}</p>
                <div class="card-footer">
                    <span class="duration">소요시간: ${this.getAttribute('duration')}</span>
                    <div class="action">
                         <a href="#" class="btn-apply">수강 신청하기</a>
                    </div>
                </div>
            </div>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('class-card', ClassCard);

document.addEventListener('DOMContentLoaded', () => {

    // --- Category Data --- //
    const categories = [
        {
            icon: 'fa-solid fa-mobile-screen-button',
            title: '디지털/스마트폰',
            description: '기기 사용법 마스터하기'
        },
        {
            icon: 'fa-solid fa-person-praying',
            title: '건강/요가',
            description: '유연하고 튼튼하게'
        },
        {
            icon: 'fa-solid fa-palette',
            title: '미술/캘리그래피',
            description: '나만의 창의성 표현하기'
        },
        {
            icon: 'fa-solid fa-music',
            title: '음악/악기',
            description: '나만의 리듬 찾기'
        },
    ];

    const categoryContainer = document.querySelector('#categories .category-container');
    if (categoryContainer) {
        categories.forEach(cat => {
            const item = document.createElement('div');
            item.className = 'category-item';
            item.innerHTML = `
                <div class="icon"><i class="${cat.icon}"></i></div>
                <h4>${cat.title}</h4>
                <p>${cat.description}</p>
            `;
            categoryContainer.appendChild(item);
        });
    }

    // --- Recommended Classes Data --- //
    const classes = [
        {
            title: '기초 의자 요가',
            description: '앉은 자세에서 할 수 있는 부드러운 스트레칭과 가동성 운동입니다. 데일리 웰니스에 완벽합니다.',
            image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2120&auto=format&fit=crop',
            tag: '초보 환영',
            instructor: '아서 첸 교수',
            instructorAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop',
            duration: '45분'
        },
        {
            title: '영상 통화 마스터하기',
            description: '줌, 페이스타임, 와츠앱으로 손주들과 쉽게 소통하는 방법을 단계별로 배워보세요.',
            image: 'https://images.unsplash.com/photo-1616587896649-7c211a13a726?q=80&w=2070&auto=format&fit=crop',
            tag: '초보 환영',
            instructor: '사라 밀러',
            instructorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
            duration: '60분'
        },
        {
            title: '아침 수채화 교실',
            description: '차분한 수채화의 세계를 탐험하세요. 마음의 평화를 위한 보태니컬 아트와 풍경화에 집중합니다.',
            image: 'https.images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop',
            tag: '모든 레벨',
            instructor: '로버트 밴스',
            instructorAvatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop',
            duration: '90분'
        }
    ];

    const cardContainer = document.querySelector('#classes .card-container');
    if (cardContainer) {
        classes.forEach(item => {
            const card = document.createElement('class-card');
            card.setAttribute('title', item.title);
            card.setAttribute('description', item.description);
            card.setAttribute('image', item.image);
            card.setAttribute('tag', item.tag);
            card.setAttribute('instructor', item.instructor);
            card.setAttribute('instructor-avatar', item.instructorAvatar);
            card.setAttribute('duration', item.duration);
            cardContainer.appendChild(card);
        });
    }
});