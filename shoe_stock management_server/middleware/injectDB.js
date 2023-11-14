const { getDbConnection } = require("../dbConnection");

async function withMongo( req, res, next) {

   const connection = (await getDbConnection());


//    console.log(connection)

   req.mongoDB = connection


   next()


}


module.exports = withMongo