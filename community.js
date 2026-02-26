// Firebase 설정
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const postList = document.getElementById('post-list');
const postForm = document.getElementById('post-form');
const postTitle = document.getElementById('post-title');
const postContent = document.getElementById('post-content');

// 게시글 작성
postForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newPost = {
        title: postTitle.value,
        content: postContent.value,
        timestamp: Date.now()
    };

    database.ref('posts/').push(newPost);

    postTitle.value = '';
    postContent.value = '';
});

// 게시글 목록 불러오기
database.ref('posts/').on('value', (snapshot) => {
    postList.innerHTML = '';
    snapshot.forEach((childSnapshot) => {
        const post = childSnapshot.val();
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <span>${new Date(post.timestamp).toLocaleString()}</span>
        `;
        postList.appendChild(postElement);
    });
});
