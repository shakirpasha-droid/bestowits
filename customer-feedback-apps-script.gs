/* BESTOW IT SERVICES - Google Apps Script backend for customer feedback */
/*
  1. Create a Google Sheet named BESTOW Customer Feedback.
  2. Open Extensions > Apps Script.
  3. Paste this file's contents and save.
  4. Deploy > New deployment > Web app.
  5. Execute as: Me. Who has access: Anyone.
  6. Copy the Web app URL into customer_feedback.html as FEEDBACK_API_URL.

  Sheet columns created automatically:
  Timestamp | Name | Company | Email | Service | Rating | Feedback | Consent | Published

  Set Published to YES to display a testimonial on the website.
  Change Published to NO to hide it without deleting the record.
*/

const SHEET_NAME = 'Feedback';

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

function doPost(e){
  try{
    const p = e && e.parameter ? e.parameter : {};
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

    // New feedback is NEVER published automatically.
    getSheet_().appendRow([new Date(),name,company,email,service,rating,feedback,consent,'NO']);
    return json_({success:true,message:'Feedback received. It is pending approval.'});
  }catch(err){
    return json_({success:false,message:'Unable to save feedback.'});
  }
}

function doGet(){
  try{
    const sheet = getSheet_();
    const values = sheet.getDataRange().getValues();
    if(values.length < 2) return json_([]);
    const rows = values.slice(1);
    const published = rows.filter(r => String(r[8] || '').trim().toUpperCase() === 'YES');
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

function json_(data){
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
