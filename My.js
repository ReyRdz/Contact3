<!--Call to document ready function-->
$(document).ready(function() {

<!--Definition of onlick function on the button with the id="searchit" -->
$(document).on('click', '#searchit', function() {
navigator.contacts.find(
[navigator.contacts.fieldType.name],
searchContacts,
errorHandler);
});

<!--Definition of searchContacts method -->
function searchContacts(c) {
var name = $("#searchitin").val();
console.log("searchContacts, number of results "+c.length);
var i=0;
for(var i=0, len=c.length; i<len; i++) {
if (c[i].name.givenName == name) {
var firstname = c[i].name.givenName;
var fname = c[i].name.familyName;
var email = c[i].emails[0].value;
var phone = c[i].phoneNumbers[1].value;
alert("f =" + firstname + "l =" + fname + "email =" + email + "phone =" + phone);
pair = "<tr><th data-priority=\"1\"><center>Name</center></th><td><center>"+c[i].name.givenName+"</center></td></tr><tr><th data-priority=\"1\"><center>Surname</center></th><td><center>"+c[i].name.familyName+"</center></td></tr><tr><th data-priority=\"1\"><center>Email</center></th><td><center>"+ c[i].emails[0].value +"</center></td></tr><tr><th data-priority=\"1\"><center>Mobile No</center></th><td>"+ c[i].phoneNumbers[1].value +"></td></tr>";
$("#searchTable").html(pair);
};
}
}

<!--Definition of onlick function on the button with the id="createContact" -->
$("#createContact").click(function(){

<!--Fetching values of all the fields-->
var name = $("#dname").val();
var mname = $("#dmname").val();
var fname = $("#dfname").val();
var mobile = $("#dmob").val();
var omobile = $("#dothermob").val();
var email = $("#demail").val();
var address = $("#dadd").val();
var region = $("#dregion").val();
var country = $("#dcountry").val();
var bday = $("#dbday").val();
var note = $("#dnote").val();
var durl = $("#durl").val();

<!--Calling the contacts.create method and passing the values to the respective fields-->
var myContact = navigator.contacts.create(
{
"displayName":null,
"name":{
"givenName":name,
"formatted":null,
"middleName":mname,
"familyName":fname,
"honorificPrefix":null,
"honorificSuffix":null
},
"nickname":null,
"phoneNumbers":[
{"type":"mobile","value":mobile,"id":0,"pref":false},
{"type":"other","value":omobile,"id":1,"pref":false}
],
"emails":[
{"type":"home","value":email,"id":0,"pref":false}
],
"addresses":[
{
"postalCode":null,
"type":"work",
"id":0,
"locality":null,
"pref":"false",
"streetAddress":" ",
"region":region,
"country":country
}],
"ims":null,
"organizations":[
{
"name":"",
"title":"",
"type":null,
"pref":"false",
"department":""
}],
"birthday":bday,
"note":note,
"categories":null,
"urls":[
{
"type":"other",
"value":durl,
"id":0,
"pref":false
}]
}
);
myContact.save();
alert("The contact, " + myContact.name.givenName + ", has been created");
});

<!--Definition of onlick function on the button with the id="getContact" -->
$(document).on('click', '#getContact', function() {

<!--Calling the contacts.find method to fetch all contacts-->
navigator.contacts.find(
[navigator.contacts.fieldType.name],
gotContacts,
errorHandler);
});
function errorHandler(e) {
console.log("errorHandler: "+e);
}

<!--Definition of gotContacts -->
function gotContacts(c) {
console.log("gotContacts, number of results "+c.length);
var pair="<tr><th data-priority=\"1\"><center>Name</center></th><th data-priority=\"1\"><center>Family Name</center></th><th data-priority=\"2\"><center>Email</center></th><th><center>Mobile No</center></th></tr>";
var i=0;
for(var i=0, len=c.length; i<len; i++) {
if(c[i].phoneNumbers && c[i].phoneNumbers.length > 0) {
pair += "<tr><td><center>"+c[i].name.givenName+"</center></td><td><center>"+c[i].name.familyName+"</center></td><td><center>"+ c[i].emails[0].value +"</center></td><td>"+ c[i].phoneNumbers[1].value +"></td></tr>";
}
}
alert(pair);
$("#myTable").html(pair);
}
});