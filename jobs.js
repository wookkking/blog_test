class JobCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                :host {
                    display: block;
                    background: #fff;
                    border-radius: 15px;
                    border: 1px solid #e9ecef;
                    transition: transform 0.3s, box-shadow 0.3s;
                    overflow: hidden; /* Ensure image fits within rounded corners */
                }
                :host(:hover) {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 25px rgba(0,0,0,0.08);
                }
                .job-image {
                    width: 100%;
                    height: 200px; /* Fixed height for consistency */
                    object-fit: cover; /* Crop image to fit */
                }
                .job-content {
                    padding: 25px;
                }
                .job-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 15px;
                }
                .job-info h4 {
                    font-size: 20px;
                    font-weight: 700;
                    margin-bottom: 5px;
                }
                .job-info span {
                    font-size: 15px;
                    color: #555;
                }
                .job-type-tag {
                    background-color: #e7f5ff;
                    color: #1c7ed6;
                    padding: 6px 12px;
                    border-radius: 15px;
                    font-size: 14px;
                    font-weight: 700;
                    white-space: nowrap;
                }
                .job-details {
                    font-size: 16px;
                    color: #333;
                    margin-bottom: 20px;
                }
                .job-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 15px;
                    border-top: 1px solid #e9ecef;
                }
                .salary {
                    font-size: 16px;
                    font-weight: 700;
                    color: var(--primary-color, #ff6b6b);
                }
                .btn-apply {
                    background-color: var(--dark-blue, #2c3e50);
                    color: #fff;
                    padding: 10px 20px;
                    border-radius: 8px;
                    font-weight: 700;
                    text-decoration: none;
                    transition: background-color 0.3s;
                }
                 .btn-apply:hover {
                    background-color: #455a64;
                }
            </style>
            <img src="${this.getAttribute('image')}" alt="${this.getAttribute('title')}" class="job-image">
            <div class="job-content">
                <div class="job-header">
                    <div class="job-info">
                        <h4>${this.getAttribute('title')}</h4>
                        <span>${this.getAttribute('company')} &middot; ${this.getAttribute('location')}</span>
                    </div>
                    <span class="job-type-tag">${this.getAttribute('type')}</span>
                </div>
                <div class="job-details">
                    <p>${this.getAttribute('description')}</p>
                </div>
                <div class="job-footer">
                    <span class="salary">급여: ${this.getAttribute('salary')}</span>
                    <a href="#" class="btn-apply">지원하기</a>
                </div>
            </div>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('job-card', JobCard);

document.addEventListener('DOMContentLoaded', () => {
    const jobData = [
        {
            title: '도서관 사서 보조',
            company: '늘푸른 도서관',
            location: '서울시 강남구',
            type: '사무직',
            description: '열람실 관리, 도서 대출/반납 업무 및 간단한 사무 보조를 담당합니다. 차분하고 성실한 분을 찾습니다.',
            salary: '시급 12,000원',
            image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop'
        },
        {
            title: '초등학교 등하교 도우미',
            company: '안전지킴이 서비스',
            location: '서울시 서초구',
            type: '현장직',
            description: '아이들의 안전한 등하교를 돕는 보람 있는 일입니다. 아이들을 사랑하고 책임감이 강한 분을 환영합니다.',
            salary: '월 80만원',
            image: 'https://images.unsplash.com/photo-1576571585690-b6c4b694b8ac?q=80&w=2070&auto=format&fit=crop'
        },
        {
            title: '온라인 쇼핑몰 고객 문의 답변',
            company: '(주)행복상점',
            location: '전국',
            type: '재택근무',
            description: '고객의 질문에 친절하게 답변하고 주문을 처리하는 재택근무입니다. 기본적인 컴퓨터 사용 능력이 필요합니다.',
            salary: '건당 2,000원',
            image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop'
        },
        {
            title: '봄맞이 공원 화단 가꾸기',
            company: '푸른도시가꾸기',
            location: '서울시 송파구',
            type: '단기',
            description: '3월부터 5월까지, 주 3일 공원 화단을 가꾸는 단기 일자리입니다. 식물에 대한 애정이 있는 분에게 적합합니다.',
            salary: '월 100만원',
            image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2070&auto=format&fit=crop'
        },
        {
            title: '사무실 방문객 안내 및 접견',
            company: '스마일 오피스',
            location: '서울시 마포구',
            type: '사무직',
            description: '기업의 첫인상을 책임지는 방문객 안내 및 응대 업무입니다. 밝은 미소와 원활한 소통 능력을 갖춘 분을 선호합니다.',
            salary: '월 220만원',
            image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2070&auto=format&fit=crop'
        }
    ];

    const jobContainer = document.getElementById('job-list');
    const filterButtons = document.querySelectorAll('.filters .filter-btn');

    function renderJobCards(filter = 'all') {
        jobContainer.innerHTML = ''; 
        const filteredData = filter === 'all' ? jobData : jobData.filter(item => item.type === filter);

        if (filteredData.length === 0) {
            jobContainer.innerHTML = '<p>해당 유형의 일자리가 아직 없습니다.</p>';
            return;
        }

        filteredData.forEach(item => {
            const card = document.createElement('job-card');
            card.setAttribute('title', item.title);
            card.setAttribute('company', item.company);
            card.setAttribute('location', item.location);
            card.setAttribute('type', item.type);
            card.setAttribute('description', item.description);
            card.setAttribute('salary', item.salary);
            card.setAttribute('image', item.image);
            jobContainer.appendChild(card);
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.getAttribute('data-filter');
            renderJobCards(filter);
        });
    });

    // Initially render all job cards
    renderJobCards();
});