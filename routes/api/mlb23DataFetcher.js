const axios = require("axios");
const mongoose = require("mongoose");
const Item = require("./items"); // Assuming you have defined a Mongoose model for the item collection


async function fetchAndStoreData() {
    
    const baseURL = process.env.MLB_API_URL;
    for (let i = 1; i <= 112; i++){
          try {
            // Fetch data from the MLB The Show API
            const response = await axios.get(
              baseURL + `items.json?type=mlb_card?page=${i}`
            );
            const items = response.data;

            // Connect to MongoDB
            await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
              useNewUrlParser: true,
              useUnifiedTopology: true,
            });

            // Store the fetched data in the MongoDB collection
            await Item.insertMany(items);

            console.log("Data stored successfully in the MongoDB database.");

            // Disconnect from MongoDB
            await mongoose.disconnect();
          } catch (error) {
            console.error("Error fetching and storing data:", error);
          }
    }

}

module.exports = fetchAndStoreData;
