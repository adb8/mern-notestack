import AuthSearchCont from "../elements/AuthSearchCont";
import auth from "../../auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LandingPage = () => {
	const navigate = useNavigate();
	let loginUsername = "",
		loginPassword = "",
		signupUsername = "",
		signupPassword = "";

	useEffect(() => {
		auth.logout();
	}, []);

	return (
		<div className="full-page-cont flex justify-center items-center flex-row">
			<div className="left-page-cont flex justify-center items-center">
				<div className="logo-cont">
					<div className="notestack-logo">notestack</div>
					<hr className="logo-desc-bar" />
					<div className="notestack-desc">Save, share, and organize notes with ease</div>
				</div>
			</div>
			<div className="right-page-cont flex justify-center items-center flex-col">
				<AuthSearchCont
					headerText="Returning User? Log in"
					publicValuePlaceholder="Enter your usernname"
					privateValuePlaceholder="Enter your password"
					submitText="Log in"
					privateValue={loginPassword}
					publicValue={loginUsername}
					onSubmit={async (loginPassword, loginUsername) => {
						const response = await auth.login(loginUsername, loginPassword);
						alert(response.message);
						if (response.success) {
							navigate("/search");
						}
					}}
				/>
				<AuthSearchCont
					headerText="New User? Sign up"
					publicValuePlaceholder="Create your usernname"
					privateValuePlaceholder="Create your password"
					submitText="Sign up"
					privateValue={signupPassword}
					publicValue={signupUsername}
					onSubmit={async (signupUsername, signupPassword) => {
						const response = await auth.signup(signupUsername, signupPassword);
						alert(response.message);
						if (response.success) {
							navigate("/search");
						}
					}}
				/>
			</div>
		</div>
	);
};

export default LandingPage;
