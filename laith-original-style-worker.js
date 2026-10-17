export default {
  async fetch(request) {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Laith Al-Dahash — Web Developer</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Cairo:wght@400;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet"/>
  <link rel="icon" type="image/jpeg" href="./icon.jpg"/>
<meta name="description" content="Laith Al-Dahash - Web & python Developer from Iraq. Building modern web"/>
<meta name="theme-color" content="#c8a880"/>
<meta name="apple-mobile-web-app-capable" content="yes"/>
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
<meta name="apple-mobile-web-app-title" content="Laith Al-Dahash"/>
<meta property="og:title" content="Laith Al-Dahash — Web Developer"/>
<meta property="og:description" content="Building high-performance web applications with a focus on user experience and clean code."/>
<meta property="og:image" content="./icon.jpg"/>
<meta property="og:type" content="website"/>
  <style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;min-height:100%;background:#080a10;color-scheme:dark}
html::after{content:'';position:fixed;inset:0;z-index:999;pointer-events:none;opacity:.025;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:180px 180px}
body{--accent:#7188ff;--accent-bright:#a1b0ff;--accent-hot:#ff704f;--accent-dim:#5369d7;--accent-bg:rgba(113,136,255,.12);--card:#111722;--text-h:#f1f2f5;--text-b:#c0c5d0;--text-m:#929aaa;--text-d:#687182;--text-dim:#4b5361;--skill-txt:#e3e6ee;color:var(--text-h);font-family:'Inter','Segoe UI',sans-serif;overflow-x:hidden;min-height:100vh;background:#080a10}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#080a10}::-webkit-scrollbar-thumb{background:var(--accent);border-radius:0}
@keyframes spin-slow{from{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes pulse-ring{0%{transform:scale(1);opacity:.5}100%{transform:scale(1.65);opacity:0}}@keyframes float-y{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}@keyframes logo-scroll{0%{transform:translateX(-50%)}100%{transform:translateX(0)}}@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
.glow{position:fixed;pointer-events:none;z-index:0;filter:blur(3px)}.glow-tr{top:-16%;right:-8%;width:68vw;height:68vw;background:radial-gradient(circle at top right,rgba(87,116,255,.17),transparent 58%)}.glow-bl{bottom:-14%;left:-7%;width:54vw;height:54vw;background:radial-gradient(circle at bottom left,rgba(255,112,79,.1),transparent 62%)}
nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:0 6%;height:68px;display:flex;align-items:center;justify-content:space-between;background:rgba(8,10,16,.68);border-bottom:1px solid transparent;transition:background .3s,border-color .3s;backdrop-filter:blur(14px)}nav.scrolled{background:rgba(8,10,16,.94);border-bottom-color:rgba(145,160,255,.18)}.brand{font-family:'JetBrains Mono',monospace;font-weight:700;font-size:1.02rem;color:var(--accent-bright);letter-spacing:.04em;text-decoration:none;text-shadow:0 0 24px rgba(113,136,255,.25)}.nav-links{display:flex;gap:30px}.nav-links a{color:var(--text-m);text-decoration:none;font-size:.82rem;font-weight:600;letter-spacing:.03em;transition:color .2s;position:relative;padding-bottom:4px}.nav-links a:hover{color:var(--text-h)}.nav-links a::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1px;background:var(--accent-hot);transition:width .25s}.nav-links a:hover::after{width:100%}
section{position:relative;z-index:1}.section-label{font-size:.68rem;letter-spacing:.22em;text-transform:uppercase;color:var(--accent-bright);margin-bottom:13px;font-weight:700;display:flex;align-items:center;gap:11px}.section-label::before{content:'';display:block;width:26px;height:1px;background:var(--accent-hot);flex-shrink:0}.section-title{font-size:clamp(1.8rem,4vw,2.75rem);font-weight:750;letter-spacing:-.03em;color:var(--text-h)}
/* HERO: retain the original content and order, restyle its visual language */
#about{min-height:100vh;display:flex;align-items:center;justify-content:center;flex-direction:column;text-align:center;padding:105px 6% 78px;background:transparent;position:relative;overflow:hidden}#about::before{content:'';position:absolute;inset:0;z-index:0;pointer-events:none;background-image:radial-gradient(circle,rgba(132,151,255,.2) 1px,transparent 1px);background-size:34px 34px;mask-image:radial-gradient(ellipse 70% 66% at 50% 48%,#000 8%,transparent 80%);-webkit-mask-image:radial-gradient(ellipse 70% 66% at 50% 48%,#000 8%,transparent 80%)}#about>*{position:relative;z-index:1}.avatar-wrap{position:relative;width:108px;height:108px;margin:0 auto 38px}.pulse-r{position:absolute;inset:-12px;border-radius:0;border:1px solid rgba(113,136,255,.72);transform:rotate(45deg)}.pulse-r:nth-child(1){opacity:.3;animation:pulse-ring 2.8s ease-out infinite}.pulse-r:nth-child(2){opacity:.15;animation:pulse-ring 2.8s ease-out .9s infinite}.orbit-wrap{position:absolute;inset:-4px;animation:spin-slow 18s linear infinite}.orbit-dot{position:absolute;top:-4px;left:50%;transform:translateX(-50%);width:8px;height:8px;background:var(--accent-hot);box-shadow:0 0 15px rgba(255,112,79,.8)}.avatar-core{width:108px;height:108px;border-radius:0;background:linear-gradient(145deg,#131b31,#0c1019);border:1px solid rgba(145,160,255,.5);box-shadow:0 0 48px rgba(87,116,255,.14),inset 0 0 30px rgba(87,116,255,.07);display:flex;align-items:center;justify-content:center}.avatar-core svg{stroke:var(--accent-bright)}.hero-tag{font-size:.68rem;letter-spacing:.2em;font-weight:700;text-transform:uppercase;color:var(--accent-bright);margin-bottom:17px;display:inline-flex;align-items:center;gap:10px}.hero-tag::before,.hero-tag::after{content:'';display:block;width:20px;height:1px;background:var(--accent-hot);opacity:.8}.hero-name{font-size:clamp(2.7rem,7vw,5.1rem);font-weight:750;letter-spacing:-.045em;line-height:1.08;margin-bottom:10px;color:#f4f3ef;text-shadow:0 4px 45px rgba(0,0,0,.5)}.hero-alias{font-family:'JetBrains Mono',monospace;font-size:clamp(.95rem,2.2vw,1.12rem);color:var(--accent-bright);margin-bottom:27px;letter-spacing:.05em}.cursor{color:var(--accent-hot);animation:blink 1.1s step-end infinite}.hero-desc{max-width:610px;line-height:2;font-size:.98rem;color:var(--text-b);margin-bottom:34px;font-family:'Cairo',sans-serif;direction:rtl}.hero-desc em{color:#fff;font-style:normal;font-weight:700}.hero-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}.btn-primary{padding:13px 30px;background:var(--accent);border:1px solid var(--accent);border-radius:2px;color:#fff;font-weight:700;font-size:.88rem;text-decoration:none;letter-spacing:.03em;cursor:pointer;box-shadow:0 8px 26px rgba(87,116,255,.22);transition:all .25s}.btn-primary:hover{background:#8194ff;transform:translateY(-2px);box-shadow:0 12px 32px rgba(87,116,255,.34)}.btn-primary::before{content:none}.btn-outline{padding:13px 30px;background:rgba(16,20,29,.45);border:1px solid rgba(211,218,239,.22);border-radius:2px;color:var(--text-b);font-weight:650;font-size:.88rem;text-decoration:none;letter-spacing:.03em;transition:all .25s}.btn-outline:hover{background:rgba(113,136,255,.1);color:#fff;border-color:var(--accent-hot);transform:translateY(-2px)}.scroll-hint{position:absolute;bottom:25px;left:50%;transform:translateX(-50%);color:var(--text-d);animation:float-y 2.2s ease-in-out infinite;display:flex;flex-direction:column;align-items:center;gap:5px}.scroll-hint span{font-size:.6rem;letter-spacing:.2em;text-transform:uppercase}
/* TECH TICKER */
.ticker-wrap{border-block:1px solid var(--line);padding:18px 0;overflow:hidden;position:relative;z-index:1;background:#0d1119}.ticker-fade{position:absolute;top:0;bottom:0;width:110px;z-index:2;pointer-events:none}.ticker-fade.left{left:0;background:linear-gradient(to right,#0d1119,transparent)}.ticker-fade.right{right:0;background:linear-gradient(to left,#0d1119,transparent)}.ticker-track{display:flex;align-items:center;width:max-content;animation:logo-scroll 34s linear infinite}.logo-cell{width:78px;height:48px;flex-shrink:0;display:flex;align-items:center;justify-content:center;border-right:1px solid rgba(213,220,244,.1)}.logo-cell img{width:30px;height:30px;object-fit:contain;filter:grayscale(1) brightness(0) invert(1);opacity:.62;transition:filter .3s,opacity .3s,transform .3s;display:block}.logo-cell img:hover{filter:grayscale(0) brightness(1);opacity:1;transform:scale(1.14)}
/* STATS */
#stats{padding:68px 6%;background:#0c1018;border-block:1px solid rgba(225,232,255,.08)}.stats-grid{max-width:900px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.stat-card{text-align:center;padding:27px 15px;background:linear-gradient(150deg,#151b28,#0f141d);border:1px solid rgba(160,174,255,.17);border-radius:2px;position:relative;box-shadow:inset 0 1px 0 rgba(255,255,255,.035);transition:border-color .25s,transform .25s}.stat-card:hover{border-color:rgba(113,136,255,.55);transform:translateY(-3px)}.stat-card::before{content:'';position:absolute;top:-1px;left:16px;width:30px;height:2px;background:var(--accent-hot)}.stat-value{font-family:'JetBrains Mono',monospace;font-size:clamp(1.8rem,4vw,2.6rem);font-weight:700;color:var(--accent-bright);line-height:1;margin-bottom:11px;text-shadow:0 0 28px rgba(113,136,255,.25)}.stat-label{font-size:.67rem;color:var(--text-m);letter-spacing:.1em;text-transform:uppercase;font-weight:650}
/* SKILLS */
#skills{padding:88px 6%;background:#090c13;position:relative}#skills::after{content:'';position:absolute;bottom:0;left:6%;right:6%;height:1px;background:linear-gradient(90deg,transparent,rgba(113,136,255,.32),transparent)}.skills-inner{max-width:880px;margin:0 auto}.skills-grid{display:grid;grid-template-columns:1fr 1fr;gap:25px 52px}.skill-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}.skill-name{font-size:.84rem;font-weight:650;color:var(--skill-txt);letter-spacing:.02em}.skill-pct{font-size:.72rem;color:var(--accent-bright);font-weight:700;font-family:'JetBrains Mono',monospace}.skill-track{height:3px;background:rgba(199,207,232,.13);border-radius:0;overflow:hidden;position:relative}.skill-fill{height:100%;width:0;border-radius:0;background:linear-gradient(90deg,var(--accent),var(--accent-hot));transition:width 1.4s cubic-bezier(.4,0,.2,1);position:relative}.skill-fill::after{content:'';position:absolute;right:0;top:50%;transform:translateY(-50%);width:7px;height:7px;background:#fff;box-shadow:0 0 9px var(--accent)}.cf-callout{margin-top:43px;padding:22px 25px;background:#101620;border:1px solid rgba(160,174,255,.16);border-right:2px solid var(--accent-hot);border-radius:0;display:flex;gap:18px;align-items:flex-start;position:relative}.cf-callout::before{content:'EDGE';position:absolute;top:13px;left:15px;font:9px 'JetBrains Mono',monospace;letter-spacing:.1em;color:var(--accent);opacity:.7}.cf-callout svg{flex-shrink:0;margin-top:3px;stroke:var(--accent-bright)}.cf-callout h4{font-size:.9rem;font-weight:700;color:var(--text-h);margin-bottom:7px}.cf-callout p{color:var(--text-m);line-height:1.9;font-size:.86rem;font-family:'Cairo',sans-serif;direction:rtl;text-align:right}
/* SERVICES */
#services{padding:88px 6%;background:#0d1119;position:relative}#services::after{content:'';position:absolute;bottom:0;left:6%;right:6%;height:1px;background:linear-gradient(90deg,transparent,rgba(113,136,255,.28),transparent)}.svc-inner{max-width:960px;margin:0 auto}.svc-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.svc-card,.svc-card:nth-child(4n+1),.svc-card:nth-child(4n+2),.svc-card:nth-child(4n+3),.svc-card:nth-child(4n+4){background:#111722;border:1px solid rgba(160,174,255,.16);padding:27px 25px;position:relative;border-radius:2px;clip-path:none;transform:none;box-shadow:none;transition:transform .25s,border-color .25s,background .25s;overflow:hidden}.svc-card::before{content:'';position:absolute;top:0;left:0;width:3px;height:100%;background:linear-gradient(180deg,var(--accent),var(--accent-hot))}.svc-card::after{content:'';position:absolute;right:0;top:0;width:34px;height:34px;border-top:1px solid rgba(161,176,255,.42);border-right:1px solid rgba(161,176,255,.42)}.svc-card:hover{transform:translateY(-3px);border-color:rgba(113,136,255,.52);background:#151c29}.svc-card:nth-child(4n+1).visible,.svc-card:nth-child(4n+2).visible,.svc-card:nth-child(4n+3).visible,.svc-card:nth-child(4n+4).visible{transform:translateY(0)}.svc-icon{color:var(--accent-bright);margin-bottom:15px}.svc-title{font-size:.93rem;font-weight:750;color:var(--text-h);margin-bottom:9px;letter-spacing:.01em}.svc-desc{color:var(--text-m);font-size:.85rem;line-height:1.9;font-family:'Cairo',sans-serif;direction:rtl}
/* PROJECTS */
#projects{padding:88px 6%;background:#090c13;position:relative}#projects::after{content:'';position:absolute;bottom:0;left:6%;right:6%;height:1px;background:linear-gradient(90deg,transparent,rgba(113,136,255,.28),transparent)}.proj-inner{max-width:900px;margin:0 auto}.proj-list{display:flex;flex-direction:column;gap:13px}.proj-card{display:block;text-decoration:none;background:linear-gradient(110deg,#151b28,#10151e);border:1px solid rgba(160,174,255,.16);border-radius:2px;padding:29px 28px;position:relative;overflow:hidden;transition:transform .3s,border-color .3s,box-shadow .3s;box-shadow:none}.proj-card::after{content:'';position:absolute;top:0;right:0;bottom:0;width:3px;background:linear-gradient(180deg,var(--accent),var(--accent-hot));opacity:.8}.proj-card:hover{transform:translateY(-3px);border-color:rgba(113,136,255,.58);box-shadow:0 18px 45px rgba(0,0,0,.28)}.proj-card:nth-child(odd),.proj-card:nth-child(even){transform:none}.proj-card:nth-child(odd):hover,.proj-card:nth-child(even):hover{transform:translateY(-3px)}.proj-line{position:absolute;top:0;left:0;width:38px;height:2px;background:var(--accent-hot)}.proj-body{display:flex;justify-content:space-between;align-items:flex-start;gap:18px}.proj-content{flex:1}.proj-tag{display:inline-flex;align-items:center;gap:7px;padding:4px 10px;border-radius:0;background:rgba(113,136,255,.12);border:1px solid rgba(145,160,255,.25);color:var(--accent-bright);font-size:.62rem;letter-spacing:.1em;text-transform:uppercase;font-weight:700;margin-bottom:14px}.proj-name{font-size:1.45rem;font-weight:750;color:var(--text-h);letter-spacing:-.02em;margin-bottom:10px}.proj-desc{color:var(--text-b);line-height:1.9;font-size:.88rem;font-family:'Cairo',sans-serif;direction:rtl;margin-bottom:18px}.proj-techs{display:flex;gap:7px;flex-wrap:wrap}.proj-tech{padding:4px 9px;border-radius:0;background:rgba(6,8,13,.6);color:#aeb7ca;font-size:.66rem;font-weight:600;letter-spacing:.03em;border:1px solid rgba(205,215,240,.12)}.proj-arrow{color:var(--accent-hot);opacity:.8;transform:none;transition:transform .25s,opacity .25s;margin-left:12px;flex-shrink:0;margin-top:5px}.proj-card:hover .proj-arrow{opacity:1;transform:translate(-3px,-3px)}
/* CONTACT */
#contact{padding:88px 6% 68px;background:#0d1119}.contact-inner{max-width:900px;margin:0 auto}.contact-sub{color:var(--text-m);font-size:.9rem;margin-top:12px;line-height:1.8}.soc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:11px;margin-top:37px}.soc-btn{display:flex;align-items:center;gap:13px;padding:17px 18px;background:#111722;border:1px solid rgba(160,174,255,.15);text-decoration:none;color:var(--text-m);position:relative;border-radius:2px;transition:transform .2s,border-color .2s,background .2s}.soc-btn::before{content:'';position:absolute;right:0;top:0;bottom:0;width:2px;background:var(--accent);opacity:.6}.soc-btn:hover{transform:translateY(-2px);border-color:rgba(113,136,255,.5);background:#151c29}.soc-icon{color:var(--accent-bright);transition:color .2s;flex-shrink:0}.soc-name{font-size:.62rem;letter-spacing:.12em;text-transform:uppercase;font-weight:700;color:#8b95a8;margin-bottom:3px}.soc-handle{font-size:.75rem;font-weight:550;color:#d4d8e1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
footer{text-align:center;padding:26px 20px;color:var(--text-d);font-size:.7rem;letter-spacing:.06em;background:#080a10;border-top:1px solid rgba(225,232,255,.1);position:relative}footer::before{content:'';position:absolute;top:-1px;left:35%;right:35%;height:1px;background:linear-gradient(90deg,transparent,var(--accent),var(--accent-hot),transparent)}.mono{font-family:'JetBrains Mono',monospace}.sep{margin:0 10px;opacity:.32}
.reveal{opacity:0;transform:translateY(20px);transition:opacity .7s ease,transform .72s cubic-bezier(.22,1,.36,1)}.reveal.visible{opacity:1;transform:translateY(0)}
@media(max-width:760px){.stats-grid{grid-template-columns:repeat(2,1fr)}.skills-grid{grid-template-columns:1fr;gap:20px}.svc-grid{grid-template-columns:1fr 1fr}.nav-links{display:none}#about{padding-top:100px}.hero-desc{max-width:570px}.proj-card{padding:25px 22px}}
@media(max-width:500px){.stats-grid{gap:8px}.stat-card{padding:23px 10px}.svc-grid{grid-template-columns:1fr}.svc-card,.svc-card:nth-child(n){padding:23px 21px}.nav{padding-inline:5%}.section-title{font-size:1.9rem}.proj-body{gap:8px}.proj-name{font-size:1.28rem}.soc-grid{grid-template-columns:1fr 1fr}.soc-btn{padding:14px 12px;gap:9px}.soc-handle{font-size:.68rem}.ticker-fade{width:55px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{scroll-behavior:auto!important;animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}.reveal{opacity:1;transform:none}}
</style>
</head>
<body>

<div class="glow glow-tr"></div>
<div class="glow glow-bl"></div>

<nav id="nav">
  <a class="brand" href="#about">L.AD</a>
  <div class="nav-links">
    <a href="#about">About</a>
    <a href="#skills">Skills</a>
    <a href="#services">Services</a>
    <a href="#projects">Projects</a>
    <a href="#contact">Contact</a>
  </div>
</nav>

<section id="about">
  <div class="avatar-wrap">
    <div class="pulse-r"></div>
    <div class="pulse-r"></div>
    <div class="orbit-wrap"><div class="orbit-dot"></div></div>
    <div class="avatar-core">
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    </div>
  </div>
  <p class="hero-tag">Web Developer · Iraq</p>
  <h1 class="hero-name">Laith Al-Dahash</h1>
  <p class="hero-alias">executioner-Exec<span class="cursor">_</span></p>
  <p class="hero-desc">
    مبرمج مواقع ويب عراقي، أعمل مطوراً في شركة <em>الصقور البيضاء</em>.
    خبرة أكثر من سنة في بناء مواقع السيرفر والصفحات الثابتة،
    وكتابة سكربتات Python للأتمتة. أستخدم <em>Cloudflare</em> وخوادم VPS لاستضافة المشاريع.
  </p>
  <div class="hero-btns">
    <a href="#projects" class="btn-primary">View Projects</a>
    <a href="#contact"  class="btn-outline">Get in Touch</a>
  </div>
  <div class="scroll-hint">
    <span>scroll</span>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
    </svg>
  </div>
</section>

<div class="ticker-wrap">
  <div class="ticker-fade left"></div>
  <div class="ticker-fade right"></div>
  <div class="ticker-track" id="ticker"></div>
</div>

<section id="stats">
  <div class="stats-grid">
    <div class="stat-card reveal"><div class="stat-value">1+</div><div class="stat-label">Year Experience</div></div>
    <div class="stat-card reveal"><div class="stat-value">2</div><div class="stat-label">Live Projects</div></div>
    <div class="stat-card reveal"><div class="stat-value">&infin;</div><div class="stat-label">Lines of Code</div></div>
    <div class="stat-card reveal"><div class="stat-value">100%</div><div class="stat-label">Passion</div></div>
  </div>
</section>

<section id="skills">
  <div class="skills-inner">
    <div class="reveal" style="margin-bottom:56px">
      <span class="section-label">Expertise</span>
      <h2 class="section-title">Skills &amp; Tools</h2>
    </div>
    <div class="skills-grid" id="skills-grid"></div>
    <div class="cf-callout reveal" style="margin-top:48px">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>
      <div>
        <h4>Why I use Cloudflare</h4>
        <p>أعتمد على Cloudflare لتوفير حماية DDoS، وشبكة CDN عالمية تسرّع التحميل، وشهادات SSL مجانية، إضافةً إلى Workers وKV لبناء خدمات edge متقدمة بدون سيرفر.</p>
      </div>
    </div>
  </div>
</section>

<section id="services">
  <div class="svc-inner">
    <div class="reveal" style="margin-bottom:56px">
      <span class="section-label">What I Do</span>
      <h2 class="section-title">Services</h2>
    </div>
    <div class="svc-grid">
      <div class="svc-card reveal">
        <div class="svc-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></div>
        <div class="svc-title">Static Websites</div>
        <div class="svc-desc">تصميم وبناء مواقع ثابتة سريعة ومتجاوبة مع جميع الأجهزة.</div>
      </div>
      <div class="svc-card reveal">
        <div class="svc-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg></div>
        <div class="svc-title">Server-Side Apps</div>
        <div class="svc-desc">تطوير تطبيقات ويب ديناميكية مع منطق خلفي قوي وقواعد بيانات.</div>
      </div>
      <div class="svc-card reveal">
        <div class="svc-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></div>
        <div class="svc-title">Python Scripts</div>
        <div class="svc-desc">كتابة سكربتات Python للأتمتة والبوتات وتحليل البيانات.</div>
      </div>
      <div class="svc-card reveal">
        <div class="svc-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg></div>
        <div class="svc-title">Cloudflare Edge</div>
        <div class="svc-desc">نشر التطبيقات على شبكة Cloudflare Edge مع CDN وحماية DDoS.</div>
      </div>
    </div>
  </div>
</section>

<section id="projects">
  <div class="proj-inner">
    <div class="reveal" style="margin-bottom:56px">
      <span class="section-label">Selected Work</span>
      <h2 class="section-title">Projects</h2>
    </div>
    <div class="proj-list">
      <a href="https://tec-zon.osbvpr.workers.dev" target="_blank" rel="noopener noreferrer" class="proj-card reveal">
        <div class="proj-line"></div>
        <div class="proj-body">
          <div class="proj-content">
            <span class="proj-tag">E-Commerce</span>
            <div class="proj-name">TekZone</div>
            <div class="proj-desc">متجر إلكتروني افتراضي متكامل من حيث التفاصيل والتصميم، يوفر تجربة تسوق احترافية وسلسة.</div>
            <div class="proj-techs">
              <span class="proj-tech">JavaScript</span>
              <span class="proj-tech">Cloudflare Workers</span>
              <span class="proj-tech">CSS3</span>
            </div>
          </div>
          <div class="proj-arrow">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
          </div>
        </div>
      </a>
      <a href="https://science-gateway.lethw2009hasan.workers.dev/news" target="_blank" rel="noopener noreferrer" class="proj-card reveal">
        <div class="proj-line"></div>
        <div class="proj-body">
          <div class="proj-content">
            <span class="proj-tag">Science Portal</span>
            <div class="proj-name">Bawabat Al-Uloom</div>
            <div class="proj-desc">موقع لنشر الأخبار والمقالات العلمية مع دعم فني متكامل وطلب تقارير متخصصة ترسل للبريد الإلكتروني.</div>
            <div class="proj-techs">
              <span class="proj-tech">JavaScript</span>
              <span class="proj-tech">HTML5</span>
              <span class="proj-tech">Cloudflare</span>
            </div>
          </div>
          <div class="proj-arrow">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
          </div>
        </div>
      </a>
    </div>
  </div>
</section>

<section id="contact">
  <div class="contact-inner">
    <div class="reveal">
      <span class="section-label">Let's Talk</span>
      <h2 class="section-title">Get In Touch</h2>
      <p class="contact-sub">Open to new projects, freelance work, and collaborations.</p>
    </div>
    <div class="soc-grid">
      <a href="https://t.me/kpt_2" target="_blank" rel="noopener noreferrer" class="soc-btn reveal">
        <span class="soc-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg></span>
        <div><div class="soc-name">Telegram</div><div class="soc-handle">@kpt_2</div></div>
      </a>
      <a href="https://instagram.com/_ex1zx" target="_blank" rel="noopener noreferrer" class="soc-btn reveal">
        <span class="soc-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></span>
        <div><div class="soc-name">Instagram</div><div class="soc-handle">@_ex1zx</div></div>
      </a>
      <a href="https://github.com/ex1zx" target="_blank" rel="noopener noreferrer" class="soc-btn reveal">
        <span class="soc-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></span>
        <div><div class="soc-name">GitHub</div><div class="soc-handle">ex1zx</div></div>
      </a>
      <a href="mailto:conact@laith.cc" class="soc-btn reveal">
        <span class="soc-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></span>
        <div><div class="soc-name">Email</div><div class="soc-handle">conact@laith.cc</div></div>
      </a>
    </div>
  </div>
</section>

<footer>
  <span class="mono">Laith Al-Dahash</span>
  <span class="sep">&middot;</span>
  <span>executioner-Exec</span>
  <span class="sep">&middot;</span>
  <span>2026</span>
</footer>

<script>
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

const logos = [
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
];
const ticker = document.getElementById('ticker');
[...logos,...logos].forEach(src => {
  const cell = document.createElement('div');
  cell.className = 'logo-cell';
  const img = document.createElement('img');
  img.src = src; img.alt = '';
  cell.appendChild(img);
  ticker.appendChild(cell);
});

const skillsData = [
  {name:'HTML5',level:95},{name:'CSS3',level:90},
  {name:'JavaScript',level:88},{name:'Python',level:80},
  {name:'Cloudflare Workers',level:85},{name:'VPS & Linux',level:82},
];
const grid = document.getElementById('skills-grid');
skillsData.forEach((sk,i) => {
  const row = document.createElement('div');
  row.className = 'reveal';
  row.style.transitionDelay = (i*80)+'ms';
  row.innerHTML =
    '<div class="skill-head">' +
      '<span class="skill-name">' + sk.name + '</span>' +
      '<span class="skill-pct">' + sk.level + '%</span>' +
    '</div>' +
    '<div class="skill-track">' +
      '<div class="skill-fill" data-level="' + sk.level + '" style="transition-delay:' + (i*80+200) + 'ms"></div>' +
    '</div>';
  grid.appendChild(row);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      const fill = e.target.querySelector('.skill-fill');
      if (fill) fill.style.width = fill.dataset.level + '%';
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
</script>
</body>
</html>`;

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=UTF-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  },
};