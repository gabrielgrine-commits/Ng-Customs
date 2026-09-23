// Mobile navigation
const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav-toggle');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.nav-links a').forEach((a) =>
  a.addEventListener('click', () => nav.classList.remove('open'))
);

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Hide video fallback once a real video is playing
const heroVideo = document.querySelector('.device-screen video');
heroVideo.addEventListener('playing', () => {
  document.querySelector('.screen-fallback').style.display = 'none';
});
heroVideo.addEventListener('error', () => heroVideo.remove(), true);

// Preselect package in contact form
const paketSelect = document.getElementById('paket-select');
document.querySelectorAll('[data-paket]').forEach((btn) =>
  btn.addEventListener('click', () => { paketSelect.value = btn.dataset.paket; })
);

// Contact form → mailto
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const subject = `Anfrage: ${f.get('paket')}${f.get('ki') ? ' + KI-Rezeptionistin' : ''}`;
  const body =
    `Name: ${f.get('name')}\nE-Mail: ${f.get('email')}\nPaket: ${f.get('paket')}\n` +
    `KI-Rezeptionistin: ${f.get('ki') ? 'Ja' : 'Nein'}\n\n${f.get('nachricht')}`;
  window.location.href =
    `mailto:info@ng-customs.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

// Reveal on scroll
const revealEls = document.querySelectorAll('.card, .steps li, .ki-feature, details, .device, .phone');
revealEls.forEach((el) => el.classList.add('reveal'));
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach((el) => io.observe(el));

// KI-Rezeptionistin demo conversation
const conversation = [
  ['ai', 'Guten Tag, Praxis Müller, hier spricht Lena. Wie kann ich Ihnen helfen?'],
  ['caller', 'Hallo, ich hätte gerne einen Beratungstermin diese Woche.'],
  ['ai', 'Sehr gern! Ich habe Donnerstag um 14:30 Uhr oder Freitag um 10:00 Uhr frei.'],
  ['caller', 'Donnerstag passt super.'],
  ['ai', 'Perfekt, darf ich Ihren Namen haben?'],
  ['caller', 'Sarah Weber.'],
  ['ai', 'Danke, Frau Weber. Ihr Termin ist eingetragen – Sie erhalten gleich eine SMS-Bestätigung.'],
];
const chat = document.getElementById('chat');
const pop = document.getElementById('calendar-pop');
let started = false;

function playConversation() {
  chat.innerHTML = '';
  pop.classList.remove('show');
  conversation.forEach(([who, text], i) => {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = `msg ${who}`;
      el.innerHTML = `<small>${who === 'ai' ? 'KI-Rezeptionistin' : 'Anrufer'}</small>`;
      el.append(text);
      chat.appendChild(el);
      if (i === conversation.length - 1) {
        setTimeout(() => pop.classList.add('show'), 900);
        setTimeout(playConversation, 7000);
      }
    }, i * 1600);
  });
}

new IntersectionObserver((entries, obs) => {
  if (entries[0].isIntersecting && !started) {
    started = true;
    playConversation();
    obs.disconnect();
  }
}, { threshold: 0.3 }).observe(document.querySelector('.phone'));
