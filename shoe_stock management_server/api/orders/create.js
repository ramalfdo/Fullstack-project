const { createOrder } = require("../../lib/orders")

async function create(req, res) {
    const io = req.app.get('socketio');
    return createOrder(req.mongoDB, io, req.body,res);
}

module.exports = [create]
