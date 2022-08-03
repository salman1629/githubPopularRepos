import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    popularReposList: [],
    apiStatus: apiStatusConstant.initial,
    chooseingLang: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getAllRepos()
  }

  filterBasedOnLang = id => {
    this.setState({chooseingLang: id}, this.getAllRepos)
  }

  getAllRepos = async () => {
    const {chooseingLang} = this.state
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const url = `https://apis.ccbp.in/popular-repos?language=${chooseingLang}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()

      const updatedData = {
        popularRepos: data.popular_repos,
      }
      const {popularRepos} = updatedData

      this.setState({
        popularReposList: popularRepos,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  getSuccessView = () => {
    const {popularReposList} = this.state
    return (
      <ul className="all-items-container">
        {popularReposList.map(each => (
          <RepositoryItem itemDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  getFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  getInprogressView = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={50} width={50} />
    </div>
  )

  renderSwitch(apiStatus) {
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.getSuccessView()
      case apiStatusConstant.inProgress:
        return this.getInprogressView()
      case apiStatusConstant.failure:
        return this.getFailureView()
      default:
        return <div>hi</div>
    }
  }

  render() {
    const {apiStatus, chooseingLang} = this.state
    return (
      <div className="bg-container">
        <h1 className="popular-heading">Popular</h1>
        <ul className="lang-filter-contaier">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              getingClickedLangId={this.filterBasedOnLang}
              isActive={each.id === chooseingLang}
              langDetails={each}
              key={each.id}
            />
          ))}
        </ul>
        {this.renderSwitch(apiStatus)}
      </div>
    )
  }
}
export default GithubPopularRepos
