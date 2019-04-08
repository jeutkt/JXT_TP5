const uuidv1 = require("uuid/v1");
let bcrypt = require("bcrypt");
const tcomb = require("tcomb");
const config = require("./../config/config");

const USER = tcomb.struct(
  {
    id: tcomb.String,
    name: tcomb.String,
    login: tcomb.String,
    age: tcomb.Number,
    password:tcomb.String
  },
  { strict: true }
);

const users = [
  {
    id: "45745c60-7b1a-11e8-9c9c-2d42b21b1a3e",
    name: "Pedro Ramirez",
    login: "pedro",
    age: 44
  },
  {
    id: "456897d-98a8-78d8-4565-2d42b21b1a3e",
    name: "Jesse Jones",
    login: "jesse",
    age: 48
  },
  {
    id: "987sd88a-45q6-78d8-4565-2d42b21b1a3e",
    name: "Rose Doolan",
    login: "rose",
    age: 36
  },
  {
    id: "654de540-877a-65e5-4565-2d42b21b1a3e",
    name: "Sid Ketchum",
    login: "sid",
    age: 56
  }
];

const get = id => {
  const usersFound = users.filter(user => user.id === id);
  return usersFound.length >= 1 ? usersFound[0] : undefined;
};

const getAll = () => {
  return users;
};

const add = (user, callback) => {
  const sel = parseInt(config.sel, 10);
  bcrypt.genSalt(sel, function(err, salt) {
    bcrypt.hash(user.password, salt, (err, hash) => {
      const newUser = {
        ...user,
        id: uuidv1(),
        password: hash
      };
      if (validateUser(newUser)) {
        users.push(newUser);
        callback(null, newUser);
      } else {
        callback(new Error("user.not.valid"), null);
      }
    });
  });
};

const update = (id, newUserProperties, callback) => {
  const usersFound = users.filter(user => user.id === id);

  if (usersFound.length === 1) {
    const oldUser = usersFound[0];
    if (newUserProperties.password) {
      const sel = parseInt(config.sel, 10);
      bcrypt.genSalt(sel, function(err, salt) {
        bcrypt.hash(newUserProperties.password, salt, (err, hash) => {
          newUserProperties.password = hash;
          const newUser = {
            ...oldUser,
            ...newUserProperties
          };
          // Control data to patch
          if (validateUser(newUser)) {
            // Object.assign permet d'éviter la suppression de l'ancien élément puis l'ajout
            // du nouveau Il assigne à l'ancien objet toutes les propriétés du nouveau
            Object.assign(oldUser, newUser);
            callback(null, oldUser);
          } else {
            callback(new Error("user.not.valid"), null);
          }
        });
      });
    } else {
      const newUser = {
        ...oldUser,
        ...newUserProperties
      };
      if (validateUser(newUser)) {
        // Object.assign permet d'éviter la suppression de l'ancien élément puis l'ajout
        // du nouveau Il assigne à l'ancien objet toutes les propriétés du nouveau
        Object.assign(oldUser, newUser);
        callback(null, oldUser);
      } else {
        callback(new Error("user.not.valid"), null);
      }
    }
  } else {
    callback(new Error("user.not.found"), null);
  }
};


const remove = (id) => {
    const indexFound = users.findIndex((user) => user.id === id)
    if (indexFound > -1) {
        users.splice(indexFound, 1)
    } else {
        throw new Error('user.not.found')
    }
}

function validateUser(user) {
  let result = false;
  /* istanbul ignore else */
  if (user) {
    try {
      const tcombUser = USER(user);
      result = true;
    } catch (exc) {
      result = false;
    }
  }
  return result;
}
exports.get = get;
exports.getAll = getAll;
exports.add = add;
exports.update = update;
exports.remove = remove;
