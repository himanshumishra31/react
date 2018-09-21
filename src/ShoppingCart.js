import React, { Component } from 'react';
import ListCart from './ListCart.js';

export default class ShoppingCart extends React.Component {
  total_items() {
    let total_items = 0;
    let _this = this;
    Object.keys(this.props.cart).forEach(function(key) {
      total_items += _this.props.cart[key].quantity;
    })
    return total_items;
  }

  render() {
    const lists = Object.keys(this.props.cart).map((key, index) => {
      <ListCart product={this.props.cart[key]} indexValue={key} reduceQuantity={this.props.reduceQuantity} productStock={this.props.productStock} addToCart={this.props.addToCart} />
    }
    );
    return (
      <div>
        <h2 className="cart-heading">Shopping Cart </h2>
        <h4 className='cart-heading'>Total Items: {this.total_items()} </h4>
        <h4 className='cart-price'>Total Price: {this.props.cartPrice} </h4>
        <ul>{lists}</ul>
        <button onClick={this.props.emptyCart} disabled={Object.keys(this.props.cart).length == 0}> Empty Cart </button>
      </div>
    );
  }
}
