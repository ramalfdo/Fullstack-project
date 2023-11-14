const { getAllProducts } = require("../../lib/product")

async function list(req, res) {
    return getAllProducts(req.mongoDB, req.query,res);
}

module.exports = [list]
