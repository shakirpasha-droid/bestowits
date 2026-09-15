/* BESTOW IT SERVICES - Homepage social links and SEO content */
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
      .bestow-home-seo{padding:70px 0;background:#fff}
      .bestow-home-seo .container{max-width:1100px}
      .bestow-home-seo h2{font-size:30px;line-height:1.3;color:#101f46;font-weight:700;margin:0 0 18px}
      .bestow-home-seo h3{font-size:20px;color:#142b5b;font-weight:700;margin:28px 0 10px}
      .bestow-home-seo p{font-size:14px;line-height:1.85;color:#42516d;margin:0 0 14px}
      .bestow-home-seo .seo-grid{display:grid;grid-template-columns:1fr 1fr;gap:28px;margin-top:18px}
      .bestow-home-seo .seo-box{padding:24px;border:1px solid #e7eefb;border-radius:16px;background:#f8fbff}
      @media(max-width:767px){.bestow-home-seo{padding:52px 0}.bestow-home-seo h2{font-size:26px}.bestow-home-seo .seo-grid{grid-template-columns:1fr;gap:8px}.bestow-home-seo p{font-size:13px}}
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

  function addHomepageSeoContent(){
    if(document.getElementById('bestow-home-seo')) return;
    const footer=document.querySelector('#footer');
    if(!footer) return;
    const section=document.createElement('section');
    section.id='bestow-home-seo';
    section.className='bestow-home-seo';
    section.setAttribute('aria-label','Bestow IT Services business IT support information');
    section.innerHTML=`
      <div class="container">
        <h2>Technology That Keeps Your Business Moving</h2>
        <p>Bestow IT Services helps businesses in Hyderabad keep their technology dependable, connected and ready for everyday work. We provide practical IT support for offices and commercial environments, covering computers, laptops, networks, Wi-Fi, data protection, security systems and business communication infrastructure. Our approach is focused on solving real operational problems, reducing avoidable downtime and making technology easier for teams to use.</p>
        <div class="seo-grid">
          <div class="seo-box">
            <h3>IT Support for Hyderabad Businesses</h3>
            <p>Business computers and laptops need regular maintenance to remain stable and productive. We support hardware troubleshooting, system upgrades, operating system installation, software setup, printer connectivity and general desktop support. For organizations that need ongoing assistance, our computer AMC services provide a structured way to handle preventive maintenance and recurring technical issues.</p>
            <p>We also help businesses review their existing IT setup and identify practical improvements. Whether an office is expanding, replacing old systems or dealing with repeated connectivity problems, our support is designed around the working environment rather than a one-size-fits-all solution.</p>
          </div>
          <div class="seo-box">
            <h3>Networking, Wi-Fi and Infrastructure</h3>
            <p>A reliable network is essential for cloud applications, shared files, printers, security systems and day-to-day communication. Bestow IT Services supports LAN and Wi-Fi installations, CAT6 cabling, switches, routers and access points. We can assist with network planning, configuration, troubleshooting and documentation for offices and other business locations.</p>
            <p>Good infrastructure also means keeping the network organized and secure. We help businesses improve connectivity, resolve weak Wi-Fi areas, manage equipment placement and maintain a cleaner technical setup that can be easier to troubleshoot as the organization grows.</p>
          </div>
          <div class="seo-box">
            <h3>Data Protection and Business Security</h3>
            <p>Business information is valuable, so backup and recovery should be considered part of the IT environment. We provide data backup guidance and recovery support for HDD, SSD and other storage media. Our CCTV and biometric services also support physical security and attendance requirements through installation, configuration and technical assistance.</p>
          </div>
          <div class="seo-box">
            <h3>Business Communication Systems</h3>
            <p>We support EPABX and telephone systems for offices that rely on internal extensions and structured communication. From basic connectivity and wiring to system configuration and troubleshooting, our service helps keep business communication available and organized.</p>
            <p>For businesses looking for a single technology support partner, these services can be coordinated with existing infrastructure and future requirements. Contact Bestow IT Services to discuss your current setup and the type of support your business needs in Hyderabad.</p>
          </div>
        </div>
      </div>`;
    footer.parentNode.insertBefore(section,footer);
  }

  /*
   * Non-intrusive homepage content protection.
   * This is a browser-side deterrent only; it does not alter the page layout,
   * images, forms, links, navigation, SEO markup, or existing functionality.
   */
  function addContentProtection(){
    if(document.documentElement.dataset.bestowProtection === '1') return;
    document.documentElement.dataset.bestowProtection = '1';

    document.addEventListener('contextmenu', function(e){
      const tag = (e.target && e.target.tagName) || '';
      if(tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      e.preventDefault();
    }, {capture:true});

    document.addEventListener('dragstart', function(e){
      if(e.target && e.target.tagName === 'IMG') e.preventDefault();
    }, {capture:true});
  }

  function init(){
    addStyles();
    addSocialIcons();
    addHomepageSeoContent();
    addContentProtection();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();
