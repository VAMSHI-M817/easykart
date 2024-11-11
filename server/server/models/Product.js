const mongo = require('mongoose')
const Schema = mongo.Schema


const ProductSchema = new Schema(
    {
        image: String,
        title: String,
        description: String,
        category: String,
        brand: String,
        price: String,
        salePrice: Number,
        totalStock: Number,
        averageReview: Number

    },
    { timestamps: true }
)

module.exports = mongo.model("Products", ProductSchema)