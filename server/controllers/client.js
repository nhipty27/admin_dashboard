const Product = require('../models/Product')
const ProductStat = require('../models/ProductStat')

exports.getProducts = async (req, res, next) => {
    try{
        const products = await Product.find()
        const productsWithStats = await Promise.all(
            //use join as SQL.
            products.map( async (product) => {
                const stat = await ProductStat.find({
                    productId: product._id
                })
                return {
                    ...product._doc,
                    stat
                }
            })
        )
        res.status(200).json(productsWithStats)
    }
    catch(err){
        res.status(404).json({message: err.message})
    }
}
