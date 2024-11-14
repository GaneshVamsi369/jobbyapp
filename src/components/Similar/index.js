import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const Similar = props => {
  const {item} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = item
  console.log('1')

  return (
    <li className="similar-job-card">
      <div className="companydetails">
        <img src={companyLogoUrl} alt="similar job company logo" />
        <div className="companttitle">
          <h3>{title}</h3>
          <div className="ratingdetails">
            <AiFillStar className="star" />
            <p className="type">{rating}</p>
          </div>
        </div>
      </div>
      <div className="description">
        <h3>Description</h3>
        <p className="type">{jobDescription}</p>
      </div>
      <div className="packagecontainer">
        <div className="package">
          <div className="addition">
            <IoLocationSharp />
            <p className="type">{location}</p>
          </div>
          <div className="addition">
            <BsFillBriefcaseFill />
            <p className="type">{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default Similar
