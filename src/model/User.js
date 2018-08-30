/**
 * Class that represents the user object.
 */
export default class User  {
    constructor (
        id,
        username,
        password,
        email,
        phone,
        address,
        balance
    ) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.balance = balance;
    }
}



