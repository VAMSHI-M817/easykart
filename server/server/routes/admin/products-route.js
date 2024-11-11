const express = require('express')
const router = express.Router()
const { handleImageUpload, addProduct, getAllProducts, editProduct, deleteProduct } = require('../../controllers/admin/ProductsController')
const { upload } = require('../../helpers/cloudinary')


router.post('/upload-image', upload.single("my_file"), handleImageUpload)
router.post('/add-product', addProduct)
router.get('/get-products', getAllProducts)
router.put('/edit/:id', editProduct)
router.delete('/delete/:id', deleteProduct)




module.exports = router 