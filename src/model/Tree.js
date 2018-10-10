/**
 * Class that represents the tree object.
 */
export default class {
    constructor(
        treeId,
        height,
        location,
        location_src,
        species,
        photo_src,
        health,
        upload_date,
        sayings,
        location_id,
        name,
        last_edit,
    ) {
        this.treeId = treeId;
        this.height = height;
        this.location = location;
        this.location_src = location_src;
        this.species = species;
        this.photo_src = photo_src;
        this.health = health;
        this.upload_date = upload_date;
        this.sayings = sayings;
        this.location_id = location_id;
        this.name = name;
        this.last_edit = last_edit;
    }
}