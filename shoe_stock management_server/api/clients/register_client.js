const httpStatus = require("http-status");
const { register_client } = require("../../lib/client")

async function register(req, res) {
    return register_client(req.mongoDB, req.body,res);
}

module.exports = [register]
