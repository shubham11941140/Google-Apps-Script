function autoFillGoogleDocFromForm(e) // the argument taken by the function is e so it will take an array of data
{    
	//e.values is an array of form values  // entries of the google form make a google doc of the info and return the url 
	var timestamp = e.values[0];             // of the person who filled the form
	var Name = e.values[1];
	var RollNumber = e.values[2];
	var EmailID = e.values[3];
	var District = e.values[4];               // declaration of values as variables taken in e
	var State = e.values[5];
	var Country = e.values[6];
	var PinCode = e.values[7];
	
	//file is the template file, and you get it by ID
	var file = DriveApp.getFileById('1Rruiok1ZxCHtlTpnu-D162k5puk0KjCqJfQyJ91tlXI');  // this is the ID of my google doc file sent in the mail  
	// the google doc which is shared as the image in the mail this is it's file ID since we are using it's template to replace values
	// by the responses in the google form 
	
	
	//We can make a copy of the template, name it, and optionally tell it what folder to live in
	//file.makeCopy will return a Google Drive file object
	var folder = DriveApp.getFolderById('1WuLi1Ik2eT2cGeCZV8iDPXiujJKY-N40')          // this is my google drive folder,please enter your drive folder for the file to be there
	// this is the folder where the template file is stored and this is the location where the google doc will be saved after
	// we replace the values in the template
	
	var copy = file.makeCopy(timestamp, folder); // The timestamp variable specified here will be the name of the folder
	// Since we will use the same template for multiple responses we will create a copy of the template file and modify that.
	
	//Once we've got the new file created, we need to open it as a document by using its ID
	var doc = DocumentApp.openById(copy.getId()); 
	
	//Since everything we need to change is in the body, we need to get that
	var body = doc.getBody(); 
	// As you saw in the image in the body the text is replaced by the responses of the google form so we call it's body.
	
	//Then we call all of our replaceText methods
	body.replaceText('{{Name}}', Name);
	body.replaceText('{{RollNumber}}', RollNumber);           // like the text in the google doc pertaining to that variable
	body.replaceText('{{EmailID}}', EmailID);                 // is replaced
	body.replaceText('{{District}}', District);
	body.replaceText('{{State}}', State);
	body.replaceText('{{Country}}', Country);
	body.replaceText('{{PinCode}}', PinCode);
	
	var subject = doc.getName();                    // this will give the name of the doc in the mail   // will return value of timestamp
	var url = doc.getUrl();                         // this will give the url of the doc in the mail
	var bo = 'Link to your doc: ' + url;
	MailApp.sendEmail(EmailID,subject,bo)          // this will mail the person with the required information
	doc.saveAndClose();                   //Lastly we save and close the document to persist our changes	
}