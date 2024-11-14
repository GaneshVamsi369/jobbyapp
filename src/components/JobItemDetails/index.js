import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import Header from '../Header'
import Similar from '../Similar'
import './index.css'

class JobItemDetails extends Component {
  state = {status: '', job: {}, similar: []}

  componentDidMount = () => {
    this.getjob()
  }

  getCamelCasedData = data => {
    const jobDetails = data.job_details

    const updatedJobDetails = {
      companyLogoUrl: jobDetails.company_logo_url,
      companyWebsiteUrl: jobDetails.company_website_url,
      employmentType: jobDetails.employment_type,
      jobDescription: jobDetails.job_description,
      location: jobDetails.location,
      rating: jobDetails.rating,
      title: jobDetails.title,
      packagePerAnnum: jobDetails.package_per_annum,
      skills: jobDetails.skills.map(eachSkill => ({
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      })),
      lifeAtCompnay: {
        description: jobDetails.life_at_company.description,
        imageUrl: jobDetails.life_at_company.image_url,
      },
    }

    const similarJobs = data.similar_jobs.map(eachJob => ({
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      jobDescription: eachJob.job_description,
      location: eachJob.location,
      rating: eachJob.rating,
      title: eachJob.title,
    }))

    return {updatedJobDetails, similarJobs}
  }

  getjob = async () => {
    this.setState({status: 'LOAD'})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const {updatedJobDetails, similarJobs} = this.getCamelCasedData(data)
      this.setState({
        job: updatedJobDetails,
        similar: similarJobs,
        status: 'SUCCESS',
      })
    } else {
      this.setState({status: 'FAIL'})
    }
  }

  loading = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#fff" height="50" width="50" />
    </div>
  )

  successcall = () => {
    const {job} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      rating,
      title,
      packagePerAnnum,
      skills,
      lifeAtCompnay,
    } = job
    const {description, imageUrl} = lifeAtCompnay

    return (
      <div className="detailscontainer">
        <div className="companydetails">
          <img src={companyLogoUrl} alt="job details company logo" />
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
          <div className="descriptioncont">
            <h3>Description</h3>
            <a href={companyWebsiteUrl} className="company-link">
              Visit
              <FiExternalLink className="external-link-logo" />
            </a>
          </div>

          <p className="type">{jobDescription}</p>
        </div>
        <h1>Skills</h1>
        <ul className="skills">
          {skills.map(each => (
            <li key={each.name}>
              <img src={each.imageUrl} alt={each.name} />
              <p>{each.name}</p>
            </li>
          ))}
        </ul>
        <h1>Life at Company</h1>
        <div className="lifecontainer">
          <p>{description}</p>
          <img src={imageUrl} alt="life at company" />
        </div>
      </div>
    )
  }

  failcall = () => (
    <div className="failcall">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" className="logout" onClick={this.getjob}>
        Retry
      </button>
    </div>
  )

  getbody = () => {
    const {status} = this.state
    switch (status) {
      case 'LOAD':
        return this.loading()
      case 'SUCCESS':
        return this.successcall()
      case 'FAIL':
        return this.failcall()

      default:
        return null
    }
  }

  render() {
    const {similar} = this.state
    return (
      <div className="jobbg">
        <Header />
        <div className="descriptioncontainer">{this.getbody()}</div>
        <h1 className="similartitle">Similar Jobs</h1>
        <ul>
          {similar.map(each => (
            <Similar key={each.id} item={each} />
          ))}
        </ul>
      </div>
    )
  }
}
export default JobItemDetails
