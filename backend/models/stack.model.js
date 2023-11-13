const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = require("./note.model");

const StackSchema = new Schema(
	{
		name: { type: String, required: true },
		code: { type: String, required: true },
		notes: [NoteSchema.schema],
	},
	{
		timestamps: true,
	}
);

const Stack = mongoose.models.Stack || mongoose.model("Stack", StackSchema);
module.exports = Stack;
