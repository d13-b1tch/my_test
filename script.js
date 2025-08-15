/* ========= Финальный скрипт теста совместимости ========= */
const CT = (() => {
  /* ---------- Справочники ---------- */
  const MBTI = ["INTJ","INTP","ENTJ","ENTP","INFJ","INFP","ENFJ","ENFP","ISTJ","ISFJ","ESTJ","ESFJ","ISTP","ISFP","ESTP","ESFP"];
  const BLOOD = ["Не знаю","O(I) Rh+","O(I) Rh−","A(II) Rh+","A(II) Rh−","B(III) Rh+","B(III) Rh−","AB(IV) Rh+","AB(IV) Rh−"];
  const ORIENT = ["Гетеро","Би","Гомо","Асексуален(-на)","Пока не определился(-ась)"];
  const GENDER = ["Мужчина","Женщина","Небинарный","Предпочитаю не указывать"];
  const BODY = ["Эктоморф","Мезоморф","Эндоморф","Смешанный","Не знаю"];
  const DIET = ["Без ограничений","Сбалансированное","Вегетарианство","Веганство","Кето/низкоуглеводная","Халяль/Кашрут","Другое"];
  const ALCO = ["Не употребляю","Редко","По выходным","Умеренно","Часто"];
  const SMOKE = ["Никогда","Бросаю/Редко","Иногда","Регулярно"];
  const SLEEP = [5,6,7,8,9,10].map(String);
  const SPORT = ["Нет","1×/нед","2×/нед","3×/нед","4–5×/нед","Ежедневно"];
  const STRESS = ["Низкий","Средний","Высокий"];
  const CONFLICT = ["Мягко и дипломатично","Спокойно, по фактам","Прямо и жёстко","Избегаю конфликтов","Завишу от ситуации"];
  const MONEY = ["Экономлю","Баланс","Трачу спокойно","Импульсивно"];
  const KIDS = ["Не хочу","Сомневаюсь","1","2","3","4+","Позже решу"];
  const VALUES = ["Семья","Карьера","Свобода","Стабильность","Творчество","Риск/приключения","Традиции","Саморазвитие"];
  const FAITH = ["Нет","Православие","Католицизм","Протестантизм","Иудаизм","Ислам","Буддизм","Индуизм","Агностицизм","Другое"];
  const LOVE_LANG = ["Слова","Время","Подарки","Помощь","Прикосновения"];
  const LIBIDO_RANGE = [1,2,3,4,5];
  const BOUND = ["Строгие границы","Умеренная гибкость","Открыт(а) к новому при доверии"];
  const SOCIAL = ["Интроверт","Амбиверт","Экстраверт"];
  const ATTACH = ["Надёжный","Тревожный","Избегающий","Дезорганизованный","Не знаю"];
  const EDUC = ["Школа","Колледж/СПО","Бакалавр","Магистр","Другое"];
  const CHRONIC = ["Нет","Да (не критично)","Да (требует режима)","Предпочитаю не указывать"];
  const ALLERGY = ["Нет","Лёгкие","Выраженные","Сезонные"];
  const CIRCAD = ["«Жаворонок»","Сова","Гибкий режим"];
  const CAFFEINE = ["Не пью","1 порция/день","2 порции/день","3+ порций/день"];
  const CONTRACEPT = ["Обсуждаем заранее","По ситуации","Не планируем","Предпочитаю не указывать"];
  const PDA = ["Нет","Умеренно","Комфортно"];
  const TRAVEL = ["Домосед","Иногда","Люблю часто"];
  const PETS = ["Очень хочу","Нормально","Без питомцев"];
  const GUESTS = ["Редко","Периодически","Часто"];
  const NOISE = ["Чувствителен(-на)","Нормально","Терплю шум"];
  const CHORES = ["Поровну","По склонностям","Кто свободен — тот делает"];

  /* ---------- Генераторы полей ---------- */
  function sel(id, label, options, placeholder="Выберите…") {
    return {type:"select", id, label, options, placeholder};
  }
  function step(id, label, min, max, stepVal, def) {
    return {type:"number", id, label, min, max, step: stepVal, default: def};
  }

  /* ---------- Структура опроса (65+ пунктов) ---------- */
  const SECTIONS = [
    {
      id: "id", title: "О вас", items: [
        sel("nickname","Псевдоним",[],""),
        sel("gender","Пол",GENDER),
        sel("orientation","Сексуальная ориентация",ORIENT),
        sel("mbti","MBTI",MBTI),
        sel("social","Социативность",SOCIAL),
        sel("temperament","Темперамент",["Сангвиник","Холерик","Флегматик","Меланхолик","Смешанный"]),
        sel("attach","Стиль привязанности",ATTACH),
        sel("education","Образование",EDUC),
        sel("loveLang1","Любовный язык — главный",LOVE_LANG),
        sel("loveLang2","Любовный язык — второй",LOVE_LANG),
      ]
    },
    {
      id: "phys", title: "Физиология и быт", items: [
        step("age","Возраст",16,80,1,18),
        step("height","Рост (см)",140,210,1,175),
        step("weight","Вес (кг)",40,180,1,70),
        sel("bodyType","Тип телосложения",BODY),
        sel("blood","Группа крови",BLOOD),
        sel("sleep","Часы сна/сутки",SLEEP),
        sel("circadian","Биоритм",CIRCAD),
        sel("sport","Спорт",SPORT),
        sel("diet","Питание/диета",DIET),
        sel("alcohol","Алкоголь",ALCO),
        sel("smoke","Курение",SMOKE),
        sel("caffeine","Кофеин",CAFFEINE),
        sel("chronic","Хронические состояния",CHRONIC),
        sel("allergy","Аллергии",ALLERGY),
        step("screen","Экранное время (ч/день)",0,16,1,4),
        step("steps","Шаги (тыс./день)",0,25,1,6),
        sel("checkup","Чекапы здоровья",["Раз в год","Раз в 2–3 года","Редко"]),
      ]
    },
    {
      id: "values", title: "Ценности и цели", items: [
        sel("valueCore","Главная ценность",VALUES),
        sel("valueSecond","Вторая по важности",VALUES),
        sel("kids","Дети",KIDS),
        step("kidsPlanYears","Горизонт планирования детей (лет)",0,15,1,3),
        sel("faith","Религиозные взгляды",FAITH),
        sel("money","Отношение к деньгам",MONEY),
        step("workHours","Рабочие/учебные часы в день",0,16,1,6),
        step("risk","Готовность к риску (1–5)",1,5,1,3),
        sel("marriage","Отношение к браку",["Не хочу","Возможен","Хочу","Пока не думаю"]),
      ]
    },
    {
      id: "psych", title: "Психология и поведение", items: [
        sel("stress","Уровень стресса",STRESS),
        step("anxiety","Тревожность (1–5)",1,5,1,3),
        step("irrit","Раздражительность (1–5)",1,5,1,3),
        step("jealous","Ревнивость (1–5)",1,5,1,2),
        sel("conflict","Стиль в конфликте",CONFLICT),
        step("cooldown","Нужен ли «тайм-аут» (мин)",0,60,5,15),
        step("talkOpen","Открытость к обсуждениям (1–5)",1,5,1,4),
        step("empathy","Эмпатия (1–5)",1,5,1,4),
        step("trust","Доверие по умолчанию (1–5)",1,5,1,4),
        step("spont","Спонтанность vs планирование (1–5)",1,5,1,3),
        step("boundAssert","Умение отстаивать границы (1–5)",1,5,1,3),
      ]
    },
    {
      id: "intim", title: "Интим и границы", items: [
        step("libido","Уровень либидо (1–5)",1,5,1,3),
        sel("bound","Границы",BOUND),
        step("initFreq","Инициатива сближения (в неделю)",0,14,1,2),
        step("aftercare","Нужна близость/уход после (1–5)",1,5,1,3),
        step("talkIntim","Комфорт обсуждать интим (1–5)",1,5,1,4),
        sel("contracept","Контрацепция/защита",CONTRACEPT),
        sel("pda","Проявления чувств на людях",PDA),
        step("novelty","Открытость к новизне (1–5)",1,5,1,3),
      ]
    },
    {
      id: "life", title: "Быт и совместная жизнь", items: [
        step("clean","Чистоплотность/порядок (1–5)",1,5,1,4),
        step("plan","Организованность (1–5)",1,5,1,3),
        sel("chores","Дом. обязанности",CHORES),
        step("cook","Готовка/неделю (раз)",0,21,1,4),
        sel("guests","Гости",GUESTS),
        step("spendTime","Время вместе (час/день)",0,12,1,2),
        step("aloneTime","Личное время (час/день)",0,8,1,2),
        sel("pets","Отношение к питомцам",PETS),
        sel("move","Переезды/путешествия",TRAVEL),
        sel("noise","Чувствительность к шуму",NOISE),
        step("deepClean","Генуборка (раз/мес)",0,8,1,2),
        step("bedtime","Разница времени отбоя (ч)",0,6,1,1),
      ]
    }
  ];
  // Всего полей: 10 + 17 + 9 + 11 + 8 + 12 = 67 ✔

  /* ---------- Состояние ---------- */
  let MODE = "solo";
  const qs = (s, r=document) => r.querySelector(s);
  const qsa = (s, r=document) => Array.from(r.querySelectorAll(s));

  /* ---------- Построение формы ---------- */
  function createSelect(item, existing={}) {
    const wrap = document.createElement("div"); wrap.className = "field";
    const val = existing[item.id] ?? "";
    wrap.innerHTML = `
      <label for="${item.id}">${item.label}</label>
      <select id="${item.id}" class="select">
        <option value="">${item.placeholder||"Выберите…"}</option>
        ${item.options.map(o => `<option value="${o}">${o}</option>`).join("")}
      </select>`;
    wrap.querySelector("select").value = val;
    return wrap;
  }
  function createStepper(item, existing={}) {
    const wrap = document.createElement("div"); wrap.className = "field";
    const id = item.id;
    const val = existing[id] ?? item.default ?? item.min;
    wrap.innerHTML = `
      <label for="${id}">${item.label}</label>
      <div class="stepper">
        <button type="button" data-step="-${item.step || 1}">−</button>
        <input id="${id}" class="number" type="text" inputmode="numeric" value="${val}" />
        <button type="button" data-step="${item.step || 1}">+</button>
      </div>`;
    const input = wrap.querySelector("input");
    const [btnMinus, btnPlus] = wrap.querySelectorAll("button");
    const clamp = v => Math.max(item.min, Math.min(item.max, v));
    btnMinus.onclick = () => { input.value = clamp((+input.value||0) - (item.step||1)); };
    btnPlus.onclick = () => { input.value = clamp((+input.value||0) + (item.step||1)); };
    input.addEventListener("blur", () => { input.value = clamp(+input.value || item.min); });
    return wrap;
  }
  function buildForm(containerId, storageKey) {
    const mount = qs("#"+containerId);
    if (!mount) return;
    mount.innerHTML = "";
    const exists = load(storageKey) || {};
    SECTIONS.forEach(sec => {
      const box = document.createElement("div");
      box.className = "section";
      box.innerHTML = `<h3>${sec.title}</h3>`;
      sec.items.forEach(it => {
        box.appendChild(it.type === "select" ? createSelect(it, exists) : createStepper(it, exists));
      });
      mount.appendChild(box);
    });
  }

  /* ---------- Сохранение/загрузка ---------- */
  function collectForm(root=document.body) {
    const data = {};
    qsa("select", root).forEach(s => data[s.id] = s.value);
    qsa(".stepper input", root).forEach(inp => data[inp.id] = String(inp.value));
    return data;
  }
  function saveForm(storageKey) {
    try {
      const data = collectForm();
      data._ts = Date.now();
      data._mode = getMode();
      localStorage.setItem(storageKey, JSON.stringify(data));
      alert("Ответы сохранены!");
    } catch (e) {
      alert("Ошибка при сохранении: " + e.message);
    }
  }
  function load(key) {
    try { return JSON.parse(localStorage.getItem(key) || "null"); } catch { return null; }
  }

  /* ---------- Экспорт/импорт кода ответов ---------- */
  function encode(obj){ return btoa(encodeURIComponent(JSON.stringify(obj))); }
  function decode(str){ try{ return JSON.parse(decodeURIComponent(atob(str))); }catch{ return null; } }
  function copyCode(key){
    try {
      const data = load(key);
      if (!data) { alert("Нет данных для копирования"); return; }
      const code = encode(data);
      navigator.clipboard.writeText(code);
      alert("Код скопирован в буфер обмена!");
    } catch (e) {
      alert("Ошибка копирования: " + e.message);
    }
  }
  function importCode(key, code){
    try {
      const obj = decode((code||"").trim());
      if (!obj) { alert("Неверный код"); return; }
      localStorage.setItem(key, JSON.stringify(obj));
      alert("Импортировано! Обновите страницу при необходимости.");
      renderResults();
    } catch (e) {
      alert("Ошибка импорта: " + e.message);
    }
  }

  /* ---------- Режим ---------- */
  function setMode(m){ MODE = m; localStorage.setItem("ct_mode", m); }
  function getMode(){ return localStorage.getItem("ct_mode") || MODE; }

  /* ---------- Просмотры/превью ---------- */
  function showPreview(preId, data) {
    const el = qs("#"+preId);
    if (!el) return;
    el.textContent = Object.keys(data||{}).length ? prettyData(data) : "— нет данных —";
  }
  function labelById(id) {
    for (const s of SECTIONS) for (const it of s.items) if (it.id===id) return it.label;
    return id;
  }
  function prettyData(obj) {
    const hide = new Set(["_ts","_mode"]);
    return Object.entries(obj)
      .filter(([k,v]) => v && !hide.has(k))
      .map(([k,v]) => `${labelById(k)}: ${v}`).join("\n");
  }

  /* ---------- Сравнение и расчёт ---------- */
  function n(v){ return Number(String(v||"0").replace(",", ".")); }
  function cmpSelect(a,b){ return a&&b ? (a===b?1:0) : null; }
  function cmpScale(a,b,maxDiff=1){ if(!a||!b) return null; const d=Math.abs(n(a)-n(b)); return d<=0?1:d<=maxDiff?0.6:0.2; }
  function cmpNum(a,b,range=10){ if(!a||!b||range===0) return null; const d=Math.abs(n(a)-n(b)); return Math.max(0, 1 - d/range); }

  // Весовые правила для парного сравнения (частично)
  const RULES = {
    id: [
      [["gender"], cmpSelect, 0.4],
      [["orientation"], cmpSelect, 0.8],
      [["mbti"], (a,b)=> a&&b ? (a===b?1:0.5) : null, 0.5],
      [["social"], cmpSelect, 0.4],
      [["attach"], (a,b)=> a&&b ? (a===b?1:0.6) : null, 0.4],
      [["loveLang1"], cmpSelect, 0.6],
      [["loveLang2"], cmpSelect, 0.4],
    ],
    phys: [
      [["age"], (a,b)=> cmpNum(a,b,8), 0.4],
      [["height"], (a,b)=> cmpNum(a,b,12), 0.3],
      [["weight"], (a,b)=> cmpNum(a,b,15), 0.2],
      [["bodyType"], cmpSelect, 0.2],
      [["sleep"], cmpSelect, 0.3],
      [["circadian"], cmpSelect, 0.4],
      [["sport"], cmpSelect, 0.3],
      [["diet"], cmpSelect, 0.2],
      [["alcohol"], cmpSelect, 0.3],
      [["smoke"], cmpSelect, 0.4],
      [["caffeine"], cmpSelect, 0.2],
      [["screen"], (a,b)=> cmpNum(a,b,4), 0.2],
      [["steps"], (a,b)=> cmpNum(a,b,6), 0.2],
    ],
    values: [
      [["valueCore"], cmpSelect, 0.7],
      [["valueSecond"], cmpSelect, 0.4],
      [["kids"], cmpSelect, 0.7],
      [["kidsPlanYears"], (a,b)=> cmpNum(a,b,5), 0.4],
      [["faith"], (a,b)=> a&&b ? (a===b?1:0.6) : null, 0.4],
      [["money"], cmpSelect, 0.4],
      [["workHours"], (a,b)=> cmpNum(a,b,4), 0.3],
      [["risk"], cmpScale, 0.3],
      [["marriage"], cmpSelect, 0.5],
    ],
    psych: [
      [["stress"], cmpSelect, 0.5],
      [["anxiety"], cmpScale, 0.5],
      [["irrit"], cmpScale, 0.6],
      [["jealous"], cmpScale, 0.6],
      [["conflict"], cmpSelect, 0.5],
      [["cooldown"], (a,b)=> cmpNum(a,b,20), 0.3],
      [["talkOpen"], cmpScale, 0.4],
      [["empathy"], cmpScale, 0.5],
      [["trust"], cmpScale, 0.4],
      [["spont"], cmpScale, 0.4],
      [["boundAssert"], cmpScale, 0.4],
    ],
    intim: [
      [["libido"], cmpScale, 0.7],
      [["bound"], cmpSelect, 0.3],
      [["initFreq"], (a,b)=> cmpNum(a,b,5), 0.4],
      [["aftercare"], cmpScale, 0.3],
      [["talkIntim"], cmpScale, 0.4],
      [["contracept"], cmpSelect, 0.2],
      [["pda"], cmpSelect, 0.2],
      [["novelty"], cmpScale, 0.3],
    ],
    life: [
      [["clean"], cmpScale, 0.4],
      [["plan"], cmpScale, 0.3],
      [["chores"], cmpSelect, 0.2],
      [["cook"], (a,b)=> cmpNum(a,b,5), 0.2],
      [["guests"], cmpSelect, 0.2],
      [["spendTime"], (a,b)=> cmpNum(a,b,3), 0.2],
      [["aloneTime"], (a,b)=> cmpNum(a,b,2), 0.2],
      [["pets"], cmpSelect, 0.2],
      [["move"], cmpSelect, 0.2],
      [["noise"], cmpSelect, 0.1],
      [["deepClean"], (a,b)=> cmpNum(a,b,2), 0.1],
      [["bedtime"], (a,b)=> cmpNum(a,b,2), 0.1],
    ]
  };

  /* ---------- Рендер итогов ---------- */
  function renderResults() {
    const you = load("ct_user") || {};
    const partner = load("ct_partner") || {};
    showPreview("youPreview", you);
    showPreview("partnerPreview", partner);

    // ...дополнительная логика для отчёта...
    // Здесь может быть часть, отвечающая за отображение сравнения и советов
  }

  /* ---------- Экспорт PNG/PDF (заглушки) ---------- */
  function exportPNG(cardId) {
    const el = qs("#" + cardId);
    if (!el) return;
    html2canvas(el).then(canvas => {
      const link = document.createElement('a');
      link.download = 'report.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  }
  function exportPDF(cardId) {
    const el = qs("#" + cardId);
    if (!el) return;
    html2canvas(el).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new window.jspdf.jsPDF({orientation: 'portrait', unit: 'px', format: [canvas.width, canvas.height]});
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('report.pdf');
    });
  }

  /* ---------- Экспортируемый API ---------- */
  return {
    buildForm, saveForm, setMode, getMode, renderResults,
    copyCode, importCode, exportPNG, exportPDF
  };
})();
