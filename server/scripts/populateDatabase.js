const axios = require('axios')
const signupApi = 'http://localhost:3001/api/v1/user/signup'

const users = [
  {
    firstName: 'Tony',
    lastName: 'Stark',
    email: 'tony@stark.com',
    password: 'password123',
    checking: 152172.89,
    saving: 1590000.00,
    credit: 5000000.00,
  },
  {
    firstName: 'Steve',
    lastName: 'Rogers',
    email: 'steve@rogers.com',
    password: 'password456',
    checking: 11.89,
    saving: 3145.00,
    credit: 100000.00,
  }
]

users.forEach(user => {
  axios
    .post(signupApi, user)
    .then(response =>  (response))
    .catch(error =>  (error))
})
