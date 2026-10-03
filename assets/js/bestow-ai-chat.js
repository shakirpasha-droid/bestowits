/* BESTOW IT SERVICES — Bestow IT Service's AI Assist
 * Context-aware customer communication engine.
 * Static-site safe: no private AI API key is stored here.
 * Conversations remain in browser memory until the visitor chooses to email
 * the transcript or continue on WhatsApp.
 */
(function () {
  "use strict";
  if (window.__bestowAIChatLoaded) return;
  window.__bestowAIChatLoaded = true;

  var WA = "919440742529";
  // Set this to the deployed Vercel function URL, for example:
  // https://your-project.vercel.app/api/whatsapp-notify
  var WHATSAPP_API_URL = window.BESTOW_WHATSAPP_API_URL || "/api/whatsapp-notify";
  var WEB3FORMS_KEY = "414c8cf7-4187-4369-ad45-8c6132dd6610";
  var state = {
    service: null, services: [], quantity: null, location: null,
    issue: null, wantsQuote: false, urgency: null, history: []
  };
  var autoNotificationSent = false;
  var autoNotificationSending = false;

  var serviceProfiles = {
    computer:{name:"Computer & Desktop Support",keys:["computer","desktop","pc","system","cpu","workstation"],reply:"We handle desktop and computer troubleshooting, Windows/software issues, upgrades, printer connectivity and preventive maintenance."},
    laptop:{name:"Laptop Support",keys:["laptop","notebook"],reply:"We support laptop hardware, Windows/software issues, upgrades, troubleshooting and preventive maintenance."},
    amc:{name:"Computer AMC",keys:["amc","annual maintenance","maintenance contract","preventive maintenance"],reply:"We provide Computer AMC for businesses, including recurring support, preventive maintenance and technical assistance."},
    network:{name:"Networking & LAN",keys:["network","networking","lan","cat6","switch","router","ethernet","cabling","server connectivity"],reply:"We support LAN and structured networking, CAT6 cabling, routers, switches, IP configuration and office connectivity."},
    wifi:{name:"Wi-Fi Solutions",keys:["wifi","wi-fi","wireless","access point","access points","wireless network","coverage"],reply:"We can troubleshoot and design business Wi-Fi, including access-point placement, coverage, configuration and connectivity problems."},
    backup:{name:"Backup & Data Protection",keys:["backup","data backup","storage","nas"],reply:"We can help with business backup planning, storage setup and backup-related support for important files and systems."},
    recovery:{name:"Data Recovery",keys:["data recovery","recover data","recovery","deleted files","hard disk recovery","hdd recovery","ssd recovery"],reply:"We can assess HDD/SSD and storage-media recovery requirements. Recovery feasibility depends on the device condition."},
    cctv:{name:"CCTV & Surveillance",keys:["cctv","camera","cameras","surveillance","ip camera","dvr","nvr"],reply:"We support CCTV and surveillance projects including installation, configuration, IP cameras, recording systems and troubleshooting."},
    biometric:{name:"Biometric Attendance",keys:["biometric","attendance machine","fingerprint","essl","attendance"],reply:"We support biometric attendance systems, installation, configuration and technical assistance."},
    epabx:{name:"EPABX & Telephone",keys:["epabx","pbx","telephone","extension","intercom","office phone"],reply:"We support EPABX, PBX/intercom and office telephone systems including extensions, wiring, configuration and troubleshooting."},
    microsoft:{name:"Microsoft 365 & Windows",keys:["microsoft 365","office 365","m365","windows","active directory","outlook","microsoft"],reply:"We support Windows and Microsoft 365 business environments, including user, desktop and basic administration support."},
    google:{name:"Google Workspace",keys:["google workspace","gmail business","google admin"],reply:"We can assist with Google Workspace business user setup and related IT support."}
  };

  function normalize(s){return (s||"").toLowerCase().replace(/[^a-z0-9+@.\s-]/g," ").replace(/\s+/g," ").trim();}
  function detectServices(q){
    var found=[];
    Object.keys(serviceProfiles).forEach(function(k){
      var p=serviceProfiles[k];
      if(p.keys.some(function(x){return q.indexOf(x)!==-1;})) found.push(k);
    });
    return found;
  }
  function detectQuantity(q){
    var m=q.match(/\b(\d{1,4})\s*(?:systems?|computers?|pcs?|laptops?|users?|cameras?|access\s*points?|aps?|extensions?|desktops?)\b/);
    return m?m[1]:null;
  }
  function detectLocation(q){
    var a=["hyderabad","secunderabad","kukatpally","gachibowli","madhapur","hitech city","hitec city","kondapur","banjara hills","jubilee hills","ameerpet","sr nagar","begumpet","uppal","lb nagar","somajiguda"];
    for(var i=0;i<a.length;i++) if(q.indexOf(a[i])!==-1) return a[i];
    return null;
  }
  function detectQuote(q){return /\b(quote|quotation|price|pricing|cost|estimate|proposal|rate|budget|how much)\b/.test(q);}
  function detectUrgency(q){
    if(/\b(urgent|urgently|immediately|asap|critical|down|business stopped|not working at all)\b/.test(q)) return "urgent";
    return null;
  }
  function detectProblem(q){
    var a=["slow","not working","disconnect","disconnected","error","problem","issue","down","failed","failure","cannot","can't","unable","hang","crash","no internet","not connecting","not opening","not responding"];
    for(var i=0;i<a.length;i++) if(q.indexOf(a[i])!==-1) return true;
    return false;
  }
  function unique(a){return a.filter(function(v,i){return a.indexOf(v)===i;});}

  function answer(input){
    var q=normalize(input);
    if(!q) return "Please describe what you need help with.";

    var detected=detectServices(q), qty=detectQuantity(q), loc=detectLocation(q);
    var quote=detectQuote(q), problem=detectProblem(q), urgent=detectUrgency(q);

    if(detected.length){
      state.services=unique(state.services.concat(detected));
      state.service=detected[0];
    }
    if(qty) state.quantity=qty;
    if(loc) state.location=loc;
    if(quote) state.wantsQuote=true;
    if(problem) state.issue=input;
    if(urgent) state.urgency=urgent;
    if(/\b(hi|hello|hey|good morning|good evening)\b/.test(q) && !detected.length){
      return "Hello! 👋 I’m Bestow IT Service's AI Assist. Tell me what is happening or what you need. You can mention the service, number of systems and Hyderabad area if you know them.";
    }

    if(/\b(what services|services|what do you|what can you|offer)\b/.test(q)){
      return "We support computers and laptops, Computer AMC, LAN/networking, Wi-Fi, data backup and recovery, CCTV, biometric attendance, EPABX/telephone, Microsoft 365 and Google Workspace.";
    }

    if(/\b(thank|thanks|thank you)\b/.test(q)){
      return "You're welcome. If you want, I can also prepare this conversation as an enquiry for the Bestow IT Services team.";
    }

    if(/\b(human|person|agent|talk to|team|representative)\b/.test(q)){
      return "Sure. I can hand this over to the Bestow IT Services team. You can continue on WhatsApp, or use “Send Chat to Bestow” to email the conversation details.";
    }

    if(/\b(contact|phone|number|email|call)\b/.test(q) && !detected.length){
      return "You can reach Bestow IT Services at +91 9440742529 or bestowits@gmail.com. I can also carry this conversation into WhatsApp so you don't have to repeat the requirement.";
    }

    if(detected.length){
      var names=detected.map(function(k){return serviceProfiles[k].name;}).join(" + ");
      var base=serviceProfiles[detected[0]].reply;
      if(detected.length>1) base="I understand this involves "+names+". "+base;
      if(problem) base+=" Since you mentioned an issue, tell me what is failing, when it started and how many users/systems are affected.";
      else if(!state.quantity) base+=" If this is for an office, tell me approximately how many systems/users/cameras/access points are involved.";
      if(quote) base+=" For an accurate quotation, I'll need the quantity, site area and a brief scope.";
      if(loc) base+=" I’ve noted the area as "+state.location+".";
      return base;
    }

    if(state.service && /\b(yes|okay|ok|sure|interested|proceed|continue)\b/.test(q)){
      return "Great. I have the requirement started. Please share the site area and approximate number of systems/users. If there is an existing problem, also tell me what is happening.";
    }

    if(state.service && (quote || /\b(budget|how much)\b/.test(q))){
      return "Pricing depends on the service, quantity, equipment and site scope. I have the service context from our conversation. Please give me the quantity and Hyderabad area, and I can prepare the enquiry details.";
    }

    if(state.issue && /\b(what should|what can|how to|fix|solution)\b/.test(q)){
      return "I can help narrow down the issue. Please tell me the exact error or symptom, what equipment is affected, and whether other users/systems are working normally.";
    }

    return "I’m following you. Could you give me a little more detail about the requirement or problem? For example: “25 office computers, network is slow, and Wi-Fi drops in Gachibowli.”";
  }

  function addMsg(text,who){
    var div=document.createElement("div");
    div.className="bai-msg "+who;
    div.textContent=text;
    messages.appendChild(div);
    messages.scrollTop=messages.scrollHeight;
    state.history.push({role:who==="user"?"user":"assistant",text:text,time:new Date().toISOString()});
  }

  function transcript(){
    return state.history.map(function(x){return "["+new Date(x.time).toLocaleString("en-IN")+"] "+(x.role==="user"?"Customer":"AI Assist")+": "+x.text;}).join("\n\n");
  }

  function summary(){
    var services=state.services.map(function(k){return serviceProfiles[k].name;}).join(", ")||"Not identified";
    return "Services: "+services+"\nQuantity: "+(state.quantity||"Not provided")+"\nLocation: "+(state.location||"Not provided")+"\nIssue: "+(state.issue||"Not provided")+"\nQuote requested: "+(state.wantsQuote?"Yes":"No")+"\nUrgency: "+(state.urgency||"Normal");
  }

  function waUrl(){
    var t=transcript().slice(-4500);
    return "https://wa.me/"+WA+"?text="+encodeURIComponent("Hello Bestow IT Services, I used the website AI Assistant.\n\nConversation summary:\n"+summary()+"\n\nRecent conversation:\n"+t);
  }

  async function sendAutomaticConversation(reason){
    if(autoNotificationSent || autoNotificationSending || state.history.filter(function(x){return x.role==="user";}).length===0) return false;
    autoNotificationSending=true;

    var data={
      summary:summary(),
      transcript:transcript(),
      reason:reason||"completed",
      page:window.location.href
    };

    try{
      // Primary path: secure server-side WhatsApp Cloud API.
      if(WHATSAPP_API_URL){
        var wr=await fetch(WHATSAPP_API_URL,{
          method:"POST",
          headers:{"Content-Type":"application/json","Accept":"application/json"},
          body:JSON.stringify(data),
          keepalive:true
        });
        var wresult=await wr.json().catch(function(){return {};});
        if(wr.ok && wresult.success===true){
          autoNotificationSent=true;
          return true;
        }
        console.warn("Bestow WhatsApp notification failed:",wresult.message||"API error");
      }

      // Email remains the reliable fallback/record.
      var payload={
        access_key:WEB3FORMS_KEY,
        subject:"AI Assistant - Completed Conversation - Bestow IT Services",
        from_name:"Bestow IT Services AI Assistant",
        name:"Website AI Customer",
        message:"Conversation automatically captured when the AI chat was completed/closed.\\n\\n"+summary()+"\\n\\n--- Conversation ---\\n"+transcript(),
        redirect:"false"
      };

      var r=await fetch("https://api.web3forms.com/submit",{
        method:"POST",
        headers:{"Content-Type":"application/json","Accept":"application/json"},
        body:JSON.stringify(payload),
        keepalive:true
      });
      var result=await r.json();
      if(!r.ok || result.success!==true) throw new Error(result.message||"Unable to send.");
      return false;
    }catch(err){
      console.warn("Bestow AI automatic notification failed:",err);
      return false;
    }finally{
      autoNotificationSending=false;
    }
  }


  function showSendForm(){
    var old=document.getElementById("bai-send-modal");
    if(old) old.remove();
    var overlay=document.createElement("div");
    overlay.id="bai-send-modal";
    overlay.innerHTML='<div class="bai-send-box"><button class="bai-send-close" type="button">&times;</button><h3>Send Chat to Bestow</h3><p>Send this conversation to the Bestow IT Services team for follow-up.</p><form><input name="name" placeholder="Your Name" required><input name="phone" placeholder="Phone / WhatsApp Number" required><input name="email" type="email" placeholder="Email Address"><textarea name="message" readonly></textarea><button type="submit">Send Conversation</button><div class="bai-send-status"></div></form></div>';
    document.body.appendChild(overlay);
    var form=overlay.querySelector("form"), ta=overlay.querySelector("textarea"), status=overlay.querySelector(".bai-send-status");
    ta.value=summary()+"\n\n--- Conversation ---\n"+transcript();
    overlay.querySelector(".bai-send-close").onclick=function(){overlay.remove();};
    overlay.addEventListener("click",function(e){if(e.target===overlay) overlay.remove();});
    form.onsubmit=async function(e){
      e.preventDefault();
      var btn=form.querySelector("button[type=submit]"); btn.disabled=true; btn.textContent="Sending...";
      var fd=new FormData(form);
      var payload=Object.fromEntries(fd.entries());
      payload.access_key=WEB3FORMS_KEY;
      payload.subject="AI Assistant Conversation - Bestow IT Services";
      payload.from_name="Bestow IT Services AI Assistant";
      payload.redirect="false";
      try{
        var r=await fetch("https://api.web3forms.com/submit",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(payload)});
        var result=await r.json();
        if(!r.ok||result.success!==true) throw new Error(result.message||"Unable to send.");
        status.className="success"; status.textContent="Conversation sent successfully. The Bestow team can now review it.";
        btn.textContent="Sent";
      }catch(err){
        status.className="error"; status.textContent=err.message||"Something went wrong. Please try WhatsApp.";
        btn.disabled=false; btn.textContent="Try Again";
      }
    };
  }

  var style=document.createElement("style");
  style.textContent=`
    #bestow-ai-launcher{position:fixed;right:22px;bottom:92px;min-width:205px;height:58px;padding:7px 15px 7px 8px;border:0;border-radius:31px;background:linear-gradient(135deg,#10245a,#2454f4 55%,#28a8e8);color:#fff;display:flex;align-items:center;gap:10px;z-index:10001;box-shadow:0 0 0 3px rgba(40,168,232,.16),0 12px 32px rgba(20,55,120,.35);cursor:pointer;font-size:24px;transition:.25s;animation:baiPulse 2.4s infinite}
    #bestow-ai-launcher:hover{transform:translateY(-3px) scale(1.03)}@keyframes baiPulse{0%,100%{box-shadow:0 0 0 3px rgba(40,168,232,.16),0 12px 32px rgba(20,55,120,.35)}50%{box-shadow:0 0 0 8px rgba(40,168,232,.08),0 14px 38px rgba(20,55,120,.4)}}
    #bestow-ai-launcher .bai-label{font-size:11px;font-weight:800;white-space:nowrap}#bestow-ai-launcher .bai-icon{width:43px;height:43px;border-radius:50%;background:#fff;padding:3px;object-fit:contain;box-shadow:0 3px 12px rgba(0,0,0,.2)}#bestow-ai-launcher .bai-dot{position:absolute;right:3px;top:2px;width:12px;height:12px;background:#20c997;border:2px solid #fff;border-radius:50%}
    #bestow-ai-panel{position:fixed;right:22px;bottom:164px;width:min(390px,calc(100vw - 28px));height:min(590px,calc(100vh - 185px));background:#fff;border:1px solid #dfe8f6;border-radius:20px;z-index:10000;box-shadow:0 22px 60px rgba(15,35,75,.24);overflow:hidden;display:none;flex-direction:column;font-family:Poppins,Arial,sans-serif}
    #bestow-ai-panel.open{display:flex}.bai-head{background:linear-gradient(135deg,#10245a,#2454f4);color:#fff;padding:16px 17px;display:flex;align-items:center;gap:11px}.bai-avatar{width:48px;height:48px;border-radius:14px;background:#fff;padding:4px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 14px rgba(0,0,0,.18)}.bai-avatar img{width:100%;height:100%;object-fit:contain;border-radius:10px}.bai-head strong{display:block;font-size:14px}.bai-head small{opacity:.78;font-size:10px}.bai-close{margin-left:auto;border:0;background:transparent;color:#fff;font-size:24px;cursor:pointer}.bai-messages{flex:1;overflow:auto;padding:15px;background:#f7faff}.bai-msg{max-width:86%;padding:11px 13px;border-radius:15px;margin:0 0 10px;font-size:12px;line-height:1.6;white-space:pre-wrap}.bai-msg.bot{background:#fff;color:#344766;border:1px solid #e4ebf6;border-top-left-radius:5px}.bai-msg.user{margin-left:auto;background:#2454f4;color:#fff;border-top-right-radius:5px}.bai-quick{display:flex;gap:7px;flex-wrap:wrap;margin:5px 0 10px}.bai-quick button{border:1px solid #cbdafa;background:#fff;color:#2454f4;border-radius:999px;padding:7px 10px;font-size:10px;cursor:pointer}.bai-quick button:hover{background:#edf3ff}.bai-compose{padding:10px;border-top:1px solid #e5ebf5;background:#fff}.bai-row{display:flex;gap:7px}.bai-input{flex:1;border:1px solid #d5dfef;border-radius:12px;padding:10px 11px;outline:0;font:12px Poppins,Arial,sans-serif}.bai-send{width:42px;border:0;border-radius:12px;background:#2454f4;color:#fff;cursor:pointer}.bai-actions{display:flex;gap:6px;margin-top:7px}.bai-actions button,.bai-actions a{flex:1;text-align:center;padding:8px 6px;border-radius:9px;text-decoration:none;font-size:9px;font-weight:700;cursor:pointer}.bai-email{border:1px solid #d9e2f2;background:#f7faff;color:#2454f4}.bai-wa{border:0;background:#eafaf1;color:#148447}.bai-note{text-align:center;color:#8390a5;font-size:9px;margin-top:6px}
    #bai-send-modal{position:fixed;inset:0;background:rgba(10,25,60,.5);backdrop-filter:blur(3px);z-index:10020;display:flex;align-items:center;justify-content:center;padding:18px}.bai-send-box{width:min(450px,100%);max-height:90vh;overflow:auto;background:#fff;border-radius:18px;padding:22px;box-shadow:0 25px 70px rgba(0,0,0,.25)}.bai-send-box h3{margin:0 0 5px;color:#10244d}.bai-send-box p{font-size:11px;color:#6b7890;margin:0 0 14px}.bai-send-box input,.bai-send-box textarea{width:100%;box-sizing:border-box;border:1px solid #d7e1ef;border-radius:9px;padding:10px;margin-bottom:9px;font:12px Poppins,Arial,sans-serif}.bai-send-box textarea{height:180px;resize:vertical;background:#f8faff}.bai-send-box form button[type=submit]{width:100%;border:0;border-radius:9px;padding:11px;background:#2454f4;color:#fff;font-weight:700;cursor:pointer}.bai-send-close{float:right;border:0;background:#eef3ff;border-radius:50%;width:30px;height:30px;font-size:20px;color:#344766;cursor:pointer}.bai-send-status{margin-top:9px;font-size:11px}.bai-send-status.success{color:#16834b}.bai-send-status.error{color:#b52f2f}
    @media(max-width:600px){#bestow-ai-launcher{right:16px;bottom:84px;min-width:58px;width:58px;padding:7px;justify-content:center}.bai-label{display:none!important}#bestow-ai-panel{right:14px;bottom:154px;height:min(560px,calc(100vh - 175px))}.bai-actions button,.bai-actions a{font-size:8px}}
  `;
  document.head.appendChild(style);

  var launcher=document.createElement("button");
  launcher.id="bestow-ai-launcher";
  launcher.setAttribute("aria-label","Open Bestow IT AI Assistant");
  launcher.innerHTML='<img class="bai-icon" src="assets/img/logo.png" alt="Bestow IT Services"><span class="bai-label">Bestow IT Service&#39;s AI Assist</span><span class="bai-dot"></span>';
  document.body.appendChild(launcher);

  var panel=document.createElement("div");
  panel.id="bestow-ai-panel";
  panel.innerHTML='<div class="bai-head"><div class="bai-avatar"><img src="assets/img/logo.png" alt="Bestow IT Services"></div><div><strong>Bestow IT Service&#39;s AI Assist</strong><small>IT support &amp; service help</small></div><button class="bai-close" aria-label="Close chat">&times;</button></div><div class="bai-messages" id="bai-messages"></div><div class="bai-compose"><div class="bai-row"><input class="bai-input" id="bai-input" type="text" placeholder="Ask about our IT services..." autocomplete="off"><button class="bai-send" id="bai-send" aria-label="Send"><i class="bi bi-send-fill"></i></button></div><div class="bai-actions"><button class="bai-email" id="bai-email">✉ Send Chat Now</button><a class="bai-wa" id="bai-wa" href="https://wa.me/919440742529" target="_blank" rel="noopener">WhatsApp Team</a></div><div class="bai-note">Conversation is automatically sent to the Bestow team when the chat is completed.</div></div>';
  document.body.appendChild(panel);

  var messages=panel.querySelector("#bai-messages"), input=panel.querySelector("#bai-input"), send=panel.querySelector("#bai-send"), waLink=panel.querySelector("#bai-wa");

  function quickButtons(){
    var wrap=document.createElement("div"); wrap.className="bai-quick";
    ["IT Support","Computer AMC","Networking & Wi-Fi","CCTV","Get a Quote"].forEach(function(label){
      var b=document.createElement("button"); b.textContent=label; b.onclick=function(){input.value=label;submit();}; wrap.appendChild(b);
    });
    messages.appendChild(wrap); messages.scrollTop=messages.scrollHeight;
  }

  function submit(){
    var text=input.value.trim(); if(!text)return;
    addMsg(text,"user"); input.value="";
    setTimeout(function(){var reply=answer(text); addMsg(reply,"bot"); waLink.href=waUrl();},220);
  }

  window.addEventListener("beforeunload",function(){
    if(autoNotificationSent || state.history.filter(function(x){return x.role==="user";}).length===0) return;
    try{
      var body=new URLSearchParams();
      body.set("access_key",WEB3FORMS_KEY);
      body.set("subject","AI Assistant - Completed Conversation - Bestow IT Services");
      body.set("from_name","Bestow IT Services AI Assistant");
      body.set("name","Website AI Customer");
      body.set("message","Conversation automatically captured when the visitor left the page.\\n\\n"+summary()+"\\n\\n--- Conversation ---\\n"+transcript());
      navigator.sendBeacon("https://api.web3forms.com/submit",body);
    }catch(e){}
  });

  launcher.onclick=function(){
    panel.classList.toggle("open");
    if(panel.classList.contains("open")){
      addMsg("Hi! 👋 I’m Bestow IT Service's AI Assist. Tell me what you need and I’ll help you work through the requirement.","bot");
      quickButtons(); input.focus();
    }
  };
  panel.querySelector(".bai-close").onclick=async function(){
    await sendAutomaticConversation("closed");
    panel.classList.remove("open");
  };
  panel.querySelector("#bai-email").onclick=showSendForm;
  send.onclick=submit;
  input.addEventListener("keydown",function(e){if(e.key==="Enter")submit();});
})();