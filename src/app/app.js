import React, { Component } from 'react';
import logo from './logo.svg';
import './app.css';

// Components
import Product from '../product/product.js';
import Wishlist from '../wishlist/wishlist.js';

// Services
import HttpService from '../services/http-service';

// Uma const significa que essa variável não pode ser modificada
const http = new HttpService();

class App extends Component {

  // Duas coisas no React que usaremos toda hora: props e state
  // state é o mesmo que o estado atual de um componente como um status
  // props vem de properties. Propriedades do meu componente
  // state são coisas que mudam o tempo todo e props são constantes
  constructor(props) {
    super(props);

    this.state = { products: [] }

    // ES6 Bind functions
    // Toda funçãoq ue eu criar eu preciso dar um bind no constructor para eu ganhar o acesso a ela
    this.loadData = this.loadData.bind(this);
    this.productList = this.productList.bind(this);

    this.loadData();
  }

  // Um search sem parâmetros
  loadData = () => {
    var self = this;
    // Quando a request foir feita, ai sim (.then)
    http.getProducts().then(data => {
      // Esse data é igual ao res.json do meu http-service
      // toda vez que esse setState for chamado ele vai dar um reload no array
      //tudo que estiver abaixo do constructor
      self.setState({ products: data })
      console.log(data);
    }, err => {
      // o Erro (err) é o equivalente ao que colocamos no reject no http-service.json
      // e o resolve é a promise que dei certo successfull

    });
  }

  productList = () => {
    // map é uma função do JS que corre por um array e cada elemento desse array e faz alguma coisa
    // você mapeia
    const list = this.state.products.map((product) =>
      <div className="col-sm-4" key={product._id}>
        {/* <Product title={product.title} price={product.price} imgUrl={product.imgUrl} /> */}
        <Product product={product} />
      </div>
    );

    return (list);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Welcome to my Shop</h1>
        </header>
        <div className="container-fluid App-main">
          <div className="row">
            {/* <Product price="4.21" title="Daredevil Action Figure" imgUrl="https://www.actionfiguretoronto.com/wp-content/uploads/2016/09/Daredevil_06.jpg" />
            <Product price="4.21" title="Daredevil Action Figure" imgUrl="https://www.actionfiguretoronto.com/wp-content/uploads/2016/09/Daredevil_06.jpg" />
            <Product price="4.21" title="Daredevil Action Figure" imgUrl="https://www.actionfiguretoronto.com/wp-content/uploads/2016/09/Daredevil_06.jpg" /> */}
            <div className="col-sm-8">
              <div className="row">

                {/* printando coisas do component de product */}
                {this.productList()}
              </div>
            </div>
            <div className="col-sm-4">
              {/* printando coisas do compoente de wishlist */}
              <Wishlist />
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
