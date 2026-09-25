/* ============================================================
   MEMOu Deluxe Template — Midnight Kitty Birthday
   USER CUSTOMIZATION CONFIG
   ============================================================ */
const DELUXE_CONFIG = {
  "girlfriendName": "Sarah",
  "nickname": "Sipaling Cantik",
  "boyfriendName": "Your Favorite Human",
  "birthdayDate": "24 September 2026",
  "heroSubtitle": "Satu hari khusus buat manusia favoritku — ditemani seekor kucing hitam yang terlalu cool untuk mengaku kalau dia ikut senang.",
  "ticker": "BREAKING: hari ini si paling spesial naik level • birthday mode activated • black cat approves this relationship • semoga harimu manis banget •",
  "loveLetter": [
    "Selamat ulang tahun untuk orang yang bisa bikin hari biasa terasa punya cerita.",
    "Aku harap di umur yang baru ini kamu lebih sering ketemu hal-hal yang bikin hati kamu ringan: tawa yang tulus, orang-orang yang hangat, mimpi yang pelan-pelan jadi nyata, dan banyak alasan untuk bangga sama diri sendiri.",
    "Terima kasih sudah jadi kamu — dengan semua tingkah lucu, random, manis, dan sedikit ngeselinnya. Semoga website kecil ini bisa jadi satu dari banyak hal yang bikin kamu senyum hari ini."
  ],
  "finalMessage": "Semoga tahun ini lebih lembut, seru, dan penuh hal baik buat kamu. Aku harap satu-satu wish kamu menemukan jalannya.",
  "music": {
    "src": "",
    "volume": 0.3
  },
  "castDialogues": {
    "midnight": {
      "name": "Midnight",
      "role": "Chief Birthday Inspector",
      "quote": "Aku sudah cek semuanya. Kesimpulannya: kamu terlalu spesial buat ulang tahun yang biasa.",
      "sound": "meow"
    },
    "mochi": {
      "name": "Mochi",
      "role": "Soft Department",
      "quote": "Semoga tahun ini hidup kamu selembut bantal paling empuk dan sehangat pelukan favorit.",
      "sound": "bloop"
    },
    "nova": {
      "name": "Nova",
      "role": "Star Collector",
      "quote": "Kalau satu bintang mewakili satu doa baik buat kamu, langit malam ini bakal penuh banget.",
      "sound": "sparkle"
    },
    "pepper": {
      "name": "Pepper",
      "role": "Chaos Manager",
      "quote": "Aturan ulang tahun nomor satu: dessert dulu. Masalah hidup belakangan.",
      "sound": "pop"
    },
    "luna": {
      "name": "Luna",
      "role": "Wish Keeper",
      "quote": "Simpan satu wish paling rahasia. Aku janji nggak ngintip… mungkin.",
      "sound": "chime"
    },
    "pixel": {
      "name": "Pixel",
      "role": "Memory Archivist",
      "quote": "Foto boleh blur, tapi alasan kenapa momen itu berharga biasanya tetap tajam.",
      "sound": "click"
    },
    "kiri": {
      "name": "Kiri",
      "role": "Professional Napper",
      "quote": "Semoga kamu punya cukup waktu buat ngejar mimpi dan cukup waktu juga buat rebahan tanpa rasa bersalah.",
      "sound": "purr"
    },
    "mimi": {
      "name": "Mimi",
      "role": "Pink Energy Specialist",
      "quote": "Hari ini kamu wajib bersinar. Besok juga boleh. Sebenarnya tiap hari juga boleh.",
      "sound": "bubble"
    },
    "noir": {
      "name": "Noir",
      "role": "Final Approval",
      "quote": "Aku jarang bilang ini, tapi… happy birthday. Kamu resmi dapat stempel: loved a lot.",
      "sound": "stamp"
    }
  },
  "memories": [
    "The beginning of a thousand little stories.",
    "A day I would replay without skipping.",
    "You looked happy here. I love that.",
    "Tiny moment, permanent memory.",
    "One of my favorite versions of us.",
    "Proof we can make ordinary days cute.",
    "A frame worth keeping forever.",
    "That smile deserves its own museum.",
    "A little chaos, a lot of love.",
    "Still one of my comfort memories.",
    "If happiness had a screenshot.",
    "This one feels like home.",
    "Core memory unlocked.",
    "More of this, please."
  ]
};

/* ============================================================
   GLOBAL STATE
   ============================================================ */
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const state = {
  soundOn: true,
  audioCtx: null,
  bgAudio: null,
  gameTimer: null,
  gameSpawner: null,
  gameScore: 0,
  gameTime: 20,
  gameActive: false,
  currentDialogue: 0
};

const dialogueEntries = Object.entries(DELUXE_CONFIG.castDialogues);


/* ============================================================
   VECTOR KITTY SYSTEM
   Cats are real DOM/SVG elements — not raster images.
   They stay sharp on every screen and can react to cursor/touch.
   ============================================================ */
const KITTY_POSES = [
  "sitting-heart","waving","loaf","peek-up","sleeping",
  "party","peek-side","sitting","hug","curious"
];

function catFace({sleeping=false, happy=false} = {}) {
  const eyes = sleeping
    ? `
      <path class="cat-eye-line" d="M97 105 Q116 116 132 104" />
      <path class="cat-eye-line" d="M168 104 Q184 116 203 105" />`
    : `
      <path class="cat-eye-white" d="M82 94 Q111 83 137 95 Q132 124 109 128 Q88 126 82 94Z"/>
      <path class="cat-eye-white" d="M163 95 Q189 83 218 94 Q212 126 191 128 Q168 124 163 95Z"/>
      <ellipse class="cat-pupil left-pupil" cx="115" cy="105" rx="7" ry="16"/>
      <ellipse class="cat-pupil right-pupil" cx="187" cy="105" rx="7" ry="16"/>`;

  const mouth = happy
    ? `
      <path class="cat-mouth-pink" d="M121 145 Q150 177 179 145 Q177 190 150 194 Q123 190 121 145Z"/>
      <path class="cat-fang" d="M159 151 L169 151 L164 171Z"/>`
    : `
      <path class="cat-mouth-pink" d="M120 146 Q150 177 180 146 Q177 188 150 192 Q123 188 120 146Z"/>
      <path class="cat-fang" d="M158 151 L169 151 L164 172Z"/>`;

  return `
    <path class="cat-head" d="M69 78 L58 18 L110 53 Q150 38 190 53 L242 18 L231 79 Q250 102 247 137 Q243 185 202 203 Q179 214 150 214 Q121 214 98 203 Q57 185 53 137 Q50 102 69 78Z"/>
    <path class="cat-inner-ear" d="M72 65 L66 33 L99 57Z"/>
    <path class="cat-inner-ear" d="M228 65 L234 33 L201 57Z"/>
    ${eyes}
    <path class="cat-nose" d="M140 132 Q150 124 160 132 Q157 142 150 145 Q143 142 140 132Z"/>
    ${mouth}
    <g class="cat-whiskers">
      <path d="M91 141 L27 128"/><path d="M91 150 L22 150"/><path d="M92 159 L31 177"/>
      <path d="M209 141 L273 128"/><path d="M209 150 L278 150"/><path d="M208 159 L269 177"/>
    </g>`;
}

function catSVG(pose="sitting") {
  let body = "";
  let faceOptions = {};

  switch (pose) {
    case "peek":
      body = `<path class="cat-paw" d="M84 208 Q66 220 70 242 H119 Q120 218 105 205Z"/>
              <path class="cat-paw" d="M216 208 Q234 220 230 242 H181 Q180 218 195 205Z"/>
              <path class="cat-surface" d="M20 228 Q150 214 280 228 L280 260 L20 260Z"/>`;
      break;
    case "sitting-heart":
      body = `<path class="cat-body" d="M101 194 Q78 216 82 253 H218 Q222 216 199 194 Q177 178 150 181 Q123 178 101 194Z"/>
              <path class="cat-tail" d="M204 222 Q266 197 264 239 Q263 258 237 254"/>
              <path class="cat-paw" d="M104 217 Q120 205 139 220 L132 249 H98Z"/>
              <path class="cat-paw" d="M196 217 Q180 205 161 220 L168 249 H202Z"/>
              <path class="cat-heart" d="M150 248 C126 226 105 211 105 194 C105 176 128 170 150 193 C172 170 195 176 195 194 C195 211 174 226 150 248Z"/>`;
      break;
    case "waving":
      body = `<path class="cat-body" d="M101 191 Q78 214 84 256 H215 Q221 215 199 191 Q177 177 150 180 Q124 177 101 191Z"/>
              <path class="cat-tail" d="M207 225 Q265 188 271 222 Q277 252 239 254"/>
              <path class="cat-paw wave-paw" d="M193 207 Q219 171 222 135 Q224 119 237 123 Q249 127 245 146 Q240 183 220 219Z"/>
              <path class="cat-paw" d="M104 217 Q119 205 138 220 L130 252 H97Z"/>`;
      break;
    case "loaf":
      body = `<ellipse class="cat-body" cx="150" cy="221" rx="104" ry="38"/>
              <path class="cat-paw" d="M89 218 Q112 203 142 218 Q117 239 88 234Z"/>
              <path class="cat-paw" d="M211 218 Q188 203 158 218 Q183 239 212 234Z"/>
              <path class="cat-tail" d="M229 215 Q279 204 268 236 Q262 250 231 242"/>`;
      break;
    case "peek-up":
      body = `<path class="cat-paw" d="M85 203 Q63 211 67 238 H117 L120 205Z"/>
              <path class="cat-paw" d="M215 203 Q237 211 233 238 H183 L180 205Z"/>
              <rect class="cat-surface" x="24" y="226" width="252" height="34" rx="17"/>`;
      break;
    case "sleeping":
      faceOptions.sleeping = true;
      body = `<ellipse class="cat-body" cx="152" cy="219" rx="108" ry="39"/>
              <path class="cat-tail" d="M233 213 Q281 195 270 230 Q263 251 223 244"/>
              <path class="cat-paw" d="M86 219 Q116 202 149 221 Q118 240 83 235Z"/>
              <path class="cat-heart mini-heart" d="M221 185 C211 175 201 180 201 190 C201 199 211 207 221 216 C231 207 241 199 241 190 C241 180 231 175 221 185Z"/>`;
      break;
    case "peek-side":
      body = `<path class="cat-body" d="M154 194 Q193 182 233 202 Q256 214 276 249 H140 Q132 215 154 194Z"/>
              <path class="cat-paw" d="M181 220 Q200 206 220 222 L217 255 H176Z"/>
              <path class="cat-tail" d="M244 222 Q284 184 292 210 Q299 234 269 246"/>`;
      break;
    case "party":
      body = `<path class="cat-body" d="M100 193 Q76 216 82 255 H218 Q224 216 200 193 Q177 178 150 181 Q123 178 100 193Z"/>
              <path class="cat-tail" d="M208 225 Q270 194 268 234 Q265 258 234 253"/>
              <path class="cat-paw" d="M103 218 Q119 205 139 220 L132 253 H98Z"/>
              <path class="cat-paw" d="M197 218 Q181 205 161 220 L168 253 H202Z"/>
              <path class="party-hat" d="M151 42 L181 -8 L206 48Z"/>
              <circle class="party-pom" cx="181" cy="-8" r="10"/>`;
      break;
    case "hug":
      body = `<path class="cat-body" d="M100 193 Q75 216 83 255 H217 Q225 216 200 193 Q175 178 150 181 Q125 178 100 193Z"/>
              <path class="cat-tail" d="M208 225 Q270 194 268 234 Q265 258 234 253"/>
              <path class="cat-heart" d="M150 246 C123 222 105 208 105 190 C105 174 126 168 150 192 C174 168 195 174 195 190 C195 208 177 222 150 246Z"/>
              <path class="cat-paw hug-left" d="M101 210 Q119 195 145 213 L137 234 Q115 230 98 221Z"/>
              <path class="cat-paw hug-right" d="M199 210 Q181 195 155 213 L163 234 Q185 230 202 221Z"/>`;
      break;
    case "curious":
      body = `<path class="cat-body" d="M101 193 Q75 217 84 256 H216 Q225 217 199 193 Q176 178 150 181 Q124 178 101 193Z"/>
              <path class="cat-tail" d="M208 225 Q261 176 278 205 Q288 224 260 241"/>
              <path class="cat-paw" d="M98 217 Q119 202 141 220 L131 253 H94Z"/>
              <path class="cat-paw raised-paw" d="M200 215 Q222 192 237 172 Q244 163 252 171 Q260 180 248 190 Q232 208 216 229Z"/>`;
      break;
    default:
      body = `<path class="cat-body" d="M100 193 Q75 216 83 255 H217 Q225 216 200 193 Q176 178 150 181 Q124 178 100 193Z"/>
              <path class="cat-tail" d="M208 225 Q270 194 268 234 Q265 258 234 253"/>
              <path class="cat-paw" d="M103 218 Q119 205 139 220 L132 253 H98Z"/>
              <path class="cat-paw" d="M197 218 Q181 205 161 220 L168 253 H202Z"/>`;
  }

  return `
    <svg class="cat-svg pose-${pose}" viewBox="0 -16 300 280" role="img" aria-hidden="true">
      <g class="cat-body-group">${body}</g>
      <g class="cat-head-group">${catFace(faceOptions)}</g>
    </svg>`;
}

function renderCatElements(root = document) {
  $$(".cat-art", root).forEach((el, index) => {
    const pose = el.dataset.catPose || KITTY_POSES[index % KITTY_POSES.length];
    el.innerHTML = catSVG(pose);
  });
}

function initCatInteractions() {
  document.addEventListener("pointermove", (event) => {
    const cat = event.target.closest?.(".interactive-cat");
    if (!cat) return;
    const r = cat.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, (event.clientX - (r.left + r.width/2)) / (r.width/2)));
    const y = Math.max(-1, Math.min(1, (event.clientY - (r.top + r.height/2)) / (r.height/2)));
    cat.style.setProperty("--eye-x", `${x * 3.5}px`);
    cat.style.setProperty("--eye-y", `${y * 2.5}px`);
  }, {passive:true});

  document.addEventListener("pointerleave", (event) => {
    const cat = event.target.closest?.(".interactive-cat");
    if (!cat) return;
    cat.style.setProperty("--eye-x", "0px");
    cat.style.setProperty("--eye-y", "0px");
  }, true);

  document.addEventListener("pointerdown", (event) => {
    const cat = event.target.closest?.(".interactive-cat");
    if (!cat) return;
    cat.classList.remove("is-booped");
    void cat.offsetWidth;
    cat.classList.add("is-booped");
    playSynth("meow");
    setTimeout(() => cat.classList.remove("is-booped"), 420);
  });
}


/* ============================================================
   CONFIG BINDING
   ============================================================ */
function bindConfig() {
  $("#heroGirlName").textContent = DELUXE_CONFIG.girlfriendName;
  $("#heroSubtitle").textContent = DELUXE_CONFIG.heroSubtitle;
  $("#tickerText").textContent = DELUXE_CONFIG.ticker;
  $("#letterNickname").textContent = DELUXE_CONFIG.nickname;
  $("#letterSignoffName").textContent = DELUXE_CONFIG.boyfriendName;
  $("#letterDate").textContent = DELUXE_CONFIG.birthdayDate;
  $("#cakeName").textContent = `${DELUXE_CONFIG.nickname.toUpperCase()} ♡`;
  $("#finalHeadline").textContent = `Happy Birthday, ${DELUXE_CONFIG.nickname}!`;
  $("#finalMessage").textContent = DELUXE_CONFIG.finalMessage;
  $("#footerNames").textContent = `${DELUXE_CONFIG.boyfriendName} → ${DELUXE_CONFIG.girlfriendName} ♡`;

  const loveLetter = $("#loveLetter");
  loveLetter.innerHTML = "";
  DELUXE_CONFIG.loveLetter.forEach(paragraph => {
    const p = document.createElement("p");
    p.textContent = paragraph;
    loveLetter.appendChild(p);
  });

  $$(".ticker-content").forEach(el => el.textContent = DELUXE_CONFIG.ticker);
}

/* ============================================================
   CINEMATIC INTRO
   ============================================================ */
function startVerification() {
  const fill = $("#verifyFill");
  const percent = $("#verifyPercent");
  const copy = $("#verifyText");
  const button = $("#enterSiteBtn");
  const buttonText = $("#enterBtnText");

  let p = 0;
  const lines = [
    [18, "♡ scanning heart signature"],
    [42, "✦ checking birthday sparkle"],
    [68, "ฅ asking the cat for permission"],
    [88, "♡ loading favorite memories"],
    [100, "✓ verified: favorite person found"]
  ];

  const timer = setInterval(() => {
    p += 2;
    percent.textContent = `${p}%`;
    fill.style.width = `${p}%`;

    const line = [...lines].reverse().find(([limit]) => p >= limit);
    if (line) copy.textContent = line[1];

    if (p >= 100) {
      clearInterval(timer);
      button.disabled = false;
      buttonText.textContent = "OPEN MY SURPRISE";
      playSynth("sparkle");
    }
  }, 34);
}

function enterExperience() {
  unlockAudio();
  playSynth("chime");
  startBackgroundAudio();

  const modal = $("#entranceModal");
  modal.classList.add("is-gone");
  $("#mainApp").classList.remove("is-locked");
  document.body.classList.remove("no-scroll");
  burstConfetti(70, 0.9);

  setTimeout(() => modal.remove(), 900);
}

/* ============================================================
   AUDIO — WEB AUDIO SYNTH + OPTIONAL MUSIC
   ============================================================ */
function unlockAudio() {
  if (!state.audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) state.audioCtx = new AudioContext();
  }
  if (state.audioCtx?.state === "suspended") state.audioCtx.resume();
}

function tone(freq = 440, duration = 0.09, type = "sine", gain = 0.05, delay = 0) {
  if (!state.soundOn) return;
  unlockAudio();
  if (!state.audioCtx) return;

  const ctx = state.audioCtx;
  const osc = ctx.createOscillator();
  const amp = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  amp.gain.setValueAtTime(0.0001, ctx.currentTime + delay);
  amp.gain.exponentialRampToValueAtTime(gain, ctx.currentTime + delay + 0.012);
  amp.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + duration);
  osc.connect(amp).connect(ctx.destination);
  osc.start(ctx.currentTime + delay);
  osc.stop(ctx.currentTime + delay + duration + 0.03);
}

function playSynth(name) {
  const s = {
    meow: () => { tone(540,.08,"triangle",.04); tone(410,.18,"sine",.03,.07); },
    bloop: () => { tone(320,.09,"sine",.05); tone(500,.08,"sine",.04,.06); },
    sparkle: () => { tone(880,.08,"sine",.035); tone(1175,.1,"sine",.03,.08); tone(1568,.14,"sine",.025,.17); },
    pop: () => { tone(180,.05,"square",.035); tone(390,.06,"triangle",.025,.04); },
    chime: () => { tone(523,.2,"sine",.035); tone(659,.22,"sine",.03,.08); tone(784,.3,"sine",.028,.16); },
    click: () => { tone(900,.025,"square",.025); tone(620,.04,"square",.018,.025); },
    purr: () => { tone(92,.18,"sawtooth",.02); tone(104,.18,"sawtooth",.018,.09); },
    bubble: () => { tone(420,.06,"sine",.03); tone(620,.07,"sine",.025,.05); tone(820,.08,"sine",.02,.1); },
    stamp: () => { tone(130,.07,"square",.05); tone(80,.11,"sine",.04,.04); },
    success: () => { [523,659,784,1047].forEach((f,i)=>tone(f,.18,"triangle",.04,i*.085)); },
    fail: () => { tone(180,.12,"sawtooth",.025); tone(150,.18,"sawtooth",.02,.08); }
  };
  (s[name] || s.click)();
}

function startBackgroundAudio() {
  if (!DELUXE_CONFIG.music.src) return;
  if (!state.bgAudio) {
    state.bgAudio = new Audio(DELUXE_CONFIG.music.src);
    state.bgAudio.loop = true;
    state.bgAudio.volume = DELUXE_CONFIG.music.volume ?? .3;
  }
  if (state.soundOn) state.bgAudio.play().catch(() => {});
}

function toggleSound() {
  state.soundOn = !state.soundOn;
  const btn = $("#soundToggle");
  btn.setAttribute("aria-pressed", String(state.soundOn));
  $("#soundLabel").textContent = state.soundOn ? "Sound On" : "Sound Off";

  if (state.bgAudio) {
    state.soundOn ? state.bgAudio.play().catch(()=>{}) : state.bgAudio.pause();
  }
  if (state.soundOn) playSynth("click");
}

/* ============================================================
   LETTER
   ============================================================ */
function openLetter() {
  playSynth("click");
  $("#diaryTrigger").classList.add("is-open");
  $("#diaryTrigger").setAttribute("aria-expanded", "true");
  $("#letterPaper").classList.add("is-open");
  $("#letterPaper").setAttribute("aria-hidden", "false");
}
function closeLetter() {
  playSynth("click");
  $("#diaryTrigger").classList.remove("is-open");
  $("#diaryTrigger").setAttribute("aria-expanded", "false");
  $("#letterPaper").classList.remove("is-open");
  $("#letterPaper").setAttribute("aria-hidden", "true");
}

/* ============================================================
   KITTY DIALOGUES
   ============================================================ */
function renderKittyCouncil() {
  const grid = $("#castGrid");
  grid.innerHTML = "";

  dialogueEntries.forEach(([key, data], index) => {
    const btn = document.createElement("button");
    btn.className = "wish-card";
    btn.style.setProperty("--tilt", `${[-1.3,.8,-.6,1,-.9,.7,-1.1,.6,-.5][index]}deg`);
    btn.dataset.key = key;
    btn.innerHTML = `
      <span class="card-no">KITTY 0${index + 1}</span>
      <span class="tap-mark">↗</span>
      <h3>${escapeHTML(data.name)}</h3>
      <p>${escapeHTML(data.role)}</p>
      <div class="cat-art card-cat interactive-cat" data-cat-pose="${KITTY_POSES[(index + 1) % KITTY_POSES.length]}" aria-label="${escapeHTML(data.name)} — black & pink kitty"></div>
    `;
    btn.addEventListener("click", () => openDialogue(index));
    grid.appendChild(btn);
  });
  renderCatElements(grid);
}

function openDialogue(index) {
  state.currentDialogue = index;
  const [, data] = dialogueEntries[index];
  $("#dialogName").textContent = data.name;
  $("#dialogLabel").textContent = data.role.toUpperCase();
  $("#dialogQuote").textContent = data.quote;
  const dialogCat = $("#dialogCat");
  dialogCat.dataset.catPose = KITTY_POSES[(index + 3) % KITTY_POSES.length];
  dialogCat.innerHTML = catSVG(dialogCat.dataset.catPose);
  playSynth(data.sound);

  const dialog = $("#wishDialog");
  if (!dialog.open) dialog.showModal();
}
function nextDialogue() {
  state.currentDialogue = (state.currentDialogue + 1) % dialogueEntries.length;
  openDialogue(state.currentDialogue);
}

/* ============================================================
   SCRAPBOOK
   ============================================================ */
function renderMemories() {
  const grid = $("#scrapbookGrid");
  const rotations = [-3.2,1.5,-1.1,2.7,-2,1.1,3.1,-1.7,2.1,-2.6,.8,2.8,-.9,1.7];

  grid.innerHTML = "";
  DELUXE_CONFIG.memories.slice(0,14).forEach((caption, i) => {
    const figure = document.createElement("figure");
    figure.className = "polaroid";
    figure.style.setProperty("--r", `${rotations[i]}deg`);
    figure.dataset.index = i;
    figure.innerHTML = `
      <span class="tape"></span>
      <img src="assets/images/photo_${i+1}.jpg" alt="Memory photo ${i+1}" loading="lazy" />
      <p>${escapeHTML(caption)}</p>
    `;
    figure.addEventListener("click", () => openPhoto(i));
    grid.appendChild(figure);
  });
}

function openPhoto(index) {
  playSynth("click");
  $("#photoPreview").src = `assets/images/photo_${index + 1}.jpg`;
  $("#photoPreview").alt = `Memory photo ${index + 1}`;
  $("#photoCount").textContent = `MEMORY ${String(index + 1).padStart(2,"0")} / 14`;
  $("#photoCaption").textContent = DELUXE_CONFIG.memories[index];
  const d = $("#photoDialog");
  if (!d.open) d.showModal();
}

function shuffleMemories() {
  playSynth("bloop");
  const cards = $$(".polaroid");
  const vals = [-4,-3,-2,-1,1,2,3,4];
  cards.forEach((card, i) => {
    const v = vals[(i * 5 + Date.now()) % vals.length];
    card.style.setProperty("--r", `${v}deg`);
  });
  showToast("Polaroids shuffled ✦");
}

/* ============================================================
   MINI GAME
   ============================================================ */
function startGame() {
  if (state.gameActive) return;
  unlockAudio();
  state.gameActive = true;
  state.gameScore = 0;
  state.gameTime = 20;
  $("#gameScore").textContent = "0";
  $("#gameTime").textContent = "20";
  $("#gameResult").textContent = "";
  $("#gameReady").style.display = "none";
  $("#startGameBtn").disabled = true;
  clearCatchItems();

  state.gameSpawner = setInterval(spawnCatchItem, 570);
  state.gameTimer = setInterval(() => {
    state.gameTime--;
    $("#gameTime").textContent = state.gameTime;
    if (state.gameTime <= 0) endGame();
  }, 1000);

  playSynth("success");
  spawnCatchItem();
}

function spawnCatchItem() {
  if (!state.gameActive) return;

  const arena = $("#gameArena");
  const item = document.createElement("button");
  const isBad = Math.random() < .18;
  item.className = `catch-item${isBad ? " bad" : ""}`;
  item.setAttribute("aria-label", isBad ? "Jangan klik black heart" : "Tangkap pink heart");
  item.textContent = isBad ? "✦" : "♥";

  const maxX = Math.max(0, arena.clientWidth - 62);
  const maxY = Math.max(0, arena.clientHeight - 62);
  item.style.left = `${Math.random() * maxX}px`;
  item.style.top = `${Math.random() * maxY}px`;

  const life = setTimeout(() => item.remove(), 1100);
  item.addEventListener("pointerdown", e => {
    e.preventDefault();
    clearTimeout(life);
    if (isBad) {
      state.gameScore = Math.max(0, state.gameScore - 2);
      playSynth("fail");
    } else {
      state.gameScore++;
      playSynth("bubble");
      miniBurst(e.clientX, e.clientY);
    }
    $("#gameScore").textContent = state.gameScore;
    item.remove();
  });
  arena.appendChild(item);
}

function endGame() {
  state.gameActive = false;
  clearInterval(state.gameTimer);
  clearInterval(state.gameSpawner);
  clearCatchItems();
  $("#startGameBtn").disabled = false;
  $("#startGameBtn").textContent = "PLAY AGAIN ↺";

  const oldBest = Number(localStorage.getItem("midnightKittyBest") || 0);
  const best = Math.max(oldBest, state.gameScore);
  localStorage.setItem("midnightKittyBest", best);
  $("#gameBest").textContent = best;

  if (state.gameScore >= 12) {
    $("#gameResult").textContent = `BONUS UNLOCKED ♡ ${DELUXE_CONFIG.nickname}, apparently you're ridiculously good at catching love.`;
    playSynth("success");
    burstConfetti(55, .75);
  } else {
    $("#gameResult").textContent = "Almost! The cat stole a few hearts. Try again, birthday legend.";
    playSynth("meow");
  }
}

function clearCatchItems() {
  $$(".catch-item", $("#gameArena")).forEach(el => el.remove());
}

/* ============================================================
   MAKE A WISH
   ============================================================ */
function sealWish() {
  const input = $("#wishInput");
  const value = input.value.trim();
  if (!value) {
    showToast("Tulis wish rahasianya dulu ♡");
    input.focus();
    return;
  }
  localStorage.setItem("midnightKittyWish", value);
  playSynth("sparkle");
  showToast("Wish sealed. The cat promises not to peek.");
  input.value = "";
}

function blowCandles() {
  const candles = $("#candles");
  if (candles.classList.contains("blown")) return;

  candles.classList.add("blown");
  playSynth("success");
  createSmoke();
  burstConfetti(140, 1.4);

  setTimeout(() => {
    $("#finalCard").classList.add("is-visible");
    $("#finalCard").setAttribute("aria-hidden", "false");
    $("#finalCard").scrollIntoView({ behavior: "smooth", block: "center" });
  }, 680);
}

function createSmoke() {
  const layer = $("#smokeLayer");
  const cakeRect = $("#candles").getBoundingClientRect();
  const parentRect = layer.getBoundingClientRect();

  $$(".candle").forEach((candle, i) => {
    const r = candle.getBoundingClientRect();
    for (let p = 0; p < 5; p++) {
      const s = document.createElement("span");
      s.className = "smoke";
      s.style.left = `${r.left - parentRect.left + r.width/2}px`;
      s.style.top = `${r.top - parentRect.top - 26}px`;
      s.style.setProperty("--dx", `${(p - 2) * (9 + i)}px`);
      s.style.animationDelay = `${p * .05}s`;
      layer.appendChild(s);
      setTimeout(() => s.remove(), 1800);
    }
  });
}

function replayMagic() {
  $("#candles").classList.remove("blown");
  $("#finalCard").classList.remove("is-visible");
  $("#finalCard").setAttribute("aria-hidden", "true");
  $("#wish").scrollIntoView({ behavior:"smooth", block:"start" });
  playSynth("chime");
}

/* ============================================================
   FX + HELPERS
   ============================================================ */
function burstConfetti(count = 80, durationMultiplier = 1) {
  const layer = $("#confettiLayer");
  const colors = ["#ff6fae","#ffb4d3","#ffffff","#111015","#f23883"];

  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "confetti-piece";
    p.style.left = `${Math.random() * 100}%`;
    p.style.setProperty("--c", colors[i % colors.length]);
    p.style.setProperty("--x", `${(Math.random() - .5) * 320}px`);
    p.style.setProperty("--d", `${(2.4 + Math.random() * 2.3) * durationMultiplier}s`);
    p.style.transform = `rotate(${Math.random()*360}deg)`;
    layer.appendChild(p);
    setTimeout(() => p.remove(), 5600 * durationMultiplier);
  }
}

function miniBurst(x, y) {
  const layer = $("#confettiLayer");
  for (let i = 0; i < 10; i++) {
    const p = document.createElement("span");
    p.className = "confetti-piece";
    p.style.left = `${x}px`;
    p.style.top = `${y}px`;
    p.style.setProperty("--c", i % 2 ? "#ff6fae" : "#ffffff");
    p.style.setProperty("--x", `${(Math.random() - .5) * 160}px`);
    p.style.setProperty("--d", `${.6 + Math.random() * .5}s`);
    layer.appendChild(p);
    setTimeout(() => p.remove(), 1300);
  }
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.t);
  showToast.t = setTimeout(() => toast.classList.remove("show"), 2600);
}

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  })[c]);
}


/* ============================================================
   STORY MODE / SECTION-BY-SECTION NAVIGATION
   Desktop mouse wheel -> one chapter per gesture.
   Touch devices keep native swipe with CSS scroll snapping.
   ============================================================ */
function initStoryMode() {
  const sections = $$(".section");
  if (!sections.length) return;

  document.body.classList.add("story-mode");
  document.documentElement.classList.add("story-mode");

  const goToStorySection = (index) => {
    const section = sections[index];
    if (!section) return;
    section.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block:"start"
    });
  };
  window.goToStorySection = goToStorySection;

  const labels = [
    "Birthday",
    "Secret Letter",
    "Kitty Wishes",
    "Memories",
    "Mini Game",
    "Make a Wish"
  ];

  sections.forEach((section, index) => {
    section.classList.add("story-section");
    section.dataset.storyIndex = index;

    if (index < sections.length - 1) {
      const nextBtn = document.createElement("button");
      nextBtn.className = "section-next";
      nextBtn.type = "button";
      nextBtn.innerHTML = `<span>next · ${labels[index + 1]}</span><i>↓</i>`;
      nextBtn.setAttribute("aria-label", `Lanjut ke ${labels[index + 1]}`);
      nextBtn.addEventListener("click", () => goToStorySection(index + 1));
      section.appendChild(nextBtn);
    }
  });

  const pager = document.createElement("nav");
  pager.className = "story-pager";
  pager.setAttribute("aria-label", "Birthday story chapters");
  pager.innerHTML = sections.map((_, i) => (
    `<button type="button" data-index="${i}" data-label="${String(i+1).padStart(2,"0")} · ${escapeHTML(labels[i])}" aria-label="${escapeHTML(labels[i])}"></button>`
  )).join("") + `<span class="story-pager-count" id="storyPagerCount">01 / 06</span>`;
  document.body.appendChild(pager);

  $$(".story-pager button", pager).forEach(btn => {
    btn.addEventListener("click", () => goToStorySection(Number(btn.dataset.index)));
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const section = entry.target;
      if (entry.isIntersecting && entry.intersectionRatio >= .38) {
        sections.forEach(s => s.classList.remove("is-section-active"));
        section.classList.add("is-section-active", "section-just-entered");

        const index = Number(section.dataset.storyIndex || 0);
        updateStoryPager(index);

        clearTimeout(section._storySheenTimer);
        section._storySheenTimer = setTimeout(() => {
          section.classList.remove("section-just-entered");
        }, 950);
      }
    });
  }, { threshold:[.18,.38,.58,.75] });

  sections.forEach(section => observer.observe(section));
  sections[0].classList.add("is-section-active");
  updateStoryPager(0);

  // Desktop-only wheel paging: a single deliberate gesture moves one chapter.
  const desktopQuery = window.matchMedia("(min-width: 900px) and (hover: hover) and (pointer: fine)");
  let wheelLocked = false;
  let wheelAccumulator = 0;
  let wheelResetTimer = null;

  window.addEventListener("wheel", event => {
    if (!desktopQuery.matches) return;
    if (document.body.classList.contains("no-scroll")) return;
    if (document.querySelector("dialog[open]")) return;
    if (event.ctrlKey || event.metaKey) return;

    const target = event.target;
    if (target?.closest?.(".scrapbook-grid")) {
      // Let horizontal gallery trackpads work naturally.
      if (Math.abs(event.deltaX) >= Math.abs(event.deltaY) * .7) return;
    }

    const activeEl = document.activeElement;
    if (activeEl && /INPUT|TEXTAREA|SELECT/.test(activeEl.tagName)) return;

    if (wheelLocked) {
      event.preventDefault();
      return;
    }

    wheelAccumulator += event.deltaY;
    clearTimeout(wheelResetTimer);
    wheelResetTimer = setTimeout(() => wheelAccumulator = 0, 160);

    if (Math.abs(wheelAccumulator) < 36) {
      event.preventDefault();
      return;
    }

    const current = getClosestStoryIndex();
    const direction = wheelAccumulator > 0 ? 1 : -1;
    const next = Math.max(0, Math.min(sections.length - 1, current + direction));

    wheelAccumulator = 0;

    // At the first/last chapter let native scrolling continue so the page
    // can still reach the document edge / footer.
    if (next === current) return;

    event.preventDefault();
    wheelLocked = true;
    goToStorySection(next);
    setTimeout(() => wheelLocked = false, 820);
  }, { passive:false });

  // Keyboard chapter navigation.
  window.addEventListener("keydown", event => {
    if (document.body.classList.contains("no-scroll")) return;
    if (document.querySelector("dialog[open]")) return;
    const activeEl = document.activeElement;
    if (activeEl && /INPUT|TEXTAREA|SELECT|BUTTON/.test(activeEl.tagName)) return;

    const current = getClosestStoryIndex();
    if (["ArrowDown","PageDown"].includes(event.key)) {
      event.preventDefault();
      goToStorySection(Math.min(sections.length - 1, current + 1));
    } else if (["ArrowUp","PageUp"].includes(event.key)) {
      event.preventDefault();
      goToStorySection(Math.max(0, current - 1));
    }
  });

  function getClosestStoryIndex() {
    let winner = 0;
    let best = Infinity;
    sections.forEach((section, index) => {
      const distance = Math.abs(section.getBoundingClientRect().top);
      if (distance < best) {
        best = distance;
        winner = index;
      }
    });
    return winner;
  }

  function updateStoryPager(index) {
    $$(".story-pager button", pager).forEach((btn, i) => {
      btn.classList.toggle("is-active", i === index);
      btn.setAttribute("aria-current", i === index ? "step" : "false");
    });
    const count = $("#storyPagerCount");
    if (count) count.textContent = `${String(index + 1).padStart(2,"0")} / ${String(sections.length).padStart(2,"0")}`;
  }

}


function initScrollReveal() {
  const items = $$(".section-heading,.wish-card,.polaroid,.game-machine,.wish-input-card,.cake-stage");
  items.forEach(el => el.classList.add("reveal"));

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("in-view");
    });
  }, { threshold: .12 });

  items.forEach(el => io.observe(el));
}

function initCursorGlow() {
  const glow = $("#cursorGlow");
  window.addEventListener("pointermove", e => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  }, { passive:true });
}

function initButtons() {
  $("#enterSiteBtn").addEventListener("click", enterExperience);
  $("#soundToggle").addEventListener("click", toggleSound);
  $("#diaryTrigger").addEventListener("click", openLetter);
  $("#letterClose").addEventListener("click", closeLetter);
  $("#dialogClose").addEventListener("click", () => $("#wishDialog").close());
  $("#dialogNext").addEventListener("click", nextDialogue);
  $("#photoClose").addEventListener("click", () => $("#photoDialog").close());
  $("#shuffleMemories").addEventListener("click", shuffleMemories);
  $("#startGameBtn").addEventListener("click", startGame);
  $("#sealWishBtn").addEventListener("click", sealWish);
  $("#blowCandlesBtn").addEventListener("click", blowCandles);
  $("#replayBtn").addEventListener("click", replayMagic);

  $("#secretBtn").addEventListener("click", () => {
    playSynth("meow");
    showToast("Secret: the cat actually likes you. A lot.");
    burstConfetti(26,.65);
  });

  $$("[data-scroll]").forEach(btn => {
    btn.addEventListener("click", () => $(btn.dataset.scroll)?.scrollIntoView({behavior:"smooth"}));
  });

  [$("#wishDialog"), $("#photoDialog")].forEach(dialog => {
    dialog.addEventListener("click", e => {
      const rect = dialog.getBoundingClientRect();
      const outside = e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom;
      if (outside) dialog.close();
    });
  });
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("no-scroll");
  bindConfig();
  renderKittyCouncil();
  renderMemories();
  renderCatElements();
  initCatInteractions();
  initButtons();
  initStoryMode();
  initScrollReveal();
  initCursorGlow();

  $("#gameBest").textContent = localStorage.getItem("midnightKittyBest") || "0";
  startVerification();
});
