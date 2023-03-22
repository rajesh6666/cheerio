const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");
const fs = require('fs');

// URL of the page we want to scrape
const url = "https://wltest.dns-systems.net/";

// Async function which scrapes the data
async function scrapeData() {
  try {
    // Fetch HTML of the page we want to scrape
    const { data } = await axios.get(url);

    // Load HTML we fetched in the previous line
    const $ = cheerio.load(data);

    // console.log(pretty($.html()));

    // Select all the list items in plainlist class
    const packages = $(".package");

    // Stores data for all products
    const products = [];

    // Use .each method to loop through the li we selected
    packages.each((idx, el) => {
      // Object holding data for each country/jurisdiction
      const product = { title: "", description: "", price: "", discount: ""  };
      const discountDetail = $(el).find(".package-price p").text();

      product.title = $(el).find("h3").text();
      product.description = $(el).find(".package-description").text();
      product.price = $(el).find(".package-price .price-big").text();
      product.discount = discountDetail ? `€${parseFloat(discountDetail.match(/-?(?:\d+(?:\.\d*)?|\.\d+)/))}` : `€0.0`;
      
      // Populate products array with country data
      products.push(product);
    });

    // Logs products array to the console
    console.dir(products);

    // Write products array in products.json file
    fs.writeFile("products.json", JSON.stringify(products, null, 2), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Successfully written data to file");
    });
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  scrapeData
};