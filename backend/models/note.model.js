const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema(
	{
		author: {
			type: String,
			required: true,
			trim: true,
			minlength: 3,
		},
		title: { type: String, required: true },
		content: { type: String, required: true },
		date: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const Note = mongoose.models.Note || mongoose.model("Note", NoteSchema);
module.exports = Note;
