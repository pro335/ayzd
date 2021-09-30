var mongoose = require('mongoose');
const Category = mongoose.model('Category');

exports.createCategory = async (req, res) =>  {
    let newCategory = new Category(req.body);

    newCategory.save(async (err) => {
        if (err) {
            return res.json({success: false, errMessage: "Unknown errors occurred while creating new category."});
        } else {
            res.json({success: true, category: newCategory});
        }
    }); 
}

exports.allCategories = async (req, res) =>  {
    Category.find().exec(function(err, categories) {
        if (err) {
            return res.json({success: false, errMessage: "Unknown errors occurred while getting whole categories."});
        } else {
            res.json({success: true, categories: categories});
        }
    })
}

exports.updateCategory = async (req, res) =>  {
    Category.findByIdAndUpdate(req.body._id, {
        name: req.body.name,
    }, {
        new: true,
        useFindAndModify: false
    }, async function(err, category) {
        if (err) {
            return res.json({success: false, errMessage: "Unknown errors occurred while updating category."});
        } else {
            if (category !== null)
                res.json({success: true, category: category});
            else
                res.json({success: false, errMessage: "Category doesn't exist."});
        }
    })
}

exports.deleteCategory = async (req, res) =>  {
    let id = req.params.id;
    Category.findByIdAndRemove(id, {
        new: true,
        useFindAndModify: false
    }, async function(err, category) {
        if (err) {
            return res.json({success: false, errMessage: "Unknown errors occurred while deleting category."});
        } else {
            if (category !== null)
                res.json({success: true, category: category});
            else
                res.json({success: false, errMessage: "Category doesn't exist."});
        }
    })
}