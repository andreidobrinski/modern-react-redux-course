import React, { Component } from 'React';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
  componentDidMount() {
    // if (!this.props.post) {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
    // } This will conserve network use if the post was already fetched from index
    // Commenting this out will fetch fresh data every time
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
    // Call an action creator from this.props
  }

  render() {
    const { post } = this.props;

    if(!post) {
      return <div>Loading...</div>;
    }
    //Use this when you return a property of undefined

    return (
      <div>
        <Link to="/">Back to Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
