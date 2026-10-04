/* Mobile menu */
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});
nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

/* Countdown: 6 days 18 hours 48 minutes from the first visit */
(function () {
  const KEY = "rivo-offer-end";
  const DURATION = ((6 * 24 + 18) * 60 + 48) * 60 * 1000;
  let end;
  try {
    end = Number(localStorage.getItem(KEY));
  } catch (e) {}
  if (!end || end < Date.now()) {
    end = Date.now() + DURATION;
    try {
      localStorage.setItem(KEY, end);
    } catch (e) {}
  }
  const els = {
    days: document.getElementById("cd-days"),
    hours: document.getElementById("cd-hours"),
    mins: document.getElementById("cd-mins"),
  };
  const pad = (n) => String(n).padStart(2, "0");
  function tick() {
    const left = Math.max(0, end - Date.now());
    els.days.textContent = pad(Math.floor(left / 864e5));
    els.hours.textContent = pad(Math.floor(left / 36e5) % 24);
    els.mins.textContent = pad(Math.floor(left / 6e4) % 60);
  }
  tick();
  setInterval(tick, 30000);
})();

/* Feedback slider */
(function () {
  const cards = [...document.querySelectorAll(".feedback-card")];
  const n = cards.length;
  let current = cards.findIndex((c) => c.classList.contains("active"));
  if (current < 0) current = 0;
  function render() {
    cards.forEach((card, i) => {
      card.classList.toggle("active", i === current);
      card.style.order = (i - current + 1 + n) % n; // active card stays in the middle on desktop
    });
  }
  document.querySelector(".prev").addEventListener("click", () => {
    current = (current - 1 + n) % n;
    render();
  });
  document.querySelector(".next").addEventListener("click", () => {
    current = (current + 1) % n;
    render();
  });
  render();
})();

/* Newsletter form */
document.getElementById("newsletter").addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = document.getElementById("form-msg");
  msg.textContent = "Thanks! You're subscribed.";
  e.target.reset();
});
