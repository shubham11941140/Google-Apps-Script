function autoFillGoogleDocFromForm(e)     // the argument taken by the function is e so it will take an array of data
{	// entries of the google form make a google doc of the info and return the url 
	var timestamp = e[0];             // of the person who filled the form
	var Name = e[1];
	var RollNumber = e[2];            // accesing of array values
	var EmailID = e[3];
	var District = e[4];               // declaration of values as variables taken in e
	var State = e[5];
	var Country = e[6];
	var PinCode = e[7];

	//file is the template file, and you get it by ID
	var file = DriveApp.getFileById('1Rruiok1ZxCHtlTpnu-D162k5puk0KjCqJfQyJ91tlXI');  // this is the ID of my google doc file sent in the mail  
	// the google doc which is shared as the image in the mail this is it's file ID since we are using it's template to replace values
	// by the responses in the google form 
	
	
	//We can make a copy of the template, name it, and optionally tell it what folder to live in
	//file.makeCopy will return a Google Drive file object
	var folder = DriveApp.getFolderById('1WuLi1Ik2eT2cGeCZV8iDPXiujJKY-N40')          // this is my google drive folder,please enter your drive folder for the file to be there
	// this is the folder where the template file is stored and this is the location where the google doc will be saved after
	// we replace the values in the template
	
	var copy = file.makeCopy(Name, folder); // The Name variable specified here will be the name of the folder
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
	MailApp.sendEmail(EmailID,subject,bo)          // this will send a mail to the required person
	doc.saveAndClose();                   //Lastly we save and close the document to persist our changes	
}
  
  
function same_roll_number() 
{
	var sheet = SpreadsheetApp.getActiveSheet();    // get the complete spreadsheet stored
	var data = sheet.getDataRange().getValues();    // get all the data which is filled in the spread sheet
	var newData = [];                               // new array to only store back the authentic values from the google sheet
	for (var i in data) 
	{ 
		var row = data[i];                            // values in the sheet
		var duplicate = false;                        // boolean value to replace the authentic values
	  	for (var j in newData) 
	  	{
			if(row[2] == newData[j][2])
			{  // notice that the 3rd column is that of roll number and since in the case the roll numbers are same entered
				// notice that the 4th column is that of the e-mail ID
				if (row[3] == newData[j][3])
				{   // condition when both email IDs are the same (case 1)
					row[1] = newData[j][1];
					row[4] = newData[j][4];              //replacing the old data with the updated data i.e name,country,district etc
					row[5] = newData[j][5];
					row[6] = newData[j][6];
					row[7] = newData[j][7];
					duplicate = true;                    //for updating the old the latest entry is replaced with the duplicate
					// this will ensure that when we rebiuld the sheet with authentic values and remove the old and not updated values
					
					autoFillGoogleDocFromForm(row) ;      // same functon from the previous script file copied above 
					// this will send the user the updated values as the google doc 
				}
				if (row[3] != newData[j][3]) 
				{   // else case when email IDs are not same (case 2)

					duplicate = true;                  // we need to remove the spamming id from the the google sheet
					MailApp.sendEmail(row[3],'Spam','Please be careful as someone tried to modify/change your settings'); //appropriate message

					// alert the victim that the person is spamming with his details
					MailApp.sendEmail(newData[j][3],'Spam','You are not allowed to modify someone else\'s settings');     //appropriate message     
					// this person spammed someone else's setting by sending wrong e-mail
					// no google form is required
				}
			}
		}
		if (!duplicate) 
		{
			newData.push(row); // this will remove all spamming reponses of the google form and give the updated form
		}
	}
	sheet.clearContents();         //clear the old sheet
	sheet.getRange(1, 1, newData.length, newData[0].length).setValues(newData);      //replace the spreadsheet with the updated values
}
