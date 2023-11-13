const AuthSearchCont = ({
	headerText,
	publicValuePlaceholder,
	privateValuePlaceholder,
	submitText,
	onSubmit,
	privateValue,
	publicValue,
}) => {
	return (
		<div className="authsearch-cont flex flex-col justify-center items-center">
			<div>{headerText}</div>
			<input
				type="text"
				placeholder={publicValuePlaceholder}
				onChange={(e) => {
					publicValue = e.target.value;
				}}
			/>
			<input
				type="password"
				placeholder={privateValuePlaceholder}
				onChange={(e) => {
					privateValue = e.target.value;
				}}
			/>
			<button
				onClick={() => {
					onSubmit(publicValue, privateValue);
				}}
			>
				{submitText}
			</button>
		</div>
	);
};

export default AuthSearchCont;
