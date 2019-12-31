import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import { withFirebase } from "../components/Firebase"
import PageTitle from "../components/common/PageTitle";

const defaultProps = {
  data: [
    {
      title: "On_board",
      heading: ["Name", "Surname", "address", "EmpId"],
      dataSets: [
        ["eer", "efaerf", "WEF", "ewfwe", "wefew"],
        ["eer", "efaerf", "WEF", "ewfwe", "wefew"],
        ["eer", "efaerf", "WEF", "ewfwe", "wefew"],
        ["eer", "efaerf", "WEF", "ewfwe", "wefew"],
        ["eer", "efaerf", "WEF", "ewfwe", "wefew"],
        ["eer", "efaerf", "WEF", "ewfwe", "wefew"],
        ["eer", "efaerf", "WEF", "ewfwe", "wefew"],
        ["eer", "efaerf", "WEF", "ewfwe", "wefew"]
      ]
    },
    {
      title: "On_board",
      heading: ["Name", "Surname", "address", "EmpId"],
      dataSets: [
        ["eer", "efaerf", "WEF", "ewfwe", "wefew"],
        ["eer", "efaerf", "WEF", "ewfwe", "wefew"],
        ["eer", "efaerf", "WEF", "ewfwe", "wefew"],
        ["eer", "efaerf", "WEF", "ewfwe", "wefew"],
        ["eer", "efaerf", "WEF", "ewfwe", "wefew"],
        ["eer", "efaerf", "WEF", "ewfwe", "wefew"],
        ["eer", "efaerf", "WEF", "ewfwe", "wefew"],
        ["eer", "efaerf", "WEF", "ewfwe", "wefew"]
      ]
    }
  ]
}

class Tables extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  UNSAFE_componentWillMount() {
    const firebase = this.props.firebase
    firebase.getEmployees().then(snapshot => {
      if (snapshot.empty) {
        alert("U have no employee")
      } else {
        var headings = ["name", "email", "supervisor", "title", "street"]
        var departments = {}
        snapshot.forEach(doc => {
          var employee_id = doc.id
          var { department, email, firstName, lastName, street, supervisor, title } = doc.data()
          if (!(department in departments) && department !== "") {
            departments[department] = {
              headings,
              infos: [`${firstName} ${lastName}`, email, supervisor, title, street]
            }
          } else {
            departments[department]["infos"].push([`${firstName} ${lastName}`, email, supervisor, title, street])
          }
        });
        var data = []
        var dep_array = Object.keys(departments)
        console.log(dep_array, departments)
        for (var i = 0; i < dep_array.length; i++) {
          data.push({
            title: dep_array[i],
            headings,
            dataSets: departments[dep_array[i]]["infos"]
          })
        }
        this.setState({ data })
      }
    }).catch(err => {
      console.log("Some error occoured", err.message)
    })
  }

  render() {
    console.log(this.state.data)
    var tableHTML = this.state.data.map((doc, idx) => {
      console.log("Datasets.docvrvtrvtwtretybytbtyebytb", doc)
      return (
        <Row key={idx}>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">{doc.title}</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        #
                      </th>
                      {doc.headings.map((heading, indx) => {
                        return (
                          <th scope="col" className="border-0" key={indx}>
                            {heading}
                          </th>
                        )
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      {doc.dataSets.map((body, index) => {
                        console.log("Body us here ", body)
                        return (

                          <td>{body}</td>

                        )
                      })}
                    </tr>
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )
    })
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Employees" subtitle="employees of company" className="text-sm-left" />
        </Row>
        {tableHTML}
        {/* Default Light Table */}
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Sales department</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        #
                  </th>
                      <th scope="col" className="border-0">
                        First Name
                  </th>
                      <th scope="col" className="border-0">
                        Last Name
                  </th>
                      <th scope="col" className="border-0">
                        Country
                  </th>
                      <th scope="col" className="border-0">
                        City
                  </th>
                      <th scope="col" className="border-0">
                        Phone
                  </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Ali</td>
                      <td>Kerry</td>
                      <td>Russian Federation</td>
                      <td>Gdańsk</td>
                      <td>107-0339</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Clark</td>
                      <td>Angela</td>
                      <td>Estonia</td>
                      <td>Borghetto di Vara</td>
                      <td>1-660-850-1647</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Jerry</td>
                      <td>Nathan</td>
                      <td>Cyprus</td>
                      <td>Braunau am Inn</td>
                      <td>214-4225</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Colt</td>
                      <td>Angela</td>
                      <td>Liberia</td>
                      <td>Bad Hersfeld</td>
                      <td>1-848-473-7416</td>
                    </tr>
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Default Dark Table */}
        <Row>
          <Col>
            <Card small className="mb-4 overflow-hidden">
              <CardHeader className="bg-dark">
                <h6 className="m-0 text-white">Board Of Directors</h6>
              </CardHeader>
              <CardBody className="bg-dark p-0 pb-3">
                <table className="table table-dark mb-0">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col" className="border-0">
                        #
                  </th>
                      <th scope="col" className="border-0">
                        First Name
                  </th>
                      <th scope="col" className="border-0">
                        Last Name
                  </th>
                      <th scope="col" className="border-0">
                        Country
                  </th>
                      <th scope="col" className="border-0">
                        City
                  </th>
                      <th scope="col" className="border-0">
                        Phone
                  </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Ali</td>
                      <td>Kerry</td>
                      <td>Russian Federation</td>
                      <td>Gdańsk</td>
                      <td>107-0339</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Clark</td>
                      <td>Angela</td>
                      <td>Estonia</td>
                      <td>Borghetto di Vara</td>
                      <td>1-660-850-1647</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Jerry</td>
                      <td>Nathan</td>
                      <td>Cyprus</td>
                      <td>Braunau am Inn</td>
                      <td>214-4225</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Colt</td>
                      <td>Angela</td>
                      <td>Liberia</td>
                      <td>Bad Hersfeld</td>
                      <td>1-848-473-7416</td>
                    </tr>
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default withFirebase(Tables);
