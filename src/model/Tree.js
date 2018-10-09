/**
 * Class that represents the tree object.
 */
export default class {
    constructor(
        treeId, //treenumber
        height,
        location,
        locationImaSrc,
        species,
        speciesImaSrc,
        contentText,
        health,
        upload_date,
        sayings,//the word you give to your tree.
        location_id,
    ) {
        this.treeId = treeId;
        this.height = height;
        this.location = location;
        this.locationImaSrc = locationImaSrc;
        this.species = species;
        this.speciesImaSrc = speciesImaSrc;
        this.contentText = contentText;
        this.health = health;
        this.upload_date = upload_date;
        this.sayings = sayings;
        this.location_id = location_id;
    }
}