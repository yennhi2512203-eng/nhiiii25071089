/* ==========================================================================
   UNI-BUDDY SCRIPT
   Author: Trần Yến Nhi (25071089)
   ========================================================================== */

// ============================================================
// TAB NAVIGATION
// ============================================================
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active'));

    // Show selected tab
    document.getElementById('tab-' + tabName).classList.add('active');
    document.getElementById('nav-' + tabName).classList.add('active');

    // Close mobile sidebar if open
    closeMobileSidebar();
}

// ============================================================
// MOBILE SIDEBAR
// ============================================================
function openMobileSidebar() {
    document.getElementById('sidebar').classList.add('mobile-open');
    document.getElementById('sidebarOverlay').classList.add('active');
}

function closeMobileSidebar() {
    document.getElementById('sidebar').classList.remove('mobile-open');
    document.getElementById('sidebarOverlay').classList.remove('active');
}

// ============================================================
// COUNTDOWN TO SEMESTER
// ============================================================
function updateCountdown() {
    // Assume next semester starts September 1
    const now = new Date();
    const year = now.getMonth() >= 8 ? now.getFullYear() + 1 : now.getFullYear();
    const semesterStart = new Date(year, 8, 1); // September 1
    const diff = Math.ceil((semesterStart - now) / (1000 * 60 * 60 * 24));
    document.getElementById('daysLeft').textContent = diff > 0 ? diff : '🎓 개강!';
}

// ============================================================
// CHATBOT
// ============================================================
const botResponses = {
    '비자': '한국 유학 비자(D-2)를 신청하려면:\n\n1️⃣ 대학교 입학허가서 수령\n2️⃣ 한국 대사관 또는 영사관 방문\n3️⃣ 비자 신청서, 여권, 사진, 수수료 준비\n4️⃣ 재정능력 증명서류 제출\n\n처리 기간은 보통 5~10 영업일이 소요됩니다! 🛂',
    '기숙사': '기숙사 준비물 리스트:\n\n🛏️ 침구류 (학교마다 제공 여부 다름)\n🧴 욕실용품 (샴푸, 비누, 수건)\n🍳 간단한 취사도구 (대부분 공용 주방 있음)\n🔌 멀티탭 (한국 플러그 타입 확인)\n💊 상비약 (소화제, 진통제 등)\n\n입사 전 학교 기숙사 안내문을 꼭 확인하세요! 🏠',
    '수업': '한국 대학교 수업 방식:\n\n📖 강의식 수업이 기본이며, 출석이 매우 중요해요!\n💻 많은 과목이 LMS(학습관리시스템)을 사용해요\n📝 중간고사 + 기말고사 + 과제 + 출석으로 평가해요\n🗣️ 발표(프레젠테이션) 수업도 많아요\n\n소프트웨어 과는 특히 팀 프로젝트가 많으니 준비하세요! 💻',
    '아르바이트': '유학생 아르바이트 규정:\n\n✅ D-2 비자 소지자는 주 20시간 이내로 일할 수 있어요\n📋 학교 국제처에서 취업 허가 받아야 해요\n💰 최저임금 준수 (2024년 기준 시간당 9,860원)\n\n편의점, 식당, 카페, 학원 등에서 많이 일해요!\n과로는 금물, 학업이 우선이에요 📚',
    '한국어': '한국어를 빠르게 배우는 방법:\n\n📱 앱 활용: 듀오링고, 세종학당, TOPIK 앱\n📺 드라마/유튜브: 자막과 함께 한국 콘텐츠 시청\n🗣️ 언어교환: 한국 친구를 사귀어 대화 연습\n📝 기초부터: 한글 자음/모음부터 시작하세요\n🏫 대학 한국어 강좌: 많은 학교가 무료 제공해요\n\n매일 30분씩 꾸준히 하는 것이 가장 효과적이에요! 💪',
    '음식': '한국 대학가 음식 추천:\n\n🍚 학생식당(학식) - 가장 저렴! (3,000~5,000원)\n🍜 라면, 김밥 - 편의점에서 간단하게\n🥐 빵집 - 파리바게뜨, 뚜레쥬르 등\n🍗 치킨 - 한국 치킨은 정말 맛있어요!\n\n배달 앱(배민, 쿠팡이츠)도 많이 사용해요 📱',
    '교통': '한국 교통 이용 방법:\n\n🚌 버스/지하철: T-money 카드 사용 (편의점 구매 가능)\n🚇 수도권 통합요금제로 환승 무료!\n🚕 택시: 카카오택시 앱이 편리해요\n🚲 따릉이: 서울 공공자전거 앱 등록 후 이용\n\n학생증으로 교통비 할인 가능한 경우도 있어요! 🎓',
    'default': '좋은 질문이에요! 🌟 현재 저는 다음 주제에 대해 잘 알고 있어요:\n\n🛂 비자 준비 및 서류\n🏠 기숙사 생활\n📚 대학교 수업 방식\n💼 유학생 아르바이트\n🗣️ 한국어 학습\n🍜 음식 및 식비\n🚇 교통 이용\n\n위 주제 중 하나로 다시 물어봐 주시면 더 자세히 알려드릴게요! 😊'
};

function getCurrentTime() {
    return new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
}

function addMessage(content, type) {
    const messages = document.getElementById('chatMessages');
    const div = document.createElement('div');
    div.className = `message ${type}`;

    const avatar = type === 'bot' ? '🤖' : '<i class="fa-solid fa-user"></i>';
    const bubbleStyle = type === 'bot' ? '' : '';

    div.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-bubble-wrapper">
            <div class="message-bubble">${content.replace(/\n/g, '<br>')}</div>
            <span class="message-time">${getCurrentTime()}</span>
        </div>
    `;

    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}

function showTyping() {
    document.getElementById('typingIndicator').classList.add('active');
    const messages = document.getElementById('chatMessages');
    messages.scrollTop = messages.scrollHeight;
}

function hideTyping() {
    document.getElementById('typingIndicator').classList.remove('active');
}

function getBotReply(userText) {
    const lower = userText.toLowerCase();
    for (const key of Object.keys(botResponses)) {
        if (key !== 'default' && lower.includes(key)) {
            return botResponses[key];
        }
    }
    return botResponses['default'];
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    input.value = '';

    showTyping();
    setTimeout(() => {
        hideTyping();
        addMessage(getBotReply(text), 'bot');
    }, 1000 + Math.random() * 800);
}

function sendPrompt(text) {
    document.getElementById('chatInput').value = text;
    sendMessage();
    switchTab('chatbot');
}

function clearChat() {
    const messages = document.getElementById('chatMessages');
    messages.innerHTML = `
        <div class="message bot">
            <div class="message-avatar">🤖</div>
            <div class="message-bubble-wrapper">
                <div class="message-bubble">
                    대화가 초기화되었어요! 새로운 질문이 있으면 뭐든지 물어보세요 😊
                </div>
                <span class="message-time">${getCurrentTime()}</span>
            </div>
        </div>
    `;
}

// ============================================================
// BUDGET PLANNER
// ============================================================
const budgetCategories = [
    { id: 'b-rent',      label: '🏠 월세/기숙사비', barClass: 'rent-bar' },
    { id: 'b-food',      label: '🍜 식비',           barClass: 'food-bar' },
    { id: 'b-transport', label: '🚌 교통비',          barClass: 'transport-bar' },
    { id: 'b-study',     label: '📚 학습 자료',       barClass: 'study-bar' },
    { id: 'b-other',     label: '🛍️ 기타 생활비',    barClass: 'other-bar' },
];

function formatKRW(num) {
    return '₩ ' + num.toLocaleString('ko-KR');
}

function calculateBudget() {
    let total = 0;
    const values = {};
    budgetCategories.forEach(cat => {
        const val = parseInt(document.getElementById(cat.id)?.value) || 0;
        values[cat.id] = val;
        total += val;
    });

    // Update total
    document.getElementById('totalBudget').textContent = formatKRW(total);
    document.getElementById('vndAmount').textContent = `≈ ${(total * 18.5).toLocaleString('vi-VN')} VND`;

    // Update dashboard
    document.getElementById('dashBudget').textContent = formatKRW(total);

    // Render chart
    const chart = document.getElementById('budgetChart');
    chart.innerHTML = '';
    budgetCategories.forEach(cat => {
        const val = values[cat.id];
        const pct = total > 0 ? Math.round((val / total) * 100) : 0;
        chart.innerHTML += `
            <div class="chart-progress-item">
                <div class="chart-item-label">
                    <strong>${cat.label}</strong>
                    <span>${formatKRW(val)} (${pct}%)</span>
                </div>
                <div class="progress-bar-wrapper">
                    <div class="progress-bar ${cat.barClass}" style="width:${pct}%"></div>
                </div>
            </div>
        `;
    });

    // Smart advice
    const rentPct = total > 0 ? (values['b-rent'] / total) * 100 : 0;
    const foodPct = total > 0 ? (values['b-food'] / total) * 100 : 0;
    let advice = '학생 식당(학식)을 이용하면 식비를 절약할 수 있어요. 대부분 3,000~5,000원으로 한 끼를 해결할 수 있습니다. 교통카드(T-money)를 충전해서 버스와 지하철을 이용하면 더욱 저렴해요! 🚇';
    if (rentPct > 50) advice = '월세 비중이 높네요! 학교 기숙사 신청을 고려해보세요. 기숙사는 보통 월세보다 30~40% 저렴해요. 🏠';
    else if (foodPct > 40) advice = '식비가 다소 높아요. 학식(학생식당)과 마트에서의 직접 요리를 병행하면 절약할 수 있어요! 편의점 할인 이벤트도 잘 활용해보세요 🍱';
    else if (total < 500000) advice = '예산이 매우 타이트해요 😅 비상금으로 최소 10~20만 원은 여유롭게 준비해두는 것이 좋아요. 갑작스러운 의료비나 교통비가 발생할 수 있거든요!';

    document.getElementById('budgetAdvice').textContent = advice;
}

// ============================================================
// PACKING CHECKLIST
// ============================================================
const checklistData = [
    {
        group: '📋 서류 & 행정',
        items: ['여권 (유효기간 6개월 이상)', '학생 비자 (D-2)', '입학허가서 사본 2부', '여권 사진 6장', '외국인등록증 신청 예약', '건강보험 가입 서류', '비상 연락처 메모']
    },
    {
        group: '👗 의류 & 침구',
        items: ['사계절 옷 (한국 날씨 대비)', '두꺼운 겨울 코트', '실내 슬리퍼', '운동화 & 구두', '수건 (2~3장)', '베개 커버 & 침구 (기숙사 확인 후)']
    },
    {
        group: '💊 건강 & 위생',
        items: ['상비약 (소화제, 진통제, 감기약)', '개인 처방약 + 처방전', '마스크 (30장 이상)', '개인 위생용품 (샴푸, 칫솔 등)', '선글라스 & 자외선 차단제']
    },
    {
        group: '💻 전자기기',
        items: ['노트북 & 충전기', '멀티탭 (한국 220V 확인)', '이어폰 / 헤드폰', '스마트폰 & 보조배터리', '한국 어댑터 (필요 시)']
    },
    {
        group: '🎒 학용품 & 기타',
        items: ['필기도구 세트', '다이어리 / 플래너', '에코백 / 보조 가방', '물병 (텀블러)', '우산 (접이식 권장)', '세탁 용품 (세제, 세탁망)']
    },
    {
        group: '💰 금전 & 앱 준비',
        items: ['한국 원화 환전 (최소 50만원 현금)', 'T-money 카드 구입 예정', '카카오톡 앱 설치', '네이버 지도 앱 설치', '배달 앱 (배민/쿠팡이츠) 설치', '은행 앱 설치 예정']
    }
];

let allCheckboxes = [];

function renderChecklist() {
    const grid = document.getElementById('checklistGrid');
    grid.innerHTML = '';
    allCheckboxes = [];

    checklistData.forEach((group, gIdx) => {
        const panel = document.createElement('div');
        panel.className = 'panel-box';

        let listHTML = '';
        group.items.forEach((item, iIdx) => {
            const id = `chk-${gIdx}-${iIdx}`;
            allCheckboxes.push(id);
            const saved = localStorage.getItem(id) === 'true';
            listHTML += `
                <li class="checklist-item">
                    <label class="checkbox-label">
                        <input type="checkbox" id="${id}" ${saved ? 'checked' : ''} onchange="onCheckChange('${id}')">
                        <span class="custom-checkbox"></span>
                        <span class="checkbox-text">${item}</span>
                    </label>
                </li>
            `;
        });

        panel.innerHTML = `
            <div class="panel-header">
                <h2>${group.group}</h2>
            </div>
            <div class="panel-body">
                <ul class="checklist-group-list">${listHTML}</ul>
            </div>
        `;
        grid.appendChild(panel);
    });

    updateChecklistStats();
}

function onCheckChange(id) {
    const checked = document.getElementById(id).checked;
    localStorage.setItem(id, checked);
    updateChecklistStats();
}

function updateChecklistStats() {
    const total = allCheckboxes.length;
    const done = allCheckboxes.filter(id => document.getElementById(id)?.checked).length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;

    document.getElementById('checklistCount').textContent = `${done} / ${total} 항목 완료`;
    document.getElementById('checklistProgress').style.width = pct + '%';

    // Update dashboard pack progress
    document.getElementById('packProgress').style.width = pct + '%';
    document.getElementById('packProgressText').textContent = `${done} / ${total} 항목 완료`;

    let motivation = '✨ 체크리스트를 시작해보세요!';
    if (pct >= 100) motivation = '🎉 완벽해요! 이제 출발 준비 완료!';
    else if (pct >= 75) motivation = '💪 거의 다 됐어요! 조금만 더!';
    else if (pct >= 50) motivation = '🚀 절반 이상 완료! 잘하고 있어요!';
    else if (pct >= 25) motivation = '⭐ 좋은 시작이에요, 계속 체크해요!';
    document.getElementById('motivationText').textContent = motivation;
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    // Set initial bot message time
    const initTime = document.getElementById('botInitTime');
    if (initTime) initTime.textContent = getCurrentTime();

    updateCountdown();
    setInterval(updateCountdown, 3600000);

    calculateBudget();
    renderChecklist();
});
