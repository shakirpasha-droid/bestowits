/* BESTOW IT SERVICES — AI-style website assistant
 * Key-free first release: answers common Bestow service questions locally,
 * then hands qualified enquiries to WhatsApp. No API key is exposed in the browser.
 */
(function () {
  "use strict";
  if (window.__bestowAIChatLoaded) return;
  window.__bestowAIChatLoaded = true;

  var WA = "919440742529";
  var serviceProfiles = {
    "computer": {name:"Computer & Desktop Support",keywords:["computer","desktop","pc","system","cpu","workstation"],reply:"We handle desktop and computer troubleshooting, Windows/software issues, upgrades, printer connectivity and preventive maintenance."},
    "laptop": {name:"Laptop Support",keywords:["laptop","notebook"],reply:"We support laptop hardware, Windows/software issues, upgrades, troubleshooting and preventive maintenance."},
    "amc": {name:"Computer AMC",keywords:["amc","annual maintenance","maintenance contract","preventive maintenance"],reply:"We provide Computer AMC for businesses, covering recurring support, preventive maintenance and technical assistance."},
    "network": {name:"Networking & LAN",keywords:["network","networking","lan","cat6","switch","router","ethernet","cabling","server connectivity"],reply:"We support LAN and structured networking, CAT6 cabling, routers, switches, IP configuration and office connectivity."},
    "wifi": {name:"Wi-Fi Solutions",keywords:["wifi","wi-fi","wireless","access point","access points","wireless network","coverage"],reply:"We can troubleshoot and design business Wi-Fi, including access-point placement, coverage, configuration and connectivity problems."},
    "backup": {name:"Backup & Data Protection",keywords:["backup","data backup","storage","nas"],reply:"We can help with business backup planning, storage setup and backup-related support for important files and systems."},
    "recovery": {name:"Data Recovery",keywords:["data recovery","recover data","recovery","deleted files","hard disk recovery","hdd recovery","ssd recovery"],reply:"We can assess HDD/SSD and storage-media recovery requirements. Recovery feasibility depends on the device condition."},
    "cctv": {name:"CCTV & Surveillance",keywords:["cctv","camera","cameras","surveillance","ip camera","dvr","nvr"],reply:"We support CCTV and surveillance projects including installation, configuration, IP cameras, recording systems and troubleshooting."},
    "biometric": {name:"Biometric Attendance",keywords:["biometric","attendance machine","fingerprint","essl","attendance"],reply:"We support biometric attendance systems, installation, configuration and technical assistance."},
    "epabx": {name:"EPABX & Telephone",keywords:["epabx","pbx","telephone","extension","intercom","office phone"],reply:"We support EPABX, PBX/intercom and office telephone systems including extensions, wiring, configuration and troubleshooting."},
    "microsoft": {name:"Microsoft 365 & Windows",keywords:["microsoft 365","office 365","m365","windows","active directory","outlook","microsoft"],reply:"We support Windows and Microsoft 365 business environments, including user, desktop and basic administration support."},
    "google": {name:"Google Workspace",keywords:["google workspace","gmail business","google admin"],reply:"We can assist with Google Workspace business user setup and related IT support."}
  };

  var state = {service:null, quantity:null, location:null, issue:null, wantsQuote:false, history:[]};

  function normalize(s) {
    return (s || "").toLowerCase().replace(/[^a-z0-9+@.\s-]/g, " ").replace(/\s+/g, " ").trim();
  }

  function detectService(q) {
    var best=null, score=0;
    Object.keys(serviceProfiles).forEach(function(key){
      var p=serviceProfiles[key], n=0;
      p.keywords.forEach(function(k){ if(q.indexOf(k) !== -1) n += k.length > 5 ? 2 : 1; });
      if(n>score){score=n;best=key;}
    });
    return best;
  }

  function detectQuantity(q) {
    var m=q.match(/\b(\d{1,4})\s*(?:systems?|computers?|pcs?|laptops?|users?|cameras?|access\s*points?|aps?|extensions?)\b/);
    return m ? m[1] : null;
  }

  function detectLocation(q) {
    var cities=["hyderabad","secunderabad","kukatpally","gachibowli","madhapur","hitech city","hitec city","kondapur","banjara hills","jubilee hills","ameerpet","sr nagar","begumpet","uppal","lb nagar","somajiguda"];
    for(var i=0;i<cities.length;i++) if(q.indexOf(cities[i])!==-1) return cities[i];
    return null;
  }

  function detectQuote(q) {
    return /\b(quote|quotation|price|pricing|cost|estimate|proposal|amc quote|how much|rate)\b/.test(q);
  }

  function detectProblem(q) {
    var words=["slow","not working","disconnect","disconnected","error","problem","issue","down","failed","failure","cannot","can't","unable","hang","crash","no internet","not connecting"];
    for(var i=0;i<words.length;i++) if(q.indexOf(words[i])!==-1) return true;
    return false;
  }

  function answer(input) {
    var q=normalize(input);
    if(!q) return "Please describe what you need help with.";

    if(/\b(hi|hello|hey|good morning|good evening)\b/.test(q))
      return "Hello! 👋 I’m Bestow IT Service's AI Assist. Tell me what you need — for example, “Our office has 20 computers and Wi-Fi is disconnecting.”";

    var detected=detectService(q);
    var qty=detectQuantity(q), loc=detectLocation(q), quote=detectQuote(q), problem=detectProblem(q);
    if(detected) state.service=detected;
    if(qty) state.quantity=qty;
    if(loc) state.location=loc;
    if(quote) state.wantsQuote=true;
    if(problem) state.issue=input;

    if(/\b(what services|services|what do you|what can you|offer)\b/.test(q))
      return "We support computers/laptops, Computer AMC, networking & Wi-Fi, data backup/recovery, CCTV, biometric attendance, EPABX/telephone, Microsoft 365 and Google Workspace.";

    if(/\b(where|location|area|areas|cover)\b/.test(q))
      return "Bestow IT Services is focused on Hyderabad and surrounding business areas in Telangana. Tell me your area and I can include it in your enquiry.";

    if(/\b(contact|phone|number|email|call)\b/.test(q) && !detected)
      return "You can reach Bestow IT Services at +91 9440742529 or bestowits@gmail.com. I can also prepare your requirement for WhatsApp.";

    if(detected){
      var p=serviceProfiles[detected];
      var response=p.reply;
      if(problem) response += " Since you mentioned a problem, tell me what is happening and how many systems/users are affected.";
      else if(!state.quantity) response += " If this is for an office, tell me approximately how many systems/users are involved so I can guide you better.";
      if(quote) response += " For pricing, the scope and site requirements are needed for an accurate quotation.";
      return response;
    }

    if(state.service && /\b(yes|okay|ok|sure|interested|proceed)\b/.test(q))
      return "Great. I have your requirement started. Please share the site area and approximate number of systems/users. I can then prepare the enquiry for WhatsApp.";

    if(state.service && (q.indexOf("how much")!==-1 || quote))
      return "Pricing depends on the service, quantity, equipment and site scope. Tell me the number of systems/cameras/access points and your Hyderabad area, and I’ll prepare the enquiry details.";

    if(/\b(human|person|agent|talk|team)\b/.test(q))
      return "Sure. You can contact the Bestow IT Services team on WhatsApp or call +91 9440742529.";

    return "I can understand Bestow IT Services requirements better if you describe the situation in one sentence. For example: “I have 15 office computers and the network is slow in Gachibowli.”";
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