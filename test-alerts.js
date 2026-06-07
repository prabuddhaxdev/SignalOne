const mongoose = require('mongoose');

async function checkAlerts() {
    await mongoose.connect('mongodb://projectslogin01_db_user:okNO1xyBB4uuXtUd@ac-ov1cwio-shard-00-00.cbzzzod.mongodb.net:27017,ac-ov1cwio-shard-00-01.cbzzzod.mongodb.net:27017,ac-ov1cwio-shard-00-02.cbzzzod.mongodb.net:27017/?ssl=true&replicaSet=atlas-z5p9xr-shard-0&authSource=admin&appName=Cluster0');
    
    // Check documents directly in the raw collection
    const db = mongoose.connection.db;
    const collection = db.collection('alerts');
    const alerts = await collection.find({}).toArray();
    console.log(JSON.stringify(alerts, null, 2));

    await mongoose.disconnect();
}

checkAlerts().catch(console.error);
