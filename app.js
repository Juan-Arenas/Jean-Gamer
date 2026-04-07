/* ══════════════════════════════════════════
   JEAN DESIGN — APP.JS
   ══════════════════════════════════════════ */

/* ═══ PRODUCTS DATA ═══ */
const products = [
  {id:101,name:'Miguel Angel',cat:'mvp',video:'Miguel_Angel.webm',price:50,desc:'Animación de entrada personalizada para streamer. Efecto cinematográfico único con transiciones de alto impacto y partículas dinámicas.'},
  {id:102,name:'Jonathan',cat:'mvp',video:'Jonathan.webm',price:50,desc:'Animación MVP épica con efectos de luz volumétrica y movimiento fluido. Perfecta para destacar tu entrada en streams.'},
  {id:103,name:'3R',cat:'mvp',video:'3R.webm',price:50,desc:'Entrada estilizada con glitch effects y transiciones rápidas. Diseño agresivo y moderno para gamers.'},
  {id:104,name:'Nico',cat:'mvp',video:'Nico.webm',price:50,desc:'Animación de entrada con efectos de neón y partículas. Estética futurista que irradia energía pura.'},
  {id:105,name:'Karma',cat:'mvp',video:'Karma.webm',price:50,desc:'Entrada con estética oscura y efectos de fuego. Transiciones cinematográficas de alto nivel.'},
  {id:106,name:'Aries',cat:'mvp',video:'Aries.webm',price:50,desc:'MVP con temática zodiacal. Efectos de partículas doradas y transiciones elegantes.'},
  {id:107,name:'Heroes',cat:'mvp',video:'Heroes.webm',price:50,desc:'Animación heroica con efectos de cómic y destellos épicos. Ideal para streamers de juegos de acción.'},
  {id:108,name:'Anubis',cat:'mvp',video:'Anubis.webm',price:50,desc:'Entrada con temática egipcia y efectos místicos. Arena, oro y poder visual imponente.'},
  {id:109,name:'Need',cat:'mvp',video:'Need.webm',price:50,desc:'Estética racing con efectos de velocidad y neon. Diseño aerodinámico lleno de adrenalina.'},
  {id:110,name:'Déjà Vu',cat:'mvp',video:'Dejavu.webm',price:50,desc:'Efectos de distorsión temporal y glitch artístico. Una entrada que deja huella en la audiencia.'},
  {id:111,name:'Destructor',cat:'mvp',video:'Destructor.webm',price:50,desc:'Entrada con explosiones y destrucción controlada. VFX de nivel cinematográfico para gamers hardcore.'},
  {id:112,name:'Oski',cat:'mvp',video:'Oski.webm',price:50,desc:'Animación vibrante con colores intensos y energía pura. Transiciones fluidas y modernas.'}
];

const services = [
  {title:'VFX & Efectos Visuales',desc:'Efectos visuales avanzados integrados a la perfección. Partículas, glitches, explosiones y composición cinematográfica.',tags:['After Effects','Compositing'],icon:'<path d="M13 2L3 14h9l-1 8 10-12h-9z"/>'},
  {title:'Edición High Energy',desc:'Cortes rítmicos y transiciones de alto impacto sincronizadas con la música para retención máxima.',tags:['Reels','TikTok','Shorts'],icon:'<polygon points="5 3 19 12 5 21 5 3"/>'},
  {title:'Motion Graphics',desc:'Gráficos animados, títulos cinematográficos, intros y outros personalizados para tu marca.',tags:['Branding','Animación'],icon:'<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>'},
  {title:'Contenido TikTok',desc:'Edición especializada para el algoritmo de TikTok. Hooks potentes y formatos optimizados para viralizar.',tags:['TikTok','Viral'],icon:'<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>'},
  {title:'Color Grading',desc:'Corrección y gradación cinematográfica. Desde looks naturales hasta estéticas de película únicas.',tags:['LUTs','Cinematic'],icon:'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>'},
  {title:'Edición Completa',desc:'Paquete integral: edición, color, VFX, audio, subtítulos y entrega en todos los formatos.',tags:['Full Package','Premium'],icon:'<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>'}
];

const shopCategories = [
  {id:'mvp',label:'MVP'},
  {id:'genericos',label:'Genéricos'},
  {id:'transformaciones',label:'Transformaciones'},
  {id:'overlays',label:'Overlays'}
];

let cart=[], currentUser=null, selectedPayment='card', activeTab='mvp';

/* ═══ FIRE ENGINE (IMPROVED) ═══ */
class FireEngine{
  constructor(canvas,opts={}){
    this.canvas=canvas;this.ctx=canvas.getContext('2d');
    this.particles=[];this.intensity=opts.intensity||1;
    this.maxP=opts.maxParticles||80;this.fromBottom=opts.fromBottom!==false;
    this.running=false;this.resize();
  }
  resize(){this.canvas.width=this.canvas.offsetWidth||innerWidth;this.canvas.height=this.canvas.offsetHeight||innerHeight}
  spawn(){
    if(this.particles.length>=this.maxP)return;
    const w=this.canvas.width,h=this.canvas.height;
    for(let i=0;i<Math.floor(2*this.intensity);i++){
      this.particles.push({
        x:Math.random()*w, y:this.fromBottom?h:Math.random()*h,
        vx:(Math.random()-.5)*1, vy:-(Math.random()*2.5+1.5)*this.intensity,
        life:1, decay:Math.random()*.015+.007, size:Math.random()*10+3,
        hue:Math.random()*60-10, wobble:Math.random()*Math.PI*2,
        wobbleSpd:(Math.random()-.5)*.06
      });
    }
  }
  update(){
    this.particles.forEach(p=>{
      p.wobble+=p.wobbleSpd;p.vx+=Math.sin(p.wobble)*.12;
      p.x+=p.vx;p.y+=p.vy;p.size*=.988;p.life-=p.decay;
    });
    this.particles=this.particles.filter(p=>p.life>0);
  }
  draw(){
    const c=this.ctx;c.clearRect(0,0,this.canvas.width,this.canvas.height);
    this.particles.forEach(p=>{
      const a=Math.pow(p.life,1.6);
      const r=Math.min(255,255+p.hue),g=Math.max(0,Math.min(200,80+p.hue*2.5)),b=Math.max(0,10);
      const gr=c.createRadialGradient(p.x,p.y,0,p.x,p.y,p.size);
      gr.addColorStop(0,`rgba(255,${Math.min(255,g+100)},60,${a})`);
      gr.addColorStop(.3,`rgba(${r},${g},${b},${a*.7})`);
      gr.addColorStop(.7,`rgba(${r},${Math.max(0,g-30)},${b},${a*.3})`);
      gr.addColorStop(1,`rgba(${r},${Math.max(0,g-60)},${b},0)`);
      c.beginPath();c.arc(p.x,p.y,p.size,0,Math.PI*2);c.fillStyle=gr;c.fill();
    });
  }
  tick(){if(!this.running)return;this.spawn();this.update();this.draw();requestAnimationFrame(()=>this.tick())}
  start(){this.running=true;this.tick()}
  stop(){this.running=false}
}

/* ═══ LAVA ENGINE ═══ */
class LavaEngine{
  constructor(canvas){
    this.canvas=canvas;this.ctx=canvas.getContext('2d');this.t=0;
    this.blobs=Array.from({length:7},()=>({x:Math.random(),y:Math.random()*.5+.5,r:Math.random()*.16+.08,vx:(Math.random()-.5)*.0007,vy:-(Math.random()*.001+.0003),hue:Math.floor(Math.random()*30),phase:Math.random()*Math.PI*2}));
    this.sparks=[];this.running=false;
  }
  resize(){this.canvas.width=this.canvas.offsetWidth||innerWidth;this.canvas.height=this.canvas.offsetHeight||innerHeight}
  tick(){
    if(!this.running)return;this.t+=.015;this.resize();
    const c=this.ctx,w=this.canvas.width,h=this.canvas.height;c.clearRect(0,0,w,h);
    this.blobs.forEach(b=>{
      b.x+=b.vx+Math.sin(this.t*.7+b.phase)*.0005;b.y+=b.vy+Math.sin(this.t*.5+b.phase)*.0003;
      if(b.y<-.1){b.y=1.1;b.x=Math.random()}if(b.x<-.1)b.x=1.1;if(b.x>1.1)b.x=-.1;
      const cx=b.x*w,cy=b.y*h,r=b.r*Math.min(w,h),pulse=.7+.3*Math.sin(this.t*2+b.phase);
      const gr=c.createRadialGradient(cx,cy,0,cx,cy,r);
      gr.addColorStop(0,`rgba(255,${b.hue*3},0,${.8*pulse})`);gr.addColorStop(.4,`rgba(200,${b.hue*2},0,${.4*pulse})`);gr.addColorStop(1,'rgba(80,0,0,0)');
      c.beginPath();c.arc(cx,cy,r,0,Math.PI*2);c.fillStyle=gr;c.fill();
    });
    if(Math.random()>.6&&this.sparks.length<50)this.sparks.push({x:Math.random()*w,y:h*(.4+Math.random()*.6),vx:(Math.random()-.5)*2,vy:-(Math.random()*4+2),life:1,size:Math.random()*2.5+1});
    this.sparks.forEach(s=>{s.x+=s.vx;s.y+=s.vy;s.vy+=.1;s.life-=.025;c.beginPath();c.arc(s.x,s.y,s.size,0,Math.PI*2);c.fillStyle=`rgba(255,${Math.floor(140+115*s.life)},0,${s.life*s.life})`;c.fill()});
    this.sparks=this.sparks.filter(s=>s.life>0);
    requestAnimationFrame(()=>this.tick());
  }
  start(){this.running=true;this.resize();this.tick()}
  stop(){this.running=false}
}

/* ═══ INIT ═══ */
let globalFire,introFire,lavaEngine;
function initFires(){
  const gc=document.getElementById('fire-canvas');gc.style.position='fixed';
  globalFire=new FireEngine(gc,{intensity:.35,maxParticles:50,fromBottom:true});globalFire.start();
  const ic=document.getElementById('intro-fire-canvas');
  introFire=new FireEngine(ic,{intensity:1.2,maxParticles:100,fromBottom:true});introFire.start();
  lavaEngine=new LavaEngine(document.getElementById('sm-canvas'));
  addEventListener('resize',()=>{globalFire.resize();introFire?.resize()});
}
initFires();

/* ═══ SCROLL PROGRESS ═══ */
addEventListener('scroll',()=>{
  const p=scrollY/(document.documentElement.scrollHeight-innerHeight);
  document.getElementById('scroll-fire-line').style.width=(p*100)+'%';
  const nav=document.getElementById('main-nav');
  nav.style.background=scrollY>80?'rgba(6,0,1,.97)':'linear-gradient(180deg,rgba(6,0,1,.95),transparent)';
});

/* ═══ SCROLL REVEAL ═══ */
const revObs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');revObs.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -50px 0px'});
document.querySelectorAll('.reveal,.reveal-left').forEach(el=>revObs.observe(el));

/* ═══ INTRO ═══ */
const intro=document.getElementById('intro'),introLogo=document.getElementById('intro-logo'),introLine=document.getElementById('intro-line'),introSub=document.getElementById('intro-sub'),mainPage=document.getElementById('main-page'),mainNav=document.getElementById('main-nav');
requestAnimationFrame(()=>requestAnimationFrame(()=>{introLogo.classList.add('show');introLine.style.width='180px';introSub.classList.add('show')}));
setTimeout(()=>{intro.style.transition='opacity .7s ease';intro.style.opacity='0';intro.style.pointerEvents='none';introFire?.stop()},2600);
setTimeout(()=>{intro.style.display='none';mainPage.classList.add('visible');mainNav.classList.add('visible')},3200);

/* ═══ RENDER SERVICES ═══ */
function renderServices(){
  const grid=document.getElementById('services-grid');
  grid.innerHTML=services.map(s=>`
    <div class="service-card reveal">
      <div class="service-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">${s.icon}</svg></div>
      <div class="service-card-title">${s.title}</div>
      <div class="service-card-desc">${s.desc}</div>
      <div class="service-card-tags">${s.tags.map(t=>`<span class="service-tag">${t}</span>`).join('')}</div>
      <a href="https://wa.me/573124386385" class="service-card-link" target="_blank"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
    </div>`).join('');
  grid.querySelectorAll('.reveal').forEach(el=>revObs.observe(el));
}
renderServices();

/* ═══ RENDER SHOP TABS ═══ */
function renderTabs(){
  const tabsEl=document.getElementById('shop-tabs');
  tabsEl.innerHTML=shopCategories.map(c=>`<button class="shop-tab${c.id===activeTab?' active':''}" onclick="switchShopTab('${c.id}')">${c.label}</button>`).join('');
  renderShopContent();
}
function switchShopTab(id){
  activeTab=id;
  document.querySelectorAll('.shop-tab').forEach((t,i)=>t.classList.toggle('active',shopCategories[i].id===id));
  renderShopContent();
}
function renderShopContent(){
  const cont=document.getElementById('shop-content');
  const items=products.filter(p=>p.cat===activeTab);
  if(items.length===0){
    cont.innerHTML=`<div class="shop-tab-content active"><div class="coming-soon"><div class="coming-soon-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28" height="28"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></div><h3>Próximamente</h3><p>Nuevos productos llegarán muy pronto. ¡Mantente atento!</p></div></div>`;
    return;
  }
  cont.innerHTML=`<div class="shop-tab-content active"><div class="mvp-grid">${items.map(p=>`
    <div class="mvp-card reveal" onclick="openProductModal(${p.id})">
      <div class="mvp-video-wrap">
        <video class="mvp-video" src="${p.video}" muted loop playsinline preload="metadata"></video>
        <div class="mvp-overlay"><button class="mvp-play-btn" onclick="event.stopPropagation();toggleMvpVideo(this)"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></button></div>
        <div class="mvp-badge">MVP ANIM</div>
      </div>
      <div class="mvp-card-body">
        <div class="mvp-card-title">${p.name}</div>
        <div class="mvp-card-sub">Animación de entrada personalizada</div>
        <div class="mvp-card-footer">
          <div class="mvp-price">$${p.price}<span> USD</span></div>
          <button class="btn-outline" style="padding:8px 14px;font-size:9px" onclick="event.stopPropagation();addToCart(${p.id})">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><path d="M12 5v14M5 12h14"/></svg> Agregar
          </button>
        </div>
      </div>
    </div>`).join('')}</div></div>`;
  cont.querySelectorAll('.reveal').forEach(el=>revObs.observe(el));
  // Re-observe videos for auto-pause
  cont.querySelectorAll('.mvp-video').forEach(v=>vidObs.observe(v));
}
renderTabs();

/* ═══ VIDEO TOGGLE ═══ */
function toggleMvpVideo(btn){
  const wrap=btn.closest('.mvp-video-wrap'),video=wrap.querySelector('.mvp-video'),ov=wrap.querySelector('.mvp-overlay');
  if(video.paused){
    video.play();ov.classList.add('playing');btn.classList.add('pause-icon');
    btn.innerHTML='<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
  }else{
    video.pause();ov.classList.remove('playing');btn.classList.remove('pause-icon');
    btn.innerHTML='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
  }
}
const vidObs=new IntersectionObserver(es=>{es.forEach(e=>{
  if(!e.isIntersecting&&!e.target.paused){
    e.target.pause();const w=e.target.closest('.mvp-video-wrap');
    const b=w?.querySelector('.mvp-play-btn'),o=w?.querySelector('.mvp-overlay');
    if(b){b.classList.remove('pause-icon');b.innerHTML='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>'}
    if(o)o.classList.remove('playing');
  }
})},{threshold:.2});
document.querySelectorAll('.mvp-video').forEach(v=>vidObs.observe(v));

/* ═══ PRODUCT MODAL ═══ */
function openProductModal(id){
  const p=products.find(x=>x.id===id);if(!p)return;
  document.getElementById('pm-cat').textContent=p.cat.toUpperCase()+' ANIMATION';
  document.getElementById('pm-title').textContent=p.name;
  document.getElementById('pm-desc').textContent=p.desc;
  document.getElementById('pm-price').innerHTML=`$${p.price} <span>USD</span>`;
  const vid=document.getElementById('product-modal-video');vid.src=p.video;vid.play();
  const addBtn=document.getElementById('pm-add-btn');
  addBtn.onclick=()=>addToCart(p.id);
  addBtn.innerHTML=cart.find(i=>i.id===p.id)?'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="20 6 9 17 4 12"/></svg> Ya en tu carrito':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M12 5v14M5 12h14"/></svg> Agregar al Carrito';
  document.getElementById('product-modal').classList.add('open');document.body.style.overflow='hidden';
}
function closeProductModal(){
  document.getElementById('product-modal').classList.remove('open');document.body.style.overflow='';
  document.getElementById('product-modal-video').pause();
}

/* ═══ CART ═══ */
function addToCart(id){
  const p=products.find(x=>x.id===id);if(!p)return;
  if(cart.find(i=>i.id===id)){showToast('Ya está en tu carrito');return}
  cart.push({id:p.id,name:p.name,price:p.price,cat:p.cat});
  updateCartUI();showToast(`${p.name} agregado`,'success');
}
function removeFromCart(id){cart=cart.filter(i=>i.id!==id);updateCartUI()}
function updateCartUI(){
  const cnt=document.getElementById('cart-count'),list=document.getElementById('cart-items-list'),ft=document.getElementById('cart-footer');
  cnt.textContent=cart.length;cnt.classList.toggle('active',cart.length>0);
  const total=cart.reduce((s,i)=>s+i.price,0);
  document.getElementById('cart-total').textContent=`$${total} USD`;
  if(!cart.length){
    list.innerHTML='<div class="cart-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg><p>Tu carrito está vacío</p></div>';
    ft.style.display='none';
  }else{
    list.innerHTML=cart.map(i=>`<div class="cart-item"><div class="cart-item-icon"><svg viewBox="0 0 24 24" fill="none" stroke="var(--ember-bright)" stroke-width="1.5" width="20" height="20"><path d="M13 2L3 14h9l-1 8 10-12h-9z"/></svg></div><div class="cart-item-info"><div class="cart-item-name">${i.name}</div><div class="cart-item-cat">${i.cat.toUpperCase()}</div></div><div class="cart-item-price">$${i.price}</div><button class="cart-item-remove" onclick="removeFromCart(${i.id})">✕</button></div>`).join('');
    ft.style.display='block';
  }
}
function openCart(){document.getElementById('cart-overlay').classList.add('open');document.getElementById('cart-drawer').classList.add('open');document.body.style.overflow='hidden'}
function closeCart(){document.getElementById('cart-overlay').classList.remove('open');document.getElementById('cart-drawer').classList.remove('open');document.body.style.overflow=''}

/* ═══ MOBILE MENU ═══ */
function toggleMobileMenu(){
  const h=document.getElementById('hamburger'),m=document.getElementById('mobile-menu'),o=document.getElementById('mobile-overlay');
  const isOpen=m.classList.contains('open');
  h.classList.toggle('open');m.classList.toggle('open');o.classList.toggle('open');
  document.body.style.overflow=isOpen?'':'hidden';
}

/* ═══ AUTH ═══ */
function openAuth(){document.getElementById('auth-modal').classList.add('open');document.body.style.overflow='hidden'}
function closeAuth(){document.getElementById('auth-modal').classList.remove('open');document.body.style.overflow=''}
function switchTab(tab){
  document.querySelectorAll('.auth-tab').forEach((t,i)=>t.classList.toggle('active',(i===0&&tab==='login')||(i===1&&tab==='register')));
  document.getElementById('login-form').classList.toggle('active',tab==='login');
  document.getElementById('register-form').classList.toggle('active',tab==='register');
}
function handleLogin(e){e.preventDefault();const email=e.target.querySelector('[type=email]').value;loginUser(email.split('@')[0],email)}
function handleRegister(e){
  e.preventDefault();const ins=e.target.querySelectorAll('input');
  if(ins[2].value!==ins[3].value){showToast('Las contraseñas no coinciden');return}
  loginUser(ins[0].value,ins[1].value);
}
function loginUser(name,email){currentUser={name,email};closeAuth();updateUserUI();showToast(`¡Bienvenido, ${name}!`,'success')}
function logoutUser(){currentUser=null;updateUserUI();showToast('Sesión cerrada')}
function googleSignIn(){
  // Placeholder — replace with real Google Sign-In SDK
  showToast('Google Sign-In: configura tu Client ID','success');
  // When you have a Client ID, initialize:
  // google.accounts.id.initialize({ client_id: 'YOUR_ID', callback: handleGoogleResponse });
}
function updateUserUI(){
  const a=document.getElementById('nav-user-area');
  if(currentUser){
    const init=currentUser.name.substring(0,2).toUpperCase();
    a.innerHTML=`<div class="user-logged"><div class="user-avatar">${init}</div>${currentUser.name}<button class="user-logout" onclick="logoutUser()">Salir</button></div>`;
  }else{
    a.innerHTML='<button class="nav-btn" onclick="openAuth()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>Entrar</button>';
  }
}

/* ═══ CHECKOUT ═══ */
function startCheckout(){
  if(!cart.length)return;
  if(!currentUser){closeCart();showToast('Debes iniciar sesión para comprar');setTimeout(()=>openAuth(),500);return}
  closeCart();
  const ol=document.getElementById('checkout-order-list'),total=cart.reduce((s,i)=>s+i.price,0);
  ol.innerHTML=cart.map(i=>`<div class="checkout-order-item"><span>${i.name}</span><span>$${i.price} USD</span></div>`).join('');
  document.getElementById('checkout-total-display').textContent=`$${total} USD`;
  goToStep(1);document.getElementById('checkout-modal').classList.add('open');document.body.style.overflow='hidden';
}
function closeCheckout(){document.getElementById('checkout-modal').classList.remove('open');document.body.style.overflow=''}
function goToStep(n){
  [1,2,3].forEach(i=>{
    document.getElementById(`checkout-step-${i}`).classList.toggle('active',i===n);
    const ind=document.getElementById(`step-ind-${i}`);ind.classList.remove('active','done');
    if(i===n)ind.classList.add('active');if(i<n)ind.classList.add('done');
  });
}
function goToPayment(){goToStep(2)}
function selectPayment(btn,method){
  selectedPayment=method;document.querySelectorAll('.payment-method').forEach(b=>b.classList.remove('selected'));btn.classList.add('selected');
  document.getElementById('card-fields').style.display=method==='card'?'flex':'none';
}
function formatCard(input){let v=input.value.replace(/\D/g,'').substring(0,16);input.value=v.replace(/(.{4})/g,'$1 ').trim()}
function processPayment(){showToast('Procesando pago...');setTimeout(()=>{goToStep(3);cart=[];updateCartUI();showToast('¡Pago exitoso! Revisa tu correo','success')},2000)}
function finishCheckout(){closeCheckout();showToast('Archivos enviados a tu correo ✓','success')}

/* ═══ SOBRE MI ═══ */
function openSobreMi(){document.getElementById('sobre-mi-page').classList.add('open');document.body.style.overflow='hidden';if(lavaEngine&&!lavaEngine.running)lavaEngine.start()}
function closeSobreMi(){document.getElementById('sobre-mi-page').classList.remove('open');document.body.style.overflow='';lavaEngine?.stop()}

/* ═══ KEYBOARD ═══ */
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeSobreMi();closeAuth();closeCheckout();closeCart();closeProductModal()}});

/* ═══ TOAST ═══ */
function showToast(msg,type='info'){
  const w=document.getElementById('toast-wrap'),t=document.createElement('div');
  t.className=`toast${type==='success'?' success':''}`;t.textContent=msg;
  w.appendChild(t);setTimeout(()=>t.remove(),2700);
}
