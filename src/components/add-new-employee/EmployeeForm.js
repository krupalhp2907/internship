import React from "react";
import { withFirebase } from "../Firebase"
import "./styles.css"
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
    Alert,
    Container
} from "shards-react";
import { firestore } from "firebase";

const INITIAL_STATE = {
    firstName: "",
    lastName: "",
    // govId: "",
    street: "",
    // state: "",
    // city: "",
    // zip: "",
    // marrage_status: "0",
    // spouseContact: "",
    // spouseFirstName: "",
    // spouseLastName: "",
    description: "",
    email: "",
    department: "",
    title: "",
    supervisor: "",
    // workLocation: "",
    workPhone: "",
    salary: "",
    startDate: "",
    // emergencyLastName: "",
    // emergencyFirstName: "",
    // EmergencyAddress: "",
    // emergencyCity: "",
    // emergencyState: "",
    // emergencyZip: "",
    // emergencyRelation: "",
    // emergencyContact: "",
    rfid: ""
}

class UserAccountDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            notification: "",
            ...INITIAL_STATE
        }
        this.handleRfidClick = this.handleRfidClick.bind(this)
    }

    UNSAFE_componentWillMount() {

        console.log("Dwergty")
        this.props.firebase.getTempRfidRef().doc("store_rfid_temp_id").onSnapshot((snapshot, changes) => {
            if (!snapshot.empty) {
                var data = snapshot.data()
                if (data.rfid_request === false && data.rfid !== "request pending" && data.last_edited !== "client") {
                    // alert("There is some change in document and that is rfid entered")

                    this.setState({
                        rfid: String(data.rfid._binaryString)
                    })

                    this.props.firebase.getTempRfidRef().doc("store_rfid_temp_id").set({
                        "init_time": new Date(),
                        "rfid": String("no thing to worry about"),
                        "rfid_request": false,
                        "last_edited": "client"
                    })
                }
            }
        })
    }



    handleRfidClick = () => {
        console.log("yeksdbferjkt", this.props.firebase)
        this.props.firebase.getTempRfidRef().doc("store_rfid_temp_id").set({
            "init_time": new Date(),
            "rfid": String("request pending"),
            "rfid_request": true,
            "last_edited": "client"
        }).then(success => {
            this.setState({
                rfid: "The first rfid scanned would be assigned to this employee"
            })
        }).catch(err => {
            alert("Please check ur internet connection")
        })
        this.setState({
            rfid: ""
        })
        // this.props.firebase.getTempRfidRef().doc("store_rfid_temp_id").onSnapshot
    }

    handleSubmit = (e) => {
        e.preventDefault()
        var firebase = this.props.firebase
        firebase.saveNewEmployee(this.state)

    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <React.Fragment>
                <Container fluid className="px-0 noti">
                    <Alert className="mb-0">
                        <i className="fa fa-info mx-2"></i> an see below. Pretty cool, huh?
                    </Alert>
                </Container>
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
                                                    <Col className="form-group">
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
                                                    {/* <Col md="6" className="form-group">
                                                    <label htmlFor="feGovId">P</label>
                                                    <FormInput
                                                        type="text"
                                                        id="feGovId"
                                                        placeholder="SSN or Goverment ID"
                                                        onChange={this.handleChange}
                                                        value={this.state.govId}
                                                        name="govId"
                                                    />
                                                </Col> */}
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
                                                {/* <Row form>
                                                City
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
                                                State
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
                                                Zip Code
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
                                            </Row> */}
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

                        {/* <Col md="4">
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
                    </Col> */}

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

                                                    {/* <Col md="6" className="form-group">
                                                    <label htmlFor="feWorkLocation">Work Location</label>
                                                    <FormInput
                                                        type="text"
                                                        id="feWorkLocation"
                                                        placeholder="Work Location"
                                                        value={this.state.workLocation}
                                                        name="workLocation"
                                                        onChange={this.handleChange} />
                                                </Col> */}

                                                    <Col md="12" className="form-group">
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
                                                            type="date"
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

                                                <Row>
                                                    <Col md="8" className="form-group">
                                                        <label htmlFor="#ferfid">Rfid</label>
                                                        <FormInput
                                                            type="text"
                                                            id="ferfid"
                                                            placeholder="Press Button to scan rfid"
                                                            // value={this.state.startDate}
                                                            name="rfid"
                                                            onChange={this.handleChange}
                                                            value={this.state.rfid}
                                                        />

                                                        <Col md="4" className="form-group">
                                                            <label htmlFor="#febttb_rfid" >Rfid</label>
                                                            <Button theme="accent" type="button" id="febttb_rfid" onClick={this.handleRfidClick}>Scan RFID</Button>
                                                        </Col>
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
                                            <option>Production</option>
                                            <option>Purchasing</option>
                                            <option>Accounting and Finance</option>
                                        </select>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                        {/* <Col lg="8">
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
                                                    <lab el htmlFor="feEmergencyFirstName">First Name</label>
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
<Row>
        <Container>
               
        </Container>
</Row>
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
                    </Col> */}
                    </Row>
                </Form >
            </React.Fragment>

        )
    }
}

export default withFirebase(UserAccountDetails);



