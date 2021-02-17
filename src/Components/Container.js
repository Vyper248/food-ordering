import React from 'react';
import styled from 'styled-components';

const StyledComp = styled.div`
    width: 95%;
    max-width: 1200px;
    margin: auto;
`;

const Container = ({children}) => {
    return (
        <StyledComp>{children}</StyledComp>
    );
}

export default Container;