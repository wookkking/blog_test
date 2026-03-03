export class SiteHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background-color: #fff;
          border-bottom: 1px solid #ddd;
          position: sticky; /* Make header sticky */
          top: 0;
          z-index: 1000;
        }
        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        h1 {
          margin: 0;
          font-size: 1.8rem;
          font-weight: 700;
        }
        h1 a {
           text-decoration: none;
           color: #005A9C;
        }
        nav ul {
          display: flex;
          gap: 1.5rem;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        nav a {
          font-size: 1.1rem;
          font-weight: 500;
          padding: 0.5rem 0;
          border-bottom: 2px solid transparent;
          transition: border-color 0.3s, color 0.3s;
          text-decoration: none;
          color: #333;
        }
        nav a:hover {
          color: #005A9C;
          border-bottom-color: #005A9C;
        }
      </style>
      <header class="header-container">
        <h1><a href="/">액티브 시니어</a></h1>
        <nav>
            <ul>
                <li><a href="health-shop.html">건강 장보기</a></li>
                <li><a href="community.html">시니어 소통방</a></li>
                <li><a href="health-care.html">건강 관리</a></li>
                <li><a href="jobs.html">일자리 찾기</a></li>
                <li><a href="leisure.html">여가 활동</a></li>
            </ul>
        </nav>
      </header>
    `;
  }
}

export class SiteFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          text-align: center;
          padding: 2rem;
          background-color: #333;
          color: #fff;
        }
        .footer-container {
           max-width: 1200px;
           margin: 0 auto;
        }
        p {
          margin: 0 0 1rem;
        }
        ul {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        a {
          color: #fff;
          text-decoration: underline;
        }
      </style>
      <footer class="footer-container">
        <p>&copy; 2024 액티브 시니어. All rights reserved.</p>
        <ul>
            <li><a href="#">이용약관</a></li>
            <li><a href="#">개인정보처리방침</a></li>
            <li><a href="#">고객센터</a></li>
        </ul>
      </footer>
    `;
  }
}

export class PageTitle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .page-title-section {
          text-align: center;
          padding: 2rem;
          background-color: #e7f0f7;
          border-radius: 10px;
          margin-bottom: 3rem;
        }
        h2 {
          font-size: 2.5rem;
          margin: 0 0 0.5rem;
          color: #005A9C;
        }
        p {
          font-size: 1.2rem;
          color: #333;
        }
      </style>
      <section class="page-title-section">
        <h2>${this.getAttribute('title-text')}</h2>
        <p>${this.getAttribute('subtitle-text')}</p>
      </section>
    `;
  }
}
