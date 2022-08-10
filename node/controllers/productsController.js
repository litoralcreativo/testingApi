const { Product } = require("../models/productsModel");
const fs = require('fs');
const PATH = '../files/products.json';
const rawFile = fs.readFileSync(PATH, { encoding: 'utf8' });
let jsonFile = JSON.parse(rawFile);

// Brands
const BRANDS_PATH = '../files/productsBrands.json';
const brandRawFile = fs.readFileSync(BRANDS_PATH, { encoding: 'utf8' });
let brandsJsonFile = JSON.parse(brandRawFile);

module.exports = {
  getAll: (req, res) => {
    res.json(parsedDate(jsonFile))
  },
  createOne: (req, res) => {
    let { name, price, id_brand } = req.body
    // must
    if (!name || id_brand == undefined) return res.status(400).send("faltan datos")

    // check if alrady exist
    if (jsonFile.find(x => x.name == name && x.id_brand == id_brand)) return res.status(400).send("ya existe el producto")

    //check brand
    let brand = getBrand(id_brand)
    if (!brand) return res.status(400).send("no existe una marca con id " + id_brand)

    // create new product
    let newProduct = new Product(name, price, id_brand)
    newProduct._id = (jsonFile[jsonFile.length - 1]?._id) || 1
    newProduct._id++
    jsonFile.push(newProduct)
    writeJson()
    return res.status(200).json(newProduct)
  },
  deleteOne: (req, res) => {
    let { id } = req.params
    let prodToDelete = jsonFile.find(x => x._id == id)
    if (!prodToDelete) return res.status(400).send("no existe el product")

    prodToDelete.dDate = new Date();
    prodToDelete.uDate = prodToDelete.dDate;

    writeJson();
    return res.status(200).json(prodToDelete)
  },
  restoreOne: (req, res) => {
    let { id } = req.params
    let prodToDelete = jsonFile.find(x => x._id == id)
    if (!prodToDelete) return res.status(400).send("no existe el product")

    prodToDelete.uDate = new Date();
    prodToDelete.dDate = null;

    writeJson();
    return res.status(200).json(prodToDelete)
  },
  patchOne: (req, res) => {
    let { id } = req.params
    let { property, value } = req.body.keyvalue
    let prodToPatch = jsonFile.find(x => x._id == id)
    if (!prodToPatch) return res.status(400).send("no existe el product")
    if (!property || !value) return res.status(400).send("se necesita una propiedad y un valor para actualizar")
    console.log(property, keyvalue);
    console.log(prodToPatch.hasOwnProperty(property));
    if (prodToPatch.hasOwnProperty(property)) {
      // writeJson();
      return res.status(200).json(prodToPatch)
    } else {
      return res.status(400).send("se necesita una propiedad y un valor para actualizar")
    }

  }
};

const writeJson = () => {
  fs.writeFileSync(PATH, JSON.stringify(jsonFile), { encoding: 'utf8' });
}

const getBrand = (id) => {
  return brandsJsonFile.find(x => x._id == id)
}

const parsedDate = (jsonFile) => {
  return jsonFile.reduce((a, c) => {
    c = { ...c, brand: getBrand(c.id_brand).name, id_brand: undefined }
    a.push(c)
    return a
  }, [])
}