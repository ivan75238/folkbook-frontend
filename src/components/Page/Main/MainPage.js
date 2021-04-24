import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {Page} from "components/CommonStyledComponents";
import NewBooks from "components/Page/Main/NewBooks";
import UserBooks from "components/Page/Main/UserBooks";

@connect(() => ({}))
class MainPage extends PureComponent {
    render() {
        const {history} = this.props;
        return (
            <Page>
                <NewBooks />
                <UserBooks history={history}/>
            </Page>
        )
    }
}

MainPage.propTypes = {
    dispatch: PropTypes.func,
    history: PropTypes.func,
};

export default MainPage;
