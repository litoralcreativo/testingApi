class User {
  _id;
  firstName;
  lastName;
  username;
  password;
  bday;
  phone;
  cuit;
  salary;
  deleted;
  verified;
  constructor(fname, lname, bday, salary) {
    this.firstName = fname
    this.lastName = lname
    this.bday = bday
    this.salary = salary
    this.deleted = false
    this.verified = false
  }
}

module.exports = { User }