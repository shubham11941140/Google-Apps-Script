function autoFillGoogleDocFromForm(e)     // the argument taken by the function is e so it will take an array of data
{	// entries of the google form make a google doc of the info and return the url 
	var timestamp = e[0];             // of the person who filled the form
	var Name = e[1];
	var RollNumber = e[2];
	var EmailID = e[3];                // accessing the array values
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
	MailApp.sendEmail(EmailID,subject,bo)          // this will mail the person the required information
	doc.saveAndClose();                   //Lastly we save and close the document to persist our changes	
}
    
function autoFillGoogleDocFromFormwithstring(e,k)  // the argument taken by the function is e so it will take an array of data
{   
	// the argument 'k' is a string input that is taken to be appended with the google doc sent in the mail
	// entries of the google form make a google doc of the info and return the url 
	var timestamp = e[0];             // of the person who filled the form
	var Name = e[1];
	var RollNumber = e[2];            // accessing the array values
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
	
	var copy = file.makeCopy(Name, folder); // The timestamp variable specified here will be the name of the folder
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
	var sd = bo + "\n" + "These are students who live in the same locality as you: " + "\n" + k;               
	// we have appended the string taken as the argument so as to give the list of student's with same pin-code in the same mail
	MailApp.sendEmail(EmailID,subject,sd);  // this will mail the person the required information
	doc.saveAndClose();                   //Lastly we save and close the document to persist our changes	
}
  
function pin_code_same() 
{
	var sheet = SpreadsheetApp.getActiveSheet();        // get the complete spreadsheet stored
	var data = sheet.getDataRange().getValues();        // get all the data which is filled in the spread sheet  
	for (var i in data) 
	{
		var row = data[i];                                // values in the sheet
		var same = "";                                    // empty string to store values of names with same pin codes
		for (var j in data) 
		{               // mapping all the values which are same as pin-code
			if(row[7] == data[j][7])
			{        //the pin code is the same
				if ( i != j )
				{                    // this will signify the fact that only the previous entries are taken and the current entry is ignored in the string
					same += (data[j][1]+"\n");         // so we append the names into the array if the pin code match (\n appends onto a new line)
				}
			}  
		}
		if ( same != "") // string of names not empty
		{ 			
			autoFillGoogleDocFromFormwithstring(row,same); // since the pin-code is same there needs to be an added message of the students with the pin code 
			// the same function is taken with an extra argument of the string of common students which is later appended with the url of the doc in the 
			// body of the mail for the student's benefit(it will give the added message in the mail)
		}
		else
		{ 	// empty string(no common pin code)
			autoFillGoogleDocFromForm(row); // since the student has a distinct pin-code no extra data need to be provided and the google form can be made 
			// with the current details
		}
	}
}