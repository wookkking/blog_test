document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const modal = document.getElementById('post-modal');
    const newPostBtn = document.getElementById('new-post-btn');
    const closeBtn = document.querySelector('.close');
    const postForm = document.getElementById('post-form');
    const postList = document.getElementById('post-list');

    // 탭 기능
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const target = tab.dataset.tab;
            tabContents.forEach(content => {
                if (content.dataset.tab === target) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });

    // 모달 열기
    newPostBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // 모달 닫기
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // 게시글 작성 (localStorage 사용)
    postForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-content').value;

        const post = {
            id: Date.now(),
            author: '새로운 사용자',
            location: '방금 전',
            title: title,
            content: content,
            likes: 0,
            comments: 0
        };

        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.unshift(post);
        localStorage.setItem('posts', JSON.stringify(posts));

        modal.style.display = 'none';
        postForm.reset();
        loadPosts();
    });

    // 게시글 불러오기
    function loadPosts() {
        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        postList.innerHTML = ''; // 기존 예시글들은 유지하지 않고 새로 불러옵니다.

        // 예시 게시물들 추가
        const examplePosts = [
            {
                id: 1,
                author: '산악대장 김철수',
                location: '1시간 전 | 설악산 대청봉',
                content: '오늘 날씨가 정말 환상적이네요! 🏔️ 60대에도 이 정도 등반은 거뜬합니다. 다음주 주말 트레킹 모임 함께 하실 분 계신가요? 정상에서 마시는 커피 맛이 꿀맛입니다!',
                image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                likes: 128,
                comments: 34
            },
            {
                id: 2,
                author: '디지털 노마드 이여사',
                location: '3시간 전 | 성수동 카페거리',
                content: '오랜만에 젊음의 거리 성수동에 왔어요. ☕💻 손주에게 배운 영상 편집을 복습하고 있답니다. 배움에는 나이가 없다는 말이 실감나는 오후네요. 다들 맛점 하셨나요?',
                likes: 97,
                comments: 21
            }
        ];

        const allPosts = [...examplePosts, ...posts];

        allPosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <div class="post-header">
                    <img src="https://i.pravatar.cc/50?u=${post.id}" alt="user-avatar" class="avatar">
                    <div>
                        <p class="author">${post.author}</p>
                        <p class="location">${post.location}</p>
                    </div>
                </div>
                ${post.title ? `<h3>${post.title}</h3>` : ''}
                <p>${post.content}</p>
                ${post.image ? `<img src="${post.image}" alt="post-image" class="post-image">` : ''}
                <div class="post-footer">
                    <span>❤️ 좋아요 ${post.likes}</span>
                    <span>💬 댓글 ${post.comments}</span>
                    <span>🔗 공유하기</span>
                </div>
            `;
            postList.appendChild(postElement);
        });
    }

    loadPosts();
});
