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
    this.state = { sortByPost: false, sortByAuthor: false, searchText: '', view: 'list' }
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
    if(event.target.className === "postNameCheckbox") {
      this.setState({ sortByPost: true, sortByAuthor: false });
      this.props.postList.sort(this.compareValues('postName'));
    } else {
      this.setState({ sortByAuthor: true, sortByPost: false });
      this.props.postList.sort(this.compareValues('authorName'));
    }
  }

  onSearchSubmit = (event) => {
    event.preventDefault();
    let filterKey = this.state.sortByAuthor ? 'authorName' : 'postName'
    this.props.filterPostList(this.state.searchText, filterKey);
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
    let filterKey = this.state.sortByAuthor ? 'authorName' : 'postName'
    let filteredList = [];
    let list = this.props.postList;
    if(this.state.searchText === '') {
      return this.props.postList;
    }
    for(let i = 0; i < list.length; i++) {
      if(list[i][filterKey].toUpperCase().indexOf(this.state.searchText.toUpperCase()) > -1) {
        filteredList.push(list[i]);
      }
    }
    return filteredList;
  }


  handleResetClick = () => {
    this.setState({ searchText: '' });
  }

  render() {
    const lists = this.filterList().map((post, index) =>
      <List post={post} onDelete={this.props.onDelete} onSubmit={(post, event) => this.props.onSubmit(post, event)} view={this.state.view} key={post.key} />
    );
    const view = this.state.view === 'list' ? <ul className="list">{lists}</ul> : <div className='grid'>{lists}</div>
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
    this.state = { newForm: false, postArray: postList, filteredList: postList }
  }

  handleClick = (event) => {
    this.setState({ newForm: !this.state.newForm })
  }

  onSubmit(event, post) {
    let posts = this.state.postArray;
    if(post.key == 0 || post.key) {
      let postIndex = this.findKeyIndex(post.key);
      posts[postIndex].postName = post.postName;
      posts[postIndex].authorName = post.authorName;
    } else {
      posts.push({key: this.state.postArray.length, postName: post.postName, authorName: post.authorName });
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
    this.setState({ postArray: posts });
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
        <PostDisplayList postList={this.state.filteredList} onDelete={this.onDelete} onSubmit={(event, arg) => this.onSubmit(arg, event)} filterPostList={this.filterPostList} handleResetClick={this.handleResetClick}/>
      </div>
    );
  }
}

export default InitialLayout;
