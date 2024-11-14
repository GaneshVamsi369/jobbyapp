import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import './index.css'

const Jobcard = props => {
  const {jobdetails} = props
  const {
    companyLogoUrl,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    employmentType,
  } = jobdetails

  return (
    <li className="jobitem">
      <Link to={`/jobs/${id}`} className="link">
        <div className="companydetails">
          <img src={companyLogoUrl} alt="company logo" />
          <div className="companttitle">
            <h3>{title}</h3>
            <div className="ratingdetails">
              <AiFillStar className="star" />
              <p className="type">{rating}</p>
            </div>
          </div>
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
          <p>{packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <div className="description">
          <h3>Description</h3>
          <p className="type">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}
export default Jobcard
