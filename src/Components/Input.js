import React from 'react';
import styled from 'styled-components';

const StyledComp = styled.input`
    display: inline-flex;
    align-items: center;
    height: var(--input-height);
    margin: 5px;
    border-radius: 5px;
    border: 1px solid var(--menu-border-color);
    background-color: var(--background-color);
    color: var(--text-color);
    padding: 0px 10px;
    text-align: ${props => props.align};
    ${props => props.width ? 'width: '+props.width : ''};

    &:focus {
        outline: none;
    }
`;

const Input = ({value, onChange=()=>{}, useBlur=false, align='center', ...rest}) => {
    if (rest.type === 'number' && isNaN(value)) value = 0; 
    if (value === null) value = '';

    const onChangeInput = (e) => {
        let value = e.target.value;
        if (rest.type === 'number') value = parseInt(value);
        onChange(value);
    }

    const onChangeCheckbox = (e) => {
        onChange(e.target.checked);
    }

    if (rest.type === 'checkbox') {
        return <StyledComp value={value} onChange={onChangeCheckbox} align={align} {...rest} checked={value}/>
    }

    return (
        <StyledComp value={value} onChange={onChangeInput} align={align} {...rest}/>
    );
}

const equalityCheck = (prevProps, nextProps) => {
    if (prevProps.value === nextProps.value) {
        return true;
    }
    return false;
}

export default React.memo(Input, equalityCheck);