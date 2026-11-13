// Menu, back-to-top, screenshots gallery and EmailJS contact form
const EMAILJS = {
  SERVICE_ID: 'service_ytc3fjl',
  TEMPLATE_TO_ME: 'template_03qdmuj',
  TEMPLATE_AUTO_REPLY: 'template_8ykpjhd',
  USER_ID: 'NkNu_yvbh0b4vgRcD'
};
if (typeof emailjs !== 'undefined') emailjs.init(EMAILJS.USER_ID);

// Mobile menu
const menu = document.getElementById('menu');
const links = document.getElementById('links');
menu.addEventListener('click', () => {
  const open = links.classList.toggle('on');
  menu.innerHTML = open ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});
links.addEventListener('click', e => {
  if (e.target.tagName === 'A') { links.classList.remove('on'); menu.innerHTML = '<i class="fas fa-bars"></i>'; }
});

// Back to top
const toTop = document.getElementById('top');
window.addEventListener('scroll', () => toTop.classList.toggle('on', window.scrollY > 400));
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Screenshots. To add screenshots for a new project, add an entry here
// and a "Screenshots" button in index.html: onclick="showShots('yourKey')"
const SHOTS = {
  classroom: ['Digital Classroom Management System', ['login', 'dashboard', 'profile', 'course', 'action', 'exam']],
  exam: ['Online Exam Management System', ['loginq', 'dash', 'que', 'stud', 'category', 'exams']],
  whatsapp: ['WhatsApp Bulk Message Sender', ['whatsapp', 'file', 'msg', 'what', 'console', 'auto']],
  portfolio: ['Responsive portfolio website', ['arun', 'about', 'service1', 'service2', 'contact']]
};
function showShots(key) {
  const [title, files] = SHOTS[key];
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('shots').innerHTML = files.map(f => `<img src="images/${f}.png" alt="${title} screenshot" loading="lazy">`).join('');
  document.getElementById('modal').classList.add('on');
  document.body.style.overflow = 'hidden';
}
function closeShots() {
  document.getElementById('modal').classList.remove('on');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeShots(); });
document.getElementById('modal').addEventListener('click', e => { if (e.target === e.currentTarget) closeShots(); });

// Toast
function toast(msg, ok) {
  document.querySelector('.toast')?.remove();
  const t = document.createElement('div');
  t.className = 'toast';
  t.style.background = ok ? '#0f8a5f' : '#c0392b';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 5000);
}

// Contact form: one email to Arun, one auto-reply to the visitor
document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const val = id => document.getElementById(id).value.trim();
  const from_name = val('name'), email = val('email'), subject = val('subject'), message = val('message');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast('Enter a valid email address.', false);
  const btn = this.querySelector('button');
  const label = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;
  const base = {
    from_name, email, subject, message, reply_to: email,
    date: new Date().toLocaleDateString('en-IN'),
    time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
  };
  try {
    await emailjs.send(EMAILJS.SERVICE_ID, EMAILJS.TEMPLATE_TO_ME,
      { ...base, to_name: 'Arun Kumar', to_email: 'rakumar1712005@gmail.com', recipient_name: 'Arun' });
    await emailjs.send(EMAILJS.SERVICE_ID, EMAILJS.TEMPLATE_AUTO_REPLY,
      { ...base, to_name: from_name, to_email: email, recipient_name: from_name,
        your_name: 'Arun Kumar', your_email: 'rakumar1712005@gmail.com', your_phone: '+91 63853 95719' });
    toast('Message sent. Check your email for a confirmation.', true);
    this.reset();
  } catch (err) {
    toast('Message not sent: ' + (err.text || err.message || 'try again in a moment.'), false);
  } finally {
    btn.innerHTML = label;
    btn.disabled = false;
  }
});
