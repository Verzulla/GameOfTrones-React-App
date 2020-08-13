import React, {Component} from 'react';
// import './itemList.css';
import styled from 'styled-components';

const WrapItemList = styled.ul`
        cursor: pointer;
`;

export default class ItemList extends Component {

    render() {
        return (
            <WrapItemList className="list-group">
                <li className="list-group-item">
                    John Snow
                </li>
                <li className="list-group-item">
                    Brandon Stark
                </li>
                <li className="list-group-item">
                    Geremy
                </li>
            </WrapItemList>
        );
    }
}