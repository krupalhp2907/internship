import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import EmployeeDepartment from "../components/add-new-employee/EmployeeDepartment";
import EmployeeForm from "../components/add-new-employee/EmployeeForm";

const UserProfileLite = () => (
    <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
            <PageTitle title="Add New Employee" subtitle="Fill This form for new employee" md="12" className="ml-sm-auto mr-sm-auto" />
        </Row>
        <Row>
            <Col>
                <EmployeeForm />
            </Col>
        </Row>
    </Container>
);

export default UserProfileLite;



