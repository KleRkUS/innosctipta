import React from 'react';

export default class Row extends React.Component {
  constructor(props) {
    super(props);

    this.changePrice = this.changePrice.bind(this);

    this.state = {
      amount: 1,
      price: {
        ru: props.price,
        dollar: Math.round(props.price / 66),
        eu: Math.round(props.price / 74)
      }
    }
  }

  /**
  * Change Price
  *
  * Change sum price depends on amount of goods and 
  * set it to state variable
  *
  * @param e event 
  *
  * @return null
  **/

  changePrice(e) {
    let sign = e.target.innerHTML;
    if (sign == "+") {
      this.setState({
        amount: ++this.state.amount,
      });
      this.props.onChangeAmount(true, this.state.price.ru);
    } else {
      this.setState({
        amount: --this.state.amount,
      });
      this.props.onChangeAmount(false, this.state.price.ru);
    }
    return;
  }

  render() {
    return(
      <li className="cart__row">
        <div>
          <h2>{this.props.name}</h2>
          <span>{this.props.price}RUR</span>
        </div>

        <div>
          {this.state.amount > 1 && <button onClick={this.changePrice} className="cart__button">-</button>}
          {this.state.amount <= 1 && <button disabled className="cart__button cart__button">-</button>}
          <span>{this.state.amount}</span>
          <button onClick={this.changePrice} className="cart__button" >+</button>
          <h3>{this.state.amount * this.state.price.ru}RUR/${this.state.amount * this.state.price.dollar}/{this.state.amount * this.state.price.eu}EUR</h3>
        </div>
      </li>
    );
  }
}