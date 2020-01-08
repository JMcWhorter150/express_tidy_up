const bcrypt = require('bcryptjs');

const db = [];

function all() {
    // return db; // this allows the manipulation of the original database, use the next structure to create a copy
    return [ // return a new array with the contents of 'db' sprinkled inside
        ...db
    ];
}

function create(name, joyVal) {
    // if I wanted to store on/off instead of undefined
    // let givesJoy = joyVal || 'off';

    // i want to test if joyVal is truthy
    // if it is, I want truth, else I want false
    let givesJoy = joyVal ? true : false;

    
    const newItem = {
        name,
        givesJoy
    };
    db.push(newItem);
}

const stuff = {
    all,
    create
}

const users = {
    create: createUser,
    verify: login
    // signup,
    // login
}

const userDb = [];
function createHash(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

function createUser(username, password) {
    const hash = createHash(password);
    const newUser = {
        username,
        hash
    }
    userDb.push(newUser);
    console.log(userDb);
}

function login(username, password) {
    const userObj = userDb.find(userObj => userObj.username == username);
    return bcrypt.compareSync(password, userObj.hash)
}





module.exports = {
    stuff,
    users
};