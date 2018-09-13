import React, { Component } from 'react';
import './App.css';

const postList = [[0, 'sport', 'himanshu'], [1, 'fashion', 'deepika'], [2, 'politics', 'rahul']]

class List extends React.Component {
  render() {
    function editPost(key, post, handleSubmit, handleInputChange) {
      if (key.length != 0 && key == post[0] ) {
        return <PostForm editPost="true" authorName={post[2]} postName={post[1]} onSubmit={handleSubmit} onChange={handleInputChange} />;
      }
    }
    const lists = this.props.postList.map((post, index) =>
      <li key={post[0]} id={post[0]}>{ post[1] + ' ' + post[2] }
        <button onClick={this.props.handleEditClick}>Edit</button>
        <button onClick={this.props.onDelete}>Delete</button>
        {editPost(this.props.editPostkey, post, this.props.onSubmit, this.props.onChange)}
      </li>
    );
    return (
      <ul>{lists}</ul>
    );
  }
}

class PostForm extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <label>
          Title:
          <input type="text" className='postName' onChange={this.props.onChange} />
        </label>
        <br />
        <label>
          Author Name:
          <input type="text" className='authorName' onChange={this.props.onChange}/>
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
    this.state = { newForm: false, postArray: postList, authorName: '', postName: '', editPost: false, editPostkey: '' }
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.count = this.state.postArray.length;
    this.onDelete = this.onDelete.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  handleClick(event) {
    this.setState({ newForm: !this.state.newForm })
  }

  handleInputChange(event) {
    if(event.target.className === 'postName') {
      this.setState({ postName: event.target.value});
    } else {
      this.setState({ authorName: event.target.value});
    }
  }

  handleSubmit(event) {
    let posts = this.state.postArray;
    if(this.state.editPost) {
      let postIndex = this.findKeyIndex(this.state.editPostkey)
      posts[postIndex][1] = this.state.postName;
      posts[postIndex][2] = this.state.authorName;
      this.setState({editPost: true, editPostkey: ''})
    } else {
      posts.push([this.count, this.state.postName, this.state.authorName])
      this.count += 1;
    }
    this.setState({ postArray: posts });
    event.preventDefault();
  }

  findKeyIndex(key) {
    for(var i = 0; i < this.state.postArray.length; i++) {
      if (this.state.postArray[i][0] == key) {
        return i;
      }
    }
  }

  handleEditClick(event) {
    this.setState({editPost: true, editPostkey: event.target.parentElement.id})
  }

  onDelete(event) {
    let keyValueIndex = this.findKeyIndex(event.target.parentElement.id)
    let posts = Object.assign([], this.state.postArray);
    posts.splice(keyValueIndex, 1);
    this.setState({postArray: posts});
  }

  render() {
    let form;
    let button;
    if (this.state.newForm) {
      form = <PostForm onSubmit={this.handleSubmit} onChange={this.handleInputChange}  />;
      button = <button onClick={this.handleClick}> Hide Form </button>;
    } else {
      form = '';
      button = <button onClick={this.handleClick}> Show Form </button>;
    }
    return (
      <div>
        {form}
        {button}
        <List postList={this.state.postArray} onDelete={this.onDelete} editPostkey={this.state.editPostkey} editPost={this.state.editPost} handleEditClick={this.handleEditClick} onSubmit={this.handleSubmit} onChange={this.handleInputChange} />
      </div>
    );
  }
}

export default InitialLayout;
