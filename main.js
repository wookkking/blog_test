const form = document.querySelector("#generator");
const htmlOutput = document.querySelector("#htmlOutput");
const copyButton = document.querySelector("#copy");
const downloadButton = document.querySelector("#download");
const resetButton = document.querySelector("#reset");

const sanitize = (value) => String(value || "").trim();


const listFromKeywords = (keywords) => {
  if (!keywords) return "";
  const items = keywords
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  if (items.length === 0) return "";
  return `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
};

const lengthBlocks = {
  short: 2,
  medium: 3,
  long: 4,
};

const paragraphSet = (count, texts) => {
  const picks = texts.slice(0, count);
  return picks.map((item) => `<p>${item}</p>`).join("");
};

const buildHtml = (data) => {
  const {
    clinic,
    service,
    treatment,
    topic,
    audience,
    tone,
    length,
    keywords,
    location,
  } = data;

  const locale = location ? `${location} 지역` : "지역";
  const primaryKeyword = treatment || topic;
  const keywordList = listFromKeywords(keywords);
  const lengthCount = lengthBlocks[length] || 3;
  const audienceLine = audience ? `${audience} 분들이 주로 겪는 고민을 기준으로` : "대표적인 고민을 기준으로";

  const introTexts = [
    `${clinic} ${service}에서는 ${topic}에 대해 ${tone} 톤으로 안내드립니다`,
    `${audienceLine} ${primaryKeyword}의 선택 포인트를 정리했습니다`,
    `${locale}에서 ${primaryKeyword} 정보를 찾는 분들에게 도움이 될 핵심 내용을 담았습니다`,
    `${primaryKeyword}를 고려 중이라면, 절차와 회복, 기대 결과를 먼저 이해하는 것이 중요합니다`,
  ];

  const detailTexts = [
    `${primaryKeyword}는 개인의 피부 상태와 구조에 따라 적용 방법이 달라질 수 있어, 정확한 진단 후 계획을 세우는 것이 필요합니다`,
    `${service} 영역에서는 안전성과 예측 가능한 결과를 위해 장비, 집도의 경험, 사후 관리 프로세스를 함께 살펴보는 것이 좋습니다`,
    `${clinic}에서는 상담 단계에서 기대 결과와 한계를 투명하게 설명하고, 생활 습관에 맞춘 관리 팁을 제공합니다`,
    `${topic}에 대한 오해를 줄이기 위해 시술 전후 변화 범위와 유지 기간에 대한 현실적인 안내가 중요합니다`,
  ];

  const careTexts = [
    `시술 후에는 자극을 줄이기 위해 보습과 자외선 차단을 우선하고, 과도한 음주나 사우나는 피하는 것이 좋습니다`,
    `부기나 붉음은 개인 차가 있으므로 경과를 관찰하며 필요 시 병원에 문의하는 것이 안전합니다`,
    `${primaryKeyword}의 효과를 오래 유지하려면 생활 습관 개선과 정기적인 관리가 함께 필요합니다`,
    `회복 속도는 개인차가 있으므로 충분한 휴식과 수면을 확보하는 것이 도움이 됩니다`,
  ];

  const faq = `
    <h2>자주 묻는 질문</h2>
    <h3>Q1. 통증이나 회복 기간은 어느 정도인가요?</h3>
    <p>개인차가 있지만 상담 시 예상 회복 기간과 일상 복귀 시점을 상세히 안내받는 것이 좋습니다.</p>
    <h3>Q2. 몇 회 정도 받아야 하나요?</h3>
    <p>피부 상태와 목표에 따라 횟수가 달라질 수 있어 전문의 상담을 통해 계획을 세우는 것이 필요합니다.</p>
    <h3>Q3. 부작용이 걱정돼요.</h3>
    <p>부작용 가능성과 예방 방법을 충분히 설명받고, 사후 관리 시스템이 있는지 확인하세요.</p>
  `;

  const html = `
    <article>
      <h1>${topic}</h1>
      <p><strong>${clinic}</strong> | ${service}</p>
      <p><em>키워드</em>: ${primaryKeyword}${location ? `, ${location}` : ""}</p>
      <h2>오늘의 핵심 요약</h2>
      <ul>
        <li>${primaryKeyword}는 개인 상태에 맞춘 맞춤 계획이 중요합니다.</li>
        <li>시술 전 기대 결과와 한계를 충분히 이해해야 합니다.</li>
        <li>사후 관리와 생활 습관이 결과 유지에 큰 영향을 줍니다.</li>
      </ul>

      <h2>소개</h2>
      ${paragraphSet(lengthCount, introTexts)}

      <h2>${primaryKeyword} 선택 포인트</h2>
      ${paragraphSet(lengthCount, detailTexts)}
      ${keywordList}

      <h2>과정과 체크리스트</h2>
      <ul>
        <li>현재 고민과 원하는 개선점을 구체적으로 정리합니다.</li>
        <li>상담 시 시술 적합도와 예상 결과를 확인합니다.</li>
        <li>사후 관리 일정과 주의사항을 꼼꼼히 체크합니다.</li>
      </ul>

      <h2>사후 관리 및 유지 팁</h2>
      ${paragraphSet(lengthCount, careTexts)}

      ${faq}

      <p><strong>주의</strong>: 본 글은 일반적인 정보 제공 목적이며, 진단 및 치료는 의료진 상담 후 결정되어야 합니다.</p>
    </article>
  `.trim();

  return html;
};

const render = (html) => {
  htmlOutput.value = html;
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  if (!data.clinic || !data.treatment || !data.topic) {
    htmlOutput.value = "클리닉명, 시술/수술명, 콘텐츠 주제는 필수 입력입니다.";
    return;
  }
  const html = buildHtml({
    clinic: sanitize(data.clinic),
    service: sanitize(data.service),
    treatment: sanitize(data.treatment),
    topic: sanitize(data.topic),
    audience: sanitize(data.audience),
    tone: sanitize(data.tone),
    length: sanitize(data.length),
    keywords: sanitize(data.keywords),
    location: sanitize(data.location),
  });
  render(html);
});

resetButton.addEventListener("click", () => {
  form.reset();
  htmlOutput.value = "";
});

copyButton.addEventListener("click", async () => {
  if (!htmlOutput.value) return;
  await navigator.clipboard.writeText(htmlOutput.value);
  copyButton.textContent = "복사됨";
  setTimeout(() => {
    copyButton.textContent = "HTML 복사";
  }, 1400);
});

downloadButton.addEventListener("click", () => {
  if (!htmlOutput.value) return;
  const blob = new Blob([htmlOutput.value], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "clinic-blog-draft.html";
  anchor.click();
  URL.revokeObjectURL(url);
});
