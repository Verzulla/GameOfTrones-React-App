import React, {Component} from 'react';
// import './randomChar.css';
import styled from 'styled-components';
import gotService from '../../services/gotService';

const RandomBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4 {
    margin-bottom: 20px;
    text-align: center;
    }

`;

const Term = styled.span`
    font-weight: bold;
`;


export default class RandomChar extends Component {

    constructor() {
        super();
        this.updateChar();
    }

    gotService = new gotService();
   
    state = {
        name: null,
        gender: null,
        born: null,
        died: null,
        culture: null
    }

    updateChar() {
        const id = 130;
        this.gotService.getCharacter(id)
            .then((char) => {
                this.setState({
                    name: char.name,
                    gender: char.gender,
                    born: char.born,
                    died: char.died,
                    culture: char.culture
                })
            });
    }

    render() {
        const {name, gender, born, died, culture} = this.state;
        return (
            <RandomBlock className="random-block rounded">
                <h4>Random Character: {name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <Term className="term">Gender </Term>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <Term className="term">Born </Term>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <Term className="term">Died </Term>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <Term className="term">Culture </Term>
                        <span>{culture}</span>
                    </li>
                </ul>
            </RandomBlock>
        );
    }
}
