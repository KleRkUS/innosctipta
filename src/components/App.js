import React from 'react';
import { Cookies } from 'react-cookie';
import GoodsMenu from "./GoodsMenu.js";
import Catalog from "./Catalog.js";

export default class App extends React.Component {
	constructor(props) {
		super(props);

    this.setType = this.setType.bind(this);
    this.chainCounter = this.chainCounter.bind(this);

    this.cookies = new Cookies();

    this.state = {
      type: '1',
      shoppingCart: {
        active: true,
        amount: this.cookies.get('CartAmount', false)
      }
    }
	}

  /**
  * Set Type
  * 
  * Receive and change state goods type variable
  *
  * @params type integer New goods type 
  *
  * @return null
  **/

  setType(type) {

    this.setState({
      type: type
    });
    return;
  }

  /**
  * Get Order Amount
  *
  * Get amount of cards in order from cookies
  * and set state shopping cart variable
  *
  * @params null
  *
  * @return null
  **/

  getOrderAmount() {
    const cookies = new Cookies();
    this.setState({
      shoppingCart: {
        active: true,
        amount: cookies.get('CartAmount')
      }
    });
    return;
  }

  /**
  * Chain Counter
  *
  * Receive direction of manipulations with card and 
  * re-render cart counter
  *
  * @params sign boolean Direction of manipulations where True is "Add card to cart"
  *
  * @return null
  **/

  chainCounter(sign) {

    let cart;

    if(sign) {
      cart = {active: true, amount: ++this.state.shoppingCart.amount};
    } else if (!sign && this.state.shoppingCart.amount > 1) {
      cart = {active: true, amount: this.state.shoppingCart.amount - 1};
    } else {
      cart = {active: false, amount: 0};
    }

    this.setState({
      shoppingCart: cart
    });
    return;
  }

	render(){
		return(
      <div className="container"> 
        < GoodsMenu onChange={this.setType} shoppingCart={this.state.shoppingCart} />
        < Catalog type={this.state.type} chainCounter={this.chainCounter} />
      </div>
		);
	}
}