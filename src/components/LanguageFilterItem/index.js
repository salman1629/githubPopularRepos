// Write your code here

import './index.css'

const LanguageFilterItem = props => {
  const {langDetails, isActive, getingClickedLangId} = props
  const {language, id} = langDetails
  const className = isActive ? 'selected-button' : 'fil-button'

  const onLangFilterClicked = () => getingClickedLangId(id)

  return (
    <li className="lang-item">
      <button className={className} onClick={onLangFilterClicked} type="button">
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
