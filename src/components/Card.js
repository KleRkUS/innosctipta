import React from 'react';
import axios from 'axios';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
  
    this.markCard = this.markCard.bind(this);

    this.state = {
      checked: this.checkCard(props.data.id)
    }
  }

  /**
  * Mark Card
  *
  * Sends POST request to controller that
  * adds or removes this card from shopping card
  * depends on card status in state variable and pass it
  * to parent component for cart counter
  *
  * @params null
  *
  * @returns null
  **/

  async markCard() {

    let url,
        id = this.props.data.id;

    if (this.state.checked) {
      url = "remove";
      this.setState({
        checked: false
      });
    } else {
      url = "add";
      this.setState({
        checked: true
      });
    }

    await axios({
      method: "post",
      url: "/orders/"+url,
      data: {
        id: id
      }
    }).then( (res) => {
      this.props.onAdd(this.state.checked);
    }).catch( (err) => {
      alert('Error: '+err);
    });

  }

  /**
  *  Check Card
  *
  *  Send GET request to controller that checks if card is in 
  *  a shopping cart and set it's status in state variable
  *
  *  @params id integer Id of card
  *
  *  @return null
  **/

  async checkCard(id) {
    await axios({
      method: "get",
      url: "/orders/check",
      params: {
        id: id
      }
    }).then((res) => {

      let data = JSON.parse(res.data);
      if (data == 'true') {
        this.setState({
          checked: true
        });
      } else {
        this.setState({
          checked: false
        });
      }

    }).catch((err) => {
      console.log(err);
    });
    return;
  }

  render() {
    return(
      <div className="catalog__card" datavalue={this.props.data.id}>
        <h2 className="catalog__card__header">{this.props.data.name}</h2>
        <img className="catalog__card__img" alt={this.props.data.name} src={this.props.data.image} />
        <p className="catalog__card__description">{this.props.data.description}</p>
        <div className="catalog__card__info">
          <h3 className="catalog__card__price">{this.props.data.price}</h3>

          {this.state.checked == false && <input type="button" className="catalog__card__button" onClick={this.markCard} value="+" />}
          {this.state.checked == true && <input type="button" className="catalog__card__button catalog__card__button-pressed" onClick={this.markCard} value="-" />}
        </div>
      </div>
    );
  }
}