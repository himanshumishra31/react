import React, { Component } from 'react';
import './App.css';

const postList = [ {key: 0, postName: 'sport', authorName: 'himanshu'}, {key: 1, postName: 'fashion', authorName: 'deepika'}, {key: 2, postName: 'politics', authorName: 'rahul'}]

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = { edit: false };
  }

  handleEditClick = () => {
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
  constructor(props) {
    super(props);
    this.state = { sortByPost: false, sortByAuthor: false }
  }

  onCheckboxChange = (event) => {
    if(event.target.className === "postNameCheckbox") {
      this.setState({ sortByPost: true, sortByAuthor: false });
    } else {
      this.setState({ sortByAuthor: true, sortByPost: false });
    }
    this.props.onCheckboxChange(event);
  }

  render() {
    const lists = this.props.postList.map((post, index) =>
      <List post={post} onDelete={this.props.onDelete} onSubmit={(post, event) => this.props.onSubmit(post, event)} />
    );
    return (
      <div>
        <h3>Sort By</h3>
        <label>
          Post Name
          <input type="checkbox" className="postNameCheckbox" onChange={this.onCheckboxChange} checked={this.state.sortByPost} />
        </label>
        <label>
          Author Name
          <input type="checkbox" className="authorNameCheckbox" onChange={this.onCheckboxChange} checked={this.state.sortByAuthor}/>
        </label>
        <ul>{lists}</ul>
      </div>

    );
  }
}

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { key: this.props.post.key, postName: this.props.post.postName, authorName: this.props.post.authorName }
  }

  onChange = (event) => {
    if(event.target.className === 'postName') {
      this.setState({ postName: event.target.value});
    } else {
      this.setState({ authorName: event.target.value});
    }
  }

  onSubmit = (event) => {
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
    this.state = { newForm: false, postArray: postList, sortByAuthor: false, sortByPost: false }
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
  }

  handleClick = (event) => {
    this.setState({ newForm: !this.state.newForm })
  }

  comparePostName(a,b) {
    if (a.postName < b.postName)
      return -1;
    if (a.postName > b.postName)
      return 1;
    return 0;
  }

  compareAuthorName(a,b) {
    if (a.authorName < b.authorName)
      return -1;
    if (a.authorName > b.authorName)
      return 1;
    return 0;
  }

  onCheckboxChange = (event) => {
    let posts = this.state.postArray;
    if(event.target.className === "postNameCheckbox") {
      posts.sort(this.comparePostName);
    } else {
      posts.sort(this.compareAuthorName);
    }
    this.setState({ postArray: posts });
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

  onDelete = (event, postKey) => {
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
        <PostDisplayList postList={this.state.postArray} onDelete={this.onDelete} onSubmit={(event, arg) => this.onSubmit(arg, event)}  onCheckboxChange={this.onCheckboxChange}/>
      </div>
    );
  }
}

export default InitialLayout;
