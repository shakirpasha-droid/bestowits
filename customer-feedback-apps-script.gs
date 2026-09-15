/* BESTOW IT SERVICES - Google Apps Script backend + approval admin */
/*
  Sheet columns:
  Timestamp | Name | Company | Email | Service | Rating | Feedback | Consent | Published

  New feedback is always PENDING.
  Status values in the Published column are normalized as:
    PENDING      = waiting for review
    PUBLISHED    = visible on the website
    UNPUBLISHED  = hidden but retained

  One-time setup:
  1. Create/open the BESTOW Customer Feedback Google Sheet.
  2. Extensions > Apps Script and paste this file.
  3. In Apps Script: Project Settings > Script properties.
  4. Add property: ADMIN_KEY
     Value: create your own long random password. Do not put it in GitHub.
  5. Deploy > New deployment > Web app.
  6. Execute as: Me. Who has access: Anyone.
  7. Copy the Web app URL and put it into customer_feedback.html and home-sections.js as FEEDBACK_API_URL.

  Admin page:
  Open the deployed Web app URL with ?page=admin
  Example: https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec?page=admin
*/

const SHEET_NAME = 'Feedback';
const STATUS_COL = 9;

function getSheet_(){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if(!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if(sheet.getLastRow() === 0){
    sheet.appendRow(['Timestamp','Name','Company','Email','Service','Rating','Feedback','Consent','Published']);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function normalizeStatus_(value){
  const s = String(value || '').trim().toUpperCase();
  if(s === 'YES' || s === 'PUBLISHED') return 'PUBLISHED';
  if(s === 'UNPUBLISHED') return 'UNPUBLISHED';
  return 'PENDING';
}

function doPost(e){
  try{
    const p = e && e.parameter ? e.parameter : {};
    const action = String(p.action || '').trim().toLowerCase();

    if(action === 'submit') return saveFeedback_(p);
    if(action === 'status') return adminStatus_(p);
    if(action === 'admin-list') return adminList_(p);

    return json_({success:false,message:'Unknown action.'});
  }catch(err){
    return json_({success:false,message:'Unable to process the request.'});
  }
}

function saveFeedback_(p){
  const name = String(p.name || '').trim();
  const email = String(p.email || '').trim();
  const service = String(p.service || '').trim();
  const rating = String(p.rating || '').trim();
  const feedback = String(p.feedback || '').trim();
  const company = String(p.company || '').trim();
  const consent = String(p.publish_consent || '').trim();

  if(!name || !email || !service || !rating || !feedback){
    return json_({success:false,message:'Required feedback fields are missing.'});
  }

  // Never publish automatically, even when the customer gives consent.
  getSheet_().appendRow([new Date(),name,company,email,service,rating,feedback,consent,'PENDING']);
  return json_({success:true,message:'Feedback received. It is pending approval.'});
}

function doGet(e){
  try{
    const page = e && e.parameter ? String(e.parameter.page || '').trim().toLowerCase() : '';
    if(page === 'admin') return HtmlService.createHtmlOutput(adminHtml_()).setTitle('BESTOW IT SERVICES - Feedback Admin');

    const sheet = getSheet_();
    const values = sheet.getDataRange().getValues();
    if(values.length < 2) return json_([]);
    const rows = values.slice(1);
    const published = rows.filter(r => normalizeStatus_(r[STATUS_COL-1]) === 'PUBLISHED' && String(r[7] || '').trim().toLowerCase() === 'yes');
    return json_(published.map(r => ({
      name:String(r[1] || ''),
      company:String(r[2] || ''),
      service:String(r[4] || ''),
      rating:String(r[5] || ''),
      feedback:String(r[6] || '')
    })));
  }catch(err){
    return json_([]);
  }
}

function adminList_(p){
  if(!isAdmin_(p.key)) return json_({success:false,message:'Invalid admin key.'});
  const sheet = getSheet_();
  const values = sheet.getDataRange().getValues();
  const items = [];
  for(let i=1;i<values.length;i++){
    const r = values[i];
    items.push({row:i+1,timestamp:String(r[0] || ''),name:String(r[1] || ''),company:String(r[2] || ''),email:String(r[3] || ''),service:String(r[4] || ''),rating:String(r[5] || ''),feedback:String(r[6] || ''),consent:String(r[7] || ''),status:normalizeStatus_(r[8])});
  }
  return json_({success:true,items:items});
}

function adminStatus_(p){
  if(!isAdmin_(p.key)) return json_({success:false,message:'Invalid admin key.'});
  const row = Number(p.row);
  const status = normalizeStatus_(p.status);
  const sheet = getSheet_();
  if(!row || row < 2 || row > sheet.getLastRow()) return json_({success:false,message:'Invalid feedback record.'});

  const consent = String(sheet.getRange(row,8).getValue() || '').trim().toLowerCase();
  if(status === 'PUBLISHED' && consent !== 'yes'){
    return json_({success:false,message:'This feedback has no publication consent. It cannot be published.'});
  }

  sheet.getRange(row,STATUS_COL).setValue(status);
  return json_({success:true,message:'Feedback status updated to '+status+'.'});
}

function isAdmin_(key){
  const configured = PropertiesService.getScriptProperties().getProperty('ADMIN_KEY');
  return !!configured && !!key && String(key) === String(configured);
}

function json_(data){
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function adminHtml_(){
  return `<!doctype html><html><head><base target="_top"><meta name="viewport" content="width=device-width,initial-scale=1"><title>BESTOW IT SERVICES - Feedback Admin</title><style>
  *{box-sizing:border-box}body{margin:0;font-family:Arial,sans-serif;background:#f4f8ff;color:#20345d}.wrap{max-width:1100px;margin:0 auto;padding:28px 16px 50px}.card{background:#fff;border-radius:18px;box-shadow:0 10px 35px rgba(27,55,108,.10);padding:24px;margin-bottom:18px}.brand{display:flex;align-items:center;gap:14px;margin-bottom:20px}.brand img{width:170px;max-height:60px;object-fit:contain}.title h1{margin:0;color:#101f46;font-size:25px}.title p{margin:5px 0 0;color:#6d7890;font-size:13px}.login{display:flex;gap:10px;flex-wrap:wrap}.login input{flex:1;min-width:240px;padding:12px;border:1px solid #d9e2f2;border-radius:9px}.btn{border:0;border-radius:9px;padding:11px 15px;font-weight:700;cursor:pointer}.primary{background:#2454f4;color:#fff}.muted{background:#edf2fb;color:#30466f}.success{background:#e9f8ef;color:#17713d}.danger{background:#fff0f0;color:#a42c2c}.toolbar{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:15px}.counts{display:flex;gap:8px;flex-wrap:wrap}.badge{padding:6px 10px;border-radius:20px;font-size:11px;font-weight:700;background:#edf2fb}.list{display:grid;gap:14px}.item{border:1px solid #e1e8f5;border-radius:14px;padding:18px}.itemhead{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}.name{font-weight:700;color:#142b5b}.company{font-size:12px;color:#73809a;margin-top:3px}.status{font-size:10px;font-weight:800;padding:6px 9px;border-radius:14px;background:#fff4d6;color:#8b6100}.published{background:#e9f8ef;color:#17713d}.unpublished{background:#edf2fb;color:#5c6a84}.meta{font-size:11px;color:#687790;margin:12px 0}.feedback{font-size:13px;line-height:1.7;color:#34496d;margin:0 0 14px}.actions{display:flex;gap:8px;flex-wrap:wrap}.empty{text-align:center;padding:35px;color:#7c889d;font-size:13px}.notice{font-size:12px;line-height:1.6;color:#5f6d86;background:#f7f9fd;border-radius:10px;padding:12px;margin-top:12px}.error{color:#a42c2c;background:#fff0f0;padding:10px;border-radius:9px;font-size:12px;margin-top:12px}.ok{color:#17713d;background:#e9f8ef;padding:10px;border-radius:9px;font-size:12px;margin-top:12px}@media(max-width:600px){.brand{align-items:flex-start}.brand img{width:125px}.title h1{font-size:20px}.itemhead{flex-direction:column}.login input{min-width:100%}}
</style></head><body><div class="wrap"><div class="card"><div class="brand"><img src="https://bestowits.com/assets/img/logo.png" alt="Bestow IT Services"><div class="title"><h1>Customer Feedback Admin</h1><p>Pending → Approved/Published → Unpublished</p></div></div><div class="login"><input id="key" type="password" placeholder="Enter admin key" autocomplete="current-password"><button class="btn primary" onclick="login()">Open Feedback</button></div><div id="msg"></div><div class="notice">Only feedback with customer publication consent can be published. Unpublished feedback stays in the private sheet and can be republished later.</div></div><div id="panel"></div></div><script>
let adminKey='';
function esc(v){return String(v||'').replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[c]));}
function call(name,args,ok){google.script.run.withSuccessHandler(ok).withFailureHandler(e=>showMsg(e.message||'Server error',true))[name].apply(null,args);}
function showMsg(t,bad){document.getElementById('msg').innerHTML='<div class="'+(bad?'error':'ok')+'">'+esc(t)+'</div>';}
function login(){adminKey=document.getElementById('key').value.trim();if(!adminKey){showMsg('Enter your admin key.',true);return;}load();}
function load(){call('adminList_',[{key:adminKey}],render);}
function render(result){if(!result||!result.success){showMsg(result&&result.message?result.message:'Unable to load feedback.',true);return;}showMsg('Feedback loaded.');const items=result.items||[];const pending=items.filter(x=>x.status==='PENDING').length,pub=items.filter(x=>x.status==='PUBLISHED').length,unpub=items.filter(x=>x.status==='UNPUBLISHED').length;let html='<div class="card"><div class="toolbar"><div class="counts"><span class="badge">Pending: '+pending+'</span><span class="badge">Published: '+pub+'</span><span class="badge">Unpublished: '+unpub+'</span></div><button class="btn muted" onclick="load()">Refresh</button></div><div class="list">';if(!items.length)html+='<div class="empty">No customer feedback records yet.</div>';items.slice().reverse().forEach(x=>{const st=x.status==='PUBLISHED'?'published':(x.status==='UNPUBLISHED'?'unpublished':'');html+='<div class="item"><div class="itemhead"><div><div class="name">'+esc(x.name)+'</div><div class="company">'+esc(x.company||'')+'</div></div><span class="status '+st+'">'+esc(x.status)+'</span></div><div class="meta">'+esc(x.service)+' · '+esc(x.rating)+' · Consent: '+esc(x.consent||'No')+'</div><p class="feedback">'+esc(x.feedback)+'</p><div class="actions">';if(x.status!=='PUBLISHED')html+='<button class="btn success" '+(String(x.consent).toLowerCase()==='yes'?'':'disabled')+' onclick="changeStatus('+x.row+',\'PUBLISHED\')">Approve & Publish</button>';if(x.status!=='UNPUBLISHED')html+='<button class="btn danger" onclick="changeStatus('+x.row+',\'UNPUBLISHED\')">Unpublish</button>';if(x.status==='UNPUBLISHED')html+='<button class="btn primary" '+(String(x.consent).toLowerCase()==='yes'?'':'disabled')+' onclick="changeStatus('+x.row+',\'PUBLISHED\')">Republish</button>';html+='</div></div>';});html+='</div></div>';document.getElementById('panel').innerHTML=html;}
function changeStatus(row,status){if(!confirm(status==='PUBLISHED'?'Publish this customer feedback on the website?':'Unpublish this customer feedback from the website?'))return;call('adminStatus_',[{key:adminKey,row:row,status:status}],r=>{if(!r||!r.success){showMsg(r&&r.message?r.message:'Update failed.',true);return;}showMsg(r.message);load();});}
</script></body></html>`;
}
