var mongoose = require('mongoose');
const Chain = mongoose.model('Chain');

exports.createChain = async (req, res) =>  {
    let newChain = new Chain(req.body);

    newChain.save(async (err) => {
        if (err) {
            return res.json({success: false, errMessage: "Unknown errors occurred while creating new chain."});
        } else {
            res.json({success: true, chain: newChain});
        }
    }); 
}

exports.allChains = async (req, res) =>  {
    Chain.find().exec(function(err, chains) {
        if (err) {
            return res.json({success: false, errMessage: "Unknown errors occurred while getting whole chains."});
        } else {
            res.json({success: true, chains: chains});
        }
    })
}

exports.updateChain = async (req, res) =>  {
    Chain.findByIdAndUpdate(req.body._id, {
        name: req.body.name,
    }, {
        new: true,
        useFindAndModify: false
    }, async function(err, chain) {
        if (err) {
            return res.json({success: false, errMessage: "Unknown errors occurred while updating chain."});
        } else {
            if (chain !== null)
                res.json({success: true, chain: chain});
            else
                res.json({success: false, errMessage: "Chain doesn't exist."});
        }
    })
}

exports.deleteChain = async (req, res) =>  {
    let id = req.params.id;
    Chain.findByIdAndRemove(id, {
        new: true,
        useFindAndModify: false
    }, async function(err, chain) {
        if (err) {
            return res.json({success: false, errMessage: "Unknown errors occurred while deleting chain."});
        } else {
            if (chain !== null)
                res.json({success: true, chain: chain});
            else
                res.json({success: false, errMessage: "Chain doesn't exist."});
        }
    })
}
