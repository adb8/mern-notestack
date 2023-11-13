import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../../auth";
import NoteItem from "../elements/NoteItem";
import Modal from "../elements/Modal";

const StackPage = () => {
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [notes, setNotes] = useState([]);

	const openModal = () => {
		auth.exitStack();
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const getNotes = async () => {
		const response = await auth.getNotes();
		const notes = response.notes;
		setNotes(notes);
	};

	useEffect(() => {
		getNotes();
	}, []);

	return (
		<div className="full-page-cont">
			<Modal isOpen={isModalOpen} onClose={closeModal} getNotes={getNotes} />
			<div className="header-cont flex flex-row items-center">
				<div className="header-text">{auth.getStackName()}</div>
				<button
					onClick={() => {
						navigate("/search");
					}}
				>
					Exit Stack
				</button>
				<button onClick={openModal}>Create Note</button>
				<input type="text" placeholder="Search for notes" />
				<button>Search Notes</button>
			</div>
			<div className="notes-cont">
				{notes &&
					notes.map((note) => {
						return (
							<NoteItem
								key={note._id}
								title={note.title}
								author={note.author}
								date={note.date}
								content={note.content}
							/>
						);
					})}
			</div>
		</div>
	);
};

export default StackPage;
