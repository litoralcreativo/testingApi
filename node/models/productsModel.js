class Product {
  _id;
  name;
  id_brand;
  price;
  dDate;
  cDate;
  uDate;
  constructor(name, price, id_brand) {
    this.name = name;
    this.price = price;
    this.id_brand = id_brand;
    this.cDate = new Date();
    this.uDate = this.cDate;
    this.dDate = null
  }

  restore() {
    this.uDate = new Date();
    this.dDate = null;
  }
}

module.exports = { Product }