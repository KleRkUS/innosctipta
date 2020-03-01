import React from 'react';
import axios from 'axios';

export default class GoodsMenu extends React.Component {
  constructor(props) {
    super(props);

    this.changeType = this.changeType.bind(this);

    this.state = {
      type: 1,
      loaded: false,
      menu: [],
    }

    this.types = this.getTypes();
  }

  /**
  * Get Types
  * 
  * Send GET request to controller that return all of types
  * of goods and initiate creating types navigation
  *
  * @params null
  *
  * @return object
  **/ 

  async getTypes() {

    let rotation = 0;

    let timer = setInterval(() => {
      rotation += 5;
      document.getElementById("menu__spinner").style.transform = "rotate("+rotation+"deg)";
    }, 20);

    await axios({
      method: 'get',
      url: '/types/index'
    }).then( (res) => {

      this.setState({
        loaded: true,
        menu: this.createMenu(res.data)
      });
      return res.data;

    }).catch( (err) => {
      console.log(err);
      return;
    }).finally( () => {
      clearInterval(timer);
      return;
    });
  }

  /**
  * Change Type
  *
  * Updates state type variables and pass new to parent
  * component to re-render catalog with new type of goods
  * 
  * @params e DOM Element pressed type button
  * 
  * @return null 
  **/

  changeType(e) {
    const type = e.target.getAttribute("datavalue");

    this.setState({
      type: type
    });
    this.props.onChange(type);
    return
  }

  /**
  * Create Menu
  *
  * Create navigation between goods' types
  * 
  * @params data object types got from GET request
  * 
  * @return array(DOM Elements)
  **/

  createMenu(data) {
    
    let menu = data.map((d)=> {
      return <li className="radio__default" key={d.id} datavalue={d.id} onClick={this.changeType}>{d.name}</li>
    });

    return menu;
  }

  render() {
    return (
      <div className="index__menu__wrapper">
        <ul className="index__menu">
          {this.state.loaded == false && <li><i className="fas fa-spinner" id="menu__spinner" style={{transition: "all ease-in-out .2s"}}></i></li>}
          {this.state.loaded == true && this.state.menu}
        </ul>
        <div className="index__menu__wrapper">
          <span className="cart__counter">{this.props.shoppingCart.amount}</span>
          <a className="fas fa-shopping-cart layout__header__shopping-cart" href="/cart"></a>
        </div>
      </div>
    )
  }


}