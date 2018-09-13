import React, { Component } from 'react';
import './App.css';

const postList = [ {key: 0, postName: 'sport', authorName: 'himanshu'}, {key: 1, postName: 'fashion', authorName: 'deepika'}, {key: 2, postName: 'politics', authorName: 'rahul'}]

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = { edit: false };
    this.handleEditClick = this.handleEditClick.bind(this); // check how to remove bind
  }

  handleEditClick() {
    this.setState({ edit: !this.state.edit })
  }

  authorAndPostName() {
    return this.props.post.postName + ' ' + this.props.post.authorName
  }

  render() {
    return (
      <li key={this.props.post.key} >{ this.authorAndPostName() }
        <button onClick={this.handleEditClick}>Edit</button>
        <button onClick={(event, postKey) => this.props.onDelete(event, this.props.post.key)}>Delete</button>
        {this.state.edit ? <PostForm post={this.props.post} onSubmit={(event, post) => this.props.onSubmit(post, event)} /> : '' }
      </li>
    );
  }
}

class PostDisplayList extends React.Component {
  render() {
    const lists = this.props.postList.map((post, index) =>
      <List post={post} onDelete={this.props.onDelete} onSubmit={(post, event) => this.props.onSubmit(post, event)} />
    );
    return (
      <ul>{lists}</ul>
    );
  }
}

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { key: this.props.post.key, postName: this.props.post.postName, authorName: this.props.post.authorName }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    if(event.target.className === 'postName') {
      this.setState({ postName: event.target.value});
    } else {
      this.setState({ authorName: event.target.value});
    }
  }

  onSubmit(event) {
    this.props.onSubmit(event, this.state);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <label>
          Title:
          <input type="text" className='postName' onChange={this.onChange} value={this.state.postName}/>
        </label>
        <br />
        <label>
          Author Name:
          <input type="text" className='authorName' onChange={this.onChange} value={this.state.authorName}/>
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class InitialLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newForm: false, postArray: postList }
    this.handleClick = this.handleClick.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  handleClick(event) {
    this.setState({ newForm: !this.state.newForm })
  }

  onSubmit(event, post) {
    let posts = this.state.postArray;
    if(post.key == 0 || post.key) {
      let postIndex = this.findKeyIndex(post.key);
      posts[postIndex].postName = post.postName;
      posts[postIndex].authorName = post.authorName;
    } else {
      posts.push({key: this.state.postArray.length, postName: post.postName, authorName: post.authorName});
    }
    this.setState({ postArray: posts});
    event.preventDefault();
  }

  findKeyIndex(key) {
    for(var i = 0; i < this.state.postArray.length; i++) {
      if (this.state.postArray[i].key == key) {
        return i;
      }
    }
  }

  onDelete(event, postKey) {
    let keyValueIndex = this.findKeyIndex(postKey)
    let posts = Object.assign([], this.state.postArray);
    posts.splice(keyValueIndex, 1);
    this.setState({postArray: posts});
  }

  render() {
    let form;
    let button;
    let post= {authorName: '', postName: ''};
    if (this.state.newForm) {
      form = <PostForm onSubmit={(event, post) => this.onSubmit(event, post)} post={post} />;
      button = <button onClick={this.handleClick}> Hide Form </button>;
    } else {
      form = '';
      button = <button onClick={this.handleClick}> Show Form </button>;
    }
    return (
      <div>
        {form}
        {button}
        <PostDisplayList postList={this.state.postArray} onDelete={this.onDelete} onSubmit={(event, arg) => this.onSubmit(arg, event)} />
      </div>
    );
  }
}

export default InitialLayout;
