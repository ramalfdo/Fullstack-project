const httpStatus = require("http-status");

exports.register_client  = async (mongo,user,res) => {

    const client_collection = mongo.collection('clients');

    user.user_role = "client"
    await client_collection.insertOne(user)

    return res.status(httpStatus.OK).json({data: true})
}

exports.login_client = async (mongo,body,res) => {

    const client_collection = mongo.collection('clients');

    const client = await client_collection.findOne({user_name: body.user_name, password: body.password})

    if(!client) {
        return res.status(httpStatus.UNAUTHORIZED).json({data: "Unautorized"})
    }
    return res.status(httpStatus.OK).json({data: {  id: client._id, role: client.user_role}})

}

exports.get_all_clients = async (mongo,res) => {


    const client_collection = mongo.collection('clients');

    const clients =  await client_collection.find({user_role:'client'}).toArray()

    return res.status(httpStatus.OK).json({data: clients})





}


