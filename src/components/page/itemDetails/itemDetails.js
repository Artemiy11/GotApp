import React, {Component} from 'react';
import './itemDetails.css';
import GotService from '../../../services/gotService';

const Field = ({ item, field, label }) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export { Field };

export default class ItemDetails extends Component {
    constructor() {
        super();
        this.state = {
            item: null
        }
    }

    gotService = new GotService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.state.item !== prevProps.itemId) {
            this.updateChar();
        }
    }

    updateChar() {
        let { itemId, getItem } = this.props;

        if (!itemId) {
            return;
        }

        getItem(itemId)
            .then(item => {
                this.setState({
                    item
                })
            })

    }

    render() {
        const { type } = this.props;
        if (!this.state.item) {
            return <span className="select-error">Please, select a {type}</span>
        }

        const { item } = this.state;
        const { name } = item;

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ul>
            </div>
        );
    }
}