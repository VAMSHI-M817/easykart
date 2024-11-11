const { imageUploadUtil } = require("../../helpers/cloudinary");
const ProductSchema = require('../../models/Product')




const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await imageUploadUtil(url);

        res.json({
            success: true,
            result,
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error occured",
            error: error
        });
    }
};

//POST a new product
const addProduct = async (req, res) => {
    try {
        const {
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
            averageReview
        } = req.body
        const isExist = ProductSchema.findOne({})
        if (isExist) {
            res.status(404).json({
                success: false,
                message: "Product already exist"
            })
        }
        const newProduct = new ProductSchema({
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
            averageReview
        })
        const savedProduct = await newProduct.save()
        res.status(200).json({
            success: true,
            message: "Product Added Successfully",
            data: savedProduct
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in adding product"
        })
    }
}

//GET all products
const getAllProducts = async (req, res) => {
    try {
        const ListOfProducts = await ProductSchema.find({})
        res.status(200).json({
            success: true,
            data: ListOfProducts
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in adding product"
        })
    }
}

//PUT / Edit a product
const editProduct = async (req, res) => {
    try {
        const {
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
            averageReview
        } = req.body
        const { id } = req.params
        const findProduct = await ProductSchema.findByIdAndUpdate(id)
        if (!findProduct) {
            res.status(404).json({
                success: false,
                message: 'Product Not Found'
            })
        }
        findProduct.image = image || findProduct.image
        findProduct.title = title || findProduct.title
        findProduct.description = description || findProduct.description
        findProduct.category = category || findProduct.category
        findProduct.brand = brand || findProduct.brand
        findProduct.price = price || findProduct.price
        findProduct.salePrice = salePrice || findProduct.salePrice
        findProduct.totalStock = totalStock || findProduct.totalStock
        findProduct.averageReview = averageReview || findProduct.averageReview
        const editedProduct = await findProduct.save()
        res.status(200).json({
            success: true,
            message: "Product Edited successfully",
            data: editedProduct,

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in Editing product"
        })
    }
}

//DELETE a product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const deleteProduct = await ProductSchema.findByIdAndDelete(id)
        if (!deleteProduct) {
            res.status(404).json({
                success: false,
                message: "Product Not Found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Product Delete Successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in Delete product"
        })
    }
}




module.exports = { handleImageUpload, addProduct, editProduct, getAllProducts, deleteProduct }