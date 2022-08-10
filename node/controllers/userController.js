const { User } = require('../models/userModel');
const fs = require('fs');
const PATH = '../files/users.json';
const rawFile = fs.readFileSync(PATH, { encoding: 'utf8' });
let jsonFile = JSON.parse(rawFile);

const createRandomUsers = (n) => {
  let res = []
  let firstNames = ["Mario", "Luis", "Pedro", "Juan", "Pablo", "Esteban", "Ramiro", "Sebastian", "Ana", "Maria", "Julia", "Jimena", "Eloisa", "Soledad"];
  let lastNames = ["Garcia", "Jimenez", "Rolon", "Coronado", "Gomez", "Gonzales", "Rodriguez", "Fernandez", "Lopez", "Martinez", "Diaz", "Perez"];
  let chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  let indice = 0;
  const now = new Date();
  for (let i = 0; i < n; i++) {
    indice = Math.floor(Math.random() * (firstNames.length));
    const fname = firstNames[indice];
    indice = Math.floor(Math.random() * (lastNames.length));
    const lname = lastNames[indice];
    let randstr = ''
    let jlen = Math.floor(Math.random() * 2 + 3);
    for (let j = 0; j < jlen; j++) {
      indice = Math.floor(Math.random() * (chars.length));
      randstr += chars[indice];
    }
    const uname = randstr + fname.split("").map((x, i) => i % 2 == 0 ? x.toLowerCase() : x.toUpperCase()).join("")
    const pass = uname.split("").map((x, i) => i % 2 == 0 ? x : Math.floor(Math.random() * (uname.length + 1))).join("")

    const bday = randomDate(new Date(1960, 0, 1), new Date(2000, 0, 1))
    const phone = Math.floor(10000000000 + Math.random() * (89999999999));
    let cuit = '';

    const cod = Math.floor(Math.random() * (99));
    const num = Math.floor(5000000 + Math.random() * (50000000));
    const dig = Math.floor(1 + Math.random() * (9));
    cuit += cod > 9 ? cod : '0' + cod;
    cuit += num > 9999999 ? num : '0' + num;
    cuit += dig
    const salary = Math.floor(54000 + Math.random() * (120000));
    res.push(new User(fname, lname, bday, salary))
  }
  return res;
}
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

module.exports = {
  getAll: (req, res) => {
    res.json(jsonFile)
  },
  getSingle: (req, res) => {
    const id = req.params.id
    const search = jsonFile.find(x => x._id == id);
    if (search) res.json(search);
    else res.status(404).json({
      messagge: `We found no user with id ${id}`,
    })
  },
  createOne: (req, res) => {
    let { firstName, lastName, bday, salary } = req.body;
    if (firstName && lastName && salary && bday) {
      if (jsonFile.find(x => x.firstName == firstName && x.lastName == lastName) != undefined) {
        res.status(405).json({
          messagge: `There is alrady a user ${firstName}, ${lastName}`,
        })
      } else {

        let newId = 0;
        if (jsonFile.length != 0) newId = jsonFile[jsonFile.length - 1]._id + 1
        let newUser = new User(firstName, lastName, bday, salary)
        newUser._id = newId;

        jsonFile.push(newUser)
        fs.writeFileSync('../files/users.json', JSON.stringify(jsonFile), { encoding: 'utf8' });

        res.json(newUser)
      }
    } else {
      let missing = Object.entries({ firstName, lastName, salary, bday }).filter(x => x[1] == undefined).map(x => x[0])
      res.status(405).json({
        messagge: `There are some missing fields`,
        missing: missing
      })
    }
  },
  removeOne: (req, res) => {
    const id = req.params.id
    const index = jsonFile.indexOf(jsonFile.find(x => x._id == id));
    console.log(id, index);
    if (index != -1) {
      jsonFile[index].deleted = true;
      fs.writeFileSync(PATH, JSON.stringify(jsonFile), { encoding: 'utf8' });
      res.json(jsonFile[index])
    }
    else res.status(404).json({
      messagge: `We found no user with id ${id}`,
    })
  },
  restoreOne: (req, res) => {
    const id = req.params.id
    const index = jsonFile.indexOf(jsonFile.find(x => x._id == id));
    if (index != -1) {
      if (jsonFile[index].deleted) {
        jsonFile[index].deleted = false;
        fs.writeFileSync(PATH, JSON.stringify(jsonFile), { encoding: 'utf8' });
        res.json(jsonFile[index])
      } else {
        res.status(200).json({
          messagge: `Can not restore the user with id ${id}, because it is already active`,
        })
      }
    }
    else res.status(404).json({
      messagge: `We found no user with id ${id}`,
    })
  },
  verifyOne: (req, res) => {
    const id = req.params.id
    const index = jsonFile.indexOf(jsonFile.find(x => x._id == id));
    if (index != -1) {
      if (!jsonFile[index].verified) {
        jsonFile[index].verified = true;
        fs.writeFileSync(PATH, JSON.stringify(jsonFile), { encoding: 'utf8' });
        res.json(jsonFile[index])
      } else {
        res.status(200).json({
          messagge: `Can not verify the user with id ${id}, because it is already verified`,
        })
      }
    }
    else res.status(404).json({
      messagge: `We found no user with id ${id}`,
    })
  },
  getRandom: (req, res) => {
    const number = req.params.number
    if (number > 100000 || number < 0) res.json({
      messagge: "Wrong number of elements",
      min: 0,
      max: 100000
    })
    else res.json(createRandomUsers(number))
  }
}