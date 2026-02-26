document.addEventListener('DOMContentLoaded', () => {
    // 카테고리 필터
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            // 여기에 실제 필터링 로직을 추가할 수 있습니다.
            alert(`'${btn.textContent.trim()}' 카테고리가 선택되었습니다.`);
        });
    });

    // 장바구니 담기 버튼
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            alert('상품이 장바구니에 담겼습니다!');
        });
    }

    // 바로구매 버튼
    const buyNowBtns = document.querySelectorAll('.buy-now-btn');
    buyNowBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            alert('구매 페이지로 이동합니다.');
        });
    });
});
