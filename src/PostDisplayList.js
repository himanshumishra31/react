import React, { Component } from 'react';
import List from './List.js';


export default class PostDisplayList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sortByName: false, sortByPrice: false, searchText: '', view: 'list' }
  }

  compareValues(key) {
    return function(a, b) {
      if (a[key] < b[key])
        return -1;
      if (a[key] > b[key])
        return 1;
      return 0;
    };
  }

  onCheckboxChange = (event) => {
    if(event.target.className === "nameCheckbox") {
      this.setState({ sortByName: true, sortByPrice: false });
      this.props.productList.sort(this.compareValues('name'));
    } else {
      this.setState({ sortByPrice: true, sortByName: false });
      this.props.productList.sort(this.compareValues('price'));
    }
  }

  changeView = (event) => {
    if(event.target.className === 'listView') {
      this.setState({ view: 'list' })
    } else {
      this.setState({ view: 'grid' })
    }
  }

  onTextChange = (event) => {
    this.setState({ searchText: event.target.value });
  }

  filterList = () => {
    let filterKey = this.state.sortByPrice ? 'price' : 'name'
    let filteredList = [];
    let list = this.props.productList;
    if(this.state.searchText === '') {
      return this.props.productList;
    }
    for(let i = 0; i < list.length; i++) {
      if(list[i]['name'].toUpperCase().indexOf(this.state.searchText.toUpperCase()) > -1) {
        filteredList.push(list[i]);
      }
    }
    return filteredList;
  }


  handleResetClick = () => {
    this.setState({ searchText: '' });
  }

  render() {
    const lists = this.filterList().map((product, index) =>
      <List product={product} onDelete={this.props.onDelete} addToCart={this.props.addToCart} onSubmit={(product, event) => this.props.onSubmit(product, event)} view={this.state.view} key={product.key} cart={this.props.cart} />
    );
    const view = this.state.view === 'list' ? <ul className="list">{lists}</ul> : <div className='grid'>{lists}</div>
    return (
      <div>
        <h3>Sort By</h3>
        <label>
          Product Name
          <input type="checkbox" className="nameCheckbox" onChange={this.onCheckboxChange} checked={this.state.sortByName} />
        </label>
        <label>
          Price
          <input type="checkbox" className="priceCheckbox" onChange={this.onCheckboxChange} checked={this.state.sortByPrice}/>
        </label>
        <label>
          Search
          <input type="checkebox" className="searchBox" onChange={this.onTextChange} value={this.state.searchText} />
        </label>
        <button onClick={this.handleResetClick}> Reset Search</button>
        <button onClick={this.changeView} className="listView"> List View</button>
        <button onClick={this.changeView} className="gridView"> Grid View</button>
        {view}
      </div>

    );
  }
}
