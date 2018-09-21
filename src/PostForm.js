import React, { Component } from 'react';

export default class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { key: this.props.product.key, name: this.props.product.name, price: this.props.product.price, stock: this.props.product.stock }
  }

  onChange = (event) => {
    if(event.target.className === 'name') {
      this.setState({ name: event.target.value});
    } else if(event.target.className === 'price') {
      this.setState({ price: event.target.value});
    } else {
      this.setState({ stock: event.target.value});
    }
  }

  onSubmit = (event) => {
    this.props.onSubmit(event, this.state);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <label>
          Name:
          <input type="text" className='name' onChange={this.onChange} value={this.state.name}/>
        </label>
        <br />
        <label>
          Price:
          <input type="text" className='price' onChange={this.onChange} value={this.state.price}/>
        </label>
        <label>
          Stock:
          <input type="text" className='stock' onChange={this.onChange} value={this.state.stock}/>
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
