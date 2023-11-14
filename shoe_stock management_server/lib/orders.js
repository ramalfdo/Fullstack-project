const httpStatus = require("http-status");
const { ObjectId } = require('mongodb');

exports.createOrder = async (mongo, socketio, payload, res) => {
    const ordersCollection = mongo.collection('orders');
    const productsCollection = mongo.collection('products');

    const productsIds = payload.items.map(item => ObjectId(item.item))

    const products = await productsCollection.find({_id: {$in:productsIds}}).toArray();

    const productsForDb = []

    const lowProducts = []
    let totalAmount = 0;
    payload.items.forEach( item => {
        const selectedProduct = products.find(product => product._id.toString() === item.item )

        if(selectedProduct.qty < item.qty) {
            lowProducts.push(selectedProduct.name)
        }

        totalAmount = totalAmount + (selectedProduct.price * item.qty)
        productsForDb.push({
            product: selectedProduct._id,
            qty: item.qty
        })
    })

    if(lowProducts.length) {
        return res.status(httpStatus.NOT_ACCEPTABLE)
            .json({data:`${lowProducts.join(", ") } Does not have enough quantity `} )
    }


    const order = {
        products : productsForDb,
        client: ObjectId(payload.user),
        amount: totalAmount,
        status: 'paid'
    }

    await ordersCollection.insertOne(order);

    payload.items.forEach(item => {
        const selectedProduct = products.find(product => product._id.toString() === item.item )
        const update = {}
        if(selectedProduct.qty - item.qty ===0) {
            update.status = 'out of stock'
            update.qty =0
        }else {
            update.qty = selectedProduct.qty - item.qty
        }

        (productsCollection.updateOne({_id:ObjectId(item.item)},{$set:update}))
    })

    socketio.emit('order-placed', {orderAmount: totalAmount})

    return res.status(httpStatus.OK).json({data: true})


}

exports.getAllOrders = async (mongo, query, res) => {
    const ordersCollection = mongo.collection('orders');
    const mongoQ = [];
    if(query.client) {
        console.log("xxx")
        mongoQ.push(
            {
                $match: {
                    client: ObjectId(query.client)
                }
            },
        )
    }

    mongoQ.push( {
            $lookup: {
                from: 'products',
                localField: 'products.product',
                foreignField: '_id',
                as:'products_list'
            }
        },
        {
            $lookup: {
                from: 'clients',
                localField: 'client',
                foreignField: '_id',
                as:'client'
            }
        })

    const orders = (await (ordersCollection.aggregate(mongoQ)).toArray()).map(value => {
        return {
            ...value,
            client: value.client[0]
        }
    })

    return res.status(httpStatus.OK).json({data: orders})
}
