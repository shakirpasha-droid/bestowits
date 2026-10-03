/* BESTOW IT SERVICES — AI-style website assistant
 * Key-free first release: answers common Bestow service questions locally,
 * then hands qualified enquiries to WhatsApp. No API key is exposed in the browser.
 */
(function () {
  "use strict";
  if (window.__bestowAIChatLoaded) return;
  window.__bestowAIChatLoaded = true;

  var WA = "919440742529";
  var services = {
    "computer": "We provide desktop and computer support including hardware troubleshooting, upgrades, Windows installation, software support and preventive maintenance.",
    "laptop": "We provide laptop troubleshooting, hardware upgrades, operating-system and software support for home and business users.",
    "amc": "We provide Computer AMC and preventive maintenance for businesses, helping reduce avoidable downtime and keep systems maintained.",
    "network": "We support LAN and structured CAT6 cabling, routers, managed switches, Wi-Fi access points, network troubleshooting and office connectivity.",
    "wifi": "We design and troubleshoot business Wi-Fi networks, including access points, coverage planning, configuration and connectivity issues.",
    "backup": "We provide data backup, storage support and recovery assistance for HDD, SSD and business storage media.",
    "recovery": "We can assess HDD/SSD and storage-media data recovery requirements. Recovery feasibility depends on the condition of the device.",
    "cctv": "We support IP CCTV and surveillance solutions, including installation, configuration and technical support.",
    "camera": "We support CCTV camera installation, configuration and troubleshooting for business and commercial environments.",
    "biometric": "We support biometric attendance systems, installation, configuration and technical assistance.",
    "epabx": "We support EPABX and office telephone systems, including extensions, wiring, configuration and troubleshooting.",
    "telephone": "We support EPABX and office telephone systems, including extensions, wiring, configuration and troubleshooting.",
    "microsoft": "We support Microsoft 365 and Windows-based business environments, including user and system support.",
    "google workspace": "We can assist with Google Workspace-related business IT support and user setup.",
    "support": "Bestow IT Services provides professional IT support in Hyderabad covering computers, laptops, AMC, networking, Wi-Fi, data backup/recovery, CCTV, biometric and EPABX.",
    "location": "Bestow IT Services serves Hyderabad and surrounding business areas in Telangana.",
    "hyderabad": "Yes. Our services are focused on Hyderabad and surrounding business areas.",
    "contact": "You can contact Bestow IT Services at +91 9440742529 or bestowits@gmail.com. You can also use the website enquiry form.",
    "phone": "Our phone number is +91 9440742529.",
    "email": "Our email is bestowits@gmail.com. The website also lists shakirpasha@bestowits.com for enquiries.",
    "quotation": "Absolutely. Tell me the service you need and a few details about the site or number of systems. I can then guide you to the enquiry/WhatsApp step.",
    "quote": "Absolutely. Tell me the service you need and a few details about the site or number of systems. I can then guide you to the enquiry/WhatsApp step.",
    "price": "Pricing depends on the service, equipment, site requirements and scope. For an accurate quotation, share your requirement with us.",
    "cost": "Pricing depends on the service, equipment, site requirements and scope. For an accurate quotation, share your requirement with us."
  };

  function normalize(s) {
    return (s || "").toLowerCase().replace(/[^a-z0-9+@.\s]/g, " ").replace(/\s+/g, " ").trim();
  }

  function answer(input) {
    var q = normalize(input);
    if (!q) return "Please type your requirement and I’ll help you find the right Bestow IT Services option.";
    if (/\b(hi|hello|hey|good morning|good evening)\b/.test(q)) {
      return "Hello! 👋 I’m the Bestow IT Assistant. I can help with IT support, AMC, networking, Wi-Fi, data recovery, CCTV, biometric and EPABX services.";
    }
    if (/\b(what do you|what services|services|offer)\b/.test(q)) {
      return "We support computers and laptops, Computer AMC, LAN/networking, Wi-Fi, data backup & recovery, CCTV, biometric attendance and EPABX/telephone systems.";
    }
    var keys = Object.keys(services).sort(function(a,b){ return b.length-a.length; });
    for (var i=0; i<keys.length; i++) {
      if (q.indexOf(keys[i]) !== -1) return services[keys[i]];
    }
    if (/\b(yes|okay|ok|sure|interested)\b/.test(q)) {
      return "Great. Please share your requirement, location in Hyderabad and an approximate number of systems/users. You can then continue on WhatsApp for a quotation or site discussion.";
    }
    if (/\b(human|person|agent|call|talk)\b/.test(q)) {
      return "Sure. You can speak with the Bestow IT Services team on WhatsApp or call +91 9440742529.";
    }
    return "I can help with Bestow IT Services’ main offerings. Try asking about Computer AMC, networking, Wi-Fi, CCTV, data recovery, biometric, EPABX or IT support. For a specific requirement, you can also send it directly on WhatsApp.";
  }

  function wa(text) {
    var msg = "Hello Bestow IT Services, I used the website AI Assistant. My requirement is: " + text;
    return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg);
  }

  var style = document.createElement("style");
  style.textContent = `
    #bestow-ai-launcher{position:fixed;right:22px;bottom:92px;min-width:205px;height:58px;padding:7px 15px 7px 8px;border:0;border-radius:31px;background:linear-gradient(135deg,#10245a,#2454f4 55%,#28a8e8);color:#fff;display:flex;align-items:center;gap:10px;z-index:10001;box-shadow:0 0 0 3px rgba(40,168,232,.16),0 12px 32px rgba(20,55,120,.35);cursor:pointer;font-size:24px;transition:.25s;animation:baiPulse 2.4s infinite}
    #bestow-ai-launcher:hover{transform:translateY(-3px) scale(1.03)}@keyframes baiPulse{0%,100%{box-shadow:0 0 0 3px rgba(40,168,232,.16),0 12px 32px rgba(20,55,120,.35)}50%{box-shadow:0 0 0 8px rgba(40,168,232,.08),0 14px 38px rgba(20,55,120,.4)}}
    #bestow-ai-launcher .bai-label{font-size:11px;font-weight:800;white-space:nowrap}#bestow-ai-launcher .bai-icon{width:43px;height:43px;border-radius:50%;background:#fff;padding:3px;object-fit:contain;box-shadow:0 3px 12px rgba(0,0,0,.2)}#bestow-ai-launcher .bai-dot{position:absolute;right:3px;top:2px;width:12px;height:12px;background:#20c997;border:2px solid #fff;border-radius:50%}
    #bestow-ai-panel{position:fixed;right:22px;bottom:164px;width:min(390px,calc(100vw - 28px));height:min(590px,calc(100vh - 185px));background:#fff;border:1px solid #dfe8f6;border-radius:20px;z-index:10000;box-shadow:0 22px 60px rgba(15,35,75,.24);overflow:hidden;display:none;flex-direction:column;font-family:Poppins,Arial,sans-serif}
    #bestow-ai-panel.open{display:flex}
    .bai-head{background:linear-gradient(135deg,#10245a,#2454f4);color:#fff;padding:16px 17px;display:flex;align-items:center;gap:11px}
    .bai-avatar{width:48px;height:48px;border-radius:14px;background:#fff;padding:4px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 14px rgba(0,0,0,.18)}.bai-avatar img{width:100%;height:100%;object-fit:contain;border-radius:10px}
    .bai-head strong{display:block;font-size:14px}.bai-head small{opacity:.78;font-size:10px}
    .bai-close{margin-left:auto;border:0;background:transparent;color:#fff;font-size:24px;cursor:pointer}
    .bai-messages{flex:1;overflow:auto;padding:15px;background:#f7faff}
    .bai-msg{max-width:86%;padding:11px 13px;border-radius:15px;margin:0 0 10px;font-size:12px;line-height:1.6;white-space:pre-wrap}
    .bai-msg.bot{background:#fff;color:#344766;border:1px solid #e4ebf6;border-top-left-radius:5px}
    .bai-msg.user{margin-left:auto;background:#2454f4;color:#fff;border-top-right-radius:5px}
    .bai-quick{display:flex;gap:7px;flex-wrap:wrap;margin:5px 0 10px}
    .bai-quick button{border:1px solid #cbdafa;background:#fff;color:#2454f4;border-radius:999px;padding:7px 10px;font-size:10px;cursor:pointer}
    .bai-quick button:hover{background:#edf3ff}
    .bai-compose{padding:10px;border-top:1px solid #e5ebf5;background:#fff}
    .bai-row{display:flex;gap:7px}
    .bai-input{flex:1;border:1px solid #d5dfef;border-radius:12px;padding:10px 11px;outline:0;font:12px Poppins,Arial,sans-serif}
    .bai-send{width:42px;border:0;border-radius:12px;background:#2454f4;color:#fff;cursor:pointer}
    .bai-wa{display:block;text-align:center;margin-top:7px;padding:8px;border-radius:10px;background:#eafaf1;color:#148447;text-decoration:none;font-size:10px;font-weight:700}
    .bai-note{text-align:center;color:#8390a5;font-size:9px;margin-top:6px}
    @media(max-width:600px){#bestow-ai-launcher{right:16px;bottom:84px;min-width:58px;width:58px;padding:7px;justify-content:center}.bai-label{display:none!important}#bestow-ai-panel{right:14px;bottom:154px;height:min(560px,calc(100vh - 175px))}}
  `;
  document.head.appendChild(style);

  var launcher = document.createElement("button");
  launcher.id = "bestow-ai-launcher";
  launcher.setAttribute("aria-label","Open Bestow IT AI Assistant");
  launcher.innerHTML = '<img class="bai-icon" src="assets/img/logo.png" alt="Bestow IT Services"><span class="bai-label">Bestow IT Service&#39;s AI Assist</span><span class="bai-dot"></span>';
  document.body.appendChild(launcher);

  var panel = document.createElement("div");
  panel.id = "bestow-ai-panel";
  panel.setAttribute("aria-label","Bestow IT Services AI Assistant");
  panel.innerHTML = `
    <div class="bai-head">
      <div class="bai-avatar"><img src="assets/img/logo.png" alt="Bestow IT Services"></div>
      <div><strong>Bestow IT Service&#39;s AI Assist</strong><small>IT support &amp; service help</small></div>
      <button class="bai-close" aria-label="Close chat">&times;</button>
    </div>
    <div class="bai-messages" id="bai-messages"></div>
    <div class="bai-compose">
      <div class="bai-row">
        <input class="bai-input" id="bai-input" type="text" placeholder="Ask about our IT services..." autocomplete="off">
        <button class="bai-send" id="bai-send" aria-label="Send"><i class="bi bi-send-fill"></i></button>
      </div>
      <a class="bai-wa" id="bai-wa" href="https://wa.me/919440742529" target="_blank" rel="noopener"><i class="bx bxl-whatsapp"></i> Continue on WhatsApp</a>
      <div class="bai-note">Bestow IT Assistant • Hyderabad</div>
    </div>
  `;
  document.body.appendChild(panel);

  var messages = panel.querySelector("#bai-messages");
  var input = panel.querySelector("#bai-input");
  var send = panel.querySelector("#bai-send");
  var waLink = panel.querySelector("#bai-wa");

  function addMsg(text, who) {
    var div = document.createElement("div");
    div.className = "bai-msg " + who;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function quickButtons() {
    var wrap = document.createElement("div");
    wrap.className = "bai-quick";
    ["IT Support","Computer AMC","Networking & Wi-Fi","CCTV","Get a Quote"].forEach(function(label){
      var b=document.createElement("button");
      b.textContent=label;
      b.onclick=function(){ input.value=label; submit(); };
      wrap.appendChild(b);
    });
    messages.appendChild(wrap);
    messages.scrollTop = messages.scrollHeight;
  }

  function submit() {
    var text = input.value.trim();
    if (!text) return;
    addMsg(text,"user");
    input.value="";
    setTimeout(function(){ addMsg(answer(text),"bot"); waLink.href=wa(text); },180);
  }

  launcher.onclick=function(){
    panel.classList.toggle("open");
    if(panel.classList.contains("open") && !messages.children.length){
      addMsg("Hi! 👋 I’m the Bestow IT Assistant. How can I help you today?","bot");
      quickButtons();
      input.focus();
    }
  };
  panel.querySelector(".bai-close").onclick=function(){panel.classList.remove("open")};
  send.onclick=submit;
  input.addEventListener("keydown",function(e){if(e.key==="Enter")submit();});
})();