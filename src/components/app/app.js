import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from '../page/characterPage';
import BtnToggle from '../btnToggle';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import { BooksPage, BooksItem } from '../page/booksPage';
import HousesPage from '../page/housesPage/housesPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './app.scss'


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
            <Router>
                <div className="app">
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
                        <Route path='/characters' component={CharacterPage}/>
                        <Route path='/books' component={BooksPage}/>
                        <Route path='/houses' component={HousesPage}/>
                        <hr/>
                        <Route path='/books/:id' render={ ({match}) => {
                            const id = match.params.id;
                            return <BooksItem bookId={id}/>
                        } }/>
                        <hr/>
                    </Container>
                </div>
            </Router>
        );
    }
};

