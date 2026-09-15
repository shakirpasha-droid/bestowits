/* BESTOW IT SERVICES - Homepage trust sections */
(function(){
  'use strict';
  const isHome = /(^|\/)index\.html$|\/$/.test(window.location.pathname);
  if(!isHome) return;

  const FEEDBACK_API_URL='https://script.google.com/macros/s/AKfycbwLXWHDpfUwrPl5TmwWOguARdz0tYNoxLACRkAiXkSMRMQZx2IVDI5sWB8G4999GW64/exec';
  let testimonials = [
    {name:'Customer Feedback',company:'Verified customer',text:'Your genuine customer testimonial can appear here after approval.'},
    {name:'Customer Feedback',company:'Verified customer',text:'Share your experience with our IT support, AMC, networking or other services.'},
    {name:'Customer Feedback',company:'Verified customer',text:'Approved customer feedback will be displayed here to help new visitors build confidence.'}
  ];
  let clients = [];

  function esc(v){
    return String(v||'').replace(/[&<>\"']/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[ch];});
  }

  function addStyles(){
    if(document.getElementById('bestow-trust-section-styles')) return;
    const s=document.createElement('style'); s.id='bestow-trust-section-styles';
    s.textContent=`
      .bestow-trust-section{padding:78px 0;background:#fff}.bestow-trust-section.alt{background:#f4f8ff}
      .bestow-trust-heading{text-align:center;margin:0 auto 42px;max-width:820px}
      .bestow-trust-heading .kicker{font-size:12px;letter-spacing:3px;text-transform:uppercase;font-weight:700;color:#53617c;margin-bottom:10px}
      .bestow-trust-heading h2{font-size:34px;line-height:1.2;color:#101f46;font-weight:700;margin:0 0 12px}
      .bestow-trust-heading p{font-size:14px;line-height:1.75;color:#42516d;margin:0}
      .bestow-testimonial-card{height:100%;background:#fff;border:1px solid #e4ebf7;border-radius:18px;padding:28px;box-shadow:0 8px 28px rgba(27,55,108,.06)}
      .bestow-testimonial-card .quote{font-size:36px;line-height:1;color:#2454f4;font-weight:700;margin-bottom:12px}
      .bestow-testimonial-card p{font-size:13px;line-height:1.8;color:#42516d;min-height:92px;margin:0 0 20px}
      .bestow-testimonial-card h3{font-size:15px;color:#142b5b;font-weight:700;margin:0 0 4px}.bestow-testimonial-card .company{font-size:11px;color:#7a879d}.bestow-testimonial-rating{font-size:12px;color:#2454f4;font-weight:700;margin-bottom:10px}
      .bestow-client-wrap{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}
      .bestow-client-chip{min-height:128px;background:#fff;border:1px solid #e3eaf7;border-radius:14px;padding:18px;text-align:center;box-shadow:0 6px 20px rgba(27,55,108,.05);font-size:12px;font-weight:600;color:#17305e;transition:.2s;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:11px}
      .bestow-client-chip:hover{transform:translateY(-3px);box-shadow:0 12px 28px rgba(27,55,108,.10)}
      .bestow-client-logo{width:58px;height:58px;object-fit:contain;border-radius:10px;background:#fff}.bestow-client-initial{width:58px;height:58px;border-radius:10px;background:#edf4ff;display:flex;align-items:center;justify-content:center;color:#2454f4;font-size:20px;font-weight:700}
      .bestow-client-name{line-height:1.45}.bestow-client-cta{text-align:center;margin-top:28px}.bestow-client-cta a{display:inline-flex;align-items:center;gap:8px;padding:12px 20px;border-radius:9px;background:#2454f4;color:#fff;text-decoration:none;font-size:12px;font-weight:600}
      .bestow-trust-note{text-align:center;font-size:11px;color:#8994a8;margin:25px auto 0;max-width:760px;line-height:1.6}
      .bestow-social-links{display:flex;align-items:center;justify-content:center;gap:12px;margin:24px 0 8px;flex-wrap:wrap}
      .bestow-social-links a{width:42px;height:42px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;background:#2454f4;color:#fff;text-decoration:none;font-size:21px;transition:.25s;box-shadow:0 5px 16px rgba(36,84,244,.22)}
      .bestow-social-links a:hover{transform:translateY(-3px);background:#28a8e8;color:#fff}
      .bestow-social-label{text-align:center;color:#c5d0e8;font-size:12px;margin:0}
      @media(max-width:991px){.bestow-client-wrap{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media(max-width:767px){.bestow-trust-section{padding:55px 0}.bestow-trust-heading h2{font-size:28px}.bestow-testimonial-card p{min-height:0}.bestow-client-wrap{grid-template-columns:1fr 1fr;gap:10px}.bestow-client-chip{min-height:115px;padding:12px 8px;font-size:11px}.bestow-client-logo,.bestow-client-initial{width:48px;height:48px}.bestow-client-initial{font-size:17px}.bestow-social-links{gap:10px}.bestow-social-links a{width:40px;height:40px;font-size:19px}}
    `; document.head.appendChild(s);
  }

  function buildTestimonials(){
    const section=document.createElement('section'); section.className='bestow-trust-section'; section.id='customer-testimonials';
    const cards=testimonials.map(t=>`<div class="col-lg-4 col-md-6"><div class="bestow-testimonial-card"><div class="quote">“</div>${t.rating?`<div class="bestow-testimonial-rating">${esc(t.rating)}</div>`:''}<p>${esc(t.text)}</p><h3>${esc(t.name)}</h3><div class="company">${esc(t.company)}</div></div></div>`).join('');
    section.innerHTML=`<div class="container"><div class="bestow-trust-heading"><div class="kicker">Customer Trust</div><h2>What Our Customers Say</h2><p>We value every customer's experience. Approved testimonials are displayed here after review and publication.</p></div><div class="row g-4">${cards}</div><div class="bestow-client-cta"><a href="customer_feedback.html"><i class="bi bi-chat-square-heart"></i> Share Your Feedback</a></div></div>`;
    return section;
  }

  function initials(name){
    const words=String(name||'').trim().split(/\s+/).filter(Boolean);
    return (words.slice(0,2).map(w=>w.charAt(0)).join('')||'B').toUpperCase();
  }

  function buildClients(){
    const section=document.createElement('section'); section.className='bestow-trust-section alt'; section.id='our-clients';
    const clientContent = clients.length ? `<div class="bestow-client-wrap">${clients.map(c=>{const logo=c.logo?`<img class="bestow-client-logo" src="${esc(c.logo)}" alt="${esc(c.name)} logo" loading="lazy">`:`<div class="bestow-client-initial" aria-hidden="true">${esc(initials(c.name))}</div>`;return `<div class="bestow-client-chip">${logo}<div class="bestow-client-name">${esc(c.name)}</div></div>`;}).join('')}</div><p class="bestow-trust-note">Client names are shown for business-reference purposes. Please contact us if you would like your organization removed or updated.</p>` : '';
    section.innerHTML=`<div class="container"><div class="bestow-trust-heading"><div class="kicker">Our Client Network</div><h2>Businesses We Support</h2></div>${clientContent}</div>`;
    return section;
  }

  function addSocialIcons(){
    if(document.getElementById('bestow-home-social-links')) return;
    const footer=document.querySelector('#footer');
    if(!footer) return;
    const wrap=document.createElement('div');
    wrap.id='bestow-home-social-links';
    wrap.innerHTML=`<div class="bestow-social-links" aria-label="Bestow IT Services social media"><a href="https://www.facebook.com/" target="_blank" rel="noopener" aria-label="Facebook" title="Facebook"><i class="bx bxl-facebook"></i></a><a href="https://www.instagram.com/" target="_blank" rel="noopener" aria-label="Instagram" title="Instagram"><i class="bx bxl-instagram"></i></a><a href="https://www.linkedin.com/" target="_blank" rel="noopener" aria-label="LinkedIn" title="LinkedIn"><i class="bx bxl-linkedin"></i></a><a href="https://www.youtube.com/" target="_blank" rel="noopener" aria-label="YouTube" title="YouTube"><i class="bx bxl-youtube"></i></a><a href="https://wa.me/919440742529" target="_blank" rel="noopener" aria-label="WhatsApp" title="WhatsApp"><i class="bx bxl-whatsapp"></i></a></div><p class="bestow-social-label">Follow Bestow IT Services on social media</p>`;
    footer.appendChild(wrap);
  }

  async function loadClients(){
    try{
      const response=await fetch('assets/data/clients.json',{cache:'no-store'});
      if(!response.ok) throw new Error('Client data unavailable');
      const data=await response.json();
      if(Array.isArray(data)) clients=data;
    }catch(e){clients=[];}
  }

  async function loadTestimonials(){
    if(!FEEDBACK_API_URL) return;
    try{
      const response=await fetch(FEEDBACK_API_URL,{cache:'no-store'});
      if(!response.ok) throw new Error('Feedback API unavailable');
      const data=await response.json();
      if(Array.isArray(data) && data.length){
        testimonials=data.map(t=>({name:t.name||'Customer',company:t.company||'Verified customer',text:t.feedback||'',rating:t.rating||''}));
      }else{
        testimonials=[];
      }
    }catch(e){
      // Keep the site usable if the external approval backend is temporarily unavailable.
    }
  }

  async function init(){
    addStyles();
    await Promise.all([loadClients(),loadTestimonials()]);
    const cta=document.querySelector('.cta-strip'), footer=document.querySelector('#footer'), anchor=cta||footer;
    if(anchor && !document.getElementById('customer-testimonials')){
      anchor.parentNode.insertBefore(buildTestimonials(),anchor);
      anchor.parentNode.insertBefore(buildClients(),anchor);
      if(window.AOS && typeof window.AOS.refresh==='function') window.AOS.refresh();
    }
    addSocialIcons();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();
