const { updateProduct } = require("../../lib/product")

async function update(req, res) {
    return updateProduct(req.mongoDB, req.params,req.body,res);
}

module.exports = [update]
