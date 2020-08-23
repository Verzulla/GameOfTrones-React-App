import React, { Component } from 'react';
import './itemDetails.css';
import styled from 'styled-components';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

class Field extends Component {
    render () {
        const {item, field, label} = this.props;
        return (
            <li className="list-group-item d-flex justify-content-between">
                <Term className="term">{label}</Term>
                <span>{item[field]}</span>
            </li>
        )
    }
};
   
export {Field};

const BlockItemDetails = styled.div`
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

export default class ItemDetails extends Component {
    
    gotService = new gotService();

    state = {
        item: null,
        loading: false,
        error: false
    }
    onItemLoaded = (item) => {
        this.setState({
            item,
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
        this.updateItem();
    }
    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }
    updateItem() {
        const {itemId} = this.props;
        const {getItem} = this.props;
        if (!itemId) {
            return;
        }

        getItem(itemId)
            .then(this.onItemLoaded)
            .catch(this.onError);
    }
    
    render() {
        const {item, loading, error} = this.state;
        const fieldProps = this.props;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View item={item} fieldProps={fieldProps}/> : null;

        if (!this.state.item) {
            return <span className="select-error">Please select a character</span>
        }


        return (
            <BlockItemDetails>
                {errorMessage}
                {spinner}
                {content}
            </BlockItemDetails>
        );
    }  
}

class View extends Component {
    render () {
        const {item} = this.props;
        const {name} = item;
        return ( 
            <>
                <h4>{name}</h4>
                <ul className="list-group justify-content-between d-flex rounded list-group-flush">
                    {
                        React.Children.map(this.props.fieldProps.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ul>
            </>
        )
    }
} 