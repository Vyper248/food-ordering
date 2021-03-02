import React from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

import { useDispatch } from 'react-redux';

const StyledComp = styled.div`
    position: absolute;
    background-color: ${props => props.backgroundColor};
    color: ${props => props.textColor};
    padding: 10px;
    padding-right: 40px;
    top: 35px;
    right: 10px;

    & > div {
        position: absolute;
        right: 7px;
        top: 7px;
        font-size: 1.4em;
    }

    & > div:hover {
        cursor: pointer;
        opacity: 0.6;
    }
`;

const HeaderMessage = ({text, type}) => {
    const dispatch = useDispatch();
    const closeMessage = () => dispatch({type: 'SET_MESSAGE', payload: {text: '', type: ''}});

    let backgroundColor = '#080';
    let textColor = 'white';

    if (type === 'error') {
        backgroundColor = '#800';
        textColor = 'white';
    }
    
    return (
        <StyledComp type={type} backgroundColor={backgroundColor} textColor={textColor}>
            <span>{text}</span>
            <div onClick={closeMessage}><MdClose/></div>
        </StyledComp>
    );
}

export default HeaderMessage;