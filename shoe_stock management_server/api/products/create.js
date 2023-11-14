const { createProduct } = require("../../lib/product")

async function create(req, res) {
    return createProduct(req.mongoDB, req.body,res);
}

module.exports = [create]
