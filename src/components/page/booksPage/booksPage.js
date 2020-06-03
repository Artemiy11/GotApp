import React, { Component } from 'react';
import ItemList from '../../itemList';
import ErrorMessage from '../../errorMessage';
import GotService from '../../../services/gotService';
import { withRouter } from 'react-router-dom';

class BooksPage extends Component {

    constructor() {
        super();
        this.state = {
            error: null
        }
    }

    gotservice = new GotService();

    componentDidCatch() {
        this.setState({
            error: true
        })
    }


    render() {

        if (this.state.error) {
            return <ErrorMessage />
        }

        return (
            <ItemList
                onItemSelected={ (itemId) => {
                    this.props.history.push(`/books/${itemId + 1}`)
                }}
                getData={this.gotservice.getAllBooks}
                renderItem={({ name }) => name}
                keyPlus={0}/>
        )
    }
}

export default withRouter(BooksPage);