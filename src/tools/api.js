const axios = require('axios');

const api = axios.create({
    baseURL: "https://habitica.com/api/v3"
})

module.exports = api