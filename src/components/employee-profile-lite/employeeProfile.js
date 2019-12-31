import React from "react";
import { withFirebase } from "../Firebase"
import {
    Card,
    CardHeader,
    ListGroup,
    ListGroupItem,
    Row,
    Col,
    Form,
    FormGroup,
    FormInput,
    FormSelect,
    FormTextarea,
    Button,
    CardBody,

} from "shards-react";

const INITIAL_STATE = {
    firstName: "",
    lastName: "",
    govId: "",
    street: "",
    state: "",
    city: "",
    zip: "",
    marrage_status: "0",
    spouseContact: "",
    spouseFirstName: "",
    spouseLastName: "",
    description: "",
    email: "",
    department: "",
    title: "",
    supervisor: "",
    workLocation: "",
    workPhone: "",
    salary: "",
    startDate: "",
    emergencyLastName: "",
    emergencyFirstName: "",
    EmergencyAddress: "",
    emergencyCity: "",
    emergencyState: "",
    emergencyZip: "",
    emergencyRelation: "",
    emergencyContact: ""
}



class UserAccountDetails extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            edit: false,
            ...this.props
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Col md="8">
                        <Card small className="mb-4">
                            <CardHeader className="border-bottom">
                                <h6 className="m-0">Personal Information</h6>
                            </CardHeader>
                            <ListGroup flush>
                                <ListGroupItem className="p-3">
                                    <Row>
                                        <Col>
                                            <Row>
                                                {/* First Name */}
                                                <Col md="6" className="form-group">
                                                    <label htmlFor="feFirstName">First Name</label>
                                                    <FormInput
                                                        id="feFirstName"
                                                        placeholder="First Name"
                                                        value={this.state.firstName}
                                                        name="firstName"
                                                        onChange={this.handleChange}
                                                        required
                                                    />
                                                </Col>
                                                {/* Last Name */}
                                                <Col md="6" className="form-group">
                                                    <label htmlFor="feLastName">Last Name</label>
                                                    <FormInput
                                                        id="feLastName"
                                                        placeholder="Last Name"
                                                        value={this.state.lastName}
                                                        name="lastName"
                                                        onChange={this.handleChange}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row form>
                                                {/* Email */}
                                                <Col md="6" className="form-group">
                                                    <label htmlFor="feEmail">Email</label>
                                                    <FormInput
                                                        type="email"
                                                        id="feEmail"
                                                        placeholder="Email Address"
                                                        onChange={this.handleChange}
                                                        autoComplete="email"
                                                        value={this.state.email}
                                                        name="email"
                                                    />
                                                </Col>
                                                {/* Gov't ID od SSN*/}
                                                <Col md="6" className="form-group">
                                                    <label htmlFor="feGovId">Password</label>
                                                    <FormInput
                                                        type="text"
                                                        id="feGovId"
                                                        placeholder="SSN or Goverment ID"
                                                        onChange={this.handleChange}
                                                        value={this.state.govId}
                                                        name="govId"
                                                    />
                                                </Col>
                                            </Row>
                                            {/* Address */}
                                            <FormGroup>
                                                <label htmlFor="feAddress">Street Name</label>
                                                <FormInput
                                                    id="feAddress"
                                                    placeholder="Street Name"
                                                    onChange={this.handleChange}
                                                    value={this.state.street}
                                                    name="street"
                                                />
                                            </FormGroup>
                                            <Row form>
                                                {/* City */}
                                                <Col md="6" className="form-group">
                                                    <label htmlFor="feCity">City</label>
                                                    <FormInput
                                                        id="feCity"
                                                        placeholder="City"
                                                        onChange={this.handleChange}
                                                        value={this.state.city}
                                                        name="city"
                                                    />
                                                </Col>
                                                {/* State */}
                                                <Col md="4" className="form-group">
                                                    <label htmlFor="feInputState">State</label>
                                                    <FormSelect id="feInputState"
                                                        value={this.state.state}
                                                        name="state"
                                                        onChange={this.handleChange}>
                                                        <option>Choose...</option>
                                                        <option>edrtgy</option>
                                                        <option>edrtgy</option>
                                                        <option>edrtgy</option>
                                                        <option>edrtgy</option>
                                                    </FormSelect>
                                                </Col>
                                                {/* Zip Code */}
                                                <Col md="2" className="form-group">
                                                    <label htmlFor="feZipCode">Zip</label>
                                                    <FormInput
                                                        id="feZipCode"
                                                        placeholder="Zip"
                                                        onChange={this.handleChange}
                                                        value={this.state.zip}
                                                        name="zip"
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                {/* Description */}
                                                <Col md="12" className="form-group">
                                                    <label htmlFor="feDescription">Description</label>
                                                    <FormTextarea
                                                        id="feDescription"
                                                        rows="5"
                                                        value={this.state.description}
                                                        name="description"
                                                        onChange={this.handleChange} />
                                                </Col>
                                            </Row>
                                            <Button theme="accent" type="submit">Save Information Locally</Button>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>

                    <Col md="4">
                        <Card small className="mb-4">
                            <CardHeader className="border-bottom">
                                <h6 className="m-0">Marrage Status</h6>
                            </CardHeader>
                            <CardBody>
                                <Row form>
                                    <Col lg="6">
                                        <div className="form-check">
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="marrage_status"
                                                    value="1"
                                                    onChange={this.handleChange}
                                                    className="form-check-input"
                                                />
                                                Married
                                            </label>
                                        </div>
                                    </Col>
                                    <Col lg="6">
                                        <div className="form-check">
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="marrage_status"
                                                    value="0"
                                                    onChange={this.handleChange}
                                                    className="form-check-input"
                                                />
                                                Unmarried
                                            </label>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>


                        {/* Only render state if it's true */}
                        {this.state.marrage_status === "0" || <Card small className="mb-4">
                            <CardHeader className="border-bottom">
                                <h6 className="m-0">Spouse's Details</h6>
                            </CardHeader>
                            <CardBody>
                                <FormGroup>
                                    <label htmlFor="feSpouseFirstName">First Name</label>
                                    <FormInput
                                        id="feSpouseFirstName"
                                        placeholder="First Name"
                                        onChange={this.handleChange}
                                        value={this.state.spouseName}
                                        name="spouseFirstName"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <label htmlFor="feSpouseNumber">Last Name</label>
                                    <FormInput
                                        id="feSpouseNumber"
                                        placeholder="Last Name"
                                        onChange={this.handleChange}
                                        value={this.state.spouseName}
                                        name="spouseLastName"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <label htmlFor="feSpouseContact">Number</label>
                                    <FormInput
                                        id="feSpouseContact"
                                        placeholder="Contact"
                                        onChange={this.handleChange}
                                        value={this.state.spouseContact}
                                        name="spouseContact"
                                    />
                                </FormGroup>
                            </CardBody>
                        </Card>}
                    </Col>

                    <Col lg="8">
                        <Card small className="mb-4">
                            <CardHeader className="border-bottom">
                                <h6 className="m-0">Job Description</h6>
                            </CardHeader>
                            <ListGroup flush>
                                <ListGroupItem className="p-3">
                                    <Row>
                                        <Col>
                                            <Row>

                                                <Col md="6" className="form-group">
                                                    <label htmlFor="feTitle">Title</label>
                                                    <FormInput
                                                        id="feTitle"
                                                        placeholder="Title"
                                                        value={this.state.title}
                                                        name="title"
                                                        onChange={this.handleChange} />
                                                </Col>

                                                <Col md="6" className="form-group">
                                                    <label htmlFor="feSupervisor">Supervisor</label>
                                                    <FormInput
                                                        id="feSupervisor"
                                                        placeholder="Supervisor"
                                                        value={this.state.supervisor}
                                                        name="supervisor"
                                                        onChange={this.handleChange} />
                                                </Col>
                                            </Row>
                                            <Row>

                                                <Col md="6" className="form-group">
                                                    <label htmlFor="feWorkLocation">Work Location</label>
                                                    <FormInput
                                                        type="text"
                                                        id="feWorkLocation"
                                                        placeholder="Work Location"
                                                        value={this.state.workLocation}
                                                        name="workLocation"
                                                        onChange={this.handleChange} />
                                                </Col>

                                                <Col md="6" className="form-group">
                                                    <label htmlFor="feWorkPhone">Work phone</label>
                                                    <FormInput
                                                        type="number"
                                                        id="feWorkPhone"
                                                        placeholder="Work Phone"
                                                        value={this.state.workPhone}
                                                        name="workPhone"
                                                        onChange={this.handleChange} />
                                                </Col>
                                            </Row>

                                            <Row>

                                                <Col md="6" className="form-group">
                                                    <label htmlFor="feStartDate">Start Date</label>
                                                    <FormInput
                                                        type="text"
                                                        id="feStartDate"
                                                        placeholder="Start Date"
                                                        value={this.state.startDate}
                                                        name="startDate"
                                                        onChange={this.handleChange} />
                                                </Col>

                                                <Col md="6" className="form-group">
                                                    <label htmlFor="feSalary">Salary</label>
                                                    <FormInput type="number" id="feSalary" placeholder="Salary" value={this.state.salary} name="salary" onChange={this.handleChange} />
                                                </Col>
                                            </Row>

                                            <Button theme="accent" type="submit">Save Information Locally</Button>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
                    <Col lg="4">
                        <Card small className="mb-4">
                            <CardHeader className="border-bottom">
                                <h6 className="m-0">Department</h6>
                            </CardHeader>
                            <CardBody>
                                <div className="form-group">
                                    <label htmlFor="feDepartment">Select from overflow</label>
                                    <select
                                        className="form-control"
                                        id="feDepartment"
                                        name="department"
                                        value={this.state.department}
                                        onChange={this.handleChange}>
                                        <option>Sales</option>
                                        <option>Marketing</option>
                                        <option>R and D</option>
                                        <option>Sales</option>
                                        <option>Marketing</option>
                                        <option>R and D</option>
                                        <option>Sales</option>
                                        <option>Marketing</option>
                                        <option>R and D</option>
                                    </select>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col lg="8">
                        <Card small className="mb-4">
                            <CardHeader className="border-bottom">
                                <h6 className="m-0">Emergency Contact Information</h6>
                            </CardHeader>
                            <ListGroup flush>
                                <ListGroupItem className="p-3">
                                    <Row>
                                        <Col>
                                            <Row>

                                                <Col md="6" className="form-group">
                                                    <label htmlFor="feEmergencyFirstName">First Name</label>
                                                    <FormInput id="feEmergencyFirstName" placeholder="First Name" value={this.state.emergencyFirstName} name="emergencyFirstName" onChange={this.handleChange} />
                                                </Col>

                                                <Col md="6" className="form-group">
                                                    <label htmlFor="feEmergencyLastName">Last Name</label>
                                                    <FormInput
                                                        id="feEmergencyLastName"
                                                        placeholder="Last Name"
                                                        value={this.state.emergencyLastName}
                                                        name="emergencyLastName"
                                                        onChange={this.handleChange} />
                                                </Col>
                                            </Row>

                                            <FormGroup>
                                                <label htmlFor="feEmergencyAddress">Address</label>
                                                <FormInput
                                                    id="feEmergencyAddress"
                                                    placeholder="Address"
                                                    onChange={this.handleChange}
                                                    value={this.state.EmergencyAddress}
                                                    name="EmergencyAddress" />
                                            </FormGroup>
                                            <Row>

                                                <Col md="6" className="form-group">
                                                    <label htmlFor="feEmergencyCity">City</label>
                                                    <FormInput
                                                        id="feEmergencyCity"
                                                        placeholder="City"
                                                        onChange={this.handleChange}
                                                        value={this.state.emergencyCity}
                                                        name="emergencyCity" />
                                                </Col>

                                                <Col md="4" className="form-group">
                                                    <label htmlFor="feEmergencyState">State</label>
                                                    <FormSelect
                                                        id="feEmergencyState"
                                                        value={this.state.emergencyState}
                                                        name="emergencyState"
                                                        onChange={this.handleChange}>
                                                        <option>Choose...</option>
                                                        <option>edrtgy</option>
                                                        <option>edrtgy</option>
                                                        <option>edrtgy</option>
                                                        <option>edrtgy</option>
                                                    </FormSelect>
                                                </Col>

                                                <Col md="2" className="form-group">
                                                    <label htmlFor="feEmergencyZipCode">Zip</label>
                                                    <FormInput id="feEmergencyZipCode"
                                                        placeholder="Zip"
                                                        onChange={this.handleChange}
                                                        value={this.state.emergencyZip}
                                                        name="emergencyZip" />
                                                </Col>
                                            </Row>
                                            <Row>

                                                <Col md="6" className="form-group">
                                                    <label htmlFor="feEmergencyRelation">Relationship</label>
                                                    <FormInput
                                                        type="text"
                                                        id="feEmergencyRelationship"
                                                        placeholder="Relationship"
                                                        value={this.state.emergencyRelation}
                                                        name="emergencyRelation"
                                                        onChange={this.handleChange} />
                                                </Col>

                                                <Col md="6" className="form-group">
                                                    <label htmlFor="feEmergencyNumber">Phone Number</label>
                                                    <FormInput
                                                        type="number"
                                                        id="feEmergencyNumber"
                                                        placeholder="Number"
                                                        value={this.state.emergencyNumber}
                                                        name="emergencyContact"
                                                        onChange={this.handleChange} />
                                                </Col>
                                            </Row>
                                            <Button theme="accent" type="submit">Submit</Button>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default withFirebase(UserAccountDetails);
