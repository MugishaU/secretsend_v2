export default async function PostRequest(body) {
	const url = "https://p3h7zn74oj.execute-api.eu-west-2.amazonaws.com/email"

	const request = {
		body: JSON.stringify(body),
		headers: {
			"Content-Type": "application/json",
		},
		method: "POST",
	}

	const promise = await fetch(url, request)
	const response = await promise.json()

	return response
}
