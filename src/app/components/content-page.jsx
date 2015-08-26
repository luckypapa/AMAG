let React = require('react');
let mui = require('material-ui');

let Content = React.createClass({
  loadContentFromServer: function () {
    console.log('load content from server');
    // TODO: show data of content
  },
  getInitialState: function () {
    console.log('initial state');
    return {data: []};
  },
  componentDidMount: function () {
    console.log('component mounted');
    this.loadContentFromServer();
  },
  render: function () {
    return (
      <div className="content">
        1. Author of Content {this.state.data.author} <br/>
        2. Text of Content {this.state.data.text}
      </div>
    );
  }
});

let Comment = React.createClass({
  render: function() {
    let rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return (
      <div className="comment">
        3. Author of Comment {this.props.author}
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
});

let CommentList = React.createClass({
  render: function() {
    let commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.author}>
          4. Text of Comment {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

let CommentForm = React.createClass({
  handleSubmit: function (e) {
    // TODO: send comment to the server
    e.preventDefault();
    let author = React.findDOMNode(this.refs.author).value.trim();
    let text = React.findDOMNode(this.refs.text).value.trim();
    if (text === '' || author === '') {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.text).value = '';
    return;
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
      <input type="text" placeholder="Name" ref="author" />
      <input type="text" placeholder="Say something..." ref="text" />
      <input type="submit" value="Post" />
      </form>
    );
  }
});

let CommentBox = React.createClass({
  loadCommentsFromServer: function () {
    console.log('load comments from server');
  },
  handleCommentSubmit: function () {
    console.log('handle submitted comment');
    // TODO: show comment
    this.setState({data: "aaaaaaa"});
  },
  getInitialState: function () {
    return {data: []};
  },
  compoentDidMount: function () {
    this.loadCommentsFromServer();
  },
  render: function () {
    return (
      <div className="commentBox">
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

let ContentPage = React.createClass({
  render: function () {
    return (
      <div className="contentPage">
        <Content />
        <CommentBox />
      </div>
    );
  }
});

React.render(
  <ContentPage />,
  document.getElementById('content')
);
