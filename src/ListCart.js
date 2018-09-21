import React, { Component } from 'react';

export default class ListCart extends React.Component {

  nameAndPrice() {
    return 'Name: ' + this.props.product.name + ' Price: ' + this.props.product.price + ' Quantity: ' + this.props.product.quantity
  }
  render() {
    if(this.props.product.quantity < 1) {
      return '';
    }
    return (
      <li key={this.props.indexValue} >{ this.nameAndPrice() }
      ----- Item Total Price: { this.props.product.price * this.props.product.quantity }
      <button onClick={(event, productKey) => this.props.reduceQuantity(event, this.props.indexValue)}> - </button>
      <button onClick={(event, productKey) => this.props.addToCart(event, this.props.indexValue)} disabled={this.props.productStock[this.props.indexValue].stock > 0 ? false : true }> + </button>
      </li>
    )
  }
}
