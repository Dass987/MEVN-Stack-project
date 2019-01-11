const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (request, response) => {
	const products = await Product.find();
	response.json(products);
});

router.get('/:id', async (request, response) => {
	const product = await Product.findById(request.params.id);
	response.json(product);
});

router.post('/', async (request, response) => {	
	const product = new Product(request.body);
	await product.save();
	response.json({status: 'Product Saved'});
});

router.put('/:id', async (request, response) => {
	await Product.findByIdAndUpdate(request.params.id, request.body);
	response.json({status: 'Product Updated'});
});

router.delete('/:id', async (request, response) => {
	await Product.findByIdAndDelete(request.params.id);
	response.json({status: 'Product Deleted'});
});

module.exports = router;