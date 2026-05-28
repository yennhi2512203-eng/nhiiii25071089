OK
/* ==========================================================================
   UNI-BUDDY CORE LOGIC (KOREAN TRANSLATION)
   Author: Trần Yến Nhi (25071089)
   School: Kyungmin University (경민대학교)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. SINGLE PAGE ROUTER (TAB NAVIGATION) ---
    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const hamburger = document.querySelector('.hamburger-menu');
    const sidebar = document.querySelector('.sidebar');

    function switchTab(tabId) {
        // Remove active class from all links and tabs
        navLinks.forEach(link => link.classList.remove('active'));
        tabContents.forEach(tab => tab.classList.remove('active'));

        // Add active class to selected link and tab content
        const targetLink = document.querySelector(`.nav-link[data-tab="${tabId}"]`);
        const targetTab = document.getElementById(tabId);

        if (targetLink && targetTab) {
            targetLink.classList.add('active');
            targetTab.classList.add('active');
        }

        // Scroll page back to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Sidebar navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = link.getAttribute('data-tab');
            switchTab(tabId);

            // Close mobile sidebar on link click
            if (window.innerWidth <= 768) {
                sidebar.style.display = 'none';
            }
        });
    });

    // Mobile Hamburger Toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            if (sidebar.style.display === 'flex') {
                sidebar.style.display = 'none';
            } else {
                sidebar.style.display = 'flex';
                sidebar.style.width = '280px';

                // Show logo & details on mobile drawer
                const brandH2 = sidebar.querySelector('.sidebar-brand h2');
                const profileInfo = sidebar.querySelector('.user-profile-summary .profile-info');
                const navSpans = sidebar.querySelectorAll('.sidebar-nav span');
                const footer = sidebar.querySelector('.sidebar-footer');

                if (brandH2) brandH2.style.display = 'block';
                if (profileInfo) profileInfo.style.display = 'block';
                navSpans.forEach(span => span.style.display = 'block');
                if (footer) footer.style.display = 'block';
            }
        });
    }

    // Handle screen resize events to restore desktop sidebar state
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            sidebar.style.display = 'flex';
            sidebar.style.width = ''; // Reset to CSS default width

            // Restore hidden components on larger screens
            const brandH2 = sidebar.querySelector('.sidebar-brand h2');
            const profileInfo = sidebar.querySelector('.user-profile-summary .profile-info');
            const navSpans = sidebar.querySelectorAll('.sidebar-nav span');
            const footer = sidebar.querySelector('.sidebar-footer');

            if (brandH2) brandH2.style.display = '';
            if (profileInfo) profileInfo.style.display = '';
            navSpans.forEach(span => span.style.display = '');
            if (footer) footer.style.display = '';
        } else {
            sidebar.style.display = 'none';
        }
    });


    // --- 2. SMART CHATBOT ENGINE ---
    const chatInput = document.getElementById('chat-input-field');
    const chatSendBtn = document.getElementById('chat-send-btn');
    const chatMessagesContainer = document.getElementById('chat-messages-container');
    const chatTypingIndicator = document.getElementById('chat-typing-indicator');
    const clearChatBtn = document.getElementById('clear-chat');
    const suggestedPromptButtons = document.querySelectorAll('.prompt-btn');

 // Internationalization resources (simple embedded object)
const i18nResources = {
  ko: {
    translation: {
      // UI text keys (example, extend as needed)
      "quick_prompt_label": "<i class=\"fas fa-bolt\"></i> 빠른 추천 질문:",
      "chat_placeholder": "여기에 질문을 입력해 주세요... (예: 비자 연장 방법, 맛있는 음식 추천...)",
      "welcome_msg": "안녕하세요, 옌니(Trần Yến Nhi)님! 저는 <strong>경민대학교(경민대)</strong> 유학 생활을 함께할 스마트 비서 <strong>유니버디(Uni-Buddy)</strong>입니다. 🌟",
      "welcome_desc": "비자 연장 서류, 경민대 후문/정문 맛집, 기숙사 규칙, 유학생 아르바이트 허가 신청 등 궁금한 점을 편하게 물어보세요! 위의 빠른 추천 버튼을 누르셔도 답변해 드립니다!"
    }
  },
  vi: {
    translation: {
      "quick_prompt_label": "<i class=\"fas fa-bolt\"></i> Câu hỏi nhanh gợi ý:",
      "chat_placeholder": "Nhập câu hỏi ở đây... (ví dụ: cách gia hạn visa, đề xuất món ăn ngon...)",
      "welcome_msg": "Chào bạn, Nhi! Tôi là <strong>Uni‑Buddy</strong> – trợ lý thông minh cho cuộc sống du học tại <strong>Đại học Kyungmin</strong>. 🌟",
      "welcome_desc": "Bạn có thể hỏi về giấy tờ xin visa, nhà ăn quanh trường, quy định ký túc xá, việc làm part‑time… Nhấn các nút gợi ý nhanh phía dưới để nhận câu trả lời!"
    }
  },
  en: {
    translation: {
      "quick_prompt_label": "<i class=\"fas fa-bolt\"></i> Quick Suggested Questions:",
      "chat_placeholder": "Type your question here... (e.g., visa extension steps, food recommendations…)",
      "welcome_msg": "Hello, Nhi! I’m <strong>Uni‑Buddy</strong>, your smart assistant for life at <strong>Kyungmin University</strong>. 🌟",
      "welcome_desc": "Feel free to ask about visa extension documents, nearby eateries, dorm rules, part‑time job permits, etc. You can also click the quick suggestion buttons below!"
    }
  }
};

// Current language state (default to stored preference or Korean)
let currentLang = localStorage.getItem('uiLang') || 'ko';

// Simple i18n function (mimics i18next.t)
function t(key) {
  const ns = i18nResources[currentLang]?.translation || {};
  return ns[key] || key;
}

// Update all elements with data-i18n attribute
function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (el.tagName === 'INPUT') {
      el.setAttribute('placeholder', t(key));
    } else {
      el.innerHTML = t(key);
    }
  });
}

// Language selector handling (assumes a <select id="language-select"> exists)
const languageSelect = document.getElementById('language-select');
if (languageSelect) {
  languageSelect.value = currentLang;
  languageSelect.addEventListener('change', () => {
    currentLang = languageSelect.value;
    localStorage.setItem('uiLang', currentLang);
    updateContent();
    // also update chatbot knowledge base selection (handled later)
  });
}

// Initial UI translation
document.addEventListener('DOMContentLoaded', () => {
  updateContent();
});
        "visa": `안녕하세요, 옌니님! **경민대학교(Kyungmin University)**에서 **D-2 유학 비자**를 연장하는 절차와 제출 서류는 다음과 같습니다:
        <br><br>
        1. <strong>필수 제출 서류 목록:</strong>
        <ul>
            <li>여권 원본 및 외국인등록증(ARC) 실물.</li>
            <li>통합신청서 (여권 규격 3.5x4.5cm 흰색 배경 사진 부착).</li>
            <li>재학증명서 및 직전 학기 성적증명서 (경민대 대학 교학처 발급).</li>
            <li>재정능력 입증 서류 (본인 명의의 은행 잔고증명서 - 보통 500만 원 ~ 1,000만 원 이상 필요).</li>
            <li>체류지 입증 서류 (임대차 임대 계약서 또는 기숙사 거주확인서).</li>
            <li>직전 학기 등록금 납부 영수증.</li>
            <li>수수료 (60,000원).</li>
        </ul>
        2. <strong>제출처 및 접수 방법:</strong>
        <br>
        모든 서류를 지참하신 후 **경민대학교 행정관 2층 국제교류원(국제협력실)**에 방문하여 제출해 주세요. 국제교류원에서 1차 서류 검토 후, 대학의 공식 보증을 통해 신속하게 Cục (출입국관리사무소) 접수를 대리하거나 절차를 안내해 줍니다.
        <br><br>
        💡 <em>유니버디의 꿀팁: 비자 유효기간 만료일로부터 최소 <strong>1개월 전</strong>에 예약을 잡고 연장 준비를 시작하는 것이 안전합니다!</em>`,

        "doan": `경민대학교(경민대) 근처 맛집을 옌니님께 소개해 드릴게요! 취향에 맞게 즐겨보세요! 😋
        <br><br>
        🍜 <strong>후문 국수 맛집 (Guksu 국수집):</strong>
        <br>유학생들 사이에서 가성비 최고로 손꼽히는 식당입니다! 시원하고 개운한 멸치 육수 베이스의 국수와 쫄깃한 소면, 그리고 알맞게 익은 아삭한 김치가 아주 훌륭한 조화를 이룹니다. 가격도 매우 착하고 주문 즉시 빠르게 나오기 때문에 바쁜 공강 시간에 강력 추천합니다.
        <br><br>
        🍱 <strong>정문 건너편 비빔밥/백반집:</strong>
        <br>정문 바로 맞은편에 위치한 따뜻한 분위기의 한식당입니다. 뜨겁게 달궈진 돌솥에 나오는 돌솥비빔밥은 신선한 모듬 나물과 양념 고추장이 일품입니다. 매콤짭짤한 찌개 종류를 주문하면 감자조림, 김 등 3~4가지 맛있는 무료 밑반찬이 제공되어 든든하게 먹을 수 있습니다.
        <br><br>
        🍗 <strong>양념치킨 / 닭강정 맛집:</strong>
        <br>학교 후문 근처 도보 5분 거리. 바삭바삭하고 얇은 튀김옷에 달콤 짭조름한 간장 소스나 매콤한 고추장 양념을 버무린 양념치킨이 정말 인기가 많습니다. 불금에 친구들과 배달시켜 먹거나 포장하기에 최고입니다!
        <br><br>
        🥪 <strong>학생식당 & 기숙사 앞 토스트:</strong>
        <br>바쁜 아침 1교시 수업 전, 따뜻하게 구운 계란프라이와 햄치즈 슬라이스를 넣은 토스트에 sữa chuối (바나나우유) 하나를 곁들이면 최고의 아침 식사가 됩니다!`,

        "giayto": `한국 입국 시, 공항에서 입국 심사를 받을 때 당황하지 않도록 기내 휴대 가방(백팩)에 꼭 소지하고 내리셔야 할 중요 서류 리스트입니다:
        <br><br>
        1. <strong>여권 원본</strong> 및 출력된 D-2 비자 승인증.
        <br>2. 경민대학교 공식 <strong>표준입학허가서 (Admission Letter)</strong> 원본.
        <br>3. <strong>등록금 납부 영수증</strong> 또는 장학 증명서.
        <br>4. <strong>결핵 검진 진단서</strong> 영문 원본 (기숙사 입소 신청 시 보건소 제출용으로 필수 요구됨).
        <br>5. 기내에서 제공하는 세관신고서 및 입국신고서 (한글/영문 펜으로 꼼꼼하게 기재).`,

        "kytucxa": `<strong>경민대학교 기숙사(생활관)</strong>는 안전하고 쾌적하여 많은 외국인 유학생들이 만족하며 거주하고 있습니다:
        <br><br>
        <ul>
            <li><strong>객실 구성:</strong> 기본적으로 2인 1실 또는 4인 1실 형태입니다. 개인 침대, 전용 책상, 의자, 옷장, 천장형 에어컨 및 한국식 바닥 난방(온돌)이 설치되어 겨울에도 따뜻합니다.</li>
            <li><strong>편의 시설:</strong> 공용 주방(인덕션, 전자레인지, 정수기, 공용 대형 냉장고 구비되어 자가 취사 가능), 공동 세탁실(코인 세탁기/건조기), 체력단련실, Wi-Fi 존이 갖춰져 있습니다.</li>
            <li><strong>통금 시간:</strong> 안전을 위해 밤 23:00 정각에 출입문이 통제되므로 벌점이 누적되지 않도록 야간 통금 시간을 잘 지켜야 합니다.</li>
            <li><strong>기숙사비:</strong> 월 약 200,000원 ~ 350,000원 수준으로, 학교 주변 원룸 월세에 비해 매우 저렴합니다.</li>
        </ul>
        💡 <em>주의사항: 입소 당일 덮을 얇은 이불, 베개, 개인 세면도구 및 실내용 슬리퍼는 첫날 다이소(Daiso) 등에서 개별 구매해 주셔야 합니다!</em>`,

        "lamthem": `대한민국 법무부 규정에 따른 **D-2 유학생 시간제 취업 (아르바이트)** 상세 가이드라인입니다:
        <br><br>
        1. <strong>합법적 신청 자격 요건:</strong>
        <ul>
            <li>한국 입국 후 1학기(6개월/어학연수 포함 시 다를 수 있음) 이상 경과.</li>
            <li>직전 학기 출석률이 90% 이상이어야 하며, 평균 학점 GPA 2.0 (C학점) 이상 유지 필수.</li>
            <li>일정 기준의 한국어 능력을 취득해야 합니다 (보통 TOPIK 2급 또는 3급 이상 보유 시 우대 및 필수).</li>
            <li>반드시 학교 국제교류원 담당 선생님의 사전 서명 승인을 거친 뒤, 관할 출입국관리사무소에 정식 신청하여 <strong>시간제 취업 허가</strong>를 받아야 합니다.</li>
        </ul>
        2. <strong>허용 근무 시간:</strong>
        <br>학기 중에는 <strong>주당 최대 20시간</strong> 이내(주말 제외 평일 기준), 방학(여름/겨울) 기간에는 <strong>시간 제한 없이 풀타임 아르바이트</strong>가 합법적으로 허용됩니다.
        <br><br>
        3. <strong>시급 정보:</strong>
        <br>2024년 기준 한국 법정 최저시급은 <strong>9,860원</strong>입니다. 경민대 인근 편의점, 한식당 서빙, 물류 분류, 카페 스태프 등의 일자리가 많습니다.`,

        "default": `옌니님! 경민대학교 유학 생활에 대해 도움이 필요하신가요? 아래 추천 키워드나 버튼을 클릭해 보세요. 🎓
        <br><br>
        궁금한 키워드를 입력하셔도 됩니다:
        <br>- 📌 <strong>"비자"</strong> 또는 <strong>"비자 연장"</strong>
        <br>- 🍱 <strong>"맛집"</strong> 또는 <strong>"국수"</strong>
        <br>- 🏫 <strong>"기숙사"</strong> 또는 <strong>"생활관"</strong>
        <br>- 📄 <strong>"서류"</strong> 또는 <strong>"입국 서류"</strong>
        <br>- 💼 <strong>"아르바이트"</strong> 또는 <strong>"시간제 취업"</strong>`
    };

    // Show Typing Indicator
    function showTyping() {
        chatTypingIndicator.classList.add('active');
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }

    // Hide Typing Indicator
    function hideTyping() {
        chatTypingIndicator.classList.remove('active');
    }

    // Dynamic message creation
    function appendMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);

        const avatar = sender === 'bot' ? '🦉' : '👤';

        // Generate current time
        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

        messageDiv.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-bubble-wrapper">
                <div class="message-bubble">${text}</div>
                <span class="message-time">${sender === 'bot' ? '유니버디' : '나'} • ${timeStr}</span>
            </div>
        `;

        chatMessagesContainer.appendChild(messageDiv);
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }

    // Bot Response Logic (Korean matches)
// Update chatbot knowledge when language changes
function refreshChatbotKnowledge() {
  // Reassign the knowledge object based on current language
  // This updates the global constant used by getBotReply
  // eslint-disable-next-line no-global-assign
  chatbotKnowledge = knowledgeBase[currentLang];
}

// Ensure getBotReply uses the latest knowledge
function getBotReply(userMessage) {
  const msg = userMessage.toLowerCase().trim();
  // Language‑specific knowledge lookup
  if (msg.includes('비자') || msg.includes('연장') || msg.includes('visa') || msg.includes('d-2') || msg.includes('d2')) {
    return chatbotKnowledge.visa;
  }
  if (msg.includes('맛집') || msg.includes('음식') || msg.includes('맛있는') || msg.includes('먹') || msg.includes('식사') || msg.includes('국수') || msg.includes('비빔밥') || msg.includes('doan')) {
    return chatbotKnowledge.doan;
  }
  if (msg.includes('서류') || msg.includes('입국') || msg.includes('준비') || msg.includes('제출')) {
    return chatbotKnowledge.giayto;
  }
  if (msg.includes('기숙사') || msg.includes('생활관') || msg.includes('방') || msg.includes('거주') || msg.includes('ktx')) {
    return chatbotKnowledge.kytucxa;
  }
  if (msg.includes('아르바이트') || msg.includes('알바') || msg.includes('일') || msg.includes('취업') || msg.includes('돈')) {
    return chatbotKnowledge.lamthem;
  }
  return chatbotKnowledge.default;
}

// Listen for language selector changes to refresh knowledge and UI
if (languageSelect) {
  languageSelect.addEventListener('change', () => {
    refreshChatbotKnowledge();
    // Also update static UI strings that were set initially (welcome message)
    const botMsgDiv = document.querySelector('.message.bot .message-bubble');
    if (botMsgDiv) {
      botMsgDiv.innerHTML = `${t('welcome_msg')}<br><br>${t('welcome_desc')}`;
    }
  });
}

        const msg = userMessage.toLowerCase().trim();

        // 1. Visa queries
        if (msg.includes('비자') || msg.includes('연장') || msg.includes('visa') || msg.includes('d-2') || msg.includes('d2')) {
            return chatbotKnowledge.visa;
        }

        // 2. Food queries (맛집, 식당, 국수, 밥...)
        if (msg.includes('맛집') || msg.includes('음식') || msg.includes('맛있는') || msg.includes('먹') || msg.includes('식사') || msg.includes('국수') || msg.includes('비빔밥') || msg.includes('도안') || msg.includes('doan')) {
            return chatbotKnowledge.doan;
        }

        // 3. Document queries
        if (msg.includes('서류') || msg.includes('입국') || msg.includes('준비') || msg.includes('제출')) {
            return chatbotKnowledge.giayto;
        }

        // 4. Dormitory queries
        if (msg.includes('기숙사') || msg.includes('생활관') || msg.includes('방') || msg.includes('거주') || msg.includes('ktx')) {
            return chatbotKnowledge.kytucxa;
        }

        // 5. Job queries
        if (msg.includes('아르바이트') || msg.includes('알바') || msg.includes('일') || msg.includes('취업') || msg.includes('돈')) {
            return chatbotKnowledge.lamthem;
        }

        // Default fallbacks
        return chatbotKnowledge.default;
    }

    // Trigger Message Sending
    function handleUserSend() {
        const text = chatInput.value.trim();
        if (!text) return;

        // 1. Add user message
        appendMessage('user', text);
        chatInput.value = '';

        // 2. Show chatbot typing indicator
        showTyping();

        // 3. Simulated response delay (1.2 seconds)
        setTimeout(() => {
            hideTyping();
            const reply = getBotReply(text);
            appendMessage('bot', reply);
        }, 1200);
    }

    // Event listeners for sending
    chatSendBtn.addEventListener('click', handleUserSend);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserSend();
        }
    });

    // Suggested Buttons click behavior
    suggestedPromptButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.getAttribute('data-question');
            appendMessage('user', question);

            showTyping();
            setTimeout(() => {
                hideTyping();
                const reply = getBotReply(question);
                appendMessage('bot', reply);
            }, 1000);
        });
    });

    // Clear history button
    clearChatBtn.addEventListener('click', () => {
        if (confirm("유니버디와의 모든 대화 기록을 삭제하시겠습니까?")) {
            chatMessagesContainer.innerHTML = `
                <div class="message bot">
                    <div class="message-avatar">🦉</div>
                    <div class="message-bubble-wrapper">
                        <div class="message-bubble">
                            대화 내역이 초기화되었습니다! 옌니님, 경민대학교 유학 생활에 대해 새로운 질문을 해주세요. 🌟
                        </div>
                        <span class="message-time">시스템</span>
                    </div>
                </div>
            `;
        }
    });


    // --- 3. DYNAMIC BUDGET PLANNER ---
    const countrySelect = document.getElementById('planner-country');
    const costRentInput = document.getElementById('cost-rent');
    const costFoodInput = document.getElementById('cost-food');
    const costTransportInput = document.getElementById('cost-transport');
    const costStudyInput = document.getElementById('cost-study');
    const costOtherInput = document.getElementById('cost-other');

    const totalExpenseDisplay = document.getElementById('total-expense-display');
    const exchangeDisplay = document.getElementById('currency-exchange-desc');
    const savingsAdviceBox = document.getElementById('savings-advice-box');
    const dashboardBudgetValue = document.getElementById('dashboard-budget-total');

    // UI Currency symbols and conversion configuration
    const countryConfig = {
        "Hàn Quốc": { currency: "₩", exchangeRate: 18.5, preset: { rent: 400000, food: 350000, trans: 100000, study: 150000, other: 250000 }, suffix: " 원", vndText: "1 원 ≈ 18.5 VNĐ", advice: "한국은 외식 물가가 높은 편이므로 E-Mart, Homeplus 또는 식재료 마트에서 장을 보아 직접 요리해 드시면 식비를 최고 50%까지 아낄 수 있습니다. 또한, 대중교통 이용 시 버스와 지하철 간에 30분 이내 무료 환승 혜택이 적용되니 꼭 교통카드를 등록하여 알뜰하게 이용하세요!" },
        "Nhật Bản": { currency: "¥", exchangeRate: 162.0, preset: { rent: 45000, food: 35000, trans: 8000, study: 10000, other: 20000 }, suffix: " 엔", vndText: "1 엔 ≈ 162 VNĐ", advice: "일본에서는 오후 8시 이후 슈퍼마켓(Gyoumu Super 등)에서 마감 할인 식품을 노리는 것이 식비 절약의 비결입니다. 또한 매일 이용하는 통학 구간은 전철 정기권(Commuter Pass)을 구입하여 대중교통 예산을 최대한 아끼세요." },
        "Đức": { currency: "€", exchangeRate: 27200.0, preset: { rent: 420, food: 250, trans: 40, study: 50, other: 120 }, suffix: " 유로", vndText: "1 유로 ≈ 27,200 VNĐ", advice: "독일 유학 시에는 학생 건강보험료가 의무적으로 지출됩니다. ALDI, LIDL, Penny와 같은 초저가 할인 마트에서 장을 보며 식비를 줄이세요. 많은 독일 주(State)에서는 학기당 내는 등록금에 학기 티켓(Semesterticket)이 포함되어 있어 해당 지역의 모든 대중교통을 무료로 이용할 수 있습니다!" },
        "Mỹ": { currency: "$", exchangeRate: 25400.0, preset: { rent: 850, food: 400, trans: 100, study: 120, other: 200 }, suffix: " 달러", vndText: "1 달러 ≈ 25,400 VNĐ", advice: "미국은 대도시의 방값과 팁 문화로 지출이 큽니다. 방을 공유할 룸메이트(Roommate)를 구해 월세를 절반으로 줄이세요. 전공 교재는 신품을 사기보다 Chegg 등에서 중고 교재를 구매하거나 학기 대여 서비스를 신청하여 절약하세요." },
        "Úc": { currency: "$", exchangeRate: 16800.0, preset: { rent: 900, food: 450, trans: 120, study: 150, other: 250 }, suffix: " 호주달러", vndText: "1 호주달러 ≈ 16,800 VNĐ", advice: "호주는 방값을 주로 주 단위(Weekly)로 결제합니다. 대중교통이 편리한 근외곽 지역에 쉐어하우스를 구하여 고정 지출을 낮추세요. 대형 마트인 Coles나 Woolworths보다 Aldi를 이용하는 것이 훨씬 저렴하며, 국제학생증 카드로 학생 할인 혜택을 꼼꼼히 챙기세요." }
    };

    // Update input values when country changes
    countrySelect.addEventListener('change', () => {
        const country = countrySelect.value;
        const config = countryConfig[country];

        if (config) {
            // Update currency label elements
            document.getElementById('rent-currency-label').textContent = config.currency;
            document.getElementById('food-currency-label').textContent = config.currency;
            document.getElementById('transport-currency-label').textContent = config.currency;
            document.getElementById('study-currency-label').textContent = config.currency;
            document.getElementById('other-currency-label').textContent = config.currency;

            // Load presets
            costRentInput.value = config.preset.rent;
            costFoodInput.value = config.preset.food;
            costTransportInput.value = config.preset.trans;
            costStudyInput.value = config.preset.study;
            costOtherInput.value = config.preset.other;

            calculateBudget();
        }
    });

    // Main budgeting math & visualization
    function calculateBudget() {
        const country = countrySelect.value;
        const config = countryConfig[country];
        if (!config) return;

        const rent = parseFloat(costRentInput.value) || 0;
        const food = parseFloat(costFoodInput.value) || 0;
        const trans = parseFloat(costTransportInput.value) || 0;
        const study = parseFloat(costStudyInput.value) || 0;
        const other = parseFloat(costOtherInput.value) || 0;

        const total = rent + food + trans + study + other;

        // Formats numbers with comma thousands separator
        const formattedTotal = total.toLocaleString('en-US');

        // Update Displays
        totalExpenseDisplay.textContent = `${formattedTotal} ${config.currency}`;

        // Exchange conversion to VND
        const totalVND = Math.round(total * config.exchangeRate);
        exchangeDisplay.textContent = `~ ${totalVND.toLocaleString('vi-VN')} VNĐ (환산 기준: ${config.vndText})`;

        // Update Advisor panel text
        savingsAdviceBox.innerHTML = config.advice;

        // Sync back to Dashboard page card
        if (dashboardBudgetValue) {
            dashboardBudgetValue.textContent = `${formattedTotal} ${config.currency}`;
            const labelEl = dashboardBudgetValue.nextElementSibling;
            if (labelEl) {
                labelEl.textContent = `매월 (${country} 기준)`;
            }
        }

        // Percentage distributions for CSS charts
        if (total > 0) {
            const pRent = Math.round((rent / total) * 100);
            const pFood = Math.round((food / total) * 100);
            const pTrans = Math.round((trans / total) * 100);
            const pStudy = Math.round((study / total) * 100);
            const pOther = Math.round((other / total) * 100);

            // Update percentage texts
            document.getElementById('pct-rent-text').textContent = `${pRent}%`;
            document.getElementById('pct-food-text').textContent = `${pFood}%`;
            document.getElementById('pct-transport-text').textContent = `${pTrans}%`;
            document.getElementById('pct-study-text').textContent = `${pStudy}%`;
            document.getElementById('pct-other-text').textContent = `${pOther}%`;

            // Update progress bars inline CSS widths
            document.getElementById('bar-rent').style.width = `${pRent}%`;
            document.getElementById('bar-food').style.width = `${pFood}%`;
            document.getElementById('bar-transport').style.width = `${pTrans}%`;
            document.getElementById('bar-study').style.width = `${pStudy}%`;
            document.getElementById('bar-other').style.width = `${pOther}%`;
        }
    }

    // Attach listeners on inputs to auto-update
    [costRentInput, costFoodInput, costTransportInput, costStudyInput, costOtherInput].forEach(input => {
        input.addEventListener('input', calculateBudget);
    });

    // Run initial budget calculations on startup
    calculateBudget();


    // --- 4. INTERACTIVE PACKING CHECKLIST SYSTEM ---
    const checklistCheckboxes = document.querySelectorAll('.checklist-checkbox');
    const checkedCountText = document.getElementById('checklist-count-text');
    const checklistDetailProgressBar = document.getElementById('checklist-detail-progress-bar');
    const checklistMotivationMessage = document.getElementById('checklist-motivation-message');

    const packingProgressBarDashboard = document.getElementById('packing-progress-bar');
    const packingProgressTextDashboard = document.getElementById('packing-progress-text');

    function updateChecklistProgress() {
        const totalItems = checklistCheckboxes.length;
        let checkedItems = 0;

        checklistCheckboxes.forEach(box => {
            if (box.checked) checkedItems++;
        });

        // Compute percentage
        const percent = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;

        // Update Tab progress text & bar
        if (checkedCountText) {
            checkedCountText.textContent = `${checkedItems} / ${totalItems}개 준비 완료`;
        }
        if (checklistDetailProgressBar) {
            checklistDetailProgressBar.style.width = `${percent}%`;
        }

        // Sync progress directly to the dashboard
        if (packingProgressBarDashboard) {
            packingProgressBarDashboard.style.width = `${percent}%`;
        }
        if (packingProgressTextDashboard) {
            packingProgressTextDashboard.textContent = `${percent}% 완료됨`;
        }

        // Dynamics motivation feedback (Korean)
        if (checklistMotivationMessage) {
            if (percent === 0) {
                checklistMotivationMessage.textContent = "가방에 넣을 준비물들을 꼼꼼히 확인하고 체크해 보세요! 🎒";
            } else if (percent < 50) {
                checklistMotivationMessage.textContent = "시작이 반입니다! 출국 전날 당황하지 않게 차근차근 챙겨봐요. 💪";
            } else if (percent < 90) {
                checklistMotivationMessage.textContent = "짐이 많이 쌓였네요! 경민대학교로 갈 준비가 무르익고 있습니다. ✈️";
            } else if (percent < 100) {
                checklistMotivationMessage.textContent = "거의 다 되었습니다! 사소한 품목 하나까지 꼼꼼히 점검 완료해 주세요. 🔥";
            } else {
                checklistMotivationMessage.textContent = "완벽해요! 모든 준비물 체크가 완료되었습니다. 멋진 한국 유학 생활이 기다리고 있어요! 🌸";
            }
        }
    }

    // Attach toggle listeners
    checklistCheckboxes.forEach(box => {
        box.addEventListener('change', updateChecklistProgress);
    });

    // Run initial progress calculation on load
    updateChecklistProgress();
});
