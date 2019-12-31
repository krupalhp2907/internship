import React from "react";
import PropTypes from "prop-types";
import {
    Card,
    CardHeader,
    FormRadio,
    ListGroup,
    ListGroupItem,
    Col
} from "shards-react";

const UserDetails = ({ userDetails }) => (
    <Card small className="mb-4 pt-3">
        <CardHeader className="border-bottom text-center">
            <h4 className="mb-0">{userDetails.name}</h4>
        </CardHeader>
        <ListGroup flush>
            <ListGroupItem className="p-4">
                <strong className="text-muted d-block mb-2">
                    {userDetails.metaTitle}
                </strong>
                <strong className="text-muted d-block mb-2">Radio Buttons</strong>
                <fieldset>
                    <FormRadio>Default</FormRadio>
                    <FormRadio defaultChecked>Checked</FormRadio>
                    <FormRadio disabled>Disabled</FormRadio>
                    <FormRadio disabled defaultChecked>
                        Disabled Checked
      </FormRadio>
                </fieldset>

            </ListGroupItem>
        </ListGroup>
    </Card>
);

UserDetails.propTypes = {
    /**
     * The user details object.
     */
    userDetails: PropTypes.object
};

UserDetails.defaultProps = {
    userDetails: {
        name: "Sierra Brooks",
        avatar: require("./../../images/avatars/0.jpg"),
        jobTitle: "Project Manager",
        performanceReportTitle: "Workload",
        performanceReportValue: 74,
        metaTitle: "Description",
        metaValue:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?"
    }
};

export default UserDetails;
