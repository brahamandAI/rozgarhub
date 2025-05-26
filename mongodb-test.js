const { MongoClient } = require('mongodb');
require('dotenv').config();

// Get MongoDB connection URI from environment variable
const uri = process.env.DATABASE_URL;

if (!uri) {
    console.error('DATABASE_URL environment variable is not set');
    process.exit(1);
}

// Create a new MongoClient
const client = new MongoClient(uri);

async function testConnection() {
    try {
        // Connect to MongoDB
        console.log('Connecting to MongoDB...');
        await client.connect();
        console.log('Successfully connected to MongoDB!');
        
    } catch (error) {
        console.error('Connection error:', error.message);
    } finally {
        // Close the connection
        await client.close();
        console.log('MongoDB connection closed');
    }
}

// Run the test
testConnection().catch(console.error); 