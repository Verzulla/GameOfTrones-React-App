import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from '../pages/characterPage';
import styled from 'styled-components';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';
import BookPage from '../pages/booksPage';
import HousePage from '../pages/housesPage';

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
   
    gotService = new gotService();

    state = {
        showRandomChar: true,
        error: false,
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
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
                    <CharacterPage/>
                    <BookPage/>
                    <HousePage/>
                    {/* 
                    <Row>
                        <Col md='6'>
                            <ItemList 
                                onItemSelected={this.onItemSelected}
                                getData={this.gotService.getAllHouses}
                                renderItem={(item) => item.name}/>
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar}/>
                        </Col>
                    </Row> */}
                </Container>
            </>
        );
    }  
};
