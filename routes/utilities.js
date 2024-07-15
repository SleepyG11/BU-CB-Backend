export class RouterError extends Error {
	constructor(message, { status = 500, statusText = 'Internal Server Error', cause } = {}) {
		super(message);
		this.success = false;
		this.status = status;
		this.statusText = statusText;
		this.message = message;
		if (cause) this.cause = cause;
	}
	toJSON() {
		return {
			success: this.success,
			status: this.status,
			statusText: this.statusText,
			message: this.message,
		};
	}
}

export class RouterResponse {
	constructor(data, { status = 200, statusText = 'OK' } = {}) {
		this.success = true;
		this.status = status;
		this.statusText = statusText;
		this.data = data;
	}
}
