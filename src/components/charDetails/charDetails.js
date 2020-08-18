import React, { Component } from 'react';
import './charDetails.css';
import styled from 'styled-components';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';


const BlockCharDetails = styled.div`
    border-radius: 5px;
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    
    h4 {
        margin-bottom: 20px;
        text-align: center; 
        border-bottom: 1px solid #bfbdbd; /* Параметры линии под текстом */
        font-weight: normal; /* Убираем жирное начертание */
        padding-bottom: 17px; 
    }
`;

const Term = styled.span`
    font-weight: bold;
`;

export default class CharDetails extends Component {
    
    gotService = new gotService();

    state = {
        char: null,
        loading: false,
        error: false
    }
    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
            error: false
        });
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }
    componentDidMount() {
        this.updateChar();
    }
    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }
    updateChar() {
        const {charId} = this.props;
        if (!charId) {
            return;
        }

        this.gotService.getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }
    
    render() {
        const {char, loading, error} = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;

        if (!this.state.char) {
            return <span className="select-error">Please select a character</span>
        }


        return (
            <BlockCharDetails>
                {errorMessage}
                {spinner}
                {content}
            </BlockCharDetails>
        );
    }  
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>
            <h4>{name}</h4>
            <ul className="list-group justify-content-between d-flex rounded list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <Term className="term">Gender</Term>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <Term className="term">Born</Term>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <Term className="term">Died</Term>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <Term className="term">Culture</Term>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}