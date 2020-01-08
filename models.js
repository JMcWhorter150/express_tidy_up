const db = [];

function all() {
    // return db; // this allows the manipulation of the original database, use the next structure to create a copy
    return [ // return a new array with the contents of 'db' sprinkled inside
        ...db
    ];
}

function create(name, joyVal) {
    let givesJoy = false;
    if (joyVal) {
        givesJoy = true;
    }
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
    // allUsers,
    // signup,
    // login
}

module.exports = {
    stuff,
    users
};