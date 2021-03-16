# Google-Apps-Script
Implements an auto-generated Google Form responses mail system using Google Apps Script


This file has been created for the purpose of explaining the instructions on how to work with the apps script :

Refer to the following URL to pick up a template google doc:
https://zapier.com/learn/google-sheets/google-apps-script-tutorial/

After taking an example doc, you can modify the source code for the entries in the script and run it.

---------------------------------------------------------------START HERE------------------------------------------------------------------------------

There are 3 gs files ( which contain the scripts for all the questions):

The second.gs is for (Linking responses with the doc)
The third.gs is for (Same Roll umber case)
The fourth.gs is for (Pin-code case)

For second.gs:

Prepare a google doc with a template exactly like the one that is sent in the mail (google doc attached in mail)
Save in your drive folder
Copy-paste the code in the script editor linked to the spreadsheet
(make the google form as specified in the order of the question,link it to the spreadsheet and go to it's script editor,copy-paste the code)

In the script editor put the file ID of the created(by you) Google Doc in the file variable of the script) 
where DriveApp.getFileById() function is mentioned ( fill your Google Doc ID there)

In the script editor put the folder ID whereyou had saved the Google Doc (ID of your drive) 
where DriveApp.getFolderById() function is mentioned ( fill your ID of the folder containing the Doc file there)

For the script editor code you must create a trigger for the function autoFillGoogleDocFromForm from the spreadsheet
Make sure you enter the option to generate it on the form submission option in the trigger.

You're good to go if you have done everything. Send the google form and finish the work.

For third.gs:

Copy-paste the code in the script editor linked to the spreadsheet

The procedure is same as above to make the doc for autoFillGoogleDocFromForm function(it would be better if you would link it to the old spreadsheet)
( the filling Doc is same as the 1.txt file)

In the function same_roll_number it executes it directly with the spreadsheet and removes entries accordingly in the spreadsheet.

So, we must create a trigger for the function same_roll_number from the spreadsheet.
Make sure you enter the option to generate it on the form submission option in the trigger.
Since the function is invoked it does not need a trigger.

You're good to go if you have done everything. Send the google form and finish the work.

For fourth.gs:

Copy-paste the code in the script editor linked to the spreadsheet

The procedure is same as above to make the doc for autoFillGoogleDocFromForm function(it would be better if you would link it to the old spreadsheet)
( the filling Doc is same as the 1.txt file)

There is another function named autoFillGoogleDocFromForm which does the same as autoFillGoogleDocFromForm function but just appends a string to the body of the email
( This is necessary as we need to append names of students who have same pin-code ) so it will be enough to replace folder and file just like you did previously
and it will work

In the function pin_code_same it executes it directly with the spreadsheet 

So, we must create a trigger for the function pin_code_same from the spreadsheet.
Make sure you enter the option to generate it on the form submission option in the trigger.
Since both the function is invoked it does not need a trigger. ( they will automatically be called).

You're good to go if you have done everything. Send the google form and finish the work.

-----------------------------------------------------------THE END--------------------------------------------------------------------------------------------------
