export default class {
    constructor(
        treeId, //treenumber
        height,
        location,
        locationImaSrc,
        species,
        speciesImaSrc,
        contentText,
        health,//the word you give to your tree.
    ) {
        this.treeId = treeId;
        this.height = height;
        this.location = location;
        this.locationImaSrc = locationImaSrc;
        this.species = species;
        this.speciesImaSrc = speciesImaSrc;
        this.contentText = contentText;
        this.health = health;
    }
}