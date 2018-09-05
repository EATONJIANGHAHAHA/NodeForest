export default class {
    constructor (
        postcardAppId,
        address,
        postCode,
        status,
        applyDate,
        receiveDate,
        treeId,
    ) {
        this.postcardAppId = postcardAppId;
        this.address = address;
        this.postCode = postCode;
        this.status = status;
        this.applyDate = applyDate;
        this.receiveDate = receiveDate;
        this.treeId = treeId;
    }
}