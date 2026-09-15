/* BESTOW IT SERVICES - Homepage social links */
(function(){
  'use strict';
  const isHome = /(^|\/)index\.html$|\/$/.test(window.location.pathname);
  if(!isHome) return;

  function addStyles(){
    if(document.getElementById('bestow-home-social-styles')) return;
    const s=document.createElement('style');
    s.id='bestow-home-social-styles';
    s.textContent=`
      .bestow-social-links{display:flex;align-items:center;justify-content:center;gap:12px;margin:24px 0 8px;flex-wrap:wrap}
      .bestow-social-links a{width:42px;height:42px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;background:#2454f4;color:#fff;text-decoration:none;font-size:21px;transition:.25s;box-shadow:0 5px 16px rgba(36,84,244,.22)}
      .bestow-social-links a:hover{transform:translateY(-3px);background:#28a8e8;color:#fff}
      .bestow-social-label{text-align:center;color:#c5d0e8;font-size:12px;margin:0}
      @media(max-width:767px){.bestow-social-links{gap:10px}.bestow-social-links a{width:40px;height:40px;font-size:19px}}
    `;
    document.head.appendChild(s);
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

  function init(){
    addStyles();
    addSocialIcons();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();
