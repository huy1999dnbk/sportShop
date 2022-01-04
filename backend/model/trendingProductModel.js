const mongoose = require('mongoose')
const trendingProductSchema = mongoose.Schema({
    idProduct: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    count: {
        type: Number,
        default: 1
    },
}, {
    timestamps: true
})

const trendProduct = mongoose.model('trendProduct', trendingProductSchema)

module.exports = trendProduct