const httpStatus = require("http-status");
const { ObjectId } = require('mongodb');
exports.createProduct = async (mongo, body, res) => {
    const product_collection = mongo.collection('products');
    body.status = 'in stock'
    await product_collection.insertOne(body)
    return res.status(httpStatus.OK).json({data: true})
}
exports.getAllProducts = async (mongo,query,res) => {
    const product_collection = mongo.collection('products');
    const mongoQuery = {}

    if(query.status) mongoQuery.status=query.status

    const products = await product_collection.find(mongoQuery).toArray()

    return res.status(httpStatus.OK).json({data: products})

}
exports.getAllProduct = async (mongo,params,res) => {
    const product_collection = mongo.collection('products');

    const product = await product_collection.findOne({_id: ObjectId((params.id))})

    return res.status(httpStatus.OK).json({data: product})

}
exports.updateProduct = async (mongo,params, body, res) => {
    const product_collection = mongo.collection('products');

    const product = await product_collection.updateOne({_id: ObjectId((params.id))},{$set:body})

    return res.status(httpStatus.OK).json({data: product})
}
exports.deleteProduct = async (mongo,params, res) => {
    const product_collection = mongo.collection('products');

    const product = await product_collection.updateOne({_id: ObjectId((params.id))},{$set: {status: 'deleted'}})

    return res.status(httpStatus.OK).json({data: product})
}
