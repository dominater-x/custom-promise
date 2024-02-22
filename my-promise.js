class CustomPromise {
	constructor(executionFunction) {
		this.errorHandler = () => { };
		this.callbackLists = [];
		executionFunction(this.resolve, this.reject);
	}

	then(callbackFn) {
		this.callbackLists.push(callbackFn);
		return this;
	}

	catch(errorHandler) {
		this.errorHandler = errorHandler;
	}

	resolve = (data) => {
		let storeLastHandlerReturn;
		this.callbackLists.forEach(handlerMethod => {
			storeLastHandlerReturn = handlerMethod(data);
		})
		return storeLastHandlerReturn;
	}

	reject = (err) => {
		this.errorHandler(err);
		this.callbackLists = [];
	}
}

function fakeNetworkRequest(url) {
	const random = (parseInt(Math.random() * 10)) % 2;

	return { status: random ? 200 : 400, name: 'unknown', hobby: 'football' }
}

function fakeApiCall(url) {

	return new CustomPromise((accept, reject) => {
		setTimeout(() => {
			const response = fakeNetworkRequest(url);

			if (response.status === 200)
				accept(response);
			else reject({ error: 'fake internal server error' })
		}, 5000)
	})
}

const value = fakeApiCall('https://fakeurl.com/api').then((data) => {
	console.log("data", data)
	console.log("i am 1st");
}).then((data) => {
	console.log("data", data)
	console.log("i am 2st");
	return data;
}).then((data) => {
	console.log("data", data)
	console.log("i am 3st");
	return data;
}).then((data) => {
	console.log("data", data)
	console.log("i am 4st");
	return data;
}).then((data) => {
	console.log("data", data)
	console.log("i am 5st");
	return data;
}).catch(err => {
	console.log(err);
})
