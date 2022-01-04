
const bcrypt = require('bcryptjs')
const users = [
  {
    name:'Admin User',
    email:'admin@example.com',
    password:bcrypt.hashSync('123456',10),
    isAdmin:true
  },
  {
    name:'Nguyen Thi Lan',
    email:'thilan@example.com',
    password:bcrypt.hashSync('123456',10),
  },
  {
    name:'Pham Van Minh',
    email:'minhpham@example.com',
    password:bcrypt.hashSync('123456',10),
  }
]
module.exports = users
