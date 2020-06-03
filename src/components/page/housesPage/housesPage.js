import React, { Component } from 'react';
import ItemList from '../../itemList';
import ItemDetails, { Field } from '../itemDetails';
import ErrorMessage from '../../errorMessage';
import RowBlock from '../../rowBlock';
import GotService from '../../../services/gotService';

export default class HousesPage extends Component {

    constructor() {
        super();
        this.state = {
            selectedHouse: null
        }
    }

    gotservice = new GotService();

    onItemSelected = (id) => {
        this.setState({
            selectedHouse: id
        })
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }


    render() {

        if (this.state.error) {
            return <ErrorMessage />
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotservice.getAllHouses}
                renderItem={({ name }) => name}
                keyPlus={0}/>
        )

        const itemDetails = (
            <ItemDetails itemId={this.state.selectedHouse} getItem={this.gotservice.getHouse} type={'house'}>
                <Field field="name" label="Name"/>
                <Field field="region" label="Region"/>
                <Field field="words" label="Words"/>
                <Field field="titles" label="Titles"/>
            </ItemDetails>
        )

        return (
            <RowBlock left={itemList} right={itemDetails} />
        )
    }
}