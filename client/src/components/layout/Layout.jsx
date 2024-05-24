import React from 'react'
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';

const LayoutContainer = styled.div`
display: flex;
flex-direction:column;
align-items:center;
width: 100vw;
outline: 5px solid  #04DDB2
`;
const InnerLayoutContainer = styled.div`
flex: 1;
top: 140px;
padding: 0px,2px;
max-width: 70%
outline: 1px solid #04DDB2
background-color: red;
`

function Layout({children}) {

    return (

        <LayoutContainer>
                <Header/>
                <InnerLayoutContainer>
                        {children}
                </InnerLayoutContainer>
                <Footer/>
        </LayoutContainer>
    )
}

export default Layout