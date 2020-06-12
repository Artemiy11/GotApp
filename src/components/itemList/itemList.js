import React, { useState, useEffect } from 'react';
import './itemList.css';
import Spinner from '../randomChar/spinner';

function ItemList({getData, renderItem, onItemSelected, keyPlus}) {

    const [itemList, updateList] = useState([]);

    useEffect(() => {

        getData()
            .then((data) => {
                updateList(data)
            })
    }, [])

    function generateID(max, min) {
        let id = Math.floor(Math.random() * (max - min + 41)) + min;
        return id.toString(36);
    }

    function renderItems(arr) {
        return arr.map((item, key) => {
            const label = renderItem(item);
            return (
                <li
                    className="list-group-item"
                    key={generateID(1, 1000)}
                    onClick={() => onItemSelected(keyPlus + key)}>
                    {label}
                </li>
            )
        })
    }

    if (!itemList) {
        return <Spinner />
    }

    const items = renderItems(itemList);

    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    );
}

export default ItemList;