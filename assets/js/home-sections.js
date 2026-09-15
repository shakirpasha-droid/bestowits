/* BESTOW IT SERVICES - Homepage trust sections */
(function(){
  'use strict';
  const isHome = /(^|\/)index\.html$|\/$/.test(window.location.pathname);
  if(!isHome) return;

  const testimonials = [
    {name:'Customer Feedback',company:'Add verified customer name & company',text:'Your genuine customer testimonial can be displayed here. We recommend using real feedback only.'},
    {name:'Customer Feedback',company:'Add verified customer name & company',text:'Add a short, genuine comment about our IT support, AMC, networking or other services.'},
    {name:'Customer Feedback',company:'Add verified customer name & company',text:'Add another verified customer experience here to build trust with new visitors.'}
  ];

  const partners = [
    {name:'Tally',note:'Partner / service relationship'},
    {name:'Microsoft 365',note:'Business productivity solutions'},
    {name:'Google Workspace',note:'Business productivity solutions'},
    {name:'TP-Link',note:'Networking solutions'}
  ];

  function addStyles(){
    if(document.getElementById('bestow-trust-section-styles')) return;
    const s=document.createElement('style');
    s.id='bestow-trust-section-styles';
    s.textContent=`
      .bestow-trust-section{padding:78px 0;background:#fff}
      .bestow-trust-section.alt{background:#f4f8ff}
      .bestow-trust-heading{text-align:center;margin:0 auto 42px;max-width:820px}
      .bestow-trust-heading .kicker{font-size:12px;letter-spacing:3px;text-transform:uppercase;font-weight:700;color:#53617c;margin-bottom:10px}
      .bestow-trust-heading h2{font-size:34px;line-height:1.2;color:#101f46;font-weight:700;margin:0 0 12px}
      .bestow-trust-heading p{font-size:14px;line-height:1.75;color:#42516d;margin:0}
      .bestow-testimonial-card{height:100%;background:#fff;border:1px solid #e4ebf7;border-radius:18px;padding:28px;box-shadow:0 8px 28px rgba(27,55,108,.06);position:relative}
      .bestow-testimonial-card .quote{font-size:36px;line-height:1;color:#2454f4;font-weight:700;margin-bottom:12px}
      .bestow-testimonial-card p{font-size:13px;line-height:1.8;color:#42516d;min-height:92px;margin:0 0 20px}
      .bestow-testimonial-card h3{font-size:15px;color:#142b5b;font-weight:700;margin:0 0 4px}
      .bestow-testimonial-card .company{font-size:11px;color:#7a879d}
      .bestow-partner-wrap{display:flex;flex-wrap:wrap;justify-content:center;gap:18px}
      .bestow-partner-card{min-width:190px;flex:1 1 190px;max-width:235px;background:#fff;border:1px solid #e3eaf7;border-radius:16px;padding:24px 18px;text-align:center;box-shadow:0 7px 24px rgba(27,55,108,.05)}
      .bestow-partner-logo{height:58px;border-radius:12px;background:#f3f6fd;display:flex;align-items:center;justify-content:center;font-size:21px;font-weight:700;color:#17305e;margin-bottom:12px}
      .bestow-partner-card p{font-size:11px;color:#77839a;margin:0;line-height:1.5}
      .bestow-trust-note{text-align:center;font-size:11px;color:#8994a8;margin:25px auto 0;max-width:760px;line-height:1.6}
      @media(max-width:767px){.bestow-trust-section{padding:55px 0}.bestow-trust-heading h2{font-size:28px}.bestow-testimonial-card p{min-height:0}.bestow-partner-card{max-width:none}}
    `;
    document.head.appendChild(s);
  }

  function buildTestimonials(){
    const section=document.createElement('section');
    section.className='bestow-trust-section';
    section.id='customer-testimonials';
    section.innerHTML=`<div class="container"><div class="bestow-trust-heading"><div class="kicker">Customer Trust</div><h2>What Our Customers Say</h2><p>Real customer experiences help businesses choose the right IT support partner. We will keep this section ready for your verified testimonials.</p></div><div class="row g-4">${testimonials.map(t=>`<div class="col-lg-4 col-md-6"><div class="bestow-testimonial-card"><div class="quote">“</div><p>${t.text}</p><h3>${t.name}</h3><div class="company">${t.company}</div></div></div>`).join('')}</div></div>`;
    return section;
  }

  function buildPartners(){
    const section=document.createElement('section');
    section.className='bestow-trust-section alt';
    section.id='technology-partners';
    section.innerHTML=`<div class="container"><div class="bestow-trust-heading"><div class="kicker">Technology Ecosystem</div><h2>Our Technology Partners</h2><p>Technology brands and platforms that support the solutions we provide. Official partner logos can be substituted once the current partner/authorization status is confirmed.</p></div><div class="bestow-partner-wrap">${partners.map(p=>`<div class="bestow-partner-card"><div class="bestow-partner-logo">${p.name}</div><p>${p.note}</p></div>`).join('')}</div><p class="bestow-trust-note">Partner names and logos should be displayed only where Bestow IT Services has a current authorized partnership, reseller relationship or permission to use the brand.</p></div>`;
    return section;
  }

  function init(){
    addStyles();
    if(document.getElementById('customer-testimonials')) return;
    const cta=document.querySelector('.cta-strip');
    const footer=document.querySelector('#footer');
    const anchor=cta||footer;
    if(!anchor) return;
    anchor.parentNode.insertBefore(buildTestimonials(),anchor);
    anchor.parentNode.insertBefore(buildPartners(),anchor);
    if(window.AOS && typeof window.AOS.refresh==='function') window.AOS.refresh();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
