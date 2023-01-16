const User = require('../models/User')

exports.getUser = async (req, res, next) => {
    try{
        const { id } = req.params
        const user = await User.findById(id)
        res.status(200).json(user)
    }
    catch(err){
        res.status(404).json({message: err.message})
    }
}
