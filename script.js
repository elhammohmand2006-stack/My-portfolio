 // ===== 3) Typing effect =====
    const words = ["Front-End Developer", "Web Designer", "English Teacher"];
    const typing = document.getElementById("typing");
    let w = 0, c = 0, deleting = false;
    function type() {
      const word = words[w];
      typing.textContent = word.substring(0, c);
      if (!deleting && c < word.length) { c++; }
      else if (!deleting) { deleting = true; setTimeout(type, 1200); return; }
      else if (c > 0) { c--; }
      else { deleting = false; w = (w + 1) % words.length; }
      setTimeout(type, deleting ? 45 : 90);
    }
    type();

    // ===== 4) Scroll reveal + number counters =====
    function countUp(el) {
      const end = Number(el.dataset.to);
      let now = 0;
      const timer = setInterval(function () {
        now++;
        el.textContent = now;
        if (now >= end) { clearInterval(timer); }
      }, 150);
    }
    const observer = new IntersectionObserver(function (items) {
      items.forEach(function (item) {
        if (item.isIntersecting) {
          item.target.classList.add("show");
          item.target.querySelectorAll(".count").forEach(countUp);
          observer.unobserve(item.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll(".reveal").forEach(function (el) { observer.observe(el); });

    // ===== 5) Navbar, progress bar, back-to-top =====
    const nav = document.getElementById("nav");
    const topBtn = document.getElementById("topBtn");
    const bar = document.getElementById("progress");
    window.addEventListener("scroll", function () {
      const max = document.body.scrollHeight - window.innerHeight;
      bar.style.width = (window.scrollY / max) * 100 + "%";
      nav.classList.toggle("scrolled", window.scrollY > 40);
      topBtn.style.display = window.scrollY > 500 ? "block" : "none";
    });
    topBtn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

    // ===== 6) Dark / light theme (remembered in the browser) =====
    const html = document.documentElement;
    const themeBtn = document.getElementById("themeBtn");
    function setTheme(theme) {
      html.setAttribute("data-bs-theme", theme);
      themeBtn.innerHTML = theme === "dark" ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>';
      try { localStorage.setItem("theme", theme); } catch (e) {}
    }
    let saved = "dark";
    try { saved = localStorage.getItem("theme") || "dark"; } catch (e) {}
    setTheme(saved);
    themeBtn.addEventListener("click", function () {
      setTheme(html.getAttribute("data-bs-theme") === "dark" ? "light" : "dark");
    });