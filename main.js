const form = document.querySelector("#generator");
const htmlOutput = document.querySelector("#htmlOutput");
const copyButton = document.querySelector("#copy");
const downloadButton = document.querySelector("#download");
const resetButton = document.querySelector("#reset");
const apiKeyInput = document.querySelector("#apiKey");

const sanitize = (value) => String(value || "").trim();

const API_KEY_STORAGE = "gemini_api_key";

if (apiKeyInput) {
  apiKeyInput.value = localStorage.getItem(API_KEY_STORAGE) || "";
  apiKeyInput.addEventListener("input", () => {
    localStorage.setItem(API_KEY_STORAGE, apiKeyInput.value.trim());
  });
}

const listFromKeywords = (keywords) => {
  if (!keywords) return [];
  return keywords
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const lengthBlocks = {
  short: 2,
  medium: 3,
  long: 4,
};

const hash = (value) => {
  const str = String(value || "");
  let h = 0;
  for (let i = 0; i < str.length; i += 1) {
    h = (h * 31 + str.charCodeAt(i)) % 9973;
  }
  return h;
};

const rotate = (arr, offset) => {
  if (!arr.length) return arr;
  const index = offset % arr.length;
  return arr.slice(index).concat(arr.slice(0, index));
};

const paragraphSet = (count, texts, seed) => {
  const rotated = rotate(texts, hash(seed));
  const picks = rotated.slice(0, count);
  return picks;
};

const buildText = (data) => {
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
    style,
  } = data;

  const locale = location ? `${location} 지역` : "지역";
  const primaryKeyword = treatment || topic;
  const keywordList = listFromKeywords(keywords);
  const lengthCount = lengthBlocks[length] || 3;
  const audienceLine = audience
    ? `${audience} 분들이 자주 묻는 질문을 중심으로`
    : "대표적인 문의 흐름을 중심으로";

  const hookTexts = [
    `${primaryKeyword}를 알아볼 때 가장 먼저 떠오르는 질문은 “나에게 맞는 선택인가?”입니다`,
    `${topic}을 검색하는 분들의 공통 고민은 효과, 회복, 유지 기준입니다`,
    `${primaryKeyword}는 정보가 많지만 기준이 정리되어 있지 않아 선택이 어렵게 느껴집니다`,
  ];

  const introTexts = [
    `${clinic} ${service}에서는 ${topic}의 흐름을 ${tone} 톤으로 정리했습니다`,
    `${audienceLine} ${primaryKeyword}의 기준과 결정 포인트를 정돈해드립니다`,
    `${locale}에서 ${primaryKeyword} 정보를 찾는 분들이 이해하기 쉽도록 핵심만 추렸습니다`,
    `${primaryKeyword}를 고려할 때 흔히 놓치는 부분까지 함께 확인하는 것이 좋습니다`,
  ];

  const overviewTexts = [
    `${primaryKeyword}는 한 가지 기준으로 단정하기보다, 현재 상태와 목표에 맞춰 접근하는 것이 핵심입니다`,
    `${service} 영역에서는 안전성과 예측 가능성을 위해 장비 특성, 케이스 경험, 관리 프로토콜을 함께 살펴봅니다`,
    `${clinic}에서는 기대 결과와 한계를 구체적으로 안내하고, 생활 습관을 고려한 관리 기준을 제시합니다`,
    `${topic}에 대한 오해를 줄이기 위해 적용 범위, 유지 기간, 필요한 관리 기준을 현실적으로 설명하는 것이 필요합니다`,
  ];

  const checklistTexts = [
    `어떤 부위의 개선을 원하는지, 우선순위를 먼저 정리합니다`,
    `회복에 필요한 시간과 일정 조정이 가능한지 점검합니다`,
    `방법 선택의 이유가 명확한지 확인합니다`,
    `관리 계획이 구체적으로 제시되는지 살펴봅니다`,
  ];

  const candidateTexts = [
    `${primaryKeyword}는 현재 고민의 원인과 목표에 따라 접근 방식이 달라질 수 있습니다`,
    `시간과 회복 여건, 관리 가능 여부를 함께 고려하는 것이 만족도를 높이는 데 도움이 됩니다`,
    `개선 범위를 현실적으로 이해하고, 무리한 기대를 줄이는 과정이 필요합니다`,
  ];

  const cautionTexts = [
    `기저 질환이나 피부 상태에 따라 접근이 달라질 수 있습니다`,
    `최근 시술 이력이 있거나 회복 중인 경우 일정 조정이 필요할 수 있습니다`,
    `즉시 효과만 기대하기보다 변화의 속도를 현실적으로 바라보는 것이 좋습니다`,
  ];

  const processTexts = [
    `현재 상태와 과거 이력, 목표를 종합적으로 확인합니다`,
    `적합한 방법을 선택한 뒤 일정과 관리 계획을 세웁니다`,
    `관리의 일관성이 결과에 영향을 주므로 체크 포인트를 정리합니다`,
  ];

  const careTexts = [
    `시술 후에는 자극을 줄이는 관리가 우선이며, 보습과 자외선 차단을 기본으로 유지하는 것이 좋습니다`,
    `붉음이나 부기는 상태에 따라 다를 수 있어 경과를 관찰하는 것이 중요합니다`,
    `${primaryKeyword}의 효과를 안정적으로 유지하려면 생활 습관 관리와 정기 점검이 함께 필요합니다`,
    `회복 속도는 개인차가 있으므로 충분한 휴식과 수면을 확보하는 것이 도움이 됩니다`,
  ];

  const mythTexts = [
    `효과를 빠르게 보기 위해 과도한 강도를 선택하는 것은 오히려 회복 부담을 키울 수 있습니다`,
    `단기간에 모든 개선을 기대하기보다, 변화의 단계와 유지 계획을 함께 보는 것이 좋습니다`,
    `관리 없이 결과가 오래 유지된다는 기대는 현실과 차이가 있을 수 있습니다`,
  ];

  const sections = [];
  const addTitle = (text) => sections.push(text);
  const addLine = (text) => sections.push(text);
  const addLines = (lines) => lines.forEach((line) => sections.push(line));
  const addList = (title, items) => {
    sections.push(title);
    items.forEach((item) => sections.push(`- ${item}`));
  };

  addTitle(topic);
  addLine(`${clinic} | ${service}`);
  addLine(`핵심 키워드: ${primaryKeyword}${location ? `, ${location}` : ""}`);
  addLine("");

  addList("한눈에 보는 요약", [
    `${primaryKeyword}는 개인 상태에 맞춘 계획 수립이 핵심입니다.`,
    `효과와 회복, 유지 기준을 균형 있게 살펴보는 것이 중요합니다.`,
    `관리 습관이 결과 유지에 큰 영향을 줍니다.`,
  ]);
  addLine("");

  const introBlock = [
    ...paragraphSet(1, hookTexts, topic),
    ...paragraphSet(lengthCount, introTexts, topic),
  ];
  addLines(["읽기 전에", ...introBlock, ""]);

  addList("이 글에서 정리하는 내용", [
    `${primaryKeyword} 선택 기준과 체크 포인트`,
    `적합 대상과 주의가 필요한 경우`,
    `진행 흐름과 관리 팁`,
  ]);
  addLine("");

  const overviewBlock = paragraphSet(lengthCount, overviewTexts, primaryKeyword);
  addLines([`${primaryKeyword} 선택 기준`, ...overviewBlock, ""]);
  if (keywordList.length) {
    addList("연관 키워드", keywordList);
    addLine("");
  }

  const mythBlock = paragraphSet(Math.max(2, lengthCount - 1), mythTexts, topic);
  addLines(["자주 생기는 오해", ...mythBlock, ""]);

  const candidateBlock = paragraphSet(Math.max(2, lengthCount - 1), candidateTexts, audience);
  addLines(["적합 대상 체크", ...candidateBlock, ""]);
  const cautionBlock = paragraphSet(Math.max(2, lengthCount - 1), cautionTexts, clinic);
  addLines(["주의가 필요한 경우", ...cautionBlock, ""]);

  const processBlock = paragraphSet(Math.max(2, lengthCount - 1), processTexts, service);
  addLines(["진행 흐름과 체크리스트", ...processBlock]);
  addList("체크 포인트", [
    "현재 고민과 원하는 개선점을 구체적으로 정리합니다.",
    "적합도와 예상 결과를 확인합니다.",
    "관리 일정과 주의사항을 꼼꼼히 체크합니다.",
  ]);
  const checklistBlock = paragraphSet(Math.max(2, lengthCount - 1), checklistTexts, treatment);
  addLines(["간단 체크리스트", ...checklistBlock, ""]);

  const careBlock = paragraphSet(lengthCount, careTexts, clinic);
  addLines(["사후 관리 및 유지 팁", ...careBlock, ""]);

  const faqLines = [
    "자주 묻는 질문",
    "Q1. 통증이나 회복 기간은 어느 정도인가요?",
    "개인차가 있어 예상 회복 흐름과 일상 복귀 시점을 미리 확인하는 것이 좋습니다.",
    "Q2. 몇 회 정도 받아야 하나요?",
    "상태와 목표에 따라 횟수가 달라질 수 있어 계획을 세우는 과정이 필요합니다.",
    "Q3. 부작용이 걱정돼요.",
    "가능한 위험과 예방 방법을 충분히 확인하고, 사후 관리 체계를 살펴보는 것이 중요합니다.",
    "",
    "주의: 본 글은 일반적인 정보 제공 목적이며, 진단 및 치료는 의료진 상담 후 결정되어야 합니다.",
  ];

  let draft = sections.join("\n");

  if (style === "qa") {
    draft = [
      topic,
      `${clinic} | ${service}`,
      `핵심 키워드: ${primaryKeyword}${location ? `, ${location}` : ""}`,
      "",
      "Q. 이 글에서 무엇을 알 수 있나요?",
      `A. ${primaryKeyword} 선택 기준, 적합 대상, 진행 흐름, 관리 팁을 정리합니다.`,
      "",
      "Q. 어떤 기준으로 접근하면 좋을까요?",
      ...overviewBlock.map((line) => `A. ${line}`),
      "",
      "Q. 이런 경우는 주의가 필요할까요?",
      ...cautionBlock.map((line) => `A. ${line}`),
      "",
      "Q. 진행 흐름은 어떻게 되나요?",
      ...processBlock.map((line) => `A. ${line}`),
      "",
      "Q. 관리 팁은 무엇이 있나요?",
      ...careBlock.map((line) => `A. ${line}`),
      "",
      "주의: 본 글은 일반적인 정보 제공 목적이며, 진단 및 치료는 의료진 상담 후 결정되어야 합니다.",
    ].join("\n");
  }

  if (style === "consult") {
    draft = [
      topic,
      `${clinic} | ${service}`,
      `핵심 키워드: ${primaryKeyword}${location ? `, ${location}` : ""}`,
      "",
      "상담 요약",
      ...introBlock,
      "",
      "현재 상태 점검",
      ...candidateBlock,
      ...cautionBlock,
      "",
      "결정 기준",
      ...overviewBlock,
      "",
      "진행 플랜",
      ...processBlock,
      ...checklistBlock,
      "",
      "사후 관리",
      ...careBlock,
      "",
      "주의: 본 글은 일반적인 정보 제공 목적이며, 진단 및 치료는 의료진 상담 후 결정되어야 합니다.",
    ].join("\n");
  }

  return draft.trim();
};

const buildPrompt = (data) => {
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
    style,
  } = data;

  const keywordList = listFromKeywords(keywords).join(", ");
  const locale = location ? `${location} 지역` : "지역";
  const lengthMap = {
    short: "간단",
    medium: "표준",
    long: "심화",
  };

  return [
    "당신은 의료/클리닉 마케팅 전문 카피라이터입니다.",
    "아래 정보를 바탕으로 한국어 블로그 원고를 작성하세요.",
    "출력 형식은 제목/소제목이 포함된 문단형 텍스트이며, 불필요한 영어는 피하세요.",
    "과장된 표현이나 의료 확정 표현을 피하고, 마지막에 주의 문구를 포함하세요.",
    "",
    `클리닉명: ${clinic}`,
    `진료 카테고리: ${service}`,
    `주요 시술/수술: ${treatment}`,
    `콘텐츠 주제: ${topic}`,
    `핵심 타겟: ${audience || "일반 고객"}`,
    `브랜드 톤: ${tone}`,
    `원고 길이: ${lengthMap[length] || "표준"}`,
    `보조 키워드: ${keywordList || "없음"}`,
    `지역 포인트: ${locale}`,
    `스타일: ${style === "qa" ? "Q&A형" : style === "consult" ? "상담 정리형" : "정보형"}`,
    "",
    "구성 예시:",
    "1) 제목",
    "2) 한눈에 보는 요약",
    "3) 본문(소제목 3~5개)",
    "4) 체크리스트",
    "5) 자주 묻는 질문",
    "6) 주의 문구",
  ].join("\n");
};

const generateWithGemini = async (prompt, apiKey) => {
  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 1200,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "API 호출에 실패했습니다.");
  }

  const data = await response.json();
  const text =
    data?.candidates?.[0]?.content?.parts?.map((part) => part.text).join("\n") || "";
  if (!text) {
    throw new Error("응답에 텍스트가 없습니다.");
  }
  return text.trim();
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

  const payload = {
    clinic: sanitize(data.clinic),
    service: sanitize(data.service),
    treatment: sanitize(data.treatment),
    topic: sanitize(data.topic),
    audience: sanitize(data.audience),
    tone: sanitize(data.tone),
    length: sanitize(data.length),
    keywords: sanitize(data.keywords),
    location: sanitize(data.location),
    style: sanitize(data.style),
  };

  const apiKey = sanitize(data.apiKey);
  if (!apiKey) {
    htmlOutput.value = "Gemini API 키를 입력해주세요.";
    return;
  }

  const submitButton = form.querySelector("button[type='submit']");
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "AI 생성 중...";
  }

  htmlOutput.value = "AI가 원고를 작성 중입니다. 잠시만 기다려주세요.";

  const prompt = buildPrompt(payload);

  generateWithGemini(prompt, apiKey)
    .then((text) => {
      render(text);
    })
    .catch((error) => {
      console.error(error);
      htmlOutput.value =
        "AI 생성에 실패했습니다. API 키와 사용량 한도를 확인해 주세요.";
    })
    .finally(() => {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "원고 생성";
      }
    });
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
    copyButton.textContent = "텍스트 복사";
  }, 1400);
});

downloadButton.addEventListener("click", () => {
  if (!htmlOutput.value) return;
  const blob = new Blob([htmlOutput.value], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "clinic-blog-draft.txt";
  anchor.click();
  URL.revokeObjectURL(url);
});
