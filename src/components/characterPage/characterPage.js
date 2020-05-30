import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';

const RowBlock = ({ left, right }) => {
    return (
        <Row>
            <Col md='6'>
                {left}
            </Col>
            <Col md='6'>
                {right}
            </Col>
        </Row>
    )
}

export default class CharacterPage extends Component {

    constructor() {
        super();
        this.state = {
            selectedChar: 130
        }
    }

    gotservive = new GotService();

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
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

        const itemList = () => {
            return (
                <ItemList
                    onCharSelected={this.onCharSelected}
                    getData={this.gotservive.getAllCharacters}
                    renderItem={({ name, gender }) => `${name} (${gender})`} />
            )
        }

        const charDetails = () => {
            return (
                <CharDetails charId={this.state.selectedChar} />
            )
        }

        return (
            <Row>
                <Col md='6'>
                    {itemList}
                </Col>
                <Col md='6'>
                    {charDetails}
                </Col>
            </Row>
        )
    }
}