import './index.css'

const Profile = props => {
  const {profiledetails} = props
  const {names, profileImage, bio} = profiledetails
  return (
    <div className="profilebg">
      <img src={profileImage} alt="profile" />
      <h1 className="profilename">{names}</h1>
      <p>{bio}</p>
    </div>
  )
}
export default Profile
