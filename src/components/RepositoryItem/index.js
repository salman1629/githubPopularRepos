// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {itemDetails} = props
  const updatedItemDetails = {
    name: itemDetails.name,
    avatarUrl: itemDetails.avatar_url,
    issuesCount: itemDetails.issues_count,
    starsCount: itemDetails.stars_count,
    forksCount: itemDetails.forks_count,
  }
  const {
    name,
    avatarUrl,
    issuesCount,
    starsCount,
    forksCount,
  } = updatedItemDetails

  return (
    <div className="item-container">
      <div className="single-item">
        <img className="pic" src={avatarUrl} alt={name} />
        <p className="common-padding"> {name} </p>
        <div className="logo-name-container">
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
          />
          <p className="common-padding">{starsCount}</p>
        </div>
        <div className="logo-name-container">
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
          />
          <p className="common-padding">{forksCount}</p>
        </div>
        <div className="logo-name-container">
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
          />
          <p className="common-padding">{issuesCount}</p>
        </div>
      </div>
    </div>
  )
}
export default RepositoryItem
