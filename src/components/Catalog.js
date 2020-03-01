import React from 'react';
import axios from 'axios';
import Card from './Card.js';
import CatalogPagination from './CatalogPagination.js';

export default class Catalog extends React.Component {
  constructor(props) {
    super(props);

    this.changePage = this.changePage.bind(this);
    this.chainCounter = this.chainCounter.bind(this);

    this.state = {
      loaded: false,
      pages: 1,
      page: 1,
      catalog: []
    }

    this.catalog = this.getCatalog(props.type);
  }

  /**
  * Re-render catalog when type changes
  **/

  componentWillReceiveProps(nextProps) {

    this.setState({
      loaded: false
    });
    this.getCatalog(nextProps.type);

  }

  /**
  * Chain Counter to parent
  *
  * Pass direction of Card manipulation to parent component for cart counter
  *
  * @params sign boolean direction of manupulation where true is add Card to card
  *
  * @return null
  **/

  chainCounter(sign) {
    this.props.chainCounter(sign);
    return;
  }

  /**
  * Get Catalog
  *
  * Send GET request to controller that returns Catalog 
  * from datastore by type, create visualization while
  * request is pending
  *
  * @params type integer Goods type
  *
  * @return null
  **/

  async getCatalog(type) {

    let rotation = 0;

    let timer = setInterval(() => {
      rotation += 5;
      document.getElementById("catalog__spinner").style.transform = "rotate("+rotation+"deg)";
    }, 20);

    await axios({
      method: 'get',
      url: '/goods/get',
      params: {
        type: type,
        page: this.state.page
      }
    }).then( (res) => {

      const data = JSON.parse(res.data),
            pages = Math.ceil(data.amount / 12);

      this.setState({
        catalog: this.createCatalog(data.catalog),
        loaded: true,
        pages: pages
      });
      return res.data;

    }).catch( (err) => {
      console.log(err);
    }).finally( () => {
      clearInterval(timer);
    });
    return
  }

  /**
  * Create Catalog
  *
  * Add Cards components to catalog and pass data to it
  *
  * @params data object Card data
  *
  * @return array(DOM objects)
  **/

  createCatalog(data) {

    let d = Object.entries(data);

    let card = d.map((d) => {
      return < Card key={d.id} data={d[1]} onAdd={this.chainCounter}/>
    });

    return card;
  
  }

  /**
  * Change Page
  *
  * Re-render Catalog cards on page change with new page variable
  * and set it to state variables
  *
  * @params page integer Page number
  *
  * @return null
  **/

  changePage(page) {

    this.setState({
      loaded: false
    });

    // Here i need to change state variables, but default
    // "setState" is slower than casual variable assignment

    this.state.loaded = false;
    this.state.page = page;

    this.getCatalog(this.props.type);
    return;

  }

  render(){
    return (
      <div className="catalog__container">
        <div className="catalog">
          {this.state.loaded == false && <i className="fas fa-spinner" id="catalog__spinner" style={{transition: "all ease-in-out .2s"}}></i>}
          {this.state.loaded == true && this.state.catalog}
        </div>
        {this.state.pages > 1 && < CatalogPagination pages={this.state.pages} page={this.state.page} onChangePage={this.changePage} />}
      </div>
    );
  }
}