const { getAllOrders } = require("../../lib/orders")

async function list(req, res) {
    return getAllOrders(req.mongoDB, req.query,res);
}

module.exports = [list]
