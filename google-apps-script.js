// ===================================================
// GOOGLE APPS SCRIPT — Paste this in Apps Script
// ===================================================
// 
// SETUP INSTRUCTIONS:
// 1. Create a new Google Sheet
// 2. Go to Extensions > Apps Script
// 3. Delete the default code and paste this entire file
// 4. Click Deploy > New Deployment
// 5. Select Type: "Web app"
// 6. Set "Execute as": Me
// 7. Set "Who has access": Anyone
// 8. Click Deploy and copy the URL
// 9. Paste the URL in your script.js (GOOGLE_SCRIPT_URL)
// ===================================================

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Add headers if the sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Name',
        'Email',
        'Company',
        'Website',
        'Service',
        'Budget',
        'Preferred Meeting Time',
        'Message'
      ]);
      
      // Style the header row
      var headerRange = sheet.getRange(1, 1, 1, 9);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#0a0a0a');
      headerRange.setFontColor('#ffffff');
    }
    
    // Append the form data
    sheet.appendRow([
      new Date().toLocaleString(),
      data.name || '',
      data.email || '',
      data.company || '',
      data.website || '',
      data.service || '',
      data.budget || '',
      data.meetingTime || '',
      data.message || ''
    ]);
    
    // Auto-resize columns for readability
    sheet.autoResizeColumns(1, 9);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Data saved successfully!' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'Xelox Media API is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}
