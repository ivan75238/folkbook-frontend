import React, {PureComponent} from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {Page} from "components/CommonStyledComponents";
import LikedBooks from "components/Page/MyBooks/components/LikedBooks";
import UserBooks from "components/Page/MyBooks/components/UserBooks";

@connect(() => ({}))
class MyBooks extends PureComponent {
    render() {
        return (
            <Page>
                <UserBooks />
                <LikedBooks />
            </Page>
        )
    }
}

MyBooks.propTypes = {
    dispatch: PropTypes.func,
    history: PropTypes.func,
    liked_books: PropTypes.array,
};

export default MyBooks;