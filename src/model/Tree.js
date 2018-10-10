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
        photo_src,
        contentText,
        health,
        upload_date,
        sayings,//the word you give to your tree.
        location_id,
        name
    ) {
        this.treeId = treeId;
        this.height = height;
        this.location = location;
        this.locationImaSrc = locationImaSrc;
        this.species = species;
        this.photo_src = photo_src;
        this.contentText = contentText;
        this.health = health;
        this.upload_date = upload_date;
        this.sayings = sayings;
        this.location_id = location_id;
        this.name = name;
    }
}