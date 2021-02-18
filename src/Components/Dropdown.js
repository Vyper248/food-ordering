import React from 'react';
import styled from 'styled-components';

const StyledComp = styled.select`
    height: var(--input-height);
    margin: 5px;
    border-radius: 5px;
    border: 1px solid var(--menu-border-color);
    background-color: var(--background-color);
    color: var(--text-color);
    padding: 0px 10px;
    text-align: ${props => props.align};
    ${props => props.width ? `width: ${props.width};` : ''};

    &:focus {
        outline: none;
    }
`;

const Dropdown = ({options, onChange, ...rest}) => {
    const onChangeDropdown = (e) => {
        onChange(e.target.value);
    }

    return (
        <StyledComp onChange={onChangeDropdown} {...rest}>
        {
            options.map(option => {
                return <option key={'option-group-'+option.value} value={option.value}>{option.display}</option>
            })
        }
        </StyledComp>
    );
}

export default Dropdown;