
const Enum = require('enum');
const config = require('electron-json-config');

var playerCharacters;
var playerClasses;
var parties;
configSetup();




var DND = (function () {
  function DND() {

  };

  DND.playerClasses = playerClasses;



  /**
   * Creates, saves and returns a new Character with stats specified.
   * @param  {charName } name of character.
   * @param  {charClass } characters class, optional.
   * @param  {xp } Character's xp, optional
   * @param  {level } Character's lvl, optional
   * @return {Character}
   */
  DND.newCharacter = function newCharacter(charName, charClass, xp, level) {
    var c = new Character(charName, charClass, xp, level);
    playerCharacters.push(c);
    saveToConfig();
    return c;
  };


  /**
   * Creates, saves and returns a new Party with memebers specified.
   * Empty constructor means no members added
   * @param  {memebers } Characters to be put in a party.
   * @return {Party}
   */
  DND.newParty = function newParty(members) {
    var p = new Party(members)
    parties.push(p);
    saveToConfig();
    return p;
  };

  /**
   * Returns current Characters in app.
   * @return {parties}
   */
  DND.getParties = function getParties() {
    return parties;
  }


  /**
   * Returns current Characters in app.
   * @return {Array}
   */
  DND.getCharacters = function getCharacters() {
    return playerCharacters;
  }

  /**
   * Returns the first character with matching name
   * @return {Character}
   */
  DND.getCharacter = function getCharacter(name) {
    var results = [];
    for (var i = 0; i < playerCharacters.length; i++) {
      if (playerCharacters[i].charName == name) {
        results.push(playerCharacters[i]);

      }
    }
    if (results.length == 1) {
      return results[0];
    }

    if (results.length == 0) {
      return undefined;
    }

    return results;
  }

  /**
   * Mostly for debugging. Deletes all Characters from database
   *
   */
  DND.clearDB = function clearDB() {
    config.delete('playerCharacters');
    configSetup();
    updateDB();
  }













  /**
   * A player character with:
   * Name, Class, XP, Level
   *
   */
  class Character {
    constructor(charName, charClass, xp, level) {
      this.charName = charName;
      this.charClass = playerClasses.get(charClass);
      this.xp = xp;
      this.level = level;

      // Every character NEEDS a name
      if (this.charName == undefined) {
        console.error("Attempted to make a characted without defining base characteristics!");
        return;
      }

      // Let's assume that if someone created a char without
      // Defining class, xp or level it's a lvl 1 character
      if (this.charClass, this.xp, this.level == undefined) {
        this.charClass = "";
        this.xp = 0;
        this.level = 1;
      }
    }

    setName(newName) {
      this.charName = newName;
    }

    setXP(value) {
      this.xp = value;
    }

    setLevel(value) {
      this.level = value;
    }
  }

  /**
   * A party contains an array of
   * Characters that are members
   * of that party
   */
  class Party {
    constructor(name, members) {
      if (name == undefined) {
        name = 'Partyname'
      }
      this.name = name;

      if (members == undefined) {
        this.members = new Array();
      } else {
        this.members = members;
      }
    }

    /**
     * Adds a member to the end of the partys list
     */
    addMember(Character) {
      this.members.push(Character);
    }

    /**
     * Removes ALL members matchin the name
     * specified.
     */
    removeMembers(name) {
      var results = [];
      for (var i = 0; i < this.members.length; i++) {
        if (this.members[i].charName == name) { // We found one!
          delete this.members[i];
        } else {
          results.push(this.members[i]);
        }
      }
      this.members = results;
    }

  }


return DND;
})();




module.exports = DND;

//TODO: player classes be their own class with info?
class CharClass {

}




/* Helper functions I guess for DB management */
/* TODO: DB is currently a json file. Maybe not the best idea. Future: farm off to a MySQL db */

function saveToConfig() {
  config.set('playerCharacters', playerCharacters); // Save to DB
  config.set('parties', parties);
  updateDB();
}

function updateDB() {
  playerCharacters = config.get('playerCharacters'); // Update app db
  parties = config.get('parties'); // Update app db
}

function configSetup() {
  if (!config.has('playerClasses')) {
    config.set('playerClasses', ['Barbarian', 'Bard', 'Cleric', 'Druid',
    'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard']);
  }

  if (!config.has('playerCharacters')) {
    config.set('playerCharacters', new Array());
  }

  if (!config.has('parties')) {
    config.set('parties', new Array());
  }

  parties = config.get('parties');
  playerClasses = new Enum(config.get('playerClasses'));
  playerCharacters = config.get('playerCharacters');

}
