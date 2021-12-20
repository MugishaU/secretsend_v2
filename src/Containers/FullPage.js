import React from "react"
import { useState } from "react"
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import CloseButton from "react-bootstrap/CloseButton"
import Row from "react-bootstrap/Row"
import Alert from "react-bootstrap/Alert"
import Spinner from "react-bootstrap/Spinner"
import PostRequest from "../Utils/PostRequest"

export default function FullPage() {
	const [mainUserName, setMainUserName] = useState()
	const [mainUserEmail, setMainUserEmail] = useState()
	const [emailSubject, setEmailSubject] = useState()
	const [emailTitle, setEmailTitle] = useState()
	const [emailMessage, setEmailMessage] = useState()
	const [sendCopy, setSendCopy] = useState(false)

	const [mainUserDetailSave, setMainUserDetailSave] = useState(false)
	const [emailDetailSave, setEmailDetailSave] = useState(false)

	const [recipientName, setRecipientName] = useState("")
	const [recipientEmail, setRecipientEmail] = useState("")
	const [recipients, setRecipients] = useState([])

	const [error, setError] = useState("")
	const [success, setSuccess] = useState(false)
	const [loading, setLoading] = useState(false)
	const [disabled, setDisabled] = useState(false)

	const compileBody = () => {
		const body = {
			mainUser: { name: mainUserName, email: mainUserEmail },
			recipients: recipients,
			sendReport: sendCopy,
		}

		if (emailSubject) {
			body.customSubject = emailSubject
		}

		if (emailTitle) {
			body.customTitle = emailTitle
		}

		if (emailMessage) {
			body.customMessage = emailMessage
		}

		return body
	}

	return (
		<>
			<Navbar bg="light">
				<Container>
					<Navbar.Brand className="header">SecretSend</Navbar.Brand>
				</Container>
			</Navbar>
			<Container>
				<br />
				<h1 className="header">Let's send some emails</h1>

				<Card>
					<Card.Body>
						<Card.Title>About You</Card.Title>
						<Card.Subtitle className="mb-2 text-muted">
							Tell us who you are, and how you want your email to look
						</Card.Subtitle>

						<Card>
							<Card.Body>
								<Card.Title>Your Details</Card.Title>
								<Form
									onSubmit={(e) => {
										e.preventDefault()

										if (
											recipients.filter((item) => item.email === mainUserEmail)
												.length > 0
										) {
											alert("This email has already been used")
										} else {
											setMainUserDetailSave(true)
										}
									}}
								>
									<Form.Floating className="mb-3 text-muted">
										<Form.Control
											required
											id="floatingNameMain"
											type="text"
											placeholder="Enter Your Name"
											onChange={(e) => {
												setMainUserName(e.target.value)
												setMainUserDetailSave(false)
												setDisabled(false)
												setSuccess(false)
											}}
										/>
										<label htmlFor="floatingNameMain">Name</label>
									</Form.Floating>

									<Form.Floating className="mb-3 text-muted">
										<Form.Control
											required
											id="floatingEmailMain"
											type="email"
											placeholder="Enter Email Address"
											onChange={(e) => {
												setMainUserEmail(e.target.value)
												setMainUserDetailSave(false)
												setDisabled(false)
												setSuccess(false)
											}}
										/>
										<label htmlFor="floatingEmailMain">Email address</label>
										<Form.Text className="text-muted">
											We'll never share your email with anyone else.
										</Form.Text>
									</Form.Floating>

									<Form.Group className="mb-3" controlId="formBasicCheckbox">
										<Form.Check
											onClick={() => {
												setSendCopy(!sendCopy)
												setMainUserDetailSave(false)
											}}
											type="checkbox"
											label="Send me a copy of the results"
										/>
										<Form.Text className="text-muted">
											In case anyone loses their email 🤦🏿‍♂️
										</Form.Text>
									</Form.Group>

									<Button
										disabled={mainUserDetailSave}
										variant={mainUserDetailSave ? "success" : "primary"}
										type="submit"
									>
										{!mainUserDetailSave ? "Save" : "Saved"}
									</Button>
								</Form>
							</Card.Body>
						</Card>

						<br />

						<Card>
							<Card.Body>
								<Card.Title>Your Email</Card.Title>
								<Card.Subtitle className="mb-2 text-muted">
									Some optional extras to really personalise your email!
								</Card.Subtitle>
								<Card.Subtitle className="mb-2 text-muted">
									If you don't want any just press "Save".
								</Card.Subtitle>

								<Form
									onSubmit={(e) => {
										e.preventDefault()
										setEmailDetailSave(true)
									}}
								>
									<Form.Floating className="mb-3 text-muted">
										<Form.Control
											id="floatingSubjectMain"
											type="text"
											placeholder="Enter Your Email Subject"
											onChange={(e) => {
												setEmailSubject(e.target.value)
												setEmailDetailSave(false)
												setSuccess(false)
											}}
										/>
										<label htmlFor="floatingSubjectMain">Subject</label>
									</Form.Floating>

									<Form.Floating className="mb-3 text-muted">
										<Form.Control
											id="floatingTitleMain"
											type="text"
											placeholder="Enter Your Email Title"
											onChange={(e) => {
												setEmailTitle(e.target.value)
												setEmailDetailSave(false)
												setDisabled(false)
												setSuccess(false)
											}}
										/>
										<label htmlFor="floatingTitleMain">Title</label>
									</Form.Floating>

									<Form.Floating className="mb-3 text-muted">
										<Form.Control
											id="floatingTitleMain"
											type="textarea"
											placeholder="Enter Your Email Message"
											onChange={(e) => {
												setEmailMessage(e.target.value)
												setEmailDetailSave(false)
												setDisabled(false)
												setSuccess(false)
											}}
										/>
										<label htmlFor="floatingTitleMain">Message</label>
									</Form.Floating>

									<Button
										disabled={emailDetailSave}
										variant={emailDetailSave ? "success" : "primary"}
										type="submit"
									>
										{!emailDetailSave ? "Save" : "Saved"}
									</Button>
								</Form>
							</Card.Body>
						</Card>
					</Card.Body>
				</Card>
				<br />
				<Card>
					<Card.Body>
						<Card>
							<Card.Body>
								<Card.Title>Add Recipient</Card.Title>
								<Card.Subtitle className="mb-3 text-muted">
									(Max 20)
								</Card.Subtitle>
								<Form
									onSubmit={(e) => {
										e.preventDefault()

										if (
											recipients.filter((item) => item.email === recipientEmail)
												.length > 0 ||
											recipientEmail === mainUserEmail
										) {
											alert("This email has already been used")
										} else {
											setRecipients((prevState) => [
												...prevState,
												{
													name: recipientName,
													email: recipientEmail,
												},
											])
											setRecipientName("")
										}
										setRecipientEmail("")
									}}
								>
									<Form.Floating className="mb-3 text-muted">
										<Form.Control
											required
											value={recipientName}
											id="floatingNameMain"
											type="text"
											placeholder="Enter Your Name"
											onChange={(e) => {
												setRecipientName(e.target.value)
												setDisabled(false)
												setSuccess(false)
											}}
										/>
										<label htmlFor="floatingNameMain">Name</label>
									</Form.Floating>

									<Form.Floating className="mb-3 text-muted">
										<Form.Control
											required
											value={recipientEmail}
											id="floatingEmailMain"
											type="email"
											placeholder="Enter Email Address"
											onChange={(e) => {
												setRecipientEmail(e.target.value)
												setDisabled(false)
												setSuccess(false)
											}}
										/>
										<label htmlFor="floatingEmailMain">Email address</label>
										<Form.Text className="text-muted">
											We'll never share your email with anyone else.
										</Form.Text>
									</Form.Floating>

									<Button
										variant="primary"
										type="submit"
										disabled={recipients.length > 19}
									>
										Add Recipient
									</Button>
								</Form>
							</Card.Body>
						</Card>
						<br />

						<Card>
							<Card.Body>
								<Card.Title>Recipients</Card.Title>

								<ListGroup>
									{Object.keys(recipients).length > 0 ? (
										Object.values(recipients).map((item, idx) => (
											<ListGroup.Item key={idx}>
												<Container>
													<Row>
														{item.name}, {item.email}
														<CloseButton
															onClick={() => {
																setRecipients(
																	recipients.filter(
																		(recipient) =>
																			recipient.email !== item.email
																	)
																)
															}}
														/>
													</Row>
												</Container>
											</ListGroup.Item>
										))
									) : (
										<ListGroup.Item>None Yet</ListGroup.Item>
									)}
								</ListGroup>
							</Card.Body>
						</Card>
					</Card.Body>
				</Card>
				<br />
				{mainUserDetailSave &&
					emailDetailSave &&
					recipients.length > 0 &&
					!error && (
						<Button
							size="lg"
							variant="success"
							disabled={disabled}
							onClick={() => {
								setLoading(true)
								setDisabled(true)
								const body = compileBody()
								PostRequest(body).then((response) => {
									if (response.errors.length > 0) {
										setError(response)
										setDisabled(false)
									} else {
										setSuccess(true)
									}
									setLoading(false)
								})
							}}
						>
							{loading && (
								<Spinner
									as="span"
									animation="border"
									role="status"
									aria-hidden="true"
								/>
							)}
							{!loading && !success && "Send Emails!"}
							{!loading && success && "Sent"}
						</Button>
					)}
			</Container>
			{error && (
				<Alert
					className="w-75 m-auto"
					variant="danger"
					onClose={() => setError("")}
					dismissible
				>
					<Alert.Heading>Oh snap! You got an error!</Alert.Heading>
					<p>{error.message}</p>
					<hr />
					<ul>
						{error.errors
							.filter((x) => x !== 202)
							.map((item, idx) => (
								<li key={idx}>{item.error}</li>
							))}
					</ul>
				</Alert>
			)}
			<br />
		</>
	)
}
