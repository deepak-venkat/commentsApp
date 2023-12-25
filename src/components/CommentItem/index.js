import './index.css'

const CommentItem = props => {
  const {commentObj, onDeleteComment, toggleIsLiked} = props
  const {id, username, comment, date, isLiked, initialClassName} = commentObj

  const now = new Date()
  const timeDiff = now - date
  const minutesDifference = Math.floor(timeDiff / (1000 * 60))
  const timeAgoText =
    minutesDifference < 60
      ? 'less than a minute ago'
      : `${minutesDifference} minutes ago`

  const onClickDeleteBtn = () => {
    onDeleteComment(id)
  }

  const onClickLikeBtn = () => {
    toggleIsLiked(id)
  }

  const srcLink = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const likeTextClassName = isLiked ? 'blue-text' : ''

  return (
    <li className="list-item">
      <div className="cmt-card">
        <p className={`profile ${initialClassName}`}>
          {username.substring(0, 1)}{' '}
        </p>
        <div className="internal-card">
          <div className="name-time-cont">
            <h1 className="name"> {username} </h1>
            <p className="time-ago">{timeAgoText}</p>
          </div>
          <p className="comment">{comment} </p>
        </div>
      </div>
      <div className="like-del-cont">
        <button type="button" className="btn1" onClick={onClickLikeBtn}>
          <img src={srcLink} alt="like" className="like-img" />
          <p className={`like-text ${likeTextClassName}`}>Like </p>
        </button>
        <button type="button" className="btn2" onClick={onClickDeleteBtn}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete-img"
          />
        </button>
      </div>
    </li>
  )
}

export default CommentItem
