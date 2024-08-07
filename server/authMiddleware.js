const jwt = require('jsonwebtoken');

module.exports = async(req,res,next) => {
     try {
        const token = req.headers['authorization'].split(' ')[1];
        jwt.verify(token,process.env.JWT_KEY, (error,decode) => {
          if(error){
            return res.status(200).send({
                success:false,
                message:'Authorization Failed !'
            });
          }
          else{
            req.body.userId = decode.id
            next();
          }
     });
     } catch (error) {
        res.status(500).send({
            success:false,
            message:'Error in auth middleware.'
        });
     };
};