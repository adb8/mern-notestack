const router = require("express").Router();
let Stack = require("../models/stack.model");
let Note = require("../models/note.model");

router.route("/open").post(async (req, res) => {
	let responseSent = false;
	const name = req.body.name;
	const code = req.body.code;

	try {
		const stack = await Stack.findOne({ name });
		if (stack && stack.code === code && !responseSent) {
			responseSent = true;
			return res.status(200).json({
				success: true,
				message: "Stack successfully opened",
				stackId: stack._id,
			});
		}
		if (!responseSent) {
			responseSent = true;
			return res.status(200).json({
				success: false,
				message: "Incorrect stack name or code",
				stackId: null,
			});
		}
	} catch (error) {
		if (!responseSent) {
			responseSent = true;
			return res.status(400).json({
				success: false,
				message: "Error: " + error,
				stackId: null,
			});
		}
	}
});

router.route("/add").post(async (req, res) => {
	let responseSent = false;
	const name = req.body.name;
	const code = req.body.code;

	try {
		const existingStack = await Stack.findOne({ name });
		if (existingStack && !responseSent) {
			responseSent = true;
			return res.status(200).json({
				success: false,
				message: "Stack already exists",
				stackId: null,
			});
		}
		const newStack = new Stack({ name, code, notes: [] });
		await newStack.save();
		if (!responseSent) {
			responseSent = true;
			return res.status(200).json({
				success: true,
				message: "Stack successfully created",
				stackId: newStack._id,
			});
		}
	} catch (error) {
		if (!responseSent) {
			responseSent = true;
			return res.status(400).json({
				success: false,
				message: "Error: " + error,
				stackId: null,
			});
		}
	}
});

router.route("/:stackId").get(async (req, res) => {
	let responseSent = false;
	const stackId = req.params.stackId;

	try {
		const stack = await Stack.findById(stackId);
		if (stack && !responseSent) {
			responseSent = true;
			return res.status(200).json({
				success: true,
				message: "Stack notes successfully retrieved",
				notes: stack.notes,
			});
		}
		if (!responseSent) {
			responseSent = true;
			return res.status(200).json({
				success: false,
				message: "Unable to retrieve stack notes",
				notes: null,
			});
		}
	} catch (error) {
		if (!responseSent) {
			responseSent = true;
			return res.status(400).json({
				success: false,
				message: "Error: " + error,
				notes: null,
			});
		}
	}
});

router.route("/:stackId/add").post(async (req, res) => {
	let responseSent = false;
	const stackId = req.params.stackId;
	const newNote = new Note({
		author: req.body.author,
		title: req.body.title,
		content: req.body.content,
		date: req.body.date,
	});

	try {
		const stack = await Stack.findById(stackId);
		if (stack && !responseSent) {
			responseSent = true;
			stack.notes.push(newNote);
			await stack.save();
			return res.status(200).json({
				success: true,
				message: "Note successfully added",
			});
		}
		if (!responseSent) {
			responseSent = true;
			return res.status(200).json({
				success: false,
				message: "Unable to add note",
			});
		}
	} catch (error) {
		if (!responseSent) {
			responseSent = true;
			return res.status(400).json({
				success: false,
				message: "Error: " + error,
			});
		}
	}
});

module.exports = router;
