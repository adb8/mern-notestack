import axios from "axios";

class Auth {
	constructor() {
		this.authenticated = false;
		this.username = "";
		this.stackName = "";
		this.stackId = null;
	}

	async signup(username, password) {
		if (username.length === 0 || password.length === 0) {
			return {
				success: false,
				message: "Please fill in all fields",
			};
		}

		if (username.length < 5 || password.length < 5) {
			return {
				success: false,
				message: "Username and password must be at least 5 characters long",
			};
		}

		const response = await axios.post("http://localhost:5000/users/add", {
			username: username,
			password: password,
		});
		const data = response.data;

		if (data.message === "Account successfully created") {
			this.authenticated = true;
			this.username = username;
			return {
				success: true,
				message: data.message,
			};
		}

		this.authenticated = false;
		return {
			success: false,
			message: data.message,
		};
	}

	async login(username, password) {
		if (username.length === 0 || password.length === 0) {
			return {
				success: false,
				message: "Please fill in all fields",
			};
		}

		const response = await axios.post("http://localhost:5000/users/login", {
			username: username,
			password: password,
		});
		const data = response.data;

		if (data.message === "Login successful") {
			this.authenticated = true;
			this.username = username;
			return {
				success: true,
				message: data.message,
			};
		}

		this.authenticated = false;
		return {
			success: false,
			message: data.message,
		};
	}

	async openStack(name, code) {
		if (name.length === 0 || code.length === 0) {
			return {
				success: false,
				message: "Please fill in all fields",
			};
		}

		const response = await axios.post("http://localhost:5000/stacks/open", {
			name: name,
			code: code,
		});
		const data = response.data;

		if (data.message === "Stack successfully opened") {
			this.stackId = data.stackId;
			this.stackName = name;
			return {
				success: true,
				message: data.message,
			};
		}

		return {
			success: false,
			message: data.message,
		};
	}

	async createStack(name, code) {
		if (name.length === 0 || code.length === 0) {
			return {
				success: false,
				message: "Please fill in all fields",
			};
		}

		const response = await axios.post("http://localhost:5000/stacks/add", {
			name: name,
			code: code,
		});
		const data = response.data;

		if (data.message === "Stack successfully created") {
			this.stackId = data.stackId;
			this.stackName = name;
			return {
				success: true,
				message: data.message,
			};
		}

		return {
			success: false,
			message: data.success,
		};
	}

	async getNotes() {
		const response = await axios.get("http://localhost:5000/stacks/" + this.stackId);
		const data = response.data;

		if (data.message === "Stack notes successfully retrieved") {
			return {
				success: true,
				message: data.message,
				notes: data.notes,
			};
		}

		return {
			success: true,
			message: data.message,
			notes: [],
		};
	}

	async createNote(title, content) {
		if (title.length === 0 || content.length === 0) {
			return {
				success: false,
				message: "Please fill in all fields",
			};
		}

		const response = await axios.post("http://localhost:5000/stacks/" + this.stackId + "/add", {
			author: this.username,
			title: title,
			content: content,
			date: new Date().toDateString(),
		});
		const data = response.data;

		if (data.message === "Note successfully added") {
			return {
				success: true,
				message: data.message,
			};
		}

		return {
			success: false,
			message: data.message,
		};
	}

	exitStack() {
		this.stackId = null;
		this.stackName = "";
	}

	logout() {
		this.authenticated = false;
		this.username = "";
		this.stackId = null;
		this.stackName = "";
	}

	getStackId() {
		return this.stackId;
	}

	getStackName() {
		return this.stackName;
	}

	isAuthenticated() {
		return this.authenticated;
	}
}

export default new Auth();
