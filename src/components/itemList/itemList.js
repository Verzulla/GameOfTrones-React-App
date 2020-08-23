import React, {Component} from 'react';
import styled from 'styled-components';
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

    state = {
        itemList: null,
        error: false
    }

 
    componentDidMount() {
        const {getData} = this.props;

        getData()
            .then((itemList) => {
                this.setState({
                    itemList,
                    error:false
                })
            })
            .catch(() => {this.onError()});
    }
    componentDidCatch(){
        this.setState({
            itemList: null,
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
            const {id} = item;
            const label = this.props.renderItem(item);

            return (
                <li 
                    key={id}
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }

    render() {

        const {itemList} = this.state;

        if (!itemList) {
            return <Spinner/>;
        } 
        
        const errorMessage = this.state.error ? <ErrorMessage/> : null;
        const items = this.renderItems(itemList);

        return (
            <WrapItemList className="list-group">
                {errorMessage}
                {items}
            </WrapItemList>
        );
    }
}