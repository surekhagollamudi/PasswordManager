import {Component} from 'react'
import {v4} from 'uuid'
import PasswordList from '../PasswordList'
import './index.css'

class PasswordManager extends Component {
  state = {
    userEnteredWebsite: '',
    userEnteredUserName: '',
    userEnteredPassword: '',
    userEnteredList: [],
    ischecked: false,
  }

  userEnteredWebsite = event => {
    const {userEnteredWebsite} = this.state
    this.setState({userEnteredWebsite: event.target.value})
  }

  userEnteredUserName = event => {
    const {userEnteredUserName} = this.state
    this.setState({userEnteredUserName: event.target.value})
  }

  userEnteredPassword = event => {
    const {userEnteredPassword} = this.state
    this.setState({userEnteredPassword: event.target.value})
  }

  addAndAppendToList = event => {
    event.preventDefault()
    const {
      userEnteredWebsite,
      userEnteredUserName,
      userEnteredPassword,
    } = this.state

    const newUserEnteredList = {
      id: v4(),
      userEnteredWebsite,
      userEnteredUserName,
      userEnteredPassword,
    }

    this.setState(prevState => ({
      userEnteredList: [...prevState.userEnteredList, newUserEnteredList],
      userEnteredWebsite: '',
      userEnteredUserName: '',
      userEnteredPassword: '',
      userFilteredList: '',
    }))
  }

  showPassword = () => {
    this.setState(prevState => ({ischecked: !prevState.ischecked}))
  }

  deleteIdCheck = id => {
    const {userEnteredList} = this.state
    const newList = userEnteredList.filter(each => each.id !== id)
    this.setState({userEnteredList: newList})
  }

  searchEngine = event => {
    const {userFilteredList} = this.state
    this.setState({userFilteredList: event.target.value})
  }

  render() {
    const {
      userEnteredWebsite,
      userEnteredUserName,
      userEnteredPassword,
      ischecked,
      userEnteredList,
      userFilteredList,
    } = this.state

    const newList = userEnteredList.filter(each =>
      each.userEnteredWebsite
        .toLowerCase()
        .includes(userFilteredList.toLowerCase()),
    )

    return (
      <div>
        <div>
          <h1>Add New Password</h1>
          <img
            className="passwordmanager-logo"
            alt="app logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          />
        </div>
        <form
          onSubmit={this.addAndAppendToList}
          className="password-enter-container"
        >
          <ul>
            <li key="0">
              <img
                alt="website"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
              />
              <input
                onChange={this.userEnteredWebsite}
                type="text"
                placeholder="Enter Website"
                value={userEnteredWebsite}
              />
            </li>
            <li key="1">
              <img
                alt="username"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
              />
              <input
                value={userEnteredUserName}
                onChange={this.userEnteredUserName}
                type="text"
                placeholder="Enter Username"
              />
            </li>
            <li key="2">
              <img
                alt="password"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
              />
              <input
                value={userEnteredPassword}
                onChange={this.userEnteredPassword}
                type="password"
                placeholder="Enter Password"
              />
            </li>
            <button type="submit">Add</button>
          </ul>
          <div>
            <img
              className="password-bg-logo"
              alt="password manager"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png "
            />
          </div>
        </form>
        <div>
          <h1>
            Your Passwords <p>{userEnteredList.length}</p>
          </h1>
          <ul>
            <div>
              <input
                onChange={this.showPassword}
                type="checkbox"
                id="tocheck"
              />
              <label htmlFor="tocheck">Show passwords</label>
            </div>
            <div>
              <input onChange={this.searchEngine} type="search" />
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
            </div>

            {newList.map(each => (
              <PasswordList
                deleteIdCheck={this.deleteIdCheck}
                ischecked={ischecked}
                each={each}
                key={each.id}
              />
            ))}
          </ul>
          <div>
            {newList.length === 0 && (
              <div>
                <img
                  alt="no passwords"
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png "
                />
                <p>No Passwords</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
