const express = require('express');
const router = express.Router();
const Task = require('./../models/Task');

router.get('/', async (request, response) => {
	const tasks = await Task.find();
	response.json(tasks);
});

router.post('/', async (request, response) => {	
	const task = new Task(request.body);
	await task.save();
	response.json({status: 'Task Saved'});
});

router.put('/:id', async (request, response) => {
	await Task.findByIdAndUpdate(request.params.id, request.body);
	response.json({status: 'Task Updated'});
});

router.delete('/:id', async (request, response) => {
	await Task.findByIdAndDelete(request.params.id);
	response.json({status: 'Task Deleted'});
});

module.exports = router;