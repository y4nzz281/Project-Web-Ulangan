/* ============================================
   PIXEL QUIZ RPL — 8-Bit Academy
   script.js
   ============================================ */

// ── DATA SOAL ──────────────────────────────
const Q = [
  { c:"RPL Dasar", q:"Apa kepanjangan dari RPL dalam konteks teknologi informasi?", o:["Rekayasa Perangkat Lunak","Rancangan Program Lengkap","Rekayasa Program Lanjutan","Rencana Pengembangan Logika"], a:0, x:"RPL adalah singkatan dari Rekayasa Perangkat Lunak." },
  { c:"RPL Dasar", q:"Model SDLC yang menggunakan pendekatan iteratif dan inkremental adalah...", o:["Waterfall","Agile","V-Model","Spiral"], a:1, x:"Model Agile menggunakan pendekatan iteratif dengan sprint-sprint pendek." },
  { c:"RPL Dasar", q:"Fase dalam SDLC yang bertugas mengidentifikasi kebutuhan pengguna disebut...", o:["Testing","Implementation","Requirements Analysis","Maintenance"], a:2, x:"Requirements Analysis adalah fase untuk mengidentifikasi kebutuhan pengguna dan sistem." },
  { c:"RPL Dasar", q:"Diagram UML yang menggambarkan hubungan antara aktor dan fungsi sistem disebut...", o:["Class Diagram","Sequence Diagram","Use Case Diagram","Activity Diagram"], a:2, x:"Use Case Diagram menggambarkan interaksi antara aktor dengan fungsi sistem." },
  { c:"HTML", q:"Tag HTML untuk membuat tautan (hyperlink) ke halaman lain adalah...", o:["<link>","<a>","<href>","<nav>"], a:1, x:"Tag <a> (anchor) digunakan untuk membuat hyperlink." },
  { c:"HTML", q:"Atribut yang memberikan teks alternatif pada gambar HTML adalah...", o:["title","src","alt","name"], a:2, x:"Atribut alt pada tag <img> memberikan deskripsi gambar untuk aksesibilitas." },
  { c:"HTML", q:"Tag HTML5 semantik yang mendefinisikan bagian navigasi halaman adalah...", o:["<header>","<menu>","<nav>","<aside>"], a:2, x:"Tag <nav> adalah elemen semantik HTML5 untuk navigasi utama halaman." },
  { c:"HTML", q:"Atribut yang menghubungkan elemen <label> dengan <input> di form HTML adalah...", o:["name","id","class","for"], a:3, x:"Atribut for pada <label> dihubungkan dengan atribut id pada <input>." },
  { c:"HTML", q:"Tag untuk membuat daftar terurut (ordered list) di HTML adalah...", o:["<ul>","<li>","<ol>","<list>"], a:2, x:"<ol> membuat daftar bernomor, sedangkan <ul> membuat daftar bullet." },
  { c:"CSS", q:"Property CSS yang digunakan untuk mengubah warna teks adalah...", o:["text-color","font-color","color","background-color"], a:2, x:"Property color pada CSS mengatur warna teks." },
  { c:"CSS", q:"Penulisan CSS inline yang benar adalah...", o:['<p class="color:red">','<p style="color:red;">','<p css="color:red;">','<style>p{color:red}</style>'], a:1, x:"CSS inline ditulis menggunakan atribut style langsung pada elemen HTML." },
  { c:"CSS", q:"Properti CSS untuk mengatur jarak di luar border elemen adalah...", o:["padding","border","margin","spacing"], a:2, x:"Margin mengatur jarak di luar border elemen." },
  { c:"CSS", q:"Nilai display CSS yang mengaktifkan model tata letak fleksibel adalah...", o:["block","inline","flex","grid"], a:2, x:"display: flex mengaktifkan Flexbox Layout." },
  { c:"JavaScript", q:"Cara deklarasi variabel di JavaScript modern (ES6+) yang nilainya tidak dapat diubah adalah...", o:["var","let","const","static"], a:2, x:"const digunakan untuk mendeklarasikan variabel konstanta." },
  { c:"JavaScript", q:"Fungsi JavaScript untuk menampilkan kotak dialog pop-up kepada pengguna adalah...", o:["console.log()","document.write()","alert()","print()"], a:2, x:"alert() menampilkan kotak dialog dengan pesan dan tombol OK." },
  { c:"JavaScript", q:"Metode array JavaScript untuk menambahkan elemen baru di akhir array adalah...", o:["push()","pop()","shift()","unshift()"], a:0, x:"push() menambahkan elemen ke akhir array." },
  { c:"JavaScript", q:"Operator perbandingan JavaScript yang membandingkan nilai DAN tipe data adalah...", o:["==","=","===","!=="], a:2, x:"=== (strict equality) membandingkan nilai dan tipe data sekaligus." },
  { c:"PHP", q:"Tag pembuka kode PHP yang benar adalah...", o:["<php>","<?php","<script php>","[php]"], a:1, x:"Kode PHP selalu dimulai dengan tag pembuka <?php." },
  { c:"PHP", q:"Perintah PHP untuk menampilkan output ke browser adalah...", o:["print_r()","var_dump()","echo","return"], a:2, x:"echo digunakan untuk menampilkan satu atau lebih string ke output." },
  { c:"PHP", q:"Superglobal PHP yang mengambil data dari form dengan metode POST adalah...", o:["$_GET","$_POST","$_REQUEST","$_SESSION"], a:1, x:"$_POST menyimpan data yang dikirimkan melalui form dengan method='POST'." }
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
