import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, InputGroup } from "shards-react";

import PageTitle from "./../components/common/PageTitle";
import SmallStats from "./../components/common/SmallStats";
import UsersOverview from "./../components/blog/UsersOverview";
import UsersByDevice from "./../components/blog/UsersByDevice";
import NewDraft from "./../components/blog/NewDraft";
import Discussions from "./../components/blog/Discussions";
import TopReferrals from "./../components/common/TopReferrals";
import { withFirebase } from "../components/Firebase"
import { Store } from "../flux"


class BlogOverview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      smallStats: [],
      isLoading: false
    }
  }

  handleClick = (e) => {
    alert("im clicked")
  }

  async componentDidMount() {
    // 24-hour bases system
    const companyStartingTime = 8
    const firebase = this.props.firebase
    const data_sampling = 7
    var chartLabels = new Array(data_sampling)
    var d = new Date()
    const initial = new Date(d.setDate(d.getDate() - 7))
    chartLabels.fill(null)

    firebase.getAttendenceRef().onSnapshot((snapshot) => {

      if (snapshot.empty) {
        alert("U have no employees or seems like no one scanned yet")
      } else {
        var on_board_data = new Array(data_sampling),
          early_arrival_data = new Array(data_sampling),
          visitors_data = new Array(data_sampling),
          total_working_seconds_data = new Array(data_sampling),
          off_board_data = new Array(data_sampling),
          on_board = 0,
          early_arrival = 0,
          visitors = 0,
          total_working_seconds = 0,
          off_board = 0

        on_board_data.fill(0)
        early_arrival_data.fill(0)
        visitors_data.fill(0)
        total_working_seconds_data.fill(0)
        off_board_data.fill(0)

        snapshot.forEach(doc => {
          var doc_id = doc.id, employees_attn_detials = doc.data()
          var attendences = employees_attn_detials.attendences;
          var todaysDateRef = firebase.getDate()

          console.log(attendences[todaysDateRef], todaysDateRef)

          // Sorry all the calculations are performend on this level
          // u can change this to compoenent level
          // I did this as dashboard is more likely to change
          // So it becomes easy for developers to edit as
          // whole logic is in this file

          // console.log(firebase.countTotalSeconds(attendences["2019-12-18"]))

          // down below is past datasets
          var i = 0
          while (i < data_sampling) {
            var date = new Date()
            var ithDayReference = new Date(date.setDate(date.getDate() - i))
            var ithDayReference_store_format = firebase.getDate(ithDayReference)
            // console.log(firebase.getDate(ithDayReference), ithDayReference)
            if (firebase.checkIsPresent(attendences, ithDayReference)) {
              on_board_data[data_sampling - i - 1] += 1
              if (firebase.checkEarlyArrival(attendences, companyStartingTime, ithDayReference)) {
                early_arrival_data[data_sampling - i - 1] += 1
              }
              total_working_seconds_data[data_sampling - i - 1] += firebase.countTotalSeconds(attendences[ithDayReference_store_format])
            } else {
              off_board_data[data_sampling - i - 1] += 1
            }

            i += 1
          }
        });
        console.log("early_arrival_data", early_arrival_data, "on_board_data", on_board_data, "total_working_seconds_data", total_working_seconds_data, "off_board_data", off_board_data)
        var last_index = data_sampling - 1
        on_board = on_board_data[last_index]
        off_board = off_board_data[last_index]
        total_working_seconds = total_working_seconds_data[last_index]
        early_arrival = early_arrival_data[last_index]
        visitors = visitors_data[last_index]
        // console.log("early_arrival", early_arrival, "on_board", on_board, "total_working_seconds", total_working_seconds, "off_board", off_board)
        // Ps :- Don't know any efficient way to do this
        // Help if u know

        var newSmallStats = [
          {
            label: "came",
            value: on_board,
            percentage: "4.7%",
            increase: true,
            chartLabels,
            attrs: { md: "6", sm: "6" },
            datasets: [
              {
                label: "Today",
                fill: "start",
                borderWidth: 1.5,
                backgroundColor: "rgba(0, 184, 216, 0.1)",
                borderColor: "rgb(0, 184, 216)",
                data: on_board_data
              }
            ]
          },
          {
            label: "early arrival",
            value: early_arrival,
            percentage: "12.4",
            increase: true,
            chartLabels,
            attrs: { md: "6", sm: "6" },
            datasets: [
              {
                label: "Today",
                fill: "start",
                borderWidth: 1.5,
                backgroundColor: "rgba(23,198,113,0.1)",
                borderColor: "rgb(23,198,113)",
                data: early_arrival_data
              }
            ]
          },
          {
            label: "on board",
            value: visitors,
            percentage: "3.8%",
            increase: false,
            decrease: true,
            chartLabels,
            attrs: { md: "4", sm: "6" },
            datasets: [
              {
                label: "Today",
                fill: "start",
                borderWidth: 1.5,
                backgroundColor: "rgba(255,180,0,0.1)",
                borderColor: "rgb(255,180,0)",
                data: visitors_data
              }
            ]
          },
          {
            label: "working hours",
            value: firebase.secondsToHours(total_working_seconds),
            percentage: "2.71%",
            increase: false,
            decrease: true,
            chartLabels,
            attrs: { md: "4", sm: "6" },
            datasets: [
              {
                label: "Today",
                fill: "start",
                borderWidth: 1.5,
                backgroundColor: "rgba(255,65,105,0.1)",
                borderColor: "rgb(255,65,105)",
                data: total_working_seconds_data
              }
            ]
          },
          {
            label: "off board",
            value: off_board,
            percentage: "2.4%",
            increase: false,
            decrease: true,
            chartLabels,
            attrs: { md: "4", sm: "6" },
            datasets: [
              {
                label: "Today",
                fill: "start",
                borderWidth: 1.5,
                backgroundColor: "rgb(0,123,255,0.1)",
                borderColor: "rgb(0,123,255)",
                data: off_board_data
              }
            ]
          }
        ]

        // console.log(newSmallStats)
        this.setState({
          smallStats: newSmallStats
        })
      }
    })
  }

  render() {
    console.log("Sates ", this.state.smallStats)
    var handleSmallStatsClick = this.handleClick
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle title="Attendence Overview" subtitle="Dashboard" className="text-sm-left mb-3" />
        </Row>

        <Row>
          {this.state.smallStats.map(function (stats, idx) {
            console.log(stats)
            return (
              <Col className="col-lg mb-4" key={idx} {...stats.attrs} onClick={e => alert("dwefefae")}>
                <SmallStats
                  id={`small-stats-${idx}`}
                  variation="1"
                  chartData={stats.datasets}
                  chartLabels={stats.chartLabels}
                  label={stats.label}
                  value={stats.value}
                  percentage={stats.percentage}
                  increase={stats.increase}
                  decrease={stats.decrease}
                />
              </Col>
            )
          })}
        </Row>

        <Row>
          {/* Users Overview */}
          <Col lg="8" md="12" sm="12" className="mb-4">
            <UsersOverview title="Attendence Overview" />
          </Col>

          {/* Users by Device */}
          <Col lg="4" md="6" sm="12" className="mb-4">
            <UsersByDevice />
          </Col>

          {/* New Draft */}
          <Col lg="4" md="6" sm="12" className="mb-4">
            <NewDraft />
          </Col>

          {/* Discussions */}
          <Col lg="5" md="12" sm="12" className="mb-4">
            <Discussions />
          </Col>

          {/* Top Referrals */}
          <Col lg="3" md="12" sm="12" className="mb-4">
            <TopReferrals />
          </Col>


        </Row>
      </Container>
    )
  }
}

// BlogOverview.propTypes = {
//   /**
//    * The small stats dataset.
//    */
//   smallStats: PropTypes.array
// };





export default withFirebase(BlogOverview);
