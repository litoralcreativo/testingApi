const fs = require('fs');
const PATH = '../files/productsBrands.json';
const rawFile = fs.readFileSync(PATH, { encoding: 'utf8' });
let jsonFile = JSON.parse(rawFile);

module.exports = {
  getAll: (req, res) => {
    res.json(jsonFile)
  },
}