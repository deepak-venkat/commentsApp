import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {commentsList: [], nameInput: '', commentInput: ''}

  onChangeName = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeComment = event => {
    this.setState({commentInput: event.target.value})
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const now = new Date()
    this.setState(prevState => {
      const newComment = {
        id: uuidv4(),
        username: nameInput,
        comment: commentInput,
        date: now,
        isLiked: false,
        initialClassName:
          initialContainerBackgroundClassNames[
            prevState.commentsList.length %
              initialContainerBackgroundClassNames.length
          ],
      }
      return {
        commentsList: [...prevState.commentsList, newComment],
        nameInput: '',
        commentInput: '',
      }
    })
  }

  onDeleteComment = id => {
    this.setState(prevState => {
      const {commentsList} = prevState
      const filteredList = commentsList.map(eachObj => eachObj.id !== id)
      return {commentsList: filteredList}
    })
  }

  toggleIsLiked = id => {
    this.setState(prevState => {
      prevState.commentsList.map(eachObj => {
        if (eachObj.id === id) {
          return {...eachObj, isLiked: !eachObj.isLiked}
        }
        return eachObj
      })
    })
  }

  render() {
    const {commentsList, nameInput, commentInput} = this.state
    return (
      <div className="bg-container">
        <h1 className="heading">Comments</h1>
        <div className="card">
          <form className="input-box" onSubmit={this.onAddComment}>
            <p className="description">Say something about 4.0 Technologies</p>
            <input
              type="text"
              placeholder="Your Name"
              value={nameInput}
              className="input"
              onChange={this.onChangeName}
            />
            <textarea
              rows="8"
              cols="25"
              value={commentInput}
              className="input"
              placeholder="Your Comment"
              onChange={this.onChangeComment}
            />
            <button type="submit" className="btn">
              Add Comment
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
            className="img-box"
          />
        </div>
        <p className="cmt-text">
          <span className="cmt-count">{commentsList.length} </span> Comments
        </p>
        <ul className="comments-list">
          {commentsList.map(eachObj => (
            <CommentItem
              key={eachObj.id}
              commentObj={eachObj}
              onDeleteComment={this.onDeleteComment}
              toggleIsLiked={this.toggleIsLiked}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
