import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import Profile from '../Profile'
import Jobcard from '../Jobcard'

import './index.css'

// These are the lists used in the application. You can move them to any component needed.
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Job extends Component {
  state = {
    searchinput: '',
    profilestatus: '',
    profiledetails: '',
    employee: [],
    salaryrange: '',
    liststatus: '',
    joblist: [],
  }

  componentDidMount = () => {
    this.getprofiledetails()
    this.getjob()
  }

  getcamelcase = each => ({
    companyLogoUrl: each.company_logo_url,
    id: each.id,
    jobDescription: each.job_description,
    location: each.location,
    packagePerAnnum: each.package_per_annum,
    rating: each.rating,
    title: each.title,
    employmentType: each.employment_type,
  })

  getjob = async () => {
    const {employee, salaryrange, searchinput} = this.state
    const employTypes = employee.join(',')
    this.setState({liststatus: 'LOAD'})
    const jwt = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employTypes}&minimum_package=${salaryrange}&search=${searchinput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const update = data.jobs
      const list = update.map(each => this.getcamelcase(each))
      this.setState({joblist: list, liststatus: 'SUCCESS'})
    } else {
      this.setState({liststatus: 'FAIL'})
    }
  }

  getprofiledetails = async () => {
    this.setState({profilestatus: 'LOAD'})
    const jwt = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const update = data.profile_details
      const details = {
        names: update.name,
        profileImage: update.profile_image_url,
        bio: update.short_bio,
      }
      this.setState({profiledetails: details, profilestatus: 'SUCCESS'})
    } else {
      this.setState({profilestatus: 'FAIL'})
    }
  }

  loading = () => (
    <div data-testid="loader" className="loading">
      <Loader type="ThreeDots" color="#fff" height="50" width="50" />
    </div>
  )

  successcall = () => {
    const {profiledetails} = this.state
    return <Profile profiledetails={profiledetails} />
  }

  failcall = () => (
    <div className="failcall">
      <button type="button" className="logout" onClick={this.getprofiledetails}>
        Retry
      </button>
    </div>
  )

  getprofile = () => {
    const {profilestatus} = this.state

    switch (profilestatus) {
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

  renderEmploymentTypesList = each => {
    const updateTypeslist = () => {
      const {employee} = this.state

      if (employee.includes(each.employmentTypeId)) {
        const update = employee.filter(type => type !== each.employmentTypeId)
        this.setState({employee: [...update]}, this.getjob)
      } else {
        this.setState(
          {employee: [...employee, each.employmentTypeId]},
          this.getjob,
        )
      }
    }
    return (
      <li className="fliters-list-item" key={each.employmentTypeId}>
        <input
          type="checkbox"
          className="checkbox-input"
          id={each.employmentTypeId}
          onChange={updateTypeslist}
        />
        <label htmlFor={each.employmentTypeId} className="filter-label">
          {each.label}
        </label>
      </li>
    )
  }

  getemployee = () => (
    <div>
      <h1 className="employeetitle">Type of Employment</h1>
      <ul className="filters-list">
        {employmentTypesList.map(each => this.renderEmploymentTypesList(each))}
      </ul>
    </div>
  )

  rendersalaryList = each => {
    const updateTypeslist = () => {
      const {salaryrange} = this.state
      this.setState({salaryrange: each.salaryRangeId}, this.getjob)
      console.log(salaryrange)
    }
    return (
      <li className="fliters-list-item" key={each.salaryRangeId}>
        <input
          type="radio"
          className="checkbox-input"
          id={each.salaryRangeId}
          name="salary ranges"
          onChange={updateTypeslist}
        />
        <label htmlFor={each.salaryRangeId} className="filter-label">
          {each.label}
        </label>
      </li>
    )
  }

  getsalary = () => (
    <div>
      <h1 className="employeetitle">Salary Range</h1>
      <ul className="filters-list">
        {salaryRangesList.map(each => this.rendersalaryList(each))}
      </ul>
    </div>
  )

  inputchange = event => {
    this.setState({searchinput: event.target.value})
  }

  listload = () => (
    <div data-testid="loader" className="loading">
      <Loader type="ThreeDots" color="#fff" height="50" width="50" />
    </div>
  )

  listsuccess = () => {
    const {joblist} = this.state
    const len = joblist.length > 0
    return len ? (
      <ul className="joblist">
        {joblist.map(each => (
          <Jobcard key={each.id} jobdetails={each} />
        ))}
      </ul>
    ) : (
      <div className="nojobs">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters.</p>
      </div>
    )
  }

  listfail = () => (
    <div className="listfail">
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

  onjobs = () => {
    const {liststatus} = this.state

    switch (liststatus) {
      case 'LOAD':
        return this.listload()
      case 'SUCCESS':
        return this.listsuccess()
      case 'FAIL':
        return this.listfail()

      default:
        return null
    }
  }

  render() {
    const {searchinput, joblist} = this.state
    console.log(joblist)

    return (
      <div className="jobbg">
        <Header />
        <div className="jobbody">
          <div className="sidebar">
            <div className="profilecontainer">{this.getprofile()}</div>
            <hr className="line" />
            {this.getemployee()}
            <hr className="line" />
            {this.getsalary()}
          </div>
          <div className="mainbody">
            <div className="searchbar">
              <input
                type="search"
                value={searchinput}
                placeholder="Search"
                onChange={this.inputchange}
              />
              <button
                className="search-button"
                type="button"
                data-testid="searchButton"
                onClick={this.getjob}
              >
                .<BsSearch className="searchicon" />
              </button>
            </div>
            {this.onjobs()}
          </div>
        </div>
      </div>
    )
  }
}
export default Job
