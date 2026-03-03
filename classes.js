document.addEventListener('DOMContentLoaded', () => {
    const allClassData = [
        // 건강/요가
        {
            title: '기초 의자 요가',
            description: '앉은 자세에서 할 수 있는 부드러운 스트레칭과 가동성 운동입니다. 데일리 웰니스에 완벽합니다.',
            image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2120&auto=format&fit=crop',
            tag: '초보 환영',
            instructor: '아서 첸 교수',
            instructorAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop',
            duration: '45분',
            category: '건강/요가'
        },
        {
            title: '활력 증진 타이치',
            description: '느리고 부드러운 동작을 통해 몸의 균형과 마음의 평화를 찾으세요.',
            image: 'https://images.unsplash.com/photo-1593810433282-e6995c105e46?q=80&w=2070&auto=format&fit=crop',
            tag: '모든 레벨',
            instructor: '이민준 사범',
            instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
            duration: '60분',
            category: '건강/요가'
        },
        // 디지털/스마트폰
        {
            title: '영상 통화 마스터하기',
            description: '줌, 페이스타임, 와츠앱으로 손주들과 쉽게 소통하는 방법을 단계별로 배워보세요.',
            image: 'https://images.unsplash.com/photo-1592495984998-a1c9d9ae75a8?q=80&w=2070&auto=format&fit=crop',
            tag: '초보 환영',
            instructor: '사라 밀러',
            instructorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
            duration: '60분',
            category: '디지털/스마트폰'
        },
        {
            title: '온라인 뱅킹 완전 정복',
            description: '은행 방문 없이 집에서 안전하게 송금, 조회, 공과금 납부까지 해결하세요.',
            image: 'https://images.unsplash.com/photo-1593532729623-10a5a5893f0b?q=80&w=2070&auto=format&fit=crop',
            tag: '실용 꿀팁',
            instructor: '김철수 전문가',
            instructorAvatar: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop',
            duration: '75분',
            category: '디지털/스마트폰'
        },
         // 미술/캘리그래피
        {
            title: '아침 수채화 교실',
            description: '차분한 수채화의 세계를 탐험하세요. 마음의 평화를 위한 보태니컬 아트와 풍경화에 집중합니다.',
            image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop',
            tag: '모든 레벨',
            instructor: '로버트 밴스',
            instructorAvatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop',
            duration: '90분',
            category: '미술/캘리그래피'
        },
        {
            title: '나만의 감성 캘리그래피',
            description: '붓펜으로 아름다운 글씨를 쓰며 마음을 전하는 캘리그래피의 기초를 배웁니다.',
            image: 'https://images.unsplash.com/photo-1530982236168-3d1451e0a297?q=80&w=2070&auto=format&fit=crop',
            tag: '입문',
            instructor: '박선영 작가',
            instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
            duration: '120분',
            category: '미술/캘리그래피'
        },
        // 음악/악기
        {
            title: '왕초보 통기타 교실',
            description: 'C코드부터 시작해 내가 좋아하는 노래를 직접 연주해보는 즐거움을 느껴보세요.',
            image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=2070&auto=format&fit=crop',
            tag: '악기 입문',
            instructor: '데이비드 김',
            instructorAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2080&auto=format&fit=crop',
            duration: '90분',
            category: '음악/악기'
        },
        {
            title: '신나는 라인댄스',
            description: '경쾌한 음악에 맞춰 스텝을 밟다 보면 스트레스 해소와 건강 증진은 덤!',
            image: 'https://images.unsplash.com/photo-1524594152329-99232c105a5a?q=80&w=2070&auto=format&fit=crop',
            tag: '그룹 활동',
            instructor: '제시카 리',
            instructorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop',
            duration: '60분',
            category: '음악/악기'
        }
    ];

    const classContainer = document.getElementById('class-list');
    const filterButtons = document.querySelectorAll('.filter-btn');

    function renderCards(filter = 'all') {
        classContainer.innerHTML = ''; // Clear existing cards
        const filteredData = filter === 'all' ? allClassData : allClassData.filter(item => item.category === filter);

        if (filteredData.length === 0) {
            classContainer.innerHTML = '<p>해당 카테고리의 클래스가 아직 없습니다.</p>';
            return;
        }

        filteredData.forEach(item => {
            const card = document.createElement('class-card');
            card.setAttribute('title', item.title);
            card.setAttribute('description', item.description);
            card.setAttribute('image', item.image);
            card.setAttribute('tag', item.tag);
            card.setAttribute('instructor', item.instructor);
            card.setAttribute('instructor-avatar', item.instructorAvatar);
            card.setAttribute('duration', item.duration);
            classContainer.appendChild(card);
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Render filtered cards
            const filter = button.getAttribute('data-filter');
            renderCards(filter);
        });
    });

    // Initially render all cards
    renderCards();
});