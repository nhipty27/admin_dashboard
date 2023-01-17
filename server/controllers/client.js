const Product = require('../models/Product')
const ProductStat = require('../models/ProductStat')
const User = require('../models/User')
const Transaction = require('../models/Transaction')

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

exports.getCustomers = async (req, res, next) => {
    try{
        const customers = await User.find({role :"user"}).select("-password")
        res.status(200).json(customers)
    }
    catch(err){
        res.status(404).json({message: err.message})
    }
}


exports.getTransactions = async (req, res, next) => {
    try{
        const {page = 1, pageSize = 20, sort = null, search = ''} = req.query
        
        const generateSort = () => {
            const sortParsed = JSON.parse(sort)
            const sortFormatted = {
              [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
            }
      
            return sortFormatted
        }
        const sortFormatted = Boolean(sort) ? generateSort() : {}
      
        const transactions = await Transaction.find({
            $or: [
              { cost: { $regex: new RegExp(search, "i") } },
              { userId: { $regex: new RegExp(search, "i") } },
            ],
        })
            .sort(sortFormatted)
            .skip(page * pageSize)
            .limit(pageSize)
      
        const total = await Transaction.countDocuments({
            name: { $regex: search, $options: "i" },
         })
      
        res.status(200).json({
            transactions,
            total,
         })
    }
    catch(err){
        res.status(404).json({message: err.message})
    }
}