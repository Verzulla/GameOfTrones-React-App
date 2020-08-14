import React from 'react';
import './charDetails.css';
import styled from 'styled-components';


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

const CharDetails = () => {
        return (
            <BlockCharDetails>
                <h4>John Snow</h4>
                <ul className="list-group justify-content-between d-flex rounded list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <Term className="term">Gender</Term>
                        <span>male</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <Term className="term">Born</Term>
                        <span>1783</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <Term className="term">Died</Term>
                        <span>1820</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <Term className="term">Culture</Term>
                        <span>First</span>
                    </li>
                </ul>
            </BlockCharDetails>
        );
};
export default CharDetails;