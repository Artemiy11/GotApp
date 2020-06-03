import React, { Component } from 'react';
import GotService from '../../../services/gotService';
import ItemDetails, { Field } from '../itemDetails';

export default class BooksItem extends Component {
    gotservice = new GotService();

    render() {
        return (
            <ItemDetails
                itemId={this.props.bookId}
                getItem={this.gotservice.getBook}
                type={'book'}>
                <Field field="name" label="Name"/>
                <Field field="publisher" label="Publisher"/>
                <Field field="numberOfPages" label="Number of pages"/>
                <Field field="released" label="Released"/>
            </ItemDetails>
        )
    }
}