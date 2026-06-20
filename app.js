/* ===================================================
   ANTI-GRAVITY COSMIC BIRTHDAY â€” app.js (v2)
   Photo Upload Gallery + Cosmic Wish Printer
   =================================================== */
'use strict';

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
//  DATA
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const WISHES_LIST = [
  { emoji: 'ðŸŒŸ', text: 'May every star in the galaxy align to bring you unimaginable joy, success, and love â€” today and every single day of your beautiful life.', from: 'â€” The Universe ðŸŒŒ', gradient: 'linear-gradient(135deg,#7c3aed,#a855f7)' },
  { emoji: 'ðŸ™', text: 'May the Lord bless you with abundant joy, peace, and good health this coming year. You have a beautiful heart, and I pray that all your dreams and prayers are answered.', from: 'â€” With Faith & Love ðŸ’›',  gradient: 'linear-gradient(135deg,#f59e0b,#fbbf24)' },
  { emoji: 'ðŸŽˆ', text: 'Like a balloon set free in zero gravity, may you soar above every limit and float fearlessly towards your wildest, most dazzling dreams.', from: 'â€” The Sky ðŸŒ¤ï¸', gradient: 'linear-gradient(135deg,#ec4899,#f43f5e)' },
  { emoji: 'âœï¸', text: 'Wishing you a blessed birthday! May God surround you with His grace, guide your steps, and fill your life with His endless love.', from: 'â€” God\'s Blessings ðŸ•Šï¸',  gradient: 'linear-gradient(135deg,#7c3aed,#a855f7)' },
  { emoji: 'ðŸ’«', text: 'You are the rarest kind of magic â€” the kind that turns ordinary moments into cosmic events. The world is so much brighter because you exist in it.', from: 'â€” The Stars â­', gradient: 'linear-gradient(135deg,#fbbf24,#f59e0b)' },
  { emoji: 'ðŸŒ¿', text: 'On your birthday, I thank God for the wonderful gift of your friendship. May this new chapter of your life be filled with His richest blessings and favor.', from: 'â€” A Grateful Heart ðŸ’–',  gradient: 'linear-gradient(135deg,#10b981,#06b6d4)' }
];

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
//  COSMIC CANVAS â€” Stars & Mouse Particles
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
(function initCosmicCanvas() {
  const canvas = document.getElementById('cosmicCanvas');
  const ctx = canvas.getContext('2d');
  let W, H, stars = [], particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    initStars();
  }
  function initStars() {
    stars = [];
    const count = Math.min(260, Math.floor((W * H) / 5500));
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.8 + 0.3,
        a: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.008 + 0.002,
        color: ['#ffffff','#c084fc','#f472b6','#fbbf24','#93c5fd'][Math.floor(Math.random() * 5)],
      });
    }
  }
  function spawnParticle(x, y) {
    if (particles.length > 80) return;
    const colors = ['#a855f7','#ec4899','#fbbf24','#3b82f6','#fff'];
    for (let i = 0; i < 3; i++) {
      particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 2.4,
        vy: (Math.random() - 0.5) * 2.4,
        r: Math.random() * 3 + 1,
        life: 1,
        decay: Math.random() * 0.025 + 0.01,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const s of stars) {
      s.a += s.speed;
      const alpha = (Math.sin(s.a) + 1) / 2 * 0.85 + 0.15;
      ctx.globalAlpha = alpha;
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.color; ctx.fill();
    }
    ctx.globalAlpha = 1;
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy; p.vy += 0.04; p.life -= p.decay;
      if (p.life <= 0) { particles.splice(i, 1); continue; }
      ctx.globalAlpha = p.life;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color; ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', e => spawnParticle(e.clientX, e.clientY));
  window.addEventListener('touchmove', e => {
    const t = e.touches[0]; spawnParticle(t.clientX, t.clientY);
  }, { passive: true });
  resize(); draw();
})();

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
//  NAVIGATION
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
(function initNav() {
  const navbar   = document.getElementById('navbar');
  const toggle   = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const links    = navLinks.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    let current = '';
    document.querySelectorAll('section[id]').forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
  });
  toggle.addEventListener('click', () => {
    const open = toggle.classList.toggle('open');
    navLinks.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open.toString());
  });
  links.forEach(l => l.addEventListener('click', () => {
    toggle.classList.remove('open'); navLinks.classList.remove('open'); toggle.setAttribute('aria-expanded','false');
  }));
})();

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
//  SECRET SCRATCH CARD
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
(function initScratchCard() {
  const canvas = document.getElementById('scratchCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let isDrawing = false;
  let scratched = false;

  // Resize canvas to cover the container
  function resize() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
    
    // Draw the golden scratch layer
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#fbbf24'); // Gold
    gradient.addColorStop(0.5, '#f59e0b'); // Darker gold
    gradient.addColorStop(1, '#d97706'); // Even darker
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add some noise/texture to look like scratch material
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    for(let i=0; i<1000; i++) {
      ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
    }
    
    // Add text on top of the scratch layer
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 24px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SCRATCH HERE', canvas.width/2, canvas.height/2);
  }
  
  window.addEventListener('resize', () => { if(!scratched) resize(); });
  resize();

  function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  function scratch(e) {
    if (!isDrawing) return;
    e.preventDefault();
    const pos = getMousePos(e);
    
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 40, 0, Math.PI * 2);
    ctx.fill();
    scratched = true;
  }

  canvas.addEventListener('mousedown', e => { isDrawing = true; scratch(e); });
  canvas.addEventListener('mousemove', scratch);
  window.addEventListener('mouseup', () => isDrawing = false);

  canvas.addEventListener('touchstart', e => { isDrawing = true; scratch(e); }, {passive: false});
  canvas.addEventListener('touchmove', scratch, {passive: false});
  window.addEventListener('touchend', () => isDrawing = false);
})();




// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
//  COSMIC ENVELOPE LETTER
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
(function initEnvelopeLetter() {
  const envelope     = document.getElementById('envelope');
  const envFlap      = document.getElementById('envFlap');
  const envSeal      = document.getElementById('envSeal');
  const envHint      = document.getElementById('envHint');
  const letterReveal = document.getElementById('letterReveal');
  const closeBtn     = document.getElementById('letterCloseBtn');
  const ltrDate      = document.getElementById('ltrDate');
  if (!envelope) return;

  // Set today's date
  if (ltrDate) {
    const d = new Date();
    ltrDate.textContent = d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  let opened = false;

  function openEnvelope() {
    if (opened) return;
    opened = true;
    envelope.setAttribute('aria-expanded', 'true');
    envSeal.classList.add('cracked');
    setTimeout(() => envFlap.classList.add('open'), 350);
    setTimeout(() => {
      envelope.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      envelope.style.opacity = '0';
      envelope.style.transform = 'scale(0.9) translateY(-20px)';
      envelope.style.pointerEvents = 'none';
      if (envHint) envHint.style.display = 'none';
    }, 950);
    setTimeout(() => {
      letterReveal.setAttribute('aria-hidden', 'false');
      letterReveal.classList.add('open');
      spawnLetterStars();
    }, 1350);
  }

  function closeEnvelope() {
    letterReveal.classList.remove('open');
    letterReveal.setAttribute('aria-hidden', 'true');
    setTimeout(() => {
      envelope.style.opacity = '1';
      envelope.style.transform = '';
      envelope.style.pointerEvents = '';
      envFlap.classList.remove('open');
      envSeal.classList.remove('cracked');
      if (envHint) envHint.style.display = '';
      opened = false;
      envelope.setAttribute('aria-expanded', 'false');
    }, 600);
  }

  function spawnLetterStars() {
    const scene = document.getElementById('envelopeScene');
    if (!scene) return;
    const icons = ['âœ¦', 'âœ', 'ðŸŒ¿', 'ðŸ’›', 'âœ¨', 'ðŸ•Šï¸'];
    const cols  = ['#fbbf24', '#a855f7', '#ec4899', '#fff', '#10b981'];
    const WISHES_LIST = [
      { text: "May your day be filled with stardust and laughter.", from: "Cosmic Friend", emoji: "âœ¨", gradient: "linear-gradient(135deg,#7c3aed,#ec4899)" },
      { text: "Wishing you a lifetime of joy in every heartbeat.", from: "Universe", emoji: "ðŸ’–", gradient: "linear-gradient(135deg,#f43f5e,#fbbf24)" },
      { text: "May your path be always paved with golden light.", from: "Sunbeam", emoji: "â˜€ï¸", gradient: "linear-gradient(135deg,#fbbf24,#f59e0b)" },
      { text: "To new adventures and endless possibilities.", from: "Explorer", emoji: "ðŸš€", gradient: "linear-gradient(135deg,#3b82f6,#10b981)" },
      { text: "Stay wild, free, and uniquely you always.", from: "Nature", emoji: "ðŸŒ¿", gradient: "linear-gradient(135deg,#10b981,#3b82f6)" },
      { text: "A bouquet of happiness sent straight to you.", from: "Garden", emoji: "ðŸŒ¸", gradient: "linear-gradient(135deg,#ec4899,#a855f7)" }
    ];
    for (let i = 0; i < 16; i++) {
      const s = document.createElement('span');
      const cx = (Math.random() - 0.5) * 200;
      const cy = -(Math.random() * 160 + 60);
      s.style.cssText = [
        'position:absolute', 'pointer-events:none', 'z-index:10',
        'font-size:' + (Math.random() * 12 + 8) + 'px',
        'color:' + cols[Math.floor(Math.random() * cols.length)],
        'left:' + (Math.random() * 80 + 10) + '%',
        'top:' + (Math.random() * 60 + 20) + '%',
        'opacity:1',
        'animation:confDot ' + (0.8 + Math.random() * 0.8) + 's ease-out forwards',
        '--cx:' + cx + 'px',
        '--cy:' + cy + 'px',
      ].join(';');
      s.textContent = icons[Math.floor(Math.random() * icons.length)];
      scene.appendChild(s);
      setTimeout(() => s.remove(), 1700);
    }
  }

  envelope.addEventListener('click', openEnvelope);
  envelope.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openEnvelope(); });
  closeBtn.addEventListener('click', closeEnvelope);

  // Auto-open when scrolled into view
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { setTimeout(openEnvelope, 700); obs.disconnect(); }
  }, { threshold: 0.5 });
  obs.observe(envelope);
})();


// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
//  GIFT BOX
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
(function initGiftBox() {
  const box    = document.getElementById('giftBox');
  const lid    = document.getElementById('giftLid');
  const hint   = document.getElementById('giftHint');
  const reveal = document.getElementById('giftReveal');
  let opened = false;

  function openGift() {
    if (opened) return;
    opened = true;
    lid.classList.add('opened');
    hint.style.display = 'none';
    box.setAttribute('aria-expanded', 'true');
    setTimeout(() => {
      reveal.classList.add('open');
      reveal.removeAttribute('aria-hidden');
      launchConfettiDots();
    }, 600);
  }
  box.addEventListener('click', openGift);
  box.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openGift(); });
})();

function launchConfettiDots() {
  const colors = ['#fbbf24','#ec4899','#a855f7','#3b82f6','#10b981'];
  for (let i = 0; i < 50; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position:fixed; z-index:9999; pointer-events:none;
      width:${Math.random()*8+4}px; height:${Math.random()*8+4}px;
      border-radius:50%;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      left:${40+Math.random()*20}%;
      top:${50+Math.random()*10}%;
      animation:confDot ${0.8+Math.random()*0.8}s ease-out forwards;
      --cx:${(Math.random()-0.5)*400}px;
      --cy:${-(Math.random()*300+100)}px;
    `;
    document.body.appendChild(dot);
    setTimeout(() => dot.remove(), 1600);
  }
}
// Inject confetti keyframe
(function() {
  const s = document.createElement('style');
  s.textContent = `@keyframes confDot { from{transform:translate(0,0) scale(1);opacity:1} to{transform:translate(var(--cx),var(--cy)) scale(0.2);opacity:0} }`;
  document.head.appendChild(s);
})();

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
//  MUSIC PLAYER (simulated)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
(function initMusicPlayer() {
  const playBtn   = document.getElementById('playBtn');
  const prevBtn   = document.getElementById('prevBtn');
  const nextBtn   = document.getElementById('nextBtn');
  const albumArt  = document.querySelector('.album-vinyl');
  const fill      = document.getElementById('progressFill');
  const thumb     = document.getElementById('progressThumb');
  const timeCurr  = document.getElementById('timeCurrent');
  const timeTotal = document.getElementById('timeTotal');
  const trackName = document.getElementById('trackName');
  const trackArt  = document.getElementById('trackArtist');
  const eq        = document.getElementById('equalizer');
  const progressBar = document.getElementById('progressBar');
  const tracks = [
    { name: 'Birthday Cosmic Vibes',   artist: 'The Universe ft. Best Friends', dur: 210, emoji: 'ðŸŽ‚' },
    { name: 'Floating on Stardust',    artist: 'Galaxy Orchestra',              dur: 195, emoji: 'â­' },
    { name: 'Anti-Gravity Love Song',  artist: 'Cosmic Hearts',                 dur: 228, emoji: 'ðŸ’–' },
    { name: 'Celebration in Zero-G',   artist: 'Space Fiesta Band',             dur: 183, emoji: 'ðŸŽ‰' },
  ];
  let currentTrack = 0, playing = false, elapsed = 0, timer = null;
  function fmt(s) { return `${Math.floor(s/60)}:${Math.floor(s%60).toString().padStart(2,'0')}`; }
  function loadTrack(i) {
    const t = tracks[i]; trackName.textContent = t.name; trackArt.textContent = t.artist;
    albumArt.textContent = t.emoji; timeTotal.textContent = fmt(t.dur); elapsed = 0; updateProgress();
  }
  function updateProgress() {
    const t = tracks[currentTrack]; const pct = (elapsed / t.dur) * 100;
    fill.style.width = pct + '%'; thumb.style.left = pct + '%'; timeCurr.textContent = fmt(elapsed);
  }
  function togglePlay() {
    playing = !playing; playBtn.textContent = playing ? 'â¸' : 'â–¶';
    albumArt.classList.toggle('playing', playing); eq.classList.toggle('playing', playing);
    if (playing) { timer = setInterval(() => { elapsed++; if (elapsed >= tracks[currentTrack].dur) { elapsed = 0; currentTrack = (currentTrack + 1) % tracks.length; loadTrack(currentTrack); } updateProgress(); }, 1000); }
    else clearInterval(timer);
  }
  playBtn.addEventListener('click', togglePlay);
  prevBtn.addEventListener('click', () => { currentTrack = (currentTrack - 1 + tracks.length) % tracks.length; elapsed = 0; loadTrack(currentTrack); if (playing) { clearInterval(timer); playing = false; togglePlay(); } });
  nextBtn.addEventListener('click', () => { currentTrack = (currentTrack + 1) % tracks.length; elapsed = 0; loadTrack(currentTrack); if (playing) { clearInterval(timer); playing = false; togglePlay(); } });
  progressBar.addEventListener('click', e => { const r = progressBar.getBoundingClientRect(); elapsed = Math.floor(((e.clientX - r.left) / r.width) * tracks[currentTrack].dur); updateProgress(); });
  loadTrack(0);
})();

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
//  FIREWORKS (Finale)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
(function initFireworks() {
  const canvas = document.getElementById('fireworksCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, fireworks = [], confetti2 = [], animating = false;
  function resize() { const p = canvas.parentElement; W = canvas.width = p.offsetWidth; H = canvas.height = p.offsetHeight; }

  class Firework {
    constructor() {
      this.x = Math.random() * W; this.y = H;
      this.tx = Math.random() * W; this.ty = Math.random() * H * 0.65;
      const speed = Math.random() * 4 + 3;
      const angle = Math.atan2(this.ty - this.y, this.tx - this.x);
      this.vx = Math.cos(angle) * speed; this.vy = Math.sin(angle) * speed;
      this.trail = []; this.exploded = false; this.particles = [];
      this.palette = ['#7c3aed','#ec4899','#fbbf24','#3b82f6','#f43f5e','#10b981','#f97316','#fff'];
      this.color = this.palette[Math.floor(Math.random() * this.palette.length)];
    }
    update() {
      if (!this.exploded) {
        this.trail.push({ x: this.x, y: this.y }); if (this.trail.length > 14) this.trail.shift();
        this.x += this.vx; this.y += this.vy;
        if (Math.hypot(this.x - this.tx, this.y - this.ty) < Math.abs(this.vx) + Math.abs(this.vy)) this.explode();
      } else {
        for (let i = this.particles.length - 1; i >= 0; i--) {
          const p = this.particles[i]; p.x += p.vx; p.y += p.vy; p.vy += 0.09; p.life -= 0.016;
          if (p.life <= 0) this.particles.splice(i, 1);
        }
      }
    }
    explode() {
      this.exploded = true;
      const count = 80 + Math.floor(Math.random() * 50);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = Math.random() * 5 + 1.5;
        this.particles.push({ x: this.x, y: this.y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, color: this.palette[Math.floor(Math.random() * this.palette.length)], life: Math.random() * 0.5 + 0.6, r: Math.random() * 3 + 1 });
      }
      addConfetti(this.x, this.y, 24);
    }
    draw() {
      if (!this.exploded) {
        ctx.lineWidth = 2; ctx.beginPath();
        this.trail.forEach((p, i) => { ctx.globalAlpha = i / this.trail.length; i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y); });
        ctx.strokeStyle = this.color; ctx.stroke(); ctx.globalAlpha = 1;
      } else {
        for (const p of this.particles) { ctx.globalAlpha = p.life; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = p.color; ctx.fill(); }
        ctx.globalAlpha = 1;
      }
    }
    isDone() { return this.exploded && this.particles.length === 0; }
  }

  function addConfetti(x, y, n) {
    const cols = ['#fbbf24','#ec4899','#a855f7','#3b82f6','#10b981','#f97316'];
    for (let i = 0; i < n; i++) {
      confetti2.push({ x, y, vx: (Math.random()-0.5)*8, vy: Math.random()*-6-2, color: cols[Math.floor(Math.random()*cols.length)], r: Math.random()*6+3, rot: Math.random()*Math.PI*2, rotSpeed: (Math.random()-0.5)*0.2, life: 1 });
    }
  }
  function drawConfetti() {
    for (let i = confetti2.length - 1; i >= 0; i--) {
      const c = confetti2[i]; c.x += c.vx; c.y += c.vy; c.vy += 0.15; c.rot += c.rotSpeed; c.life -= 0.012;
      if (c.life <= 0) { confetti2.splice(i, 1); continue; }
      ctx.globalAlpha = c.life; ctx.save(); ctx.translate(c.x, c.y); ctx.rotate(c.rot); ctx.fillStyle = c.color;
      ctx.fillRect(-c.r, -c.r/2, c.r*2, c.r); ctx.restore();
    }
    ctx.globalAlpha = 1;
  }

  let fwInt = null;
  function startFireworks(auto) {
    if (animating && !auto) return;
    animating = true; let count = 0;
    fwInt = setInterval(() => { fireworks.push(new Firework()); count++; if (count >= (auto ? 12 : 22)) clearInterval(fwInt); }, auto ? 400 : 250);
    animate();
  }
  function animate() {
    ctx.clearRect(0, 0, W, H);
    fireworks.forEach((f, i) => { f.update(); f.draw(); }); fireworks = fireworks.filter(f => !f.isDone());
    drawConfetti();
    if (fireworks.length > 0 || confetti2.length > 0) requestAnimationFrame(animate);
    else { animating = false; ctx.clearRect(0, 0, W, H); }
  }

  window.addEventListener('resize', resize);
  resize();

  const btnOpenWishes = document.getElementById('btnOpenWishes');
  const wishesModal = document.getElementById('wishesModal');
  const wishesClose = document.getElementById('wishesClose');
  
  if (btnOpenWishes && wishesModal) {
    btnOpenWishes.addEventListener('click', function(e) {
      e.preventDefault();
      wishesModal.style.opacity = '1';
      wishesModal.style.pointerEvents = 'auto';
      wishesModal.style.display = 'flex';
      wishesModal.classList.add('open');
      startFireworks(false);
    });
    
    if (wishesClose) {
      wishesClose.addEventListener('click', () => {
        wishesModal.style.opacity = '0';
        wishesModal.style.pointerEvents = 'none';
        wishesModal.classList.remove('open');
      });
    }
    
    wishesModal.addEventListener('click', (e) => {
      if (e.target === wishesModal) {
        wishesModal.style.opacity = '0';
        wishesModal.style.pointerEvents = 'none';
        wishesModal.classList.remove('open');
      }
    });
  }
})();

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
//  INTERSECTION OBSERVER â€” reveal animations
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
(function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
})();

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
//  PARALLAX
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
(function initParallax() {
  const hero = document.getElementById('hero');
  const content = document.querySelector('.hero-content');
  const floaters = document.querySelectorAll('.floater');
  window.addEventListener('scroll', () => {
    const s = window.scrollY; const h = hero.offsetHeight;
    if (s < h) {
      content.style.transform = `translateY(${s * 0.3}px)`;
      floaters.forEach((f, i) => { f.style.transform = `translateY(${s * (0.1 + (i%4)*0.08)}px)`; });
    }
  }, { passive: true });
})();

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
//  SMOOTH SCROLL
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const t = document.querySelector(this.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
//  PAGE LOAD sparkle
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
window.addEventListener('load', () => {
  const cols = ['#fbbf24','#a855f7','#ec4899','#fff'];
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      const s = document.createElement('div');
      s.style.cssText = `position:fixed;width:6px;height:6px;border-radius:50%;background:${cols[Math.floor(Math.random()*cols.length)]};left:${Math.random()*100}vw;top:${Math.random()*60}vh;pointer-events:none;z-index:9999;animation:confDot 1.5s ease forwards;--cx:${(Math.random()-.5)*200}px;--cy:${(Math.random()-.5)*200}px;box-shadow:0 0 10px currentColor;`;
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 1600);
    }, i * 150 + 200);
  }
});
