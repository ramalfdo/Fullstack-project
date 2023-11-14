const { MongoClient } = require('mongodb');
const db_url = 'mongodb+srv://fwpcheroshena:58lKOWefldEUFfR2@cluster0.yakbotf.mongodb.net/';


const { MongoMemoryServer } = require('mongodb-memory-server');



exports.getDbConnection = async () => {
    if(process.env.NODE_ENV === 'test') {

        if( process.env.MONGOURI ) {
            const client = new MongoClient(process.env.MONGOURI);
            await client.connect();
            return client.db("shoe_manager");
        }else {
            const mongod = await MongoMemoryServer.create();
            process.env.MONGOURI =mongod.getUri()
            const client = new MongoClient(mongod.getUri());
            await client.connect();
            return client.db("shoe_manager");
        }





    }
    const client = new MongoClient(db_url);
    await client.connect();
    return client.db("shoe_manager");
}
