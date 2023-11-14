const httpStatus = require("http-status");
const {  get_all_clients } = require("../../lib/client")

async function login(req, res) {

        return get_all_clients(req.mongoDB,res);

}


module.exports = [login]
