import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {Page} from "components/CommonStyledComponents";
import NewBooks from "components/Page/Main/NewBooks";
import UserBooks from "components/Page/Main/UserBooks";

@connect(() => ({}))
class MainPage extends PureComponent {
    render() {
        return (
            <Page>
                <NewBooks />
                <UserBooks />
            </Page>
        )
    }
}

MainPage.propTypes = {
    dispatch: PropTypes.func,
};

export default MainPage;
