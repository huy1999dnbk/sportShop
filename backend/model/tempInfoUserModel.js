const mongoose = require('mongoose')
const tempUserInfoSchema = mongoose.Schema({
    name: {
        type: String
    },
    address: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
}, {
    timestamps: true
})

const UserTempInfo = mongoose.model('UserTempInfo', tempUserInfoSchema)

module.exports = UserTempInfo