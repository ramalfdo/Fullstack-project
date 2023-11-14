const httpStatus = require("http-status");
const { login_client } = require("../../lib/client")

async function login(req, res) {

        return login_client(req.mongoDB, req.body,res);

}


module.exports = [login]
