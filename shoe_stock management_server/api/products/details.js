const { getAllProduct } = require("../../lib/product")

async function details(req, res) {
    return getAllProduct(req.mongoDB, req.params,res);
}

module.exports = [details]
