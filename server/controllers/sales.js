const OverallStat = require('../models/OverallStat')

exports.getSales = async (req, res, next) => {
    try{
        const overallStats = await OverallStat.find()
        res.status(200).json(overallStats)
    }
    catch(err){
        res.status(404).json({message: err.message})
    }
}
