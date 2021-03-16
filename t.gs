// https://developers.google.com/apps-script/overview


/**
 * Sends emails with data from the current spreadsheet.
 */

function sendEmails() 
{
	var sheet = SpreadsheetApp.getActiveSheet();
	var startRow = 2; // First row of data to process
  	var numRows = 4; // Number of rows to process

	// Fetch the range of cells A2:B3
	var dataRange = sheet.getRange(startRow, 1, numRows, 2);

	// Fetch values for each row in the Range.
	var data = dataRange.getValues();
	for (var i in data) 
	{
		var row = data[i];
		var emailAddress = row[0]; // First column
		var message = row[1]; // Second column
		var subject = 'Sending emails from a Spreadsheet';
		MailApp.sendEmail(emailAddress, subject, message);
	}
}



/**
 * Creates a Google Doc and sends an email to the current user with a link to the doc.
 */

function createAndSendDocument() 
{
	// Create a new Google Doc named 'Hello, world!'
	var doc = DocumentApp.create('Hello, world!');

	// Access the body of the document, then add a paragraph.
	doc.getBody().appendParagraph('This document was created by Google Apps Script in class CS100.');

	// Get the URL of the document.
	var url = doc.getUrl();

	// Get the email address of the active user - that's you.
	var email = Session.getActiveUser().getEmail();

	// Get the name of the document to use as an email subject line.
	var subject = doc.getName();

	// Append a new string to the "url" variable to use as an email body.
	var body = 'Link to your doc: ' + url;
	
	// Send yourself an email with a link to the document.
	GmailApp.sendEmail(email, subject, body);
}