const mongoose = require('mongoose');

async function createAlert() {
    await mongoose.connect('mongodb://projectslogin01_db_user:okNO1xyBB4uuXtUd@ac-ov1cwio-shard-00-00.cbzzzod.mongodb.net:27017,ac-ov1cwio-shard-00-01.cbzzzod.mongodb.net:27017,ac-ov1cwio-shard-00-02.cbzzzod.mongodb.net:27017/?ssl=true&replicaSet=atlas-z5p9xr-shard-0&authSource=admin&appName=Cluster0');
    
    // We will require the actual Mongoose model to see if it saves correctly
    // Wait, since we are in Node script outside Next.js, we can't easily require Next.js code without transpilation.
    // Let's just create one manually in the collection.
    const db = mongoose.connection.db;
    const collection = db.collection('alerts');
    await collection.insertOne({
        userId: "69fb5f0b91563986deedbc9b",
        symbol: "TATACONSUM",
        alertType: "Stock P/E",
        targetPrice: 65,
        condition: "BELOW",
        active: true,
        triggered: false,
        expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: 0
    });
    console.log("Created alert");

    await mongoose.disconnect();
}

createAlert().catch(console.error);
