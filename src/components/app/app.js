import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from '../characterPage';
import BtnToggle from '../btnToggle';
import ErrorMessage from '../errorMessage';
import CharDetails from '../charDetails';
import ItemList from '../itemList';
import GotService from '../../services/gotService';


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hiddenChar: false,
            error: false
        }
        this.onToggle = this.onToggle.bind(this);
    }

    gotservice = new GotService();

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    onToggle() {
        this.setState({
            hiddenChar: !this.state.hiddenChar
        });
    }



    render() {
        const { hiddenChar, error } = this.state;

        if (error) {
            return <ErrorMessage />
        }

        const randomChar = !hiddenChar ? <RandomChar /> : null;
        return (
            <>
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{ size: 5, offset: 0 }}>
                            {randomChar}
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <BtnToggle onToggle={this.onToggle} />
                        </Col>
                    </Row>
                    <CharacterPage />
                    <Row>
                        <Col md='6'>
                            <ItemList
                                onCharSelected={this.onCharSelected}
                                getData={this.gotservice.getAllBooks}
                                renderItem={(item) => item.name}/>
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList
                                onCharSelected={this.onCharSelected}
                                getData={this.gotservice.getAllHouses}
                                renderItem={(item) => item.name}/>
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar} />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
};

