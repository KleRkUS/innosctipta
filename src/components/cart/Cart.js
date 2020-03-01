import React from 'react';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import Row from "./Row.js"

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.changePrice = this.changePrice.bind(this);
    this.submitOrder = this.submitOrder.bind(this);
    this.changeBillingData = this.changeBillingData.bind(this);

    this.cookies = new Cookies();

    this.state = {
      cart: this.createCart(),
      priceEu: '',
      priceDollar: '',
      priceRu: this.setPrice(),
      billing: {
        Adress: null,
        Name: null,
        Phone: null
      }
    }
  }

  /**
  * Create cart
  *
  * Create components for shopping cart 
  *
  * @param null
  *
  * @return array(DOM Element)
  **/

  createCart() {
    const order = this.cookies.get('Order', false),
          o = Object.entries(order);
    
    let list = o.map((o) => {
      let data = o[1];
      return < Row name={data.name} key={data.id} price={data.price} onChangeAmount={this.changePrice} />
    });
    return list;
  }


  /**
  * Set price
  *
  * Set order price to state variable on load
  *
  * @param null
  *
  * @return null
  **/
  setPrice() {
    const order = this.cookies.get('Order', false),
          data = Object.entries(order);

    let price = 0;

    for (let card of data) {
      price += +card[1].price;
    }

    this.state.priceDollar = Math.round(price/66);
    this.state.priceEu = Math.round(price/74);

    return price;
  }

  /**
  * Change Price
  *
  * Change order price
  *
  * @param sign boolean Direction of changin where true is add one more to cart
  * @param price integer Price of good
  *
  * @return null
  **/

  changePrice(sign, price) {

    let newPrice;

    if (sign) {
      newPrice = this.state.priceRu + +price;
    } else {
      newPrice = this.state.priceRu - +price;
    }

    this.setState({
      priceRu: newPrice,
      priceDollar: Math.round(newPrice/66),
      priceEu: Math.round(newPrice/74)
    });
    return;

  }

  /**
  * Change Billing Data
  *
  * Change state variable on input
  *
  * @param e event 
  *
  * @return null
  **/

  changeBillingData(e) {
    const type = e.target.getAttribute('name');

    this.state.billing[type] = e.target.value
    return;
  }

  /**
  * Submit Order
  *
  * Get check if all billing data is correct and
  * send request to history coolection if user is logged in
  *
  * @param null
  *
  * @return null
  **/

  submitOrder() {
    if (this.state.billing.adress == null) {
      alert("Please, specify your adress");
      return;
    } else if (this.state.billing.name == null) {
      alert("Please, specify your name");
      return;
    } else if (this.state.billing.phone == null || this.checkPhone(this.state.billing.phone) == null) {
      alert("Please, specify your correct phone");
      return;
    }

    const order = this.cookies.get('Order', false),
          o = Object.entries(order);
    
    let list = o.map((o) => {
      let data = o[1];
      return data.name;
    });

    axios({
      method: 'post',
      url: 'orders/collect',
      data: {
        price: this.state.priceRu,
        order: list
      }
    }).then((res) => {
      alert(res.data);
    }).catch((err) => {
      console.log(err);
    });
    return;

  }


  /**
  * Check Phone
  *
  * Check if inputed phone mathces regex
  *
  * @param phone string 
  *
  * @return null or string
  **/
  checkPhone(phone) {

    const regex = /\+?[7,8][0-9]{10}/,
          result = phone.match(regex);

    return result;

  }

  render() {
    return (
      <div className="shopping__card__container">
        <ul>
          {this.state.cart}
        </ul>
        <div className="shopping__card__payments">
          <h2>{this.state.priceRu + 2*66}RUR/${this.state.priceDollar + 2}/{this.state.priceEu + 1.8}EUR - includes delivery tax</h2>
          <input id="adress" placeholder="Adress" type="text" name="adress" onChange={this.changeBillingData} />
          <input id="name" placeholder="Name" type="text" name="name" onChange={this.changeBillingData} />
          <input id="phone" placeholder="+70000000000" type="phone" name="phone" onChange={this.changeBillingData} />
          <button className="button__default button__important" onClick={this.submitOrder}>Continue</button>
        </div>
      </div>
    );
  }
}