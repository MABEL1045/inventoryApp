const products = require("../models/products");

const getProduct = async (req, res) => {
  const allProducts = await products.findOne({});
  try {
    res.json(allProducts);
  } catch (err) {
    res.status(500).json({ err });
  }
};

const postProduct = async (req, res) => {
  const newProduct = new products(req.body);
  try {
    const product = await newProduct.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ err });
    console.log(err);
  }
};

const putProduct = async (req, res) => {
  try {
    const product = await products.findByIdAndUpdate(req.params.id, req.body);

    if (!product) {
      res.status(500).send("product not found");
    } else {
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const remProduct = await products.findByIdAndDelete(req.params.id);

    if (!remProduct) {
      return res
        .status(404)
        .json({ success: false, msg: `No product with id ${req.params.id}` });
    }
    return res
      .status(200)
      .json({ success: true, msg: "product was deleted successfully" });
  } catch (err) {
    res.status(500).json({ err });
  }
};

module.exports = { getProduct, postProduct, putProduct, deleteProduct };
