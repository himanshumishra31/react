import React, { Component } from 'react';
import PostForm from './PostForm.js';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = { edit: false };
  }

  handleEditClick = () => {
    this.setState({ edit: !this.state.edit })
  }

  productDetails() {
    return 'Name: ' + this.props.product.name + ' Price: ' + this.props.product.price + ' Stock: ' + this.props.product.stock
  }

  render() {
    return (
      <li key={this.props.product.key} >{ this.productDetails() }
        <button onClick={this.handleEditClick}>Edit</button>
        <button onClick={(event, productKey) => this.props.onDelete(event, this.props.product.key)} disabled={this.props.cart[this.props.product.key] ? true : false }>Delete</button>
        <button onClick={(event, productKey) => this.props.addToCart(event, this.props.product.key)} disabled={this.props.product.stock > 0 ? false : true }>Add To Cart</button>
        {this.state.edit ? <PostForm product={this.props.product} onSubmit={(event, product) => this.props.onSubmit(product, event)} /> : '' }
      </li>
    );
  }
}
