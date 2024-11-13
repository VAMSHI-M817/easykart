const express = require('express')
const router = express.Router()
const { handleImageUpload, addProduct, getAllProducts, editProduct, deleteProduct } = require('../../controllers/admin/ProductsController')
const { upload } = require('../../helpers/cloudinary')


router.post('/upload-image', upload.single("my_file"), handleImageUpload)
router.post('/add-product', addProduct)
router.get('/get-product', getAllProducts)
router.put('/edit-product/:id', editProduct)
router.delete('/delete-product/:id', deleteProduct)




module.exports = router 