const { MongoClient } = require('mongodb');
require('dotenv').config();

// Get MongoDB connection URI from environment variable
const uri = process.env.DATABASE_URL;

if (!uri) {
    console.error('DATABASE_URL environment variable is not set');
    process.exit(1);
}

async function testConnection() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Successfully connected to MongoDB!");
        
        // Test database operations
        const database = client.db("rozgarhub");
        const collection = database.collection("recruiters");
        
        // Try to insert a test document
        const testDoc = {
            email: "test@example.com",
            fullName: "Test User",
            companyName: "Test Company",
            createdAt: new Date()
        };
        
        const result = await collection.insertOne(testDoc);
        console.log("Test document inserted:", result);
        
        // Clean up test document
        await collection.deleteOne({ email: "test@example.com" });
        console.log("Test document cleaned up");
        
    } catch (error) {
        console.error("Connection error:", error);
    } finally {
        await client.close();
        console.log("MongoDB connection closed");
    }
}

// Run the test
testConnection().catch(console.error); 