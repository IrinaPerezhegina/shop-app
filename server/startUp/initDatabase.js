const Products = require("../models/Products.js");
const productsMock = require("../mock/products.json");
const { Model } = require("mongoose");

module.exports = async () => {
  const products = await Products.find();

  if (products.length !== productsMock.length) {
    await createInitialEntity(Products, productsMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item.id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (e) {
        return e;
      }
    })
  );
}
