export default function PostRequest(body) {
	const region = "eu-west-1"
	const domain = "https://p3h7zn74oj.execute-api.eu-west-2.amazonaws.com" // e.g. search-domain.region.es.amazonaws.com

	// Create the HTTP request
	const request = {
		body: JSON.stringify(body),
		headers: {
			"Content-Type": "application/json",
			host: domain,
		},
		hostname: domain,
		method: "POST",
		path: "/email",
	}

	// Send the request

	return process.env.REACT_APP_AWS_REGION
}
