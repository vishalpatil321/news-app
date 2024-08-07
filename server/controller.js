const userModel = require("./userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUserctrlr = async(req,res) => {
    try {
       const UserExist = await userModel.findOne({email:req.body.email});
       if(UserExist){
        return res.status(200).send({
            success:false,
            message:'User is already exist with this email id.'
        });
       };
       const password = req.body.password;
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password,salt);
       req.body.password = hashedPassword;
       const newUser = new userModel(req.body);
       await newUser.save();
        res.status(200).send({
        success:true,
        message:'Register Successfully.'
       });
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:'Error in register data of user',
            error
        });
    }
};

const loginUserCtrlr = async(req,res) => {
    try {
        const {email,password} = req.body
        const checkedUser = await userModel.findOne({email:email});
        if(!checkedUser){
            return res.status(200).send({
                success:false,
                message:'User not found.',
            });
        };

        const checkPassword = await bcrypt.compare(password,checkedUser.password);
        if(!checkPassword){
            return res.status(200).send({
                success:false,
                message:'Invalid email or password'
            });
        };
        const token = jwt.sign({checkedUser},process.env.JWT_KEY,{expiresIn:'1d'});

        return res.status(200).send({
            success:true,
            message:'Login successfully',
            data:checkedUser,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Error in login data of user',
            error
        })
    }
}

module.exports = {
    registerUserctrlr,
    loginUserCtrlr
};