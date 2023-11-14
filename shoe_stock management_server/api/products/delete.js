const { deleteProduct } = require("../../lib/product")

async function deleteP(req, res) {
    return deleteProduct(req.mongoDB,req.params,res);
}

module.exports = [deleteP]
