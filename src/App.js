import React, { Component } from 'react';
import './App.css';
import PostForm from './PostForm.js';
import PostDisplayList from './PostDisplayList.js';
import ShoppingCart from  './ShoppingCart.js';


const products = [ {key: 0, name: 'jeans', price: 20, stock: 1 }, {key: 1, name: 'shirt', price: 15, stock: 4 }, {key: 2, name: 'sweater', price: 25, stock: 6 }]
const productStock = { 0: { stock: 1}, 1: { stock: 4 }, 2: { stock: 6} }

class InitialLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newProduct: false, productArray: products, cart: {}, cartPrice: 0, productStock: productStock }
  }

  handleClick = (event) => {
    this.setState({ newProduct: !this.state.newProduct })
  }

  onSubmit(event, product) {
    // let { products, productStock } = this.state;
    let products = this.state.productArray;
    let productStock = this.state.productStock;
    if(product.key == 0 || product.key) {
      let productIndex = this.findKeyIndex(product.key);
      products[productIndex].name = product.name;
      products[productIndex].price = product.price;
      products[productIndex].stock = product.stock;
      productStock[products[productIndex].key].stock = product.stock;
      if(this.state.cart[products[productIndex].key]) {
        let existingCart = Object.assign({}, this.state.cart);
        existingCart[products[productIndex].key].name = product.name;
        existingCart[products[productIndex].key].price = product.price;
        this.setState({ cart: existingCart })
      }
    } else {
      productStock[this.state.productArray.length] = {stock: product.stock};
      products.push({key: this.state.productArray.length, name: product.name, price: product.price, stock: product.stock });
    }
    this.setState({ productArray: products });
    event.preventDefault();
  }

  findKeyIndex(key) {
    for(var i = 0; i < this.state.productArray.length; i++) {
      if (this.state.productArray[i].key == key) {
        return i;
      }
    }
  }

  onDelete = (event, productKey) => {
    let keyValueIndex = this.findKeyIndex(productKey);
    let products = Object.assign([], this.state.productArray);
    products.splice(keyValueIndex, 1);
    this.setState({ productArray: products });
  }

  reduceQuantity = (event, productKey) => {
    let existingCart = this.state.cart;
    let productStock = this.state.productStock;
    let products = this.state.productArray;
    products[this.findKeyIndex(productKey)].stock += 1;
    existingCart[productKey].quantity -= 1;
    productStock[productKey].stock += 1;
    if(existingCart[productKey].quantity == 0) {
      delete existingCart[productKey];
    }
    let price = 0;
    Object.keys(existingCart).forEach(function(key) {
      price += existingCart[key].quantity * existingCart[key].price
    });
    this.setState({ cart: existingCart, productArray: products, cartPrice: price });
  }

  updateCart(products, existingCart) {
    let price = 0;
    Object.keys(existingCart).forEach(function(key) {
      price += existingCart[key].quantity * existingCart[key].price
    });
    this.setState({ productArray: products, cart: existingCart, cartPrice: price, productStock: productStock });
  }

  addToCart = (event, productKey) => {
    let keyValueIndex = this.findKeyIndex(productKey);
    let products = Object.assign([], this.state.productArray);
    let productStock = this.state.productStock;
    productStock[products[keyValueIndex].key].stock -= 1;
    products[keyValueIndex]['stock'] -= 1;
    let existingCart = Object.assign({}, this.state.cart);
    if (existingCart[products[keyValueIndex].key]) {
      existingCart[products[keyValueIndex].key].quantity = existingCart[products[keyValueIndex].key].quantity + 1;
    } else {
      existingCart[products[keyValueIndex].key] = { name: products[keyValueIndex].name, price: products[keyValueIndex].price, quantity: 1 }
    }
    this.updateCart(products, existingCart, productStock);
  }

  emptyCart = () => {
    let _this = this;
    let products = this.state.productArray;
    let productStock = this.state.productStock;
    Object.keys(this.state.cart).forEach(function(key) {
      products[_this.findKeyIndex(key)].stock += _this.state.cart[key].quantity;
      productStock[key].stock += _this.state.cart[key].quantity;
    });
    this.setState({ cart: {}, cartPrice: 0, products: products });
  }

  render() {
    let form;
    let button;
    let product = { name: '', price: 0, stock: 0 };
    if (this.state.newProduct) {
      form = <PostForm onSubmit={(event, product) => this.onSubmit(event, product)} product={product} />;
      button = <button onClick={this.handleClick}> Hide Form </button>;
    } else {
      form = '';
      button = <button onClick={this.handleClick}> Show Form </button>;
    }
    return (
      <div className="container">
        <div className="split left">
          {form}
          {button}
          <PostDisplayList productList={this.state.productArray} onDelete={this.onDelete} onSubmit={(event, arg) => this.onSubmit(arg, event)} addToCart={this.addToCart} cart={this.state.cart}/>
        </div>
        <div className="split cart"><ShoppingCart cart={this.state.cart} cartPrice={this.state.cartPrice} emptyCart={this.emptyCart} reduceQuantity={this.reduceQuantity} productStock={this.state.productStock} addToCart={this.addToCart} /></div>
      </div>
    );
  }
}

export default InitialLayout;
