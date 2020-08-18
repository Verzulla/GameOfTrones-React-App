import React, {Component} from 'react';
import styled from 'styled-components';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';


const WrapItemList = styled.ul`
        cursor: pointer;
        img {
            width: 100%;
            border: 3px solid #00f7ff;
            border-radius: 15px;
        }
`;

export default class ItemList extends Component {

    gotService = new gotService();

    state = {
        charList: null,
        error: false
    }

 
    componentDidMount() {
        this.gotService.getAllCharacters()
            .then((charList) => {
                this.setState({
                    charList,
                    error:false
                })
            })
            .catch(() => {this.onError()});
    }
    componentDidCatch(){
        this.setState({
            charList: null,
            error: true
        })
    }

    onError = (err) => {
        this.setState({
            error: true
        })
    }

    renderItems(arr) {
        return arr.map((item) => {
            const {id, name} = item;
            return (
                <li 
                    key={id}
                    className="list-group-item"
                    onClick={() => this.props.onCharSelected(id)}>
                    {name}
                </li>
            )
        })
    }

    render() {

        const {charList} = this.state;

        if (!charList) {
            return <Spinner/>;
        } 
        
        const errorMessage = this.state.error ? <ErrorMessage/> : null;
        const items = this.renderItems(charList);

        return (
            <WrapItemList className="list-group">
                {errorMessage}
                {items}
            </WrapItemList>
        );
    }
}