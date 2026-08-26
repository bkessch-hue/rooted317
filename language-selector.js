(function () {
  "use strict";

  var STORAGE_KEY = "rooted317_language";

  var LANGUAGES = [
    { code: "en", name: "English", native: "English", flag: "\ud83c\uddec\ud83c\udde7" },
    { code: "es", name: "Spanish", native: "Espa\u00f1ol", flag: "\ud83c\uddea\ud83c\uddf8" },
    { code: "fr", name: "French", native: "Fran\u00e7ais", flag: "\ud83c\uddeb\ud83c\uddf7" },
    { code: "pt", name: "Portuguese", native: "Portugu\u00eas", flag: "\ud83c\udde7\ud83c\uddf7" },
    { code: "ht", name: "Haitian Creole", native: "Krey\u00f2l Ayisyen", flag: "\ud83c\udded\ud83c\uddf9" },
    { code: "de", name: "German", native: "Deutsch", flag: "\ud83c\udde9\ud83c\uddea" },
    { code: "it", name: "Italian", native: "Italiano", flag: "\ud83c\uddee\ud83c\uddf9" },
    { code: "nl", name: "Dutch", native: "Nederlands", flag: "\ud83c\uddf3\ud83c\uddf1" },
    { code: "ar", name: "Arabic", native: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629", flag: "\ud83c\uddf8\ud83c\udde6" },
    { code: "he", name: "Hebrew", native: "\u05e2\u05d1\u05e8\u05d9\u05ea", flag: "\ud83c\uddf7\ud83c\uddea" },
    { code: "zh-CN", name: "Chinese (Simplified)", native: "\u7b80\u4f53\u4e2d\u6587", flag: "\ud83c\udde8\ud83c\uddf3" },
    { code: "zh-TW", name: "Chinese (Traditional)", native: "\u7e41\u9ad4\u4e2d\u6587", flag: "\ud83c\uddf9\ud83c\uddfc" },
    { code: "ja", name: "Japanese", native: "\u65e5\u672c\u8a9e", flag: "\ud83c\uddef\ud83c\uddf5" },
    { code: "ko", name: "Korean", native: "\ud55c\uad6d\uc5b4", flag: "\ud83c\uddf0\ud83c\uddf7" },
    { code: "hi", name: "Hindi", native: "\u0939\u093f\u0928\u094d\u0926\u0940", flag: "\ud83c\uddee\ud83c\uddf3" },
    { code: "bn", name: "Bengali", native: "\u09ac\u09be\u0982\u09b2\u09be", flag: "\ud83c\udde7\ud83c\udde9" },
    { code: "ur", name: "Urdu", native: "\u0627\u0631\u062f\u0648", flag: "\ud83c\uddf5\ud83c\uddf0" },
    { code: "pa", name: "Punjabi", native: "\u0a2a\u0a70\u0a1c\u0a3e\u0a2c\u0a40", flag: "\ud83c\udde7\ud83c\udde9" },
    { code: "vi", name: "Vietnamese", native: "Ti\u1ebfng Vi\u1ec7t", flag: "\ud83c\uddfb\ud83c\uddf3" },
    { code: "tl", name: "Tagalog / Filipino", native: "Filipino", flag: "\ud83c\uddf5\ud83c\udded" },
    { code: "id", name: "Indonesian", native: "Bahasa Indonesia", flag: "\ud83c\uddee\ud83c\udde9" },
    { code: "ms", name: "Malay", native: "Bahasa Melayu", flag: "\ud83c\uddf2\ud83c\uddfe" },
    { code: "th", name: "Thai", native: "\u0e44\u0e17\u0e22", flag: "\ud83c\uddf9\ud83c\udded" },
    { code: "sw", name: "Swahili", native: "Kiswahili", flag: "\ud83c\uddf0\ud83c\uddfa" },
    { code: "am", name: "Amharic", native: "\u12a0\u121d\u1295\u1228\u1227", flag: "\ud83c\uddea\ud83c\uddf9" },
    { code: "so", name: "Somali", native: "Soomaali", flag: "\ud83c\uddf8\ud83c\uddf4" },
    { code: "yo", name: "Yoruba", native: "Yor\u00f9b\u00e1", flag: "\ud83c\uddf3\ud83c\uddac" },
    { code: "ig", name: "Igbo", native: "Igbo", flag: "\ud83c\uddf3\ud83c\uddec" },
    { code: "zu", name: "Zulu", native: "isiZulu", flag: "\ud83c\uddff\ud83c\udde6" },
    { code: "af", name: "Afrikaans", native: "Afrikaans", flag: "\ud83c\udde6\ud83c\uddff" },
    { code: "ru", name: "Russian", native: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439", flag: "\ud83c\uddf7\ud83c\uddfa" },
    { code: "uk", name: "Ukrainian", native: "\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430", flag: "\ud83c\uddfa\ud83c\udde6" },
    { code: "pl", name: "Polish", native: "Polski", flag: "\ud83c\uddf5\ud83c\uddf1" },
    { code: "ro", name: "Romanian", native: "Rom\u00e2n\u0103", flag: "\ud83c\uddf7\ud83c\uddf4" },
    { code: "el", name: "Greek", native: "\u0395\u03bb\u03bb\u03b7\u03bd\u03b9\u03ba\u03ac", flag: "\ud83c\uddec\ud83c\uddf7" },
    { code: "tr", name: "Turkish", native: "T\u00fcrk\u00e7e", flag: "\ud83c\uddf9\ud83c\uddf7" },
    { code: "fa", name: "Persian / Farsi", native: "\u0641\u0627\u0631\u0633\u06cc", flag: "\ud83c\uddee\ud83c\uddf7" },
    { code: "ne", name: "Nepali", native: "\u0928\u0947\u092a\u093e\u0932\u0940", flag: "\ud83c\uddf3\ud83c\uddf5" },
    { code: "ta", name: "Tamil", native: "\u0ba4\u0bae\u0bbf\u0bb4\u0bcd", flag: "\ud83c\uddf9\ud83c\udded" },
    { code: "te", name: "Telugu", native: "\u0c24\u0c46\u0c32\u0c41\u0c17\u0c41", flag: "\ud83c\uddee\ud83c\uddf3" },
    { code: "mr", name: "Marathi", native: "\u092e\u0930\u093e\u0920\u0940", flag: "\ud83c\uddee\ud83c\uddf3" },
    { code: "gu", name: "Gujarati", native: "\u0a97\u0ac1\u0a9c\u0ab0\u0abe\u0a9f\u0ac0", flag: "\ud83c\uddee\ud83c\uddf3" },
    { code: "si", name: "Sinhala", native: "\u0dc3\u0dd2\u0d82\u0dc4\u0db6", flag: "\ud83c\uddf0\ud83c\uddf0" },
    { code: "my", name: "Burmese", native: "\u1019\u103c\u1014\u103a\u1019\u102c\u1018\u102c", flag: "\ud83c\uddf2\ud83c\uddf2" },
    { code: "km", name: "Khmer", native: "\u1797\u17b6\u179f\u17b6\u1781\u17d2\u1798\u17c4\u1784", flag: "\ud83c\uddf0\ud83c\udded" },
    { code: "lo", name: "Lao", native: "\u0e9e\u0eb2\u0e84\u0eb2\u0e99", flag: "\ud83c\uddf1\ud83c\udde6" },
    { code: "ka", name: "Georgian", native: "\u10d5\u10d0\u10e0\u10d8", flag: "\ud83c\uddec\ud83c\uddea" },
    { code: "hy", name: "Armenian", native: "\u0540\u0561\u0575\u0565\u0580\u0565\u0576", flag: "\ud83c\udde6\ud83c\uddf2" },
    { code: "kk", name: "Kazakh", native: "\u049a\u0430\u0437\u0430\u049b", flag: "\ud83c\uddf0\ud83c\uddff" },
    { code: "uz", name: "Uzbek", native: "O\u2018zbek", flag: "\ud83c\uddfa\ud83c\uddff" },
    { code: "cs", name: "Czech", native: "\u010ce\u0161tina", flag: "\ud83c\udde8\ud83c\uddff" },
    { code: "sk", name: "Slovak", native: "Sloven\u010dina", flag: "\ud83c\uddf8\ud83c\uddf0" },
    { code: "hu", name: "Hungarian", native: "Magyar", flag: "\ud83c\udded\ud83c\uddfa" },
    { code: "fi", name: "Finnish", native: "Suomi", flag: "\ud83c\uddeb\ud83c\uddee" },
    { code: "sv", name: "Swedish", native: "Svenska", flag: "\ud83c\uddf8\ud83c\uddea" },
    { code: "da", name: "Danish", native: "Dansk", flag: "\ud83c\udde9\ud83c\uddf0" },
    { code: "no", name: "Norwegian", native: "Norsk", flag: "\ud83c\uddf3\ud83c\uddf4" },
    { code: "bg", name: "Bulgarian", native: "\u0411\u044a\u043b\u0433\u0430\u0440\u0441\u043a\u0438", flag: "\ud83c\udde7\ud83c\uddec" },
    { code: "sr", name: "Serbian", native: "\u0421\u0440\u043f\u0441\u043a\u0438", flag: "\ud83c\uddf7\ud83c\uddf8" },
    { code: "hr", name: "Croatian", native: "Hrvatski", flag: "\ud83c\udded\ud83c\uddf7" },
    { code: "sl", name: "Slovenian", native: "Sloven\u0161\u010dina", flag: "\ud83c\uddf8\ud83c\uddee" },
    { code: "et", name: "Estonian", native: "Eesti", flag: "\ud83c\uddea\ud83c\uddea" },
    { code: "lv", name: "Latvian", native: "Latvie\u0161u", flag: "\ud83c\uddf1\ud83c\uddfb" },
    { code: "lt", name: "Lithuanian", native: "Lietuvi\u0173", flag: "\ud83c\uddf1\ud83c\uddf9" },
    { code: "mt", name: "Maltese", native: "Malti", flag: "\ud83c\uddf2\ud83c\uddf9" },
    { code: "cy", name: "Welsh", native: "Cymraeg", flag: "\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f" },
    { code: "ga", name: "Irish", native: "Gaeilge", flag: "\ud83c\uddee\ud83c\uddea" },
    { code: "is", name: "Icelandic", native: "\u00cdslenska", flag: "\ud83c\uddee\ud83c\uddf8" },
    { code: "mk", name: "Macedonian", native: "\u041c\u0430\u043a\u0435\u0434\u043e\u043d\u0441\u043a\u0438", flag: "\ud83c\uddf2\ud83c\uddf0" },
    { code: "sq", name: "Albanian", native: "Shqip", flag: "\ud83c\udde6\ud83c\uddf1" },
    { code: "bs", name: "Bosnian", native: "Bosanski", flag: "\ud83c\udde7\ud83c\udde6" },
    { code: "mn", name: "Mongolian", native: "\u041c\u043e\u043d\u0433\u043e\u043b", flag: "\ud83c\uddf2\ud83c\uddf3" },
    { code: "ti", name: "Tigrinya", native: "\u1275\u122a\u1275\u1229\u1235", flag: "\ud83c\uddf9\ud83c\uddec" },
    { code: "ha", name: "Hausa", native: "Hausa", flag: "\ud83c\udded\ud83c\uddf9" },
    { code: "ca", name: "Catalan", native: "Català", flag: "\ud83c\udde6\ud83c\uddf8" },
    { code: "eu", name: "Basque", native: "Euskara", flag: "\ud83c\uddea\ud83c\uddf8" }
  ];

  var styleSheet = null;
  var overlay = null;
  var triggerBtn = null;
  var searchInput = null;
  var gridContainer = null;
  var googleContainer = null;

  function injectStyles() {
    if (styleSheet) return;
    var css = [
      ".lang-overlay{position:fixed;inset:0;z-index:10000;background:rgba(16,37,44,0.85);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;opacity:0;visibility:hidden;transition:opacity .3s ease,visibility .3s ease;padding:16px}",
      ".lang-overlay.is-open{opacity:1;visibility:visible}",
      ".lang-panel{background:var(--white,#fff);border-radius:16px;width:100%;max-width:680px;max-height:85vh;display:flex;flex-direction:column;box-shadow:0 25px 80px rgba(0,0,0,0.35);transform:translateY(30px) scale(0.97);transition:transform .3s ease}",
      ".lang-overlay.is-open .lang-panel{transform:translateY(0) scale(1)}",
      ".lang-panel-header{display:flex;align-items:center;justify-content:space-between;padding:24px 28px 0;border-bottom:none}",
      ".lang-panel-header h2{font-family:'Playfair Display',serif;font-size:1.35rem;color:var(--navy,#10252c);margin:0}",
      ".lang-close-btn{background:var(--cream,#f8f5ee);border:none;border-radius:50%;width:38px;height:38px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:1.2rem;color:var(--navy,#10252c);transition:background .2s ease,f transform .2s ease;flex-shrink:0}",
      ".lang-close-btn:hover{background:var(--border,#e3e1dc);transform:rotate(90deg)}",
      ".lang-search-wrap{padding:16px 28px 0}",
      ".lang-search{width:100%;padding:12px 16px 12px 42px;border:2px solid var(--border,#e3e1dc);border-radius:10px;font-size:.95rem;background:var(--cream,#f8f5ee) url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='%23667479' viewBox='0 0 24 24'%3E%3Cpath d='M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3C/svg%3E\") no-repeat 14px center;transition:border-color .2s ease,box-shadow .2s ease;outline:none;color:var(--text,#263238)}",
      ".lang-search:focus{border-color:var(--primary,#b98545);box-shadow:0 0 0 3px rgba(185,133,69,0.15)}",
      ".lang-search::placeholder{color:var(--muted,#667479)}",
      ".lang-grid-wrap{flex:1;overflow-y:auto;padding:16px 24px 8px;-webkit-overflow-scrolling:touch}",
      ".lang-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}",
      ".lang-btn{display:flex;align-items:center;gap:10px;padding:11px 14px;border:2px solid transparent;border-radius:10px;background:transparent;cursor:pointer;text-align:left;font-size:.88rem;color:var(--text,#263238);transition:background .15s ease,border-color .15s ease,transform .15s ease;line-height:1.3}",
      ".lang-btn:hover{background:var(--cream,#f8f5ee);transform:translateY(-1px)}",
      ".lang-btn.is-selected{border-color:var(--primary,#b98545);background:rgba(185,133,69,0.08);font-weight:600}",
      ".lang-btn-flag{font-size:1.25rem;flex-shrink:0;line-height:1}",
      ".lang-btn-info{display:flex;flex-direction:column;min-width:0}",
      ".lang-btn-name{font-weight:600;color:var(--navy,#10252c);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
      ".lang-btn-native{font-size:.78rem;color:var(--muted,#667479);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
      ".lang-panel-footer{padding:14px 28px;border-top:1px solid var(--border,#e3e1dc);text-align:center;font-size:.75rem;color:var(--muted,#667479)}",
      ".lang-no-results{padding:40px 0;text-align:center;color:var(--muted,#667479);font-size:.95rem;grid-column:1/-1}",
      ".lang-trigger-btn{display:inline-flex;align-items:center;gap:7px;padding:8px 16px;border:1px solid var(--border,#e3e1dc);border-radius:8px;background:var(--white,#fff);cursor:pointer;font-size:.88rem;font-weight:600;color:var(--text,#263238);font-family:'DM Sans',sans-serif;transition:background .2s ease,border-color .2s ease,transform .2s ease;white-space:nowrap;margin-left:auto}",
      ".lang-trigger-btn:hover{background:var(--cream,#f8f5ee);border-color:var(--primary,#b98545);transform:translateY(-1px)}",
      ".lang-trigger-btn-icon{font-size:1.1rem;line-height:1}",
      "#google_translate_element{display:none!important}",
      "@media(max-width:768px){.lang-panel{max-width:100%;max-height:90vh;border-radius:16px 16px 0 0;margin-top:auto}.lang-overlay{align-items:flex-end;padding:0}.lang-grid{grid-template-columns:1fr}.lang-panel-header{padding:20px 20px 0}.lang-search-wrap{padding:14px 20px 0}.lang-grid-wrap{padding:14px 16px 8px}.lang-panel-footer{padding:12px 20px}.lang-btn{padding:13px 16px;font-size:.92rem}}"
    ].join("\n");
    var style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
    styleSheet = true;
  }

  function createOverlay() {
    if (overlay) return overlay;

    overlay = document.createElement("div");
    overlay.className = "lang-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Select Language");

    var panel = document.createElement("div");
    panel.className = "lang-panel";

    var header = document.createElement("div");
    header.className = "lang-panel-header";
    var title = document.createElement("h2");
    title.textContent = "Select Language";
    var closeBtn = document.createElement("button");
    closeBtn.className = "lang-close-btn";
    closeBtn.setAttribute("aria-label", "Close language selector");
    closeBtn.innerHTML = "\u00d7";
    header.appendChild(title);
    header.appendChild(closeBtn);

    var searchWrap = document.createElement("div");
    searchWrap.className = "lang-search-wrap";
    searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.className = "lang-search";
    searchInput.setAttribute("aria-label", "Search languages");
    searchInput.placeholder = "Search languages\u2026";
    searchWrap.appendChild(searchInput);

    var gridWrap = document.createElement("div");
    gridWrap.className = "lang-grid-wrap";
    gridContainer = document.createElement("div");
    gridContainer.className = "lang-grid";
    gridWrap.appendChild(gridContainer);

    var footer = document.createElement("div");
    footer.className = "lang-panel-footer";
    footer.textContent = "Powered by Google Translate";

    panel.appendChild(header);
    panel.appendChild(searchWrap);
    panel.appendChild(gridWrap);
    panel.appendChild(footer);
    overlay.appendChild(panel);

    document.body.appendChild(overlay);

    closeBtn.addEventListener("click", closePanel);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closePanel();
    });

    return overlay;
  }

  function createGoogleContainer() {
    if (googleContainer) return;
    googleContainer = document.createElement("div");
    googleContainer.id = "google_translate_element";
    document.body.appendChild(googleContainer);
  }

  function loadGoogleTranslate(callback) {
    if (window.google && window.google.translate) {
      callback();
      return;
    }
    window.googleTranslateElementInit = function () {
      new google.translate.TranslateElement({
        pageLanguage: "en",
        includedLanguages: LANGUAGES.map(function (l) { return l.code; }).join(","),
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
      }, "google_translate_element");
    };
    var script = document.createElement("script");
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.onload = callback;
    script.onerror = function () {
      console.warn("ROOTED317: Google Translate script failed to load.");
    };
    document.head.appendChild(script);
  }

  function getStoredLanguage() {
    try {
      return localStorage.getItem(STORAGE_KEY) || "";
    } catch (e) {
      return "";
    }
  }

  function storeLanguage(code) {
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch (e) {
      // storage unavailable
    }
  }

  function applyTranslation(code) {
    if (!code || code === "en") {
      removeTranslation();
      return;
    }
    window.location.hash = "#googtrans/en/" + code;
    storeLanguage(code);
  }

  function removeTranslation() {
    if (window.location.hash.indexOf("#googtrans") === 0) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // ignore
    }
  }

  function closeHamburgerMenu() {
    var menuBtn = document.getElementById("menuButton");
    var navMenu = document.getElementById("navMenu");
    if (navMenu && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      document.body.classList.remove("menu-open");
      if (menuBtn) {
        menuBtn.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open navigation menu");
      }
    }
  }

  function closePanel() {
    if (!overlay) return;
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
    document.removeEventListener("keydown", handleEscape);
  }

  function openPanel() {
    createOverlay();
    closeHamburgerMenu();
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";

    var stored = getStoredLanguage();
    highlightSelected(stored);

    setTimeout(function () {
      if (searchInput) {
        searchInput.value = "";
        searchInput.focus();
        renderGrid("");
      }
    }, 100);

    document.addEventListener("keydown", handleEscape);
  }

  function handleEscape(e) {
    if (e.key === "Escape") closePanel();
  }

  function highlightSelected(code) {
    if (!gridContainer) return;
    var buttons = gridContainer.querySelectorAll(".lang-btn");
    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].dataset.code === code) {
        buttons[i].classList.add("is-selected");
      } else {
        buttons[i].classList.remove("is-selected");
      }
    }
  }

  function renderGrid(query) {
    if (!gridContainer) return;
    gridContainer.innerHTML = "";

    var q = (query || "").toLowerCase().trim();
    var fragment = document.createDocumentFragment();
    var matchCount = 0;

    for (var i = 0; i < LANGUAGES.length; i++) {
      var lang = LANGUAGES[i];
      if (q && lang.name.toLowerCase().indexOf(q) === -1 && lang.native.toLowerCase().indexOf(q) === -1) {
        continue;
      }
      matchCount++;

      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "lang-btn";
      btn.dataset.code = lang.code;
      btn.setAttribute("aria-label", "Translate to " + lang.name + " (" + lang.native + ")");

      var flag = document.createElement("span");
      flag.className = "lang-btn-flag";
      flag.textContent = lang.flag;
      flag.setAttribute("aria-hidden", "true");

      var info = document.createElement("span");
      info.className = "lang-btn-info";

      var name = document.createElement("span");
      name.className = "lang-btn-name";
      name.textContent = lang.name;

      var native = document.createElement("span");
      native.className = "lang-btn-native";
      native.textContent = lang.native;

      info.appendChild(name);
      info.appendChild(native);

      btn.appendChild(flag);
      btn.appendChild(info);

      btn.addEventListener("click", (function (code) {
        return function () {
          applyTranslation(code);
          highlightSelected(code);
          setTimeout(closePanel, 150);
        };
      })(lang.code));

      fragment.appendChild(btn);
    }

    if (matchCount === 0) {
      var noResults = document.createElement("div");
      noResults.className = "lang-no-results";
      noResults.textContent = "No languages found";
      gridContainer.appendChild(noResults);
    }

    gridContainer.appendChild(fragment);

    var stored = getStoredLanguage();
    highlightSelected(stored);
  }

  function createTriggerButton() {
    triggerBtn = document.createElement("button");
    triggerBtn.type = "button";
    triggerBtn.className = "lang-trigger-btn";
    triggerBtn.setAttribute("aria-label", "Select language");
    triggerBtn.innerHTML = '<span class="lang-trigger-btn-icon">\ud83c\udf10</span> Language';

    triggerBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      openPanel();
    });

    return triggerBtn;
  }

  function injectTriggerIntoNav() {
    var navMenus = document.querySelectorAll(".nav-menu");
    if (navMenus.length === 0) return;

    for (var i = 0; i < navMenus.length; i++) {
      var navMenu = navMenus[i];
      var existing = navMenu.querySelector(".lang-trigger-btn");
      if (existing) continue;

      var btn = createTriggerButton();
      navMenu.appendChild(btn);

      var siblingLinks = navMenu.querySelectorAll("a");
      for (var j = 0; j < siblingLinks.length; j++) {
        (function (link) {
          link.addEventListener("click", function () {
            if (overlay && overlay.classList.contains("is-open")) {
              closePanel();
            }
          });
        })(siblingLinks[j]);
      }
    }
  }

  function restoreStoredLanguage() {
    var stored = getStoredLanguage();
    if (stored && stored !== "en") {
      var currentHash = window.location.hash;
      if (currentHash.indexOf("#googtrans") === -1) {
        applyTranslation(stored);
      }
    }
  }

  function init() {
    injectStyles();
    createGoogleContainer();
    injectTriggerIntoNav();
    renderGrid("");
    loadGoogleTranslate(function () {
      restoreStoredLanguage();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
