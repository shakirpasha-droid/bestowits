/* BESTOW IT SERVICES - Feedback card visual enhancement */
(function(){
  'use strict';
  function enhance(){
    const cards=document.querySelectorAll('#customer-testimonials .bestow-testimonial-card');
    if(!cards.length) return;
    const backgrounds=['linear-gradient(135deg,#eef5ff,#ffffff)','linear-gradient(135deg,#effbf7,#ffffff)','linear-gradient(135deg,#fff7e8,#ffffff)','linear-gradient(135deg,#f7efff,#ffffff)','linear-gradient(135deg,#edfaff,#ffffff)','linear-gradient(135deg,#fff0f3,#ffffff)'];
    cards.forEach((card,index)=>{
      card.style.background=backgrounds[index%backgrounds.length];
      card.style.borderColor='rgba(36,84,244,.14)';
      card.style.position='relative';
      card.style.overflow='hidden';
      card.style.transition='transform .25s ease,box-shadow .25s ease';
      const bar=document.createElement('div');
      bar.style.cssText='position:absolute;left:0;top:0;bottom:0;width:5px;background:linear-gradient(180deg,#2454f4,#28a8e8);';
      card.prepend(bar);
      card.addEventListener('mouseenter',()=>{card.style.transform='translateY(-6px)';card.style.boxShadow='0 18px 38px rgba(27,55,108,.13)';});
      card.addEventListener('mouseleave',()=>{card.style.transform='';card.style.boxShadow='';});
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(enhance,350),{once:true}); else setTimeout(enhance,350);
})();
