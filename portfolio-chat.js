(() => {
  const siteRoot = new URL(".", document.currentScript.src);
  const chatApi = ["localhost", "127.0.0.1"].includes(location.hostname) && location.port === "8765"
    ? `http://${location.hostname === "localhost" ? "127.0.0.1" : location.hostname}:8766/api/chat`
    : null;
  const topics = [
    {
      match: /soundi|사운디|농인|햅틱|작곡/i,
      answer: "SOUNDI는 농인이 음악을 만들고 경험할 수 있도록 설계한 프로젝트예요. 예나는 블록 기반 작곡 인터페이스를 설계하고, 음악을 시각과 진동으로 경험할 수 있는 웹·햅틱 프로토타입을 제작했어요.",
      link: ["SOUNDI 프로젝트", "soundi/index.html"],
    },
    {
      match: /웹도록|졸업전시|전시 운영/,
      answer: "예나는 졸업전시 웹도록 제작과 운영을 담당했어요. 학생 프로필과 작품 자료를 취합하고 검수했으며, 전시 디자인 기획·제작과 운영에도 참여했어요.",
      link: ["졸업전시 웹도록", "https://sswudesign2026.com/"],
    },
    {
      match: /일경험|카페|브랜딩/,
      answer: "미래내일 일경험에서 8주간 카페 브랜딩 프로젝트를 수행했어요. 포스터 등 브랜드 응용물을 제작하고 디자인 시스템을 구축했으며, 해냄 주식회사의 6차 프로젝트에서 우수상을 받았어요.",
      link: ["이력서에서 경험 보기", "page/#resume-experience-title"],
    },
    {
      match: /어떤|디자이너|소개|강점|홍예나|yena/i,
      answer: "홍예나는 사용자 경험을 조사하고, 화면 설계부터 작동하는 프로토타입까지 만드는 디자이너예요. SOUNDI에서는 음악 창작을 시각과 촉각으로 경험하는 방법을 탐구했고, 졸업전시에서는 웹도록 제작과 운영을 맡았어요.",
      link: ["이력서 보기", "page/"],
    },
  ];

  const alternateAnswers = [
    "예나가 SOUNDI에서 맡은 핵심 작업은 작곡 화면 설계와 프로토타이핑이에요. 음악 블록을 배치해 곡을 만들고, 화면과 햅틱 디바이스에서 결과를 경험할 수 있도록 구현했어요.",
    "졸업전시에서 예나는 작품을 온라인에서도 찾아볼 수 있도록 웹도록을 제작하고 운영했어요. 학생별 프로필과 작품 자료를 검수하고 전시 디자인과 운영에도 참여했어요.",
    "예나는 8주간 카페 브랜딩을 진행하면서 포스터와 브랜드 디자인 시스템을 만들었어요. 이 프로젝트는 해냄 주식회사의 미래내일 일경험 6차 프로젝트에서 우수상을 받았어요.",
    "예나는 리서치에서 발견한 문제를 실제로 체험할 수 있는 형태로 만드는 디자이너예요. SOUNDI의 작곡 UI와 햅틱 프로토타입, 졸업전시 웹도록이 그 예예요.",
    "포트폴리오에서 확인할 수 있는 경험을 중심으로 안내하고 있어요. 예나가 맡은 역할이나 SOUNDI, 졸업전시 웹도록, 카페 브랜딩에 대해 질문해 주세요.",
  ];

  const chat = document.createElement("div");
  chat.className = "portfolio-chat";
  const botIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 8V4H8M2 14h2m16 0h2m-7-1v2m-6-2v2"/><rect x="4" y="8" width="16" height="12" rx="2"/></svg>';
  const icons = {
    chevron: '<path d="m6 9 6 6 6-6"/>',
    mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2m-7 9v3"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    previous: '<path d="m15 18-6-6 6-6"/>',
    next: '<path d="m9 18 6-6-6-6"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    rename: '<path d="m15 5 4 4M4 20l4-1 12-12a2.8 2.8 0 0 0-4-4L4 15z"/>',
    archive: '<rect x="3" y="4" width="18" height="4" rx="1"/><path d="M5 8v12h14V8m-9 4h4"/>',
    trash: '<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15m-9 4v7m4-7v7"/>',
    history: '<path d="M3 12a9 9 0 1 1 2.6 6.4M3 12V4m0 8h8m1-5v5l4 2"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    send: '<path d="M12 19V5m-7 7 7-7 7 7"/>',
    stop: '<rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M4 16V6a2 2 0 0 1 2-2h10"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    up: '<path d="M7 10v10H3V10zm0 0 5-7a2 2 0 0 1 2 2v4h5a2 2 0 0 1 2 2l-2 8a2 2 0 0 1-2 1H7"/>',
    down: '<path d="M7 14V4H3v10zm0 0 5 7a2 2 0 0 0 2-2v-4h5a2 2 0 0 0 2-2l-2-8a2 2 0 0 0-2-1H7"/>',
    retry: '<path d="M20 7v5h-5m5 0a8 8 0 1 0-2 6"/>',
    more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  };
  const icon = (name) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;
  chat.innerHTML = `
    <section class="portfolio-chat-panel" role="dialog" tabindex="-1" aria-labelledby="portfolio-chat-title" hidden>
      <button type="button" class="portfolio-chat-resize" aria-label="대화창 크기 조절"></button>
      <header>
        <h2 id="portfolio-chat-title">New Chat</h2>
        <div class="portfolio-chat-actions">
          <button type="button" class="portfolio-chat-threads" aria-label="Threads" aria-controls="portfolio-chat-thread-list" aria-expanded="false">${icon("history")}</button>
          <button type="button" class="portfolio-chat-archive" aria-label="보관함 열기" hidden>${icon("archive")}</button>
          <button type="button" class="portfolio-chat-new" aria-label="New Thread">${icon("plus")}</button>
          <button type="button" class="portfolio-chat-close" aria-label="Close Assistant">${icon("chevron")}</button>
        </div>
      </header>
      <div class="portfolio-chat-thread-list" id="portfolio-chat-thread-list" role="region" aria-label="Threads" hidden>
        <label class="portfolio-chat-thread-search">
          ${icon("search")}
          <input type="search" placeholder="Search threads" aria-label="Search threads" />
        </label>
        <div class="portfolio-chat-thread-rows"></div>
      </div>
      <div class="portfolio-chat-thread-menu" id="portfolio-chat-thread-menu" hidden></div>
      <div class="portfolio-chat-log" role="log" aria-label="대화" aria-live="polite">
        <p class="portfolio-chat-welcome">How can I help you today?</p>
      </div>
      <form>
        <input class="portfolio-chat-image-input" type="file" accept="image/*" multiple hidden />
        <div class="portfolio-chat-attachments" aria-label="첨부 이미지" hidden></div>
        <textarea aria-label="질문" placeholder="Send a message..." maxlength="300" rows="1"></textarea>
        <div class="portfolio-chat-composer-tools">
          <button type="button" class="portfolio-chat-attach" aria-label="이미지 첨부">${icon("plus")}</button>
          <span class="portfolio-chat-dictation-status" role="status"></span>
          <button type="button" class="portfolio-chat-mic" aria-label="음성 입력 시작" aria-pressed="false">${icon("mic")}</button>
          <button type="submit" aria-label="질문 보내기" aria-disabled="true">${icon("send")}</button>
        </div>
      </form>
      <div class="portfolio-chat-suggestions" aria-label="추천 질문">
        <button type="button"><strong>어떤 디자이너</strong><span>인가요?</span></button>
        <button type="button"><strong>SOUNDI에서</strong> <span>어떤 역할을 맡았나요?</span></button>
        <button type="button"><strong>졸업전시 웹도록은</strong> <span>어떻게 운영했나요?</span></button>
      </div>
      <span class="portfolio-chat-tooltip" role="tooltip" aria-hidden="true" hidden></span>
    </section>
    <span class="portfolio-chat-hint" aria-hidden="true" hidden>궁금한 점을 물어보세요!</span>
    <button class="portfolio-chat-toggle" type="button" aria-label="포트폴리오에 질문하기" aria-expanded="false">${botIcon}<span aria-hidden="true" class="portfolio-chat-dismiss">${icon("chevron")}</span></button>
  `;
  document.body.append(chat);

  const panel = chat.querySelector(".portfolio-chat-panel");
  panel.id = "portfolio-chat-panel";
  const toggle = chat.querySelector(".portfolio-chat-toggle");
  toggle.setAttribute("aria-controls", panel.id);
  const resize = chat.querySelector(".portfolio-chat-resize");
  const title = chat.querySelector("#portfolio-chat-title");
  const threadsButton = chat.querySelector(".portfolio-chat-threads");
  const archiveButton = chat.querySelector(".portfolio-chat-archive");
  let archiveView = false;
  let archivedPreview;
  const newThreadButton = chat.querySelector(".portfolio-chat-new");
  const close = chat.querySelector(".portfolio-chat-close");
  const threadList = chat.querySelector(".portfolio-chat-thread-list");
  const threadSearch = threadList.querySelector("input");
  const threadRows = threadList.querySelector(".portfolio-chat-thread-rows");
  const threadMenu = panel.querySelector(".portfolio-chat-thread-menu");
  let menuTrigger;
  const log = chat.querySelector(".portfolio-chat-log");
  const suggestions = chat.querySelector(".portfolio-chat-suggestions");
  const form = chat.querySelector("form");
  const input = form.querySelector("textarea");
  const send = form.querySelector('[type="submit"]');
  const fileInput = form.querySelector('[type="file"]');
  const attachButton = form.querySelector(".portfolio-chat-attach");
  const micButton = form.querySelector(".portfolio-chat-mic");
  const attachments = form.querySelector(".portfolio-chat-attachments");
  const composerStatus = form.querySelector(".portfolio-chat-dictation-status");
  const threadImages = new WeakMap();
  let pendingImages = [];
  let recognition;
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const tooltip = panel.querySelector(".portfolio-chat-tooltip");
  const hint = chat.querySelector(".portfolio-chat-hint");
  const storageKey = `portfolio-chat:${siteRoot.pathname}`;
  let saved = {};
  try {
    saved = JSON.parse(sessionStorage.getItem(storageKey)) || {};
  } catch {
    // The chat still works when session storage is unavailable.
  }
  let history = Array.isArray(saved.questions)
    ? saved.questions.filter((question) => typeof question === "string").slice(-30)
    : [];
  const validThread = (thread) => Array.isArray(thread) && thread.length && thread.every((question) => typeof question === "string");
  const archived = Array.isArray(saved.archived)
    ? saved.archived.filter(validThread)
    : [];
  const metadata = new WeakMap();
  function restoreMetadata(thread, value) {
    metadata.set(thread, {
      title: typeof value?.title === "string" ? value.title : "",
      archived: value?.archived === true,
      versions: Array.isArray(value?.versions) ? value.versions : [],
      created: Number.isFinite(value?.created) ? value.created : Date.now(),
    });
  }
  restoreMetadata(history, saved.currentThread);
  archived.forEach((thread, index) => restoreMetadata(thread, saved.threadMetadata?.[index]));
  const threadTitle = (thread) => metadata.get(thread)?.title || thread[0] || "New Chat";
  let slot = Number.isInteger(saved.slot) && saved.slot >= 0 && saved.slot < 6 ? saved.slot : 5;
  let showIntro = !saved.seen;
  let hovering = false;
  let drag;
  let finishReply;
  let size = Array.isArray(saved.size) && saved.size.length === 2 && saved.size.every(Number.isFinite) ? saved.size : [400, 500];
  let resizing;

  function save() {
    try {
      sessionStorage.setItem(storageKey, JSON.stringify({
        slot, questions: history, archived, size, seen: true,
        currentThread: metadata.get(history),
        threadMetadata: archived.map((thread) => metadata.get(thread)),
      }));
    } catch {
      // Session persistence is optional.
    }
  }

  function updateHint() {
    hint.hidden = Boolean(drag?.active) || (panel.hidden ? !(showIntro || hovering) : !hovering);
    hint.textContent = panel.hidden
      ? (hovering ? "반가워요! 👋" : "궁금한 점을 물어보세요!")
      : "대화창 닫기";
  }

  function anchors() {
    const { offsetWidth: width, offsetHeight: height } = toggle;
    const right = Math.max(16, window.innerWidth - width - 16);
    const bottom = Math.max(16, window.innerHeight - height - 16);
    return [16, right].flatMap((x) => [16, (16 + bottom) / 2, bottom].map((y) => ({ x, y })));
  }

  function moveTo({ x, y }) {
    chat.style.setProperty("--chat-x", `${x}px`);
    chat.style.setProperty("--chat-y", `${y}px`);
  }

  function resizePanel(width, height) {
    size = [Math.max(300, width), Math.max(300, height)];
    panel.style.setProperty("--chat-width", `${size[0]}px`);
    panel.style.setProperty("--chat-height", `${size[1]}px`);
  }

  resizePanel(...size);
  resize.addEventListener("pointerdown", (event) => {
    if (!event.isPrimary || event.button !== 0) return;
    const rect = panel.getBoundingClientRect();
    resizing = { x: event.clientX, y: event.clientY, width: rect.width, height: rect.height };
    resize.setPointerCapture(event.pointerId);
  });
  resize.addEventListener("pointermove", (event) => {
    if (!resizing) return;
    const side = slot < 3 ? 1 : -1;
    const vertical = slot % 3 === 0 ? 1 : -1;
    resizePanel(
      Math.min(window.innerWidth - 32, resizing.width + side * (event.clientX - resizing.x)),
      Math.min(window.innerHeight - 88, resizing.height + vertical * (event.clientY - resizing.y)),
    );
  });
  resize.addEventListener("lostpointercapture", () => {
    resizing = undefined;
    save();
  });
  resize.addEventListener("dblclick", () => { resizePanel(400, 500); save(); });
  resize.addEventListener("keydown", (event) => {
    const delta = { ArrowLeft: [-16, 0], ArrowRight: [16, 0], ArrowUp: [0, -16], ArrowDown: [0, 16] }[event.key];
    if (!delta) return;
    event.preventDefault();
    const rect = panel.getBoundingClientRect();
    resizePanel(rect.width + delta[0] * (slot < 3 ? 1 : -1), rect.height + delta[1] * (slot % 3 === 0 ? 1 : -1));
    save();
  });

  function dock() {
    chat.dataset.side = slot < 3 ? "left" : "right";
    chat.dataset.vertical = ["top", "middle", "bottom"][slot % 3];
    moveTo(anchors()[slot]);
  }

  function setOpen(open) {
    panel.hidden = !open;
    hovering = false;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "대화창 닫기" : "포트폴리오에 질문하기");
    if (open) {
      showIntro = false;
      log.scrollTop = log.scrollHeight;
    } else {
      showThreadList(false);
      recognition?.stop();
    }
    updateHint();
    (open ? panel : toggle).focus();
  }

  function updateComposer() {
    send.setAttribute("aria-disabled", String(!finishReply && !input.value.trim() && !pendingImages.length));
    send.setAttribute("aria-label", finishReply ? "답변 중지" : "질문 보내기");
    send.innerHTML = icon(finishReply ? "stop" : "send");
  }

  function imagePreview(image) {
    const preview = document.createElement("img");
    preview.src = image.url;
    preview.alt = image.name;
    return preview;
  }

  function renderAttachments() {
    attachments.replaceChildren();
    attachments.hidden = !pendingImages.length;
    for (const image of pendingImages) {
      const item = document.createElement("div");
      item.className = "portfolio-chat-attachment";
      item.append(imagePreview(image), actionButton("close", `${image.name} 제거`, () => {
        pendingImages = pendingImages.filter((entry) => entry !== image);
        URL.revokeObjectURL(image.url);
        renderAttachments();
        attachButton.focus();
      }));
      attachments.append(item);
    }
    updateComposer();
  }

  function clearComposer() {
    if (recognition) {
      recognition.onresult = null;
      recognition.stop();
    }
    input.value = "";
    for (const image of pendingImages) URL.revokeObjectURL(image.url);
    pendingImages = [];
    composerStatus.textContent = "";
    renderAttachments();
  }

  attachButton.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", () => {
    const files = [...fileInput.files];
    fileInput.value = "";
    composerStatus.textContent = "";
    for (const file of files) {
      if (pendingImages.length >= 4) {
        composerStatus.textContent = "이미지는 최대 4장까지 첨부할 수 있어요.";
        break;
      }
      if (!file.type.startsWith("image/") || file.size > 10 * 1024 * 1024) {
        composerStatus.textContent = "10MB 이하의 이미지를 선택해 주세요.";
        continue;
      }
      const image = { name: file.name, url: URL.createObjectURL(file) };
      pendingImages.push(image);
    }
    renderAttachments();
  });

  micButton.addEventListener("click", () => {
    if (recognition) {
      recognition.stop();
      return;
    }
    if (!SpeechRecognition) {
      composerStatus.textContent = "입력창에서 기기의 받아쓰기를 사용할 수 있어요.";
      input.focus();
      return;
    }

    const speech = new SpeechRecognition();
    const draft = input.value;
    speech.lang = "ko-KR";
    speech.interimResults = true;
    speech.continuous = false;
    recognition = speech;
    micButton.setAttribute("aria-pressed", "true");
    micButton.setAttribute("aria-label", "음성 입력 중지");
    composerStatus.textContent = "듣는 중…";

    function resetMic() {
      if (recognition !== speech) return;
      recognition = undefined;
      micButton.setAttribute("aria-pressed", "false");
      micButton.setAttribute("aria-label", "음성 입력 시작");
      if (composerStatus.textContent === "듣는 중…") composerStatus.textContent = "";
    }

    speech.onresult = (event) => {
      if (recognition !== speech) return;
      const transcript = Array.from(event.results, (result) => result[0].transcript).join(" ");
      input.value = [draft, transcript].filter(Boolean).join(" ").slice(0, input.maxLength);
      updateComposer();
    };
    speech.onerror = (event) => {
      if (recognition !== speech) return;
      const errors = {
        "not-allowed": "브라우저에서 마이크 접근을 허용해 주세요.",
        "audio-capture": "사용할 수 있는 마이크가 없어요.",
        "no-speech": "음성이 감지되지 않았어요. 다시 말해 주세요.",
        "network": "음성 인식 서비스에 연결할 수 없어요. 기기 받아쓰기를 사용할 수 있어요.",
        "service-not-allowed": "이 브라우저에서는 기기 받아쓰기를 사용해 주세요.",
        "language-not-supported": "이 브라우저에서는 한국어 기기 받아쓰기를 사용해 주세요.",
      };
      composerStatus.textContent = errors[event.error] || "음성을 인식하지 못했어요. 기기 받아쓰기를 사용할 수 있어요.";
      if (panel.contains(document.activeElement)) input.focus();
      resetMic();
    };
    speech.onend = resetMic;

    try {
      speech.start();
    } catch {
      composerStatus.textContent = "음성 입력을 시작할 수 없어요.";
      resetMic();
    }
  });

  async function copyText(button, value) {
    try {
      await navigator.clipboard.writeText(value);
      button.innerHTML = icon("check");
      button.setAttribute("aria-label", "복사됨");
      setTimeout(() => {
        button.innerHTML = icon("copy");
        button.setAttribute("aria-label", "복사");
      }, 1500);
    } catch {
      button.setAttribute("aria-label", "복사할 수 없어요");
    }
  }

  function actionButton(name, label, onClick) {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", label);
    button.innerHTML = icon(name);
    button.addEventListener("click", () => onClick(button));
    return button;
  }

  function renderExchange(question, animate = false, thread = history) {
    const exchange = document.createElement("div");
    const message = document.createElement("p");
    message.className = "portfolio-chat-question";
    message.textContent = question;
    const userActions = document.createElement("div");
    userActions.className = "portfolio-chat-message-actions portfolio-chat-user-actions";
    userActions.append(
      actionButton("copy", "복사", (button) => copyText(button, question)),
      actionButton("rename", "질문 수정", () => {
        if (message.hidden || archivedPreview) return;
        const editor = document.createElement("div");
        editor.className = "portfolio-chat-edit";
        editor.innerHTML = '<textarea aria-label="질문 수정" maxlength="300" rows="3"></textarea><div><button type="button">취소</button><button type="button">보내기</button></div>';
        const field = editor.querySelector("textarea");
        const [cancel, submit] = editor.querySelectorAll("button");
        field.value = question;
        const closeEditor = () => {
          editor.remove();
          message.hidden = false;
          userActions.hidden = false;
          userActions.lastElementChild.focus();
        };
        const applyEdit = () => {
          const revised = field.value.trim();
          if (!revised) return;
          if (revised === question) {
            closeEditor();
            return;
          }
          const index = [...log.children].indexOf(exchange) - 1;
          if (index < 0 || thread !== history) return;
          history[index] = revised;
          metadata.get(history).versions[index] = undefined;
          save();
          renderThread(history, index);
          log.children[index + 1].scrollIntoView({ block: "nearest" });
          input.focus({ preventScroll: true });
        };
        cancel.addEventListener("click", closeEditor);
        submit.addEventListener("click", applyEdit);
        field.addEventListener("keydown", (event) => {
          if (event.isComposing) return;
          if (event.key === "Escape" || (event.key === "Enter" && !event.shiftKey)) {
            event.preventDefault();
            event.stopPropagation();
            if (event.key === "Escape") closeEditor();
            else applyEdit();
          }
        });
        message.hidden = true;
        userActions.hidden = true;
        userActions.after(editor);
        field.focus();
      }),
    );
    const reply = document.createElement("div");
    reply.className = "portfolio-chat-answer";
    const body = document.createElement("p");
    const topic = topics.find(({ match }) => match.test(question));
    const originalAnswer = topic?.answer ?? (question === "이미지를 첨부했어요." ? "이미지를 첨부했어요. 이미지에 대해 궁금한 점을 텍스트로 알려주세요." : null) ?? "이 질문에 대한 답은 아직 준비되지 않았어요. SOUNDI, 졸업전시 웹도록, 카페 브랜딩 프로젝트에 대해 물어볼 수 있어요.";
    const link = topic && document.createElement("a");
    if (link) {
      link.textContent = topic.link[0];
      link.href = new URL(topic.link[1], siteRoot).href;
    }

    const actions = document.createElement("div");
    actions.className = "portfolio-chat-message-actions";
    actions.hidden = true;
    const menu = document.createElement("details");
    menu.className = "portfolio-chat-message-menu";
    menu.innerHTML = `<summary aria-label="더 보기">${icon("more")}</summary><button type="button">텍스트 다운로드</button>`;
    const answerText = () => link?.isConnected ? `${body.textContent}
${link.href}` : body.textContent;
    menu.querySelector("button").addEventListener("click", () => {
      const url = URL.createObjectURL(new Blob([answerText()], { type: "text/plain;charset=utf-8" }));
      const download = document.createElement("a");
      download.href = url;
      download.download = "portfolio-answer.txt";
      download.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      menu.open = false;
    });

    const alternate = alternateAnswers[topic ? topics.indexOf(topic) : topics.length];
    const variants = [originalAnswer, alternate];
    const getIndex = () => [...log.children].indexOf(exchange) - 1;
    const versions = metadata.get(thread)?.versions ?? [];
    let currentVersion = 0;
    let versionCount = 1;
    let answer = originalAnswer;
    let generated = [];
    const selectedAnswer = () => generated[currentVersion] || variants[currentVersion % variants.length];
    const branch = document.createElement("div");
    branch.className = "portfolio-chat-branch";
    const indicator = document.createElement("span");
    const previous = actionButton("previous", "이전 답변", () => switchVersion(currentVersion - 1));
    const next = actionButton("next", "다음 답변", () => switchVersion(currentVersion + 1));
    branch.append(previous, indicator, next);

    function updateBranch() {
      branch.hidden = versionCount < 2;
      indicator.textContent = `${currentVersion + 1}/${versionCount}`;
      previous.setAttribute("aria-disabled", String(currentVersion === 0));
      next.setAttribute("aria-disabled", String(currentVersion === versionCount - 1));
    }

    function switchVersion(index) {
      if (index < 0 || index >= versionCount) return;
      currentVersion = index;
      answer = selectedAnswer();
      up.setAttribute("aria-pressed", "false");
      down.setAttribute("aria-pressed", "false");
      versions[getIndex()] = { ...versions[getIndex()], count: versionCount, selected: index };
      save();
      reveal();
    }

    function addAction(name, label, onClick) {
      const button = actionButton(name, label, onClick);
      actions.append(button);
      return button;
    }

    actions.append(branch);
    addAction("copy", "복사", (button) => copyText(button, answerText()));
    const rate = (button) => {
      const selected = button.getAttribute("aria-pressed") === "true";
      up.setAttribute("aria-pressed", String(button === up && !selected));
      down.setAttribute("aria-pressed", String(button === down && !selected));
    };
    const up = addAction("up", "좋아요", rate);
    const down = addAction("down", "싫어요", rate);
    up.setAttribute("aria-pressed", "false");
    down.setAttribute("aria-pressed", "false");
    addAction("retry", "다시 답변하기", () => {
      finishReply?.();
      up.setAttribute("aria-pressed", "false");
      down.setAttribute("aria-pressed", "false");
      const previousAnswer = answer;
      currentVersion = versionCount++;
      variants[currentVersion] = variants[currentVersion % 2] === previousAnswer ? variants[(currentVersion + 1) % 2] : variants[currentVersion % 2];
      answer = variants[currentVersion];
      versions[getIndex()] = { count: versionCount, selected: currentVersion, variants: variants.slice(2).map((value) => value === alternate ? 1 : 0), generated };
      save();
      play(previousAnswer);
    });
    actions.append(menu);
    reply.append(body, actions);
    exchange.append(message, userActions, reply);
    log.append(exchange);
    const images = threadImages.get(thread)?.[getIndex()] ?? [];
    if (images.length) {
      const gallery = document.createElement("div");
      gallery.className = "portfolio-chat-sent-images";
      gallery.append(...images.map(imagePreview));
      message.before(gallery);
    }
    const stored = versions[getIndex()];
    if (Array.isArray(stored?.generated)) generated = stored.generated;
    if (Number.isSafeInteger(stored?.count) && stored.count > 1) {
      versionCount = stored.count;
      currentVersion = Math.min(versionCount - 1, Math.max(0, stored.selected || 0));
      for (const variant of stored.variants ?? []) variants.push(variants[variant]);
    }
    answer = selectedAnswer();

    function reveal() {
      body.textContent = answer;
      if (link) body.after(link);
      actions.hidden = false;
      updateBranch();
    }

    async function play(previous = "") {
      const request = new AbortController();
      let chunks;
      let position = 0;
      let timer;
      body.textContent = "";
      link?.remove();
      actions.hidden = true;
      menu.open = false;
      reply.classList.add("is-waiting");
      finishReply = (complete = true) => {
        request.abort();
        clearTimeout(timer);
        reply.classList.remove("is-waiting");
        if (complete) reveal();
        else {
          if (!body.textContent) body.textContent = "답변을 중지했어요.";
          actions.hidden = false;
          updateBranch();
        }
        finishReply = undefined;
        updateComposer();
      };
      updateComposer();
      const advance = () => {
        reply.classList.remove("is-waiting");
        const follow = log.scrollHeight - log.scrollTop - log.clientHeight < 48;
        const chunk = document.createElement("span");
        chunk.className = "portfolio-chat-stream-chunk";
        chunk.textContent = chunks[position++];
        body.append(chunk);
        if (position === chunks.length) timer = setTimeout(() => finishReply(), 150);
        else timer = setTimeout(advance, 42);
        if (follow) log.scrollTop = log.scrollHeight;
      };
      if (chatApi && question !== "이미지를 첨부했어요.") {
        const timeout = setTimeout(() => request.abort(), 28000);
        let apiStatus;
        let apiError;
        const operation = finishReply;
        try {
          const index = getIndex();
          const response = await fetch(chatApi, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question, context: thread.slice(Math.max(0, index - 4), index), previous }),
            signal: request.signal,
          });
          apiStatus = response.status;
          if (!response.ok) {
            apiError = await response.json().catch(() => null);
            throw new Error("Chat API unavailable");
          }
          const result = await response.json();
          if (typeof result.answer !== "string" || !result.answer.trim()) throw new Error("Empty answer");
          if (finishReply !== operation || !exchange.isConnected) return;
          answer = result.answer.trim();
          generated[currentVersion] = answer;
          versions[index] = { ...versions[index], count: versionCount, selected: currentVersion, generated };
          save();
        } catch {
          if (finishReply !== operation || !exchange.isConnected) return;
          const upstreamMessages = {
            401: "OpenAI에서 API 키를 인증하지 못했어요.",
            403: "API 키에 이 요청을 실행할 권한이 없어요.",
            429: "OpenAI 사용량 한도 또는 요청 빈도 제한에 걸렸어요.",
          };
          const upstreamReason = apiError?.error === "upstream_tls"
            ? "API 서버에서 OpenAI의 TLS 인증서를 확인하지 못했어요."
            : upstreamMessages[apiError?.upstream_status];
          const reason = upstreamReason || (apiStatus === 502
            ? "OpenAI 요청 실패. 터미널의 API 오류를 확인해 주세요."
            : apiStatus === 503
              ? "API 서버에 키가 설정되지 않았어요."
              : apiStatus
                ? `API 요청 실패 (HTTP ${apiStatus}).`
                : request.signal.aborted
                  ? "API 응답 시간이 초과됐어요."
                  : "브라우저에서 API 서버에 연결하지 못했어요.");
          answer = `${reason}\n\n기본 답변: ${answer}`;
        } finally {
          clearTimeout(timeout);
        }
        if (finishReply !== operation || !exchange.isConnected) return;
      }
      chunks = answer.match(/\S+\s*|\s+/gu) || [];
      if (chunks.length) timer = setTimeout(advance, 550);
      else finishReply();
    }

    if (animate) play();
    else reveal();
  }

  function ask(value) {
    const question = value.trim() || (pendingImages.length ? "이미지를 첨부했어요." : "");
    if (!question || finishReply) return;
    if (recognition) {
      const speech = recognition;
      speech.onresult = null;
      speech.stop();
    }

    if (!history.length) restoreMetadata(history);
    history.push(question);
    if (history.length > 30) {
      history.shift();
      metadata.get(history).versions.shift();
      threadImages.get(history)?.shift()?.forEach((image) => URL.revokeObjectURL(image.url));
      log.children[1].remove();
    }
    if (pendingImages.length) {
      const images = threadImages.get(history) ?? [];
      images[history.length - 1] = pendingImages;
      threadImages.set(history, images);
      pendingImages = [];
      renderAttachments();
    }
    composerStatus.textContent = "";
    save();
    renderExchange(question, true);
    panel.classList.remove("is-empty");
    suggestions.hidden = true;
    input.value = "";
    title.textContent = threadTitle(history);
    log.scrollTop = log.scrollHeight;
    input.focus();
  }

  function renderThread(thread = history, animatedIndex = -1) {
    finishReply?.();
    while (log.children.length > 1) log.lastElementChild.remove();
    thread.forEach((question, index) => renderExchange(question, index === animatedIndex, thread));
    panel.classList.toggle("is-empty", history.length === 0);
    title.textContent = threadList.hidden ? threadTitle(thread) : archiveView ? "보관함" : "Threads";
    suggestions.hidden = history.length > 0;
    log.scrollTop = log.scrollHeight;
    updateComposer();
  }

  function archiveCurrent() {
    if (history.length) archived.push(history);
  }

  function closeThreadMenu(restoreFocus = false) {
    if (!menuTrigger) return;
    menuTrigger.setAttribute("aria-expanded", "false");
    if (restoreFocus) menuTrigger.focus();
    menuTrigger = undefined;
    threadMenu.hidden = true;
  }

  function openThreadMenu(trigger, thread, row) {
    if (trigger === menuTrigger) {
      closeThreadMenu(true);
      return;
    }
    closeThreadMenu();
    tooltip.hidden = true;
    menuTrigger = trigger;
    trigger.setAttribute("aria-expanded", "true");
    threadMenu.replaceChildren();
    const info = metadata.get(thread);

    function updateList() {
      closeThreadMenu();
      renderThread();
      save();
      renderThreadRows();
      threadSearch.focus();
    }

    const items = [
      ["rename", "Rename", () => {
        closeThreadMenu();
        const field = document.createElement("input");
        field.className = "portfolio-chat-thread-rename";
        field.setAttribute("aria-label", "Rename thread");
        field.value = threadTitle(thread);
        field.maxLength = 120;
        row.replaceChildren(field);
        field.focus();
        field.select();
        field.addEventListener("blur", () => {
          if (field.value.trim()) info.title = field.value.trim();
          save();
          renderThreadRows();
        }, { once: true });
        field.addEventListener("keydown", (event) => {
          if (event.key !== "Enter" && event.key !== "Escape") return;
          event.preventDefault();
          event.stopPropagation();
          if (event.key === "Escape") field.value = threadTitle(thread);
          threadSearch.focus();
        });
      }],
      ["archive", info.archived ? "보관 해제" : "Archive", () => {
        info.archived = !info.archived;
        if (thread === history) {
          archiveCurrent();
          history = [];
          clearComposer();
        }
        updateList();
      }],
      ["trash", "Delete", () => {
        for (const images of threadImages.get(thread) ?? []) {
          images?.forEach((image) => URL.revokeObjectURL(image.url));
        }
        threadImages.delete(thread);
        if (thread === history) {
          history = [];
          clearComposer();
        } else {
          archived.splice(archived.indexOf(thread), 1);
        }
        updateList();
      }],
    ];
    for (const [symbol, label, action] of items) {
      const button = document.createElement("button");
      button.type = "button";
      button.innerHTML = `${icon(symbol)}<span>${label}</span>`;
      button.classList.toggle("is-danger", symbol === "trash");
      button.addEventListener("click", action);
      threadMenu.append(button);
    }
    threadMenu.hidden = false;
    const panelRect = panel.getBoundingClientRect();
    const anchor = trigger.getBoundingClientRect();
    const left = Math.max(8, anchor.left - panelRect.left - threadMenu.offsetWidth - 4);
    const top = Math.min(anchor.top - panelRect.top, panel.clientHeight - threadMenu.offsetHeight - 8);
    threadMenu.style.left = `${left}px`;
    threadMenu.style.top = `${Math.max(8, top)}px`;
    threadMenu.firstElementChild.focus();
  }

  function renderThreadRows() {
    closeThreadMenu();
    threadRows.replaceChildren();
    const query = threadSearch.value.trim().toLocaleLowerCase();
    const threads = [history, ...[...archived].reverse()]
      .filter((thread) => thread.length && metadata.get(thread).archived === archiveView && threadTitle(thread).toLocaleLowerCase().includes(query));
    const today = new Date().toDateString();
    const groups = new Map();
    for (const thread of threads) {
      const info = metadata.get(thread);
      const created = new Date(info.created);
      const group = created.toDateString() === today ? "Today" : "Earlier";
      if (!groups.has(group)) groups.set(group, []);
      groups.get(group).push(thread);
    }
    for (const label of ["Today", "Earlier"]) {
      if (!groups.has(label)) continue;
      const heading = document.createElement("h3");
      heading.textContent = label;
      threadRows.append(heading);
      for (const thread of groups.get(label)) {
        const row = document.createElement("div");
        row.className = "portfolio-chat-thread-row";
        const select = document.createElement("button");
        select.type = "button";
        select.className = "portfolio-chat-thread-select";
        select.textContent = threadTitle(thread);
        if (thread === history) select.setAttribute("aria-current", "true");
        select.addEventListener("click", () => {
          if (archiveView) {
            archivedPreview = thread;
            threadList.hidden = true;
            panel.classList.remove("is-thread-list");
            panel.classList.add("is-archived-preview");
            archiveButton.hidden = true;
            threadsButton.setAttribute("aria-expanded", "false");
            threadsButton.setAttribute("aria-label", "보관함으로 돌아가기");
            renderThread(thread);
            panel.focus();
            return;
          }
          if (thread !== history) {
            archived.splice(archived.indexOf(thread), 1);
            archiveCurrent();
            history = thread;
            clearComposer();
          }
          showThreadList(false);
          renderThread();
          save();
          input.focus();
        });
        const more = document.createElement("button");
        more.type = "button";
        more.className = "portfolio-chat-thread-more";
        more.innerHTML = icon("more");
        more.setAttribute("aria-label", "More options");
        more.setAttribute("aria-controls", threadMenu.id);
        more.setAttribute("aria-expanded", "false");
        more.addEventListener("click", () => openThreadMenu(more, thread, row));
        row.append(select, more);
        threadRows.append(row);
      }
    }
    if (!threads.length) {
      const empty = document.createElement("p");
      empty.textContent = query ? "검색 결과가 없어요." : archiveView ? "보관된 대화가 없어요." : "아직 대화가 없어요.";
      threadRows.append(empty);
    }
  }

  function showThreadList(open, showArchive = false) {
    const wasPreviewing = Boolean(archivedPreview);
    archivedPreview = undefined;
    archiveView = open && showArchive;
    panel.classList.remove("is-archived-preview");
    archiveButton.hidden = !open;
    archiveButton.setAttribute("aria-pressed", String(archiveView));
    archiveButton.setAttribute("aria-label", archiveView ? "일반 스레드 보기" : "보관함 열기");
    closeThreadMenu();
    tooltip.hidden = true;
    threadList.hidden = !open;
    panel.classList.toggle("is-thread-list", open);
    if (wasPreviewing) renderThread();
    title.textContent = open ? archiveView ? "보관함" : "Threads" : threadTitle(history);
    threadsButton.setAttribute("aria-label", open ? "대화로 돌아가기" : "Threads");
    threadsButton.setAttribute("aria-expanded", String(open));
    if (open) {
      threadSearch.value = "";
      renderThreadRows();
    }
  }

  threadSearch.addEventListener("input", renderThreadRows);
  threadList.addEventListener("scroll", () => closeThreadMenu(), { passive: true });
  document.addEventListener("pointerdown", (event) => {
    if (menuTrigger && !menuTrigger.contains(event.target) && !threadMenu.contains(event.target)) closeThreadMenu();
  });
  threadMenu.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    event.preventDefault();
    const items = [...threadMenu.children];
    const index = items.indexOf(document.activeElement);
    items[(index + (event.key === "ArrowDown" ? 1 : -1) + items.length) % items.length].focus();
  });

  const tooltipTarget = "button[aria-label], summary[aria-label]";
  function showTooltip(target) {
    const label = target.getAttribute("aria-label");
    tooltip.textContent = label;
    tooltip.hidden = false;
    const parent = panel.getBoundingClientRect();
    const anchor = target.getBoundingClientRect();
    const below = anchor.top - parent.top < tooltip.offsetHeight + 10;
    const center = anchor.left - parent.left + anchor.width / 2;
    const left = Math.max(6, Math.min(center - tooltip.offsetWidth / 2, panel.clientWidth - tooltip.offsetWidth - 6));
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${below ? anchor.bottom - parent.top + 6 : anchor.top - parent.top - tooltip.offsetHeight - 6}px`;
    tooltip.style.setProperty("--tooltip-arrow", `${center - left}px`);
    tooltip.dataset.side = below ? "bottom" : "top";
  }

  for (const type of ["pointerover", "focusin"]) {
    panel.addEventListener(type, (event) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      const target = event.target.closest(tooltipTarget);
      if (target && !target.contains(event.relatedTarget)) showTooltip(target);
    });
  }
  for (const type of ["pointerout", "focusout"]) {
    panel.addEventListener(type, (event) => {
      const target = event.target.closest(tooltipTarget);
      if (target && !target.contains(event.relatedTarget)) tooltip.hidden = true;
    });
  }
  panel.addEventListener("click", () => { tooltip.hidden = true; });
  log.addEventListener("scroll", () => { tooltip.hidden = true; }, { passive: true });

  threadsButton.addEventListener("click", () => showThreadList(threadList.hidden, Boolean(archivedPreview)));
  archiveButton.addEventListener("click", () => showThreadList(true, !archiveView));
  newThreadButton.addEventListener("click", () => {
    archiveCurrent();
    history = [];
    clearComposer();
    showThreadList(false);
    renderThread();
    save();
    input.focus();
  });
  close.addEventListener("click", () => setOpen(false));
  renderThread();
  dock();
  window.addEventListener("resize", () => { if (!drag?.active) dock(); });
  save();
  updateHint();
  if (showIntro) {
    setTimeout(() => { showIntro = false; updateHint(); }, 10000);
  }

  toggle.addEventListener("pointerenter", (event) => {
    hovering = event.pointerType === "mouse";
    updateHint();
  });
  toggle.addEventListener("pointerleave", () => { hovering = false; updateHint(); });
  toggle.addEventListener("contextmenu", (event) => { if (drag) event.preventDefault(); });

  let suppressClick = false;
  toggle.addEventListener("pointerdown", (event) => {
    if (!event.isPrimary || event.button !== 0) return;
    suppressClick = false;
    const rect = toggle.getBoundingClientRect();
    drag = {
      id: event.pointerId,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
      readyAt: performance.now() + 300,
      active: false,
    };
    toggle.setPointerCapture(event.pointerId);
  });
  toggle.addEventListener("pointermove", (event) => {
    if (!drag || drag.id !== event.pointerId || performance.now() < drag.readyAt) return;
    if (!drag.active) {
      const rect = toggle.getBoundingClientRect();
      if (Math.hypot(event.clientX - rect.left - drag.offsetX, event.clientY - rect.top - drag.offsetY) < 5) return;
      drag.active = true;
      chat.classList.add("is-dragging");
      if (!panel.hidden) setOpen(false);
      updateHint();
    }
    const [, , , , , end] = anchors();
    moveTo({
      x: Math.min(end.x, Math.max(16, event.clientX - drag.offsetX)),
      y: Math.min(end.y, Math.max(16, event.clientY - drag.offsetY)),
    });
  });
  function finishDrag(event) {
    if (!drag || drag.id !== event.pointerId) return;
    if (drag.active && event.type === "pointerup") {
      const rect = toggle.getBoundingClientRect();
      const points = anchors();
      const distances = points.map(({ x, y }) => Math.hypot(rect.left - x, rect.top - y));
      slot = distances.indexOf(Math.min(...distances));
      save();
    }
    suppressClick = drag.active;
    if (drag.active) {
      showIntro = false;
      hovering = false;
    }
    drag = undefined;
    chat.classList.remove("is-dragging");
    dock();
    updateHint();
  }
  toggle.addEventListener("pointerup", finishDrag);
  toggle.addEventListener("pointercancel", finishDrag);
  toggle.addEventListener("lostpointercapture", finishDrag);
  toggle.addEventListener("click", (event) => {
    if (suppressClick && event.detail) {
      suppressClick = false;
      return;
    }
    setOpen(panel.hidden);
  });
  chat.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || panel.hidden) return;
    if (menuTrigger) closeThreadMenu(true);
    else if (archivedPreview) showThreadList(true, true);
    else if (archiveView) showThreadList(true);
    else if (threadList.hidden) setOpen(false);
    else {
      showThreadList(false);
      threadsButton.focus();
    }
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (finishReply) finishReply(false);
    else ask(input.value);
  });
  input.addEventListener("input", updateComposer);
  input.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" || event.shiftKey || event.isComposing) return;
    event.preventDefault();
    if (!finishReply) ask(input.value);
  });
  for (const button of suggestions.querySelectorAll("button")) {
    button.addEventListener("click", () => ask(button.textContent));
  }
})();
