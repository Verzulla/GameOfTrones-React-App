import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import GotService from '../../services/gotService';
import styled from 'styled-components';
import ErrorMessage from '../errorMessage';

const ToggleButton = styled.button`
    background: rgb(29,74,91);
    background: radial-gradient(circle, rgba(29,74,91,1) 0%, rgba(148,187,233,1) 100%);
    color: #ebfbff;
    display: block;
    margin: 0 auto 26px;
    border: 2px solid linear-gradient(360deg, rgba(20,20,27,1) 0%, rgba(111,111,176,1) 50%, rgba(0,0,0,1) 100%);
    border-radius: 10px;
    padding: 6px;
    :active, :hover, :focus {
        outline: 0;
        outline-offset: 0;
    }
    :active {
        border: 2px inset linear-gradient(360deg, rgba(20,20,27,1) 0%, rgba(111,111,176,1) 50%, rgba(0,0,0,1) 100%);
        top: 1px;
        background: linear-gradient(rgb(76,77,82), rgb(56,57,62)) rgb(76,77,82);
        box-shadow:
        0 0 1px rgba(0,0,0,.5) inset,
        0 2px 3px rgba(0,0,0,.5) inset,
        0 1px 1px rgba(255,255,255,.1);
        color: #b8d4db;
        transition: 100ms;
    }
`;


export default class App extends Component {
    state = {
        showRandomChar: true,
        error: false
    }

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    }

    render () {
        if (this.state.error) {
            return <ErrorMessage/>
        }
        const char = this.state.showRandomChar ? <RandomChar/> : null;
        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {char}
                            <ToggleButton onClick={this.toggleRandomChar}>Toggle random character</ToggleButton>
                        </Col> 
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList />
                        </Col>
                        <Col md='6'>
                            <CharDetails />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }  
};
