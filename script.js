/* ============================================
   PIXEL QUIZ RPL — 8-Bit Academy
   script.js
   ============================================ */

// ── DATA SOAL ──────────────────────────────
const Q = [
  // ── RPL DASAR (2 soal) ──
  { c:"RPL Dasar", q:"Apa kepanjangan dari RPL?", o:["Rekayasa Perangkat Lunak","Rancangan Program Lengkap","Rekayasa Program Lanjutan","Rencana Pengembangan Logika"], a:0, x:"RPL adalah singkatan dari Rekayasa Perangkat Lunak." },
  { c:"RPL Dasar", q:"Perangkat lunak (software) adalah...", o:["Komponen fisik komputer","Program dan data yang dijalankan komputer","Perangkat keras komputer","Jaringan komputer"], a:1, x:"Software adalah kumpulan program dan data yang dijalankan oleh komputer, berbeda dengan hardware yang bersifat fisik." },

  // ── HTML (8 soal) ──
  { c:"HTML", q:"Kepanjangan dari HTML adalah...", o:["Hyper Text Markup Language","High Transfer Markup Language","Hyper Transfer Mode Language","Home Tool Markup Language"], a:0, x:"HTML singkatan dari Hyper Text Markup Language, bahasa standar untuk membuat halaman web." },
  { c:"HTML", q:"Tag HTML yang digunakan untuk membuat judul terbesar adalah...", o:["<h6>","<h3>","<h1>","<title>"], a:2, x:"Tag <h1> adalah heading terbesar di HTML, sedangkan <h6> adalah yang terkecil." },
  { c:"HTML", q:"Tag HTML untuk membuat paragraf adalah...", o:["<br>","<p>","<div>","<span>"], a:1, x:"Tag <p> digunakan untuk membuat paragraf teks di HTML." },
  { c:"HTML", q:"Tag HTML untuk membuat tautan (hyperlink) adalah...", o:["<link>","<a>","<href>","<nav>"], a:1, x:"Tag <a> (anchor) digunakan untuk membuat hyperlink ke halaman lain." },
  { c:"HTML", q:"Tag HTML yang digunakan untuk menampilkan gambar adalah...", o:["<picture>","<media>","<src>","<img>"], a:3, x:"Tag <img> digunakan untuk menampilkan gambar dengan atribut src sebagai lokasi file gambar." },
  { c:"HTML", q:"Tag untuk membuat daftar tidak terurut (bullet list) di HTML adalah...", o:["<ol>","<li>","<ul>","<list>"], a:2, x:"<ul> (unordered list) membuat daftar dengan bullet, sedangkan <ol> membuat daftar bernomor." },
  { c:"HTML", q:"Tag HTML yang digunakan untuk membuat teks tebal adalah...", o:["<i>","<u>","<b>","<s>"], a:2, x:"Tag <b> digunakan untuk membuat teks tampil tebal (bold) di HTML." },
  { c:"HTML", q:"Atribut pada tag <img> yang memberikan teks alternatif gambar adalah...", o:["title","src","alt","name"], a:2, x:"Atribut alt memberikan deskripsi gambar untuk aksesibilitas dan ditampilkan jika gambar gagal dimuat." },

  // ── CSS (5 soal) ──
  { c:"CSS Dasar", q:"Kepanjangan dari CSS adalah...", o:["Creative Style Sheet","Cascading Style Sheet","Computer Style Sheet","Colorful Style Sheet"], a:1, x:"CSS singkatan dari Cascading Style Sheets, digunakan untuk mengatur tampilan halaman HTML." },
  { c:"CSS Dasar", q:"Property CSS untuk mengubah warna teks adalah...", o:["text-color","font-color","color","background-color"], a:2, x:"Property color pada CSS digunakan untuk mengatur warna teks." },
  { c:"CSS Dasar", q:"Property CSS untuk mengubah ukuran huruf adalah...", o:["text-size","font-size","letter-size","word-size"], a:1, x:"Property font-size digunakan untuk mengatur ukuran huruf pada elemen HTML." },
  { c:"CSS Dasar", q:"Property CSS untuk mengatur warna latar belakang elemen adalah...", o:["color","bg-color","background","background-color"], a:3, x:"Property background-color digunakan untuk mengatur warna latar belakang sebuah elemen." },
  { c:"CSS Dasar", q:"Cara penulisan komentar di CSS adalah...", o:["// komentar","<!-- komentar -->","/* komentar */","## komentar"], a:2, x:"Komentar di CSS ditulis dengan /* komentar */ dan tidak akan ditampilkan di browser." },

  // ── PHP (5 soal) ──
  { c:"PHP", q:"Kepanjangan dari PHP adalah...", o:["Personal Home Page","Php Hypertext Preprocessor","Public Home Page","Programming Hypertext Page"], a:1, x:"PHP singkatan dari PHP Hypertext Preprocessor, bahasa pemrograman server-side untuk web." },
  { c:"PHP", q:"Tag pembuka kode PHP yang benar adalah...", o:["<php>","<?php","<script php>","[php]"], a:1, x:"Kode PHP selalu dimulai dengan tag pembuka <?php." },
  { c:"PHP", q:"Simbol yang digunakan untuk mendeklarasikan variabel di PHP adalah...", o:["@","#","$","&"], a:2, x:"Di PHP, semua variabel harus diawali dengan tanda dolar ($), contohnya $nama atau $nilai." },
  { c:"PHP", q:"Perintah PHP untuk menampilkan output ke browser adalah...", o:["print_r()","var_dump()","echo","return"], a:2, x:"echo digunakan untuk menampilkan satu atau lebih string ke output browser." },
  { c:"PHP", q:"Ekstensi file yang digunakan untuk menyimpan kode PHP adalah...", o:[".html",".js",".php",".py"], a:2, x:"File PHP disimpan dengan ekstensi .php agar dapat diproses oleh server." },
];

// ── STATE ──────────────────────────────────
let cur        = 0;
let ans        = new Array(Q.length).fill(null);
let sLeft      = 30 * 60;
let tInt       = null;
let playerName = "PLAYER";

const LETTERS = ['A','B','C','D'];

// ── HELPERS ────────────────────────────────
const $  = id  => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

// ── PIXEL STARS ────────────────────────────
(function initStars() {
  const container = $('pixel-stars');
  if (!container) return;
  for (let i = 0; i < 80; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;--d:${1+Math.random()*3}s;--dl:${Math.random()*3}s;opacity:${0.3+Math.random()*0.7}`;
    container.appendChild(star);
  }
})();

// ── SPEECH BUBBLE ──────────────────────────
const HERO_MSGS = ["SIAP BERTARUNG?","LEVEL UP!","KAMI BISA!","RPL MASTER!","GAME ON!","LET'S GO!"];
let bubbleIdx = 0;
setInterval(() => {
  bubbleIdx = (bubbleIdx + 1) % HERO_MSGS.length;
  const b = $('speech-bubble');
  if (b) b.textContent = HERO_MSGS[bubbleIdx];
}, 3000);

// ── ENTER on name input ─────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const ni = $('player-name');
  if (ni) ni.addEventListener('keydown', e => { if (e.key === 'Enter') startQuiz(); });
});

// ── START ───────────────────────────────────
function startQuiz() {
  const ni  = $('player-name');
  const raw = ni ? ni.value.trim().toUpperCase() : '';
  playerName = raw || 'PLAYER';

  $('home-screen').classList.add('hidden');
  $('quiz-screen').classList.remove('hidden');
  $('hud-name').textContent = '♦ ' + playerName;

  buildDots();
  render();
  startTimer();
}

// ── DOTS ───────────────────────────────────
function buildDots() {
  const c = $('dots');
  c.innerHTML = '';
  Q.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.title = `Soal ${i+1}`;
    d.onclick = () => jump(i);
    c.appendChild(d);
  });
}

function updateDots() {
  $$('.dot').forEach((d, i) => {
    d.className = 'dot';
    if (i === cur)            d.classList.add('active');
    else if (ans[i] !== null) d.classList.add('answered');
  });
}

// ── RENDER ─────────────────────────────────
function render() {
  const q = Q[cur];

  $('q-cat').textContent      = q.c;
  $('q-num').textContent      = `SOAL ${cur+1}/${Q.length}`;
  $('q-text').textContent     = q.q;
  $('hud-stage').textContent  = `★ ${q.c.toUpperCase()} ★`;

  const pct = ((cur+1) / Q.length * 100).toFixed(0);
  $('exp-fill').style.width   = pct + '%';
  $('exp-count').textContent  = `${cur+1}/${Q.length}`;

  // Build options using DOM nodes — textContent prevents <tag> from being parsed as HTML
  const oc = $('opts');
  oc.innerHTML = '';

  q.o.forEach((optText, i) => {
    const div = document.createElement('div');
    div.className = 'opt';
    if (ans[cur] === i) div.classList.add('sel');

    const lt = document.createElement('div');
    lt.className = 'opt-lt';
    lt.textContent = LETTERS[i];          // safe: textContent

    const txt = document.createElement('div');
    txt.className = 'opt-txt';
    txt.textContent = optText;            // safe: textContent — no HTML parsing

    div.appendChild(lt);
    div.appendChild(txt);
    div.onclick = () => pick(i);
    oc.appendChild(div);
  });

  $('fb').style.display = 'none';
  $('btn-prev').disabled = cur === 0;

  const doneCount = ans.filter(a => a !== null).length;
  $('nav-mid').textContent = ans[cur] !== null
    ? `${doneCount} SOAL DIJAWAB`
    : 'PILIH JAWABAN';

  updateDots();
}

// ── PICK — no lock, bisa ganti berkali-kali ─
function pick(i) {
  ans[cur] = i;

  $$('.opt').forEach((o, idx) => {
    o.classList.toggle('sel', idx === i);
    if (idx === i) {
      o.style.transform = 'translate(2px,2px)';
      setTimeout(() => { o.style.transform = ''; }, 80);
    }
  });

  updateDots();
  const done = ans.filter(a => a !== null).length;
  $('nav-mid').textContent = `${done} SOAL DIJAWAB`;
}

// ── NAVIGATE ───────────────────────────────
function go(dir) {
  const next = cur + dir;
  if (next < 0 || next >= Q.length) return;
  cur = next;
  render();
}

function jump(i) { cur = i; render(); }

// ── TIMER ──────────────────────────────────
function startTimer() {
  tInt = setInterval(() => {
    sLeft--;
    const m = Math.floor(sLeft/60).toString().padStart(2,'0');
    const s = (sLeft%60).toString().padStart(2,'0');
    $('timer-txt').textContent = `${m}:${s}`;
    if (sLeft <= 300) $('timer-box').classList.add('warn');
    if (sLeft <= 0)   { clearInterval(tInt); finishQuiz(); }  // waktu habis = langsung selesai
  }, 1000);
}

// ── CONFIRM POPUP ──────────────────────────
function finish() {
  // Pause — tampilkan dialog konfirmasi pixel
  clearInterval(tInt);
  $('pixel-confirm').classList.remove('hidden');
}

function confirmYes() {
  $('pixel-confirm').classList.add('hidden');
  finishQuiz();
}

function confirmNo() {
  // Lanjutkan timer dari sisa waktu
  $('pixel-confirm').classList.add('hidden');
  startTimer();
}

// ── ACTUAL FINISH ──────────────────────────
function finishQuiz() {
  clearInterval(tInt);

  const correct = Q.filter((q,i) => ans[i] === q.a).length;
  const wrong   = Q.filter((q,i) => ans[i] !== null && ans[i] !== q.a).length;
  const skipped = Q.filter((q,i) => ans[i] === null).length;
  const score   = Math.round(correct / Q.length * 100);

  $('score-n').textContent = score.toString().padStart(3,'0');
  $('s-ok').textContent    = correct;
  $('s-err').textContent   = wrong;
  $('s-skip').textContent  = skipped;

  let subtitle, msg, gradeClass, gradeLetter, gradeDesc;
  if (score >= 85) {
    subtitle = `${playerName} MENANG!`;
    msg = '★ SEMPURNA! Kamu adalah master RPL sejati! Pertahankan prestasi hebat ini!';
    gradeClass = 'gA'; gradeLetter = 'A'; gradeDesc = 'SANGAT MEMUASKAN';
  } else if (score >= 70) {
    subtitle = `GG ${playerName}!`;
    msg = '▶ BAGUS! Kamu sudah memahami materi dengan baik. Terus tingkatkan kemampuanmu!';
    gradeClass = 'gB'; gradeLetter = 'B'; gradeDesc = 'MEMUASKAN';
  } else {
    subtitle = `${playerName} KEEP TRYING!`;
    msg = '♻ SEMANGAT! Masih ada ruang untuk berkembang. Retry dan raih skor lebih tinggi!';
    gradeClass = 'gC'; gradeLetter = 'C'; gradeDesc = 'PERLU DITINGKATKAN';
  }

  $('res-subtitle').textContent = subtitle;
  $('res-sub').textContent      = msg;

  const ge = $('grade-el');
  ge.className = 'grade-badge ' + gradeClass;
  $('grade-letter').textContent = gradeLetter;
  $('grade-desc').textContent   = gradeDesc;

  $$('.dot').forEach((d,i) => {
    if      (ans[i] === null)   d.className = 'dot';
    else if (ans[i] === Q[i].a) d.className = 'dot correct';
    else                         d.className = 'dot wrong';
  });

  $('quiz-screen').classList.add('hidden');
  $('result-screen').classList.remove('hidden');
}

// ── GO HOME ────────────────────────────────
function goHome() {
  clearInterval(tInt);
  ans = new Array(Q.length).fill(null);
  cur = 0; sLeft = 30*60;
  $('timer-box').classList.remove('warn');
  $('timer-txt').textContent = '30:00';
  $('result-screen').classList.add('hidden');
  $('home-screen').classList.remove('hidden');
  const ni = $('player-name');
  if (ni) ni.value = '';
}

// ── RETRY ──────────────────────────────────
function retry() {
  clearInterval(tInt);
  ans = new Array(Q.length).fill(null);
  cur = 0; sLeft = 30*60;
  $('timer-box').classList.remove('warn');
  $('timer-txt').textContent = '30:00';
  $('result-screen').classList.add('hidden');
  $('quiz-screen').classList.remove('hidden');
  $('hud-name').textContent = '♦ ' + playerName;
  buildDots();
  render();
  startTimer();
}
