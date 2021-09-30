var mongoose = require('mongoose');
const Member = mongoose.model('Member');

exports.createMember = async (req, res) =>  {
    let newMember = new Member(req.body);

    newMember.save(async (err) => {
        if (err) {
            return res.json({success: false, errMessage: "Unknown errors occurred while creating new Project Member."});
        } else {
            res.json({success: true, member: newMember});
        }
    }); 
}

exports.allMembers = async (req, res) =>  {
    Member.find().exec(function(err, members) {
        if (err) {
            return res.json({success: false, errMessage: "Unknown errors occurred while getting whole project Members."});
        } else {
            res.json({success: true, members: members});
        }
    })
}

exports.updateMember = async (req, res) =>  {
    Member.findByIdAndUpdate(req.body._id, {
        name: req.body.name,
    }, {
        new: true,
        useFindAndModify: false
    }, async function(err, member) {
        if (err) {
            return res.json({success: false, errMessage: "Unknown errors occurred while updating project Member."});
        } else {
            if (member !== null)
                res.json({success: true, member: member});
            else
                res.json({success: false, errMessage: "Member doesn't exist."});
        }
    })
}

exports.deleteMember = async (req, res) =>  {
    let id = req.params.id;
    Member.findByIdAndRemove(id, {
        new: true,
        useFindAndModify: false
    }, async function(err, member) {
        if (err) {
            return res.json({success: false, errMessage: "Unknown errors occurred while deleting project Member."});
        } else {
            if (member !== null)
                res.json({success: true, member: member});
            else
                res.json({success: false, errMessage: "Member doesn't exist."});
        }
    })
}
