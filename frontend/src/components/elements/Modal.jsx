import React, { useState } from "react";
import auth from "../../auth";

const Modal = ({ isOpen, onClose, getNotes }) => {
	let noteTitleValue, noteContentValue;

	if (!isOpen) return null;

	return (
		<div className="modal-overlay flex justify-center items-center">
			<div className="modal-cont flex flex-col">
				<input
					type="text"
					placeholder="Note title..."
					onChange={(e) => {
						noteTitleValue = e.target.value;
					}}
				/>
				<textarea
					placeholder="Note content..."
					onChange={(e) => {
						noteContentValue = e.target.value;
					}}
				/>
				<div>
					<button onClick={onClose}>Cancel</button>
					<button
						onClick={async () => {
							const response = await auth.createNote(
								noteTitleValue,
								noteContentValue
							);
							if (!response.success) {
								alert(response.message);
								return;
							}
							if (response.success) {
								await getNotes();
								onClose();
							}
						}}
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
