import React, { Component } from 'react';
import ItemList from '../../itemList';
import ItemDetails, {Field} from '../../itemDetails';
import ErrorMessage from '../../errorMessage';
import gotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';

export default class HousePage extends Component {

    gotService = new gotService();

    state = {
        selectedHouse: null,
        error: false
    }
    onItemSelected = (id) => {
        this.setState({
            selectedHouse: id
        })
        console.log(id);
    }
    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList 
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllHouses}
                renderItem={({name}) => name}/>
        )

        const itemDetails = (
            <ItemDetails 
                itemId={this.state.selectedHouse}
                getItem={this.gotService.getHouse}>
                <Field field='region' label='Region'/>
                <Field field='words' label='Words'/>
                <Field field='titles' label='Titles'/>
                <Field field='overlord' label='Overlord'/>
                <Field field='ancesrtalWeapons' label='Ancesrtal Weapons'/>
            </ItemDetails>
        )

        return(
            <RowBlock left={itemList} right={itemDetails}/>
        )
    }
}