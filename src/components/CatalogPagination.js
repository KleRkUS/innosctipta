import React from 'react'; 

export default class Catalog extends React.Component {
  constructor(props) {
    super(props);

    this.listPage = this.listPage.bind(this);

    this.state = {
      pagination: this.createPagination(props.pages)
    }
  }

  /**
  * Re-render pagination buttons on page change
  **/

  componentWillReceiveProps(nextProps) {

    this.setState({
      pagination: this.createPagination(nextProps.pages)
    });

  }

  /**
  * Create Pagination
  *
  * Add pagination button components and pass 
  * neccessary props to it
  * 
  * @params pages integer Amount of pages
  *
  * @return array(DOM Elements)
  **/

  createPagination(pages) {

    let menu = [];

    for (let counter = 1; counter <= pages; counter++) {

      if (counter == Number(this.props.page)) {
        menu.push(<li className="catalog__pagination__active" key={counter} datavalue={counter} onClick={this.listPage}>{counter}</li>);
      } else {
        menu.push(<li key={counter} datavalue={counter} onClick={this.listPage}>{counter}</li>);
      }
    }

    return menu;
  }

  /**
  * List Page
  * 
  * Pass new page number to parent component for 
  * re-rendering catalog
  *
  * @params e DOMelement Button Element
  *
  * @return null
  **/

  listPage(e) {
    this.props.onChangePage(e.target.getAttribute("datavalue"));
    return;
  }

  render() {
    return(
      <nav className="catalog__pagination">
        {this.state.pagination}
      </nav>
    );
  }
}