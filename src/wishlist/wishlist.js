import React, { Component } from 'react';
import './wishlist.css';
import DataService from '../services/data-service';
import NotificationService, {NOTIF_WISHLIST_CHANGED} from '../services/notification-service';

import ProductCondensed from '../product-condensed/product-condensed';

let ns = new NotificationService();

class WishList extends Component {

    // esse props significa que eu estou puxando as propreidades do componente acima.
    // No caso, WishList????
    constructor(props) {
        // O super busca uma super implementação do parametro
        // Ele vai ao React e volta para ter certeza que os parametros são realmente do Componente acima
        super(props);

        this.state = {wishList:[
            // {
            //     title:"Battlefront",
            //     price:23.99,
            //     _id:"A10001"
            // },
            // {
            //     title:"Battlefront II",
            //     price:42.00,
            //     _id:"A10002"
            // },
            // {
            //     title:"Rogue Squadron",
            //     price:5.00,
            //     _id:"A10003"
            // }
        ]};

        // Bind functions
        this.createWishList = this.createWishList.bind(this);
        this.onWishListChanged = this.onWishListChanged.bind(this);
    }

    // Removendo e adicionando observers
    componentDidMount() {
        ns.addObserver(NOTIF_WISHLIST_CHANGED, this, this.onWishListChanged);
    }

    componentWillUnmount() {
        ns.removeObserver(this, NOTIF_WISHLIST_CHANGED);
    }

    onWishListChanged(newWishList) {
        this.setState({wishList: newWishList});
    }

    createWishList = () => {
        const list = this.state.wishList.map((product) =>
            <ProductCondensed product={ product } key={ product._id } />
        );

        return (list);
    }

    render() {
        return (
            <div className="card">
                <div className="clard-block">
                    <h4 className="car-title">Wish List</h4>
                    <ul className="list-group">
                        {this.createWishList() }
                    </ul>
                </div>
            </div>
        );
    }
}

export default WishList;