// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.


const dnd = require('dnd-module');
const remote = require('electron').remote;
const main = remote.require('./main.js');
const path = require('path');
const url = require('url')


var CreateChar = function () {
    var characterName = document.getElementById("characterName").value;
    var characterClass = document.getElementById("characterClass").value;
	var characterExp = ExpCheck();
	var characterLevel = LevelCheck();

	if (characterName === "") {
		alert("There is no character name!");
		return;
	}
	else if (characterClass === "") {
		alert("There is no character class!");
		return;
	}
	else {
		var charWindow = remote.getCurrentWindow();
		dnd.newCharacter(characterName, characterClass, characterExp, characterLevel);
		alert(characterName + " the " + characterClass + ", level "+characterLevel+" ("+characterExp+").");
		charWindow.close();
	}
}

function ExpCheck(){
	// This snippet of code checks if the experience input field is empty, effectively putting a 0 there for aesthetics.
	var characterExp = document.getElementById("characterExp").value;
	if (!characterExp){
		return 0;
	}
	else {
		return characterExp;
	}
}

function LevelCheck(){
	// Automatically determines level according to how much experience is added. (Table not finished)
	var characterExp = document.getElementById("characterExp").value;
	if (characterExp < 300){
		return 1;
	}
	else if (characterExp >=300 && characterExp<900) {
		return 2;
	}
	else if (characterExp >=900&&characterExp<2700) {
		return 3;
	}
	else if(characterExp >=2700&&characterExp<6500) {
		return 4;
	}
	else if (characterExp >=6500 && characterExp<14000) {
		return 5;
	}
	else if (characterExp >=14000&&characterExp<23000) {
		return 6;
	}
	else if(characterExp >=23000&&characterExp<34000) {
		return 7;
	}
	else if (characterExp >=34000 && characterExp<48000) {
		return 8;
	}
	else if (characterExp >=48000&&characterExp<64000) {
		return 9;
	}
	else if(characterExp >=64000&&characterExp<85000) {
		return 10;
	}
	else if (characterExp >=85000 && characterExp<100000) {
		return 11;
	}
	else if (characterExp >=100000&&characterExp<120000) {
		return 12;
	}
	else if(characterExp >=120000&&characterExp<140000) {
		return 13;
	}
	else if (characterExp >=140000 && characterExp<165000) {
		return 14;
	}
	else if (characterExp >=165000&&characterExp<195000) {
		return 15;
	}
	else if(characterExp >=195000&&characterExp<225000) {
		return 16;
	}
	else if (characterExp >=225000 && characterExp<265000) {
		return 17;
	}
	else if (characterExp >=265000&&characterExp<305000) {
		return 18;
	}
	else if(characterExp >=305000&&characterExp<355000) {
		return 19;
	}
	//If it's none of these, it must be 20 or over!
	else {
		return 20;
	}
}

function ListEm(){
	var charAmount = dnd.getCharacters().length;
	console.log("There are "+charAmount+" characters.");
	//This finds out how many different characters there are in the current database and then tells the console "There are x amount of characters."
	for (var i=0;i<charAmount;i++){
		var selChar = dnd.getCharacters()[i];
		console.log((i+1) + ". " + selChar.charName + " the " + selChar.charClass + ", level " + selChar.level +" ("+selChar.xp+").");
	}
	//This for-loop lists all the different characters in the format of "x. Name the Class, level y (xp)."
	//and continues until there are no more characters to mention.
}

function ShowList() {
	var charAmount = dnd.getCharacters().length;
	document.getElementById("charCount").innerHTML = "There are "+charAmount+" characters!";
	//Shows the list to a <p>-tag in the html-document in a list.
	for (var i=0;i<charAmount;i++){
		var selChar = dnd.getCharacters()[i];
		document.getElementById("chars").innerHTML += (i+1) + ". " + selChar.charName + " the " + selChar.charClass + ", level " + selChar.level +" ("+selChar.xp+"). </br>";
	}
}

function ClearDatabase(){
	var confirmDeletion = confirm("Are you sure you want to delete all the characters?");
	if (confirmDeletion == true){
		dnd.clearDB()
	}
	//Makes the user confirm to kill the babies.
}


let notificate = new Notification('Reee', {
  body: 'Sad',
  icon: path.join(__dirname, 'images/sadree.jpg')
})




	function CharWindow() {
	  const remote = require('electron').remote;
	  const BrowserWindow = remote.BrowserWindow;

	  var characterWindow = new BrowserWindow({ width: 400, height: 500, resizable: false, icon:'./images/favicon.ico' });
	  characterWindow.setMenu(null);
	   characterWindow.loadURL(url.format({
		   pathname: path.join(__dirname, 'createcharacter.html'),
		   protocol: 'file:',
		   slashes: true
		   }));
	  }
	  function CharList() {
	  const remote = require('electron').remote;
	  const BrowserWindow = remote.BrowserWindow;

	  var listWindow = new BrowserWindow({ width: 400, height: 500, resizable: false, icon:'./images/favicon.ico' });
	  listWindow.setMenu(null);
	   listWindow.loadURL(url.format({
		   pathname: path.join(__dirname, 'characterlist.html'),
		   protocol: 'file:',
		   slashes: true
		   }));

	  }
