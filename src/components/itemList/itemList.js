import React, { Component } from 'react';
import './itemList.css';
import Spinner from '../randomChar/spinner';
export default class ItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemList: null
        }

    }

    componentDidMount() {
        const { getData } = this.props;

        getData()
            .then((itemList) => {
                this.setState({
                    itemList
                })
            })
    }

    generateID(max, min) {
        let id = Math.floor(Math.random() * (max - min + 41)) + min;
        return id.toString(36);
    }

    renderItems(arr) {
        return arr.map((item, key) => {
            const label = this.props.renderItem(item);
            return (
                <li
                    className="list-group-item"
                    key={this.generateID(1, 1000)}
                    onClick={() => this.props.onItemSelected(this.props.keyPlus + key)}>
                    {label}
                </li>
            )
        })
    }

    render() {

        const { itemList } = this.state;

        if (!itemList) {
            return <Spinner />
        }

        const items = this.renderItems(itemList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}

ItemList.defaultProps = {
    onItemSelected: () => {}
}