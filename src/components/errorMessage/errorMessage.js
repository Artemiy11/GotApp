import React from 'react';
import styled from 'styled-components';
import img from './error.jpeg';

const Error = styled.h1 `
    text-align: center;
    margin: 0 auto;
    font-size: 35px;
`

const Img = styled.img `
    width: 100%;
`;

const ErrorMessage = () => {
    return (
        <>
            <Img src={img} alt="error"/>
            <Error>Something goes wrong</Error>
        </>
    )
}

export default ErrorMessage;