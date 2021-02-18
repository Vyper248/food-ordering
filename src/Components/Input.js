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
    ${props => props.width ? 'width: '+props.width : ''};

    &:focus {
        outline: none;
    }
`;

const Input = ({value, onChange, placeholder='', useBlur=false, ...rest}) => {

    const onChangeInput = (e) => {
        onChange(e.target.value);
    }

    const onChangeCheckbox = (e) => {
        onChange(e.target.checked);
    }

    if (rest.type === 'checkbox') {
        return <StyledComp value={value} onChange={onChangeCheckbox} placeholder={placeholder} {...rest} checked={value}/>
    }

    return (
        <StyledComp value={value} onChange={onChangeInput} placeholder={placeholder} {...rest}/>
    );
}

export default Input;