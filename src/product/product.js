import React, { Component } from 'react';
import './product.css';
import DataService from '../services/data-service';
import NotificationService, {NOTIF_WISHLIST_CHANGED} from '../services/notification-service';


let ds = new DataService();
let ns = new NotificationService();

class Product extends Component {
    // No React, toda vez que você quiser jogar alguma coisa para a tela você chama o render function (render());
    // é uma função particular do Component
    constructor(props) {
        super(props);

        this.state = { onWishList: ds.itemOnWishList() };

        this.onButtonClicked = this.onButtonClicked.bind(this);
        this.onWishListChanged = this.onWishListChanged.bind(this);
    }

    componentDidMount() {
        ns.addObserver(NOTIF_WISHLIST_CHANGED, this, this.onWishListChanged);
    }

    componentWillUnmount() {
        ns.removeObserver(this, NOTIF_WISHLIST_CHANGED);
    }

    onWishListChanged(newWishList){
        this.setState({onWishList: ds.itemOnWishList(this.props.product)});
    }

    onButtonClicked = () => {
        if (this.state.onWishList) {
            ds.removeWishListItem(this.props.product);
        } else {
            ds.addWishListItem(this.props.Product);
        }

    }

    render() {

        var btnClass;

        if (this.state.onWishList) {
            btnClass = "btn btn-danger";
        } else {
            btnClass = "btn btn-primary";
        }

        return (
            // No React class é className
            <div className="card">
                <img className="card-img-top prodImg" src={this.props.product.imgUrl} alt="" />
                <div className="clard-block">
                    <h4 className="car-title">{this.props.product.title}</h4>
                    <p className="card-text">Price: ${this.props.product.price}</p>
                    <a href="" onClick={() => this.onButtonClicked()} className={btnClass}>{this.state.onWishList ? "Remove From Wishlist" : "Add to Cart"}</a>
                </div>
            </div>
        );
    }
}

// depois de feito o que queria aqui nesse component, exportar
// Depois de exportar, ir para o app.js e importar o component
export default Product;