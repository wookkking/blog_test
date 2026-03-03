document.addEventListener('DOMContentLoaded', () => {
    const postData = [
        {
            author: '행복한 산책가',
            avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2080&auto=format&fit=crop',
            time: '15분 전',
            category: '자유게시판',
            title: '오늘 남산 둘레길 같이 걸으실 분 계신가요?',
            content: '날씨가 너무 좋아서 집에만 있기 아깝네요. 오후 2시에 국립극장 쪽에서 만나서 천천히 한 바퀴 돌고 시원한 냉면 한 그릇 하실 분들 댓글 남겨주세요!',
            image: 'https://images.unsplash.com/photo-1588632210085-5b8a55c28554?q=80&w=1974&auto=format&fit=crop',
            likes: 12,
            comments: 5,
        },
        {
            author: '꽃할매 정원사',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop',
            time: '1시간 전',
            category: '정보공유',
            title: '베란다에서 상추 키우는 꿀팁 공유합니다',
            content: '벌써 세 번째 수확했어요! 가장 중요한 건 통풍과 물주기 시간인 것 같아요. 제가 정리한 몇 가지 노하우 보시고 다들 싱싱한 상추 키워보세요.',
            image: null, // No image for this post
            likes: 28,
            comments: 14,
        },
        {
            author: '우리동네 보안관',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
            time: '3시간 전',
            category: '동네소식',
            title: '이번 주말, 동네 플리마켓이 열립니다!',
            content: '안 입는 옷, 안 쓰는 물건들 가지고 나오셔서 이웃과 정을 나눠보세요. 맛있는 먹거리도 많다고 하니 다들 놀러오세요!',
            image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop',
            likes: 45,
            comments: 18,
        },
        {
            author: '건강지킴이',
            avatar: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop',
            time: '5시간 전',
            category: '건강고민',
            title: '무릎이 시큰거리는데 좋은 운동 있을까요?',
            content: '계단 오르내릴 때마다 무릎 통증이 있어서 걱정입니다. 집에서 간단하게 할 수 있는 무릎 강화 운동 아시는 분 계시면 추천 부탁드립니다.',
            image: null,
            likes: 33,
            comments: 22,
        },
    ];

    const postList = document.getElementById('post-list');
    const filterButtons = document.querySelectorAll('.filters .filter-btn');

    function renderPosts(filter = 'all') {
        postList.innerHTML = '';
        const filteredPosts = filter === 'all' ? postData : postData.filter(p => p.category === filter);

        if (filteredPosts.length === 0) {
            postList.innerHTML = '<p>아직 게시글이 없습니다.</p>';
            return;
        }

        filteredPosts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.className = 'post-card';

            let imageHtml = '';
            if (post.image) {
                imageHtml = `<img src="${post.image}" alt="${post.title}">`;
            }

            postCard.innerHTML = `
                <div class="post-header">
                    <div class="post-author">
                        <img src="${post.avatar}" alt="${post.author}">
                        <div class="author-info">
                            <h5>${post.author}</h5>
                            <span>${post.time} &middot; ${post.category}</span>
                        </div>
                    </div>
                    <div class="post-options"><i class="fa-solid fa-ellipsis-h"></i></div>
                </div>
                <div class="post-body">
                    <h3>${post.title}</h3>
                    <p>${post.content}</p>
                    ${imageHtml}
                </div>
                <div class="post-footer">
                    <button class="action-btn"><i class="fa-solid fa-heart"></i> 좋아요 ${post.likes}</button>
                    <button class="action-btn"><i class="fa-solid fa-comment"></i> 댓글 달기 ${post.comments}</button>
                </div>
            `;
            postList.appendChild(postCard);
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.getAttribute('data-filter');
            renderPosts(filter);
        });
    });

    // Initial render
    renderPosts();
});
