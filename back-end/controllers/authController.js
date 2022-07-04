const authModal = require("../models/authModal");

const signupUser = async (req,res) =>{
    await authModal
        .signupUser(req.body)
        .then((result)=>{
            res.json({
                success: true,
                result,
            });
        })
        .catch((err)=>{
            res.json({
                success: false,
                err,
            });
        });
};



module.exports = {
    signupUser,
}