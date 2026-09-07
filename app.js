(function () {
  const cfg = window.COURSE_CONFIG || {};

  function fill() {
    const dates = cfg.DATES || "4 недели · 4 вебинара";
    const time = cfg.TIME || "онлайн, видео + практика";
    const price = cfg.PRICE || "29 990 ₽";
    document.querySelectorAll('[data-field="dates"]').forEach((el) => { el.textContent = dates; });
    document.querySelectorAll('[data-field="time"]').forEach((el) => { el.textContent = time; });
    document.querySelectorAll('[data-field="price"]').forEach((el) => { el.textContent = price; });
  }

  function reveal() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const nodes = document.querySelectorAll(
      ".voices li, .journey-card, .modules li, .author-facts li, .quote, .ticket"
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          io.unobserve(e.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    nodes.forEach((el, i) => {
      el.classList.add("reveal");
      el.style.setProperty("--d", (i % 6) * 50 + "ms");
      io.observe(el);
    });
  }

  function mountWidget() {
    const box = document.getElementById("gc-mount");
    if (!box) return;

    if (cfg.GC_WIDGET_SRC && cfg.GC_WIDGET_HASH) {
      if (box.querySelector("iframe") || document.getElementById(cfg.GC_WIDGET_HASH)) return;
      box.innerHTML = "";
      const script = document.createElement("script");
      script.id = cfg.GC_WIDGET_HASH;
      script.src = cfg.GC_WIDGET_SRC;
      script.onload = function () {
        document.dispatchEvent(new Event("StartWidget" + cfg.GC_WIDGET_HASH));
      };
      box.appendChild(script);
    } else {
      box.innerHTML = `
        <form class="pay-stub-form" onsubmit="event.preventDefault(); alert('Виджет GetCourse ожидает ссылку в config.js (GC_WIDGET_SRC)');">
          <input class="pay-input" type="text" placeholder="Ваше имя" required />
          <input class="pay-input" type="email" placeholder="Электронная почта" required />
          <input class="pay-input" type="tel" placeholder="Номер телефона" required />
          <button class="btn violet" type="submit" style="width:100%; margin-top:6px;">
            Оплатить участие за ${cfg.PRICE || "29 990 ₽"}
          </button>
          <p class="mute" style="font-size:12px; text-align:center; margin:6px 0 0; line-height:1.4;">
            Официальная форма GetCourse будет встроена автоматически после добавления ссылки в config.js
          </p>
        </form>
      `;
    }
  }

  function sheets() {
    const nodes = Array.from(document.querySelectorAll(".sheet"));
    if (!nodes.length) return;

    const setOpen = (id, on) => {
      const sheet = document.getElementById(id);
      if (!sheet) return;
      sheet.classList.toggle("on", on);
      sheet.setAttribute("aria-hidden", on ? "false" : "true");
      if (on) {
        document.body.classList.add("sheet-lock");
        if (id === "sheet-pay") mountWidget();
        const closeBtn = sheet.querySelector(".sheet-x");
        if (closeBtn) closeBtn.focus();
      } else if (!nodes.some((n) => n.classList.contains("on"))) {
        document.body.classList.remove("sheet-lock");
      }
    };

    document.querySelectorAll("[data-open]").forEach((el) => {
      el.addEventListener("click", (e) => {
        const id = el.getAttribute("data-open");
        if (!id) return;
        e.preventDefault();
        nodes.forEach((n) => setOpen(n.id, n.id === id));
      });
    });

    nodes.forEach((sheet) => {
      sheet.querySelectorAll("[data-close]").forEach((btn) => {
        btn.addEventListener("click", () => setOpen(sheet.id, false));
      });
      sheet.addEventListener("click", (e) => {
        if (e.target === sheet) setOpen(sheet.id, false);
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      nodes.forEach((n) => setOpen(n.id, false));
    });
  }

  function dock() {
    const bar = document.querySelector(".dock");
    const offer = document.getElementById("offer");
    const journey = document.getElementById("results");
    if (!bar) return;
    const sync = () => {
      const pastHero = window.scrollY > 320;
      const sheetOn = document.body.classList.contains("sheet-lock");
      const overlapsViewport = (node) => {
        if (!node) return false;
        const rect = node.getBoundingClientRect();
        return rect.top < window.innerHeight * 0.82 && rect.bottom > 90;
      };
      const immersiveSectionOn = overlapsViewport(journey) || overlapsViewport(offer);
      bar.hidden = !pastHero || immersiveSectionOn || sheetOn;
    };
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("scrollend", sync, { passive: true });
    window.addEventListener("resize", sync);
    document.addEventListener("click", () => setTimeout(sync, 0));
    sync();
  }

  fill();
  reveal();
  sheets();
  dock();
})();
