const PasswordList = props => {
  const {each, ischecked, deleteIdCheck} = props
  const {
    id,
    userEnteredWebsite,
    userEnteredUserName,
    userEnteredPassword,
  } = each

  const sendingClickedId = () => {
    deleteIdCheck(id)
  }

  return (
    <li>
      <p>{userEnteredUserName}</p>
      <p>{userEnteredWebsite}</p>
      {ischecked ? (
        <p>{userEnteredPassword}</p>
      ) : (
        <img
          alt="stars"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
        />
      )}

      <button data-testid="delete" onClick={sendingClickedId} type="button">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordList
