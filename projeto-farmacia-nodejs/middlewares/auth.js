const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = {
    authToken: async function (req, res, next){
        const authHeader = req.headers.authorization;
        //console.log(authHeader);
        if(!authHeader){
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: é necessário realizar o login para acessar a página! Falta o token A!"
            });
        }

        const [, token ]= authHeader.split(' ');
        //console.log("Token: " + token);

        if(!token){
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: é necessário realizar o login para acessar a página! Falta o token B!"
            });
        }

        try{
            const decode = await promisify(jwt.verify)(token, "D62ST92Y7A6V7K5C6W9ZU6W8KS3");
            req.userId = decode.id_pessoa;
            req.userType = decode.tipo; 

    

              
            return next();
        }catch(err){
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: é necessário realizar o login para acessar a página! Token inválido!"
            });
        }

    },


    
    
}