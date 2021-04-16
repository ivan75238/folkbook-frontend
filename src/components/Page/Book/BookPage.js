import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {Page} from "components/CommonStyledComponents";

@connect(() => ({}))
class BookPage extends PureComponent {
    state = {
        error: null,
        id_book: null
    };

    componentDidMount() {
        console.log("this.props.match",this.props.match);
        if(this.props.match && this.props.match.params && this.props.match.params.id) {
            this.setState({id_book: this.props.match.params.id});
        } else {
            this.setState({error: 'Пациент не найден'});
        }
    }

    loadBook = () => {

    };

    render() {
        const {id_book, error} = this.state;

        if (error)
            return <p>{error}</p>;

        return (
            <Page>
                {id_book}
            </Page>
        )
    }
}

BookPage.propTypes = {
    dispatch: PropTypes.func,
    match: PropTypes.any,
};

export default BookPage;
