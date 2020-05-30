import React, { Component } from 'react';
import styled from 'styled-components';

const Button = styled.button `
    width: 300px;
    height: 45px;
    border-radius: 4px;
    background-color: #374cb6;
    border: none;
    margin-bottom: 35px;
    color: white;
`;

export default class BtnToggle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: false
        }
    }

 
    render() {
        const {onToggle} = this.props;
        return <Button onClick={onToggle}>Toggle random character</Button>
    }
}