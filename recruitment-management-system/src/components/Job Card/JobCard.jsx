import "../Job Card/JobCard.scss";

const JobCard = (props) => {
  const {
    id,
    position,
    location,
    created_at,
    experience,
    noOfOpening,
    active,
    onRefer,
  } = props;

  return (
    <div
      className={`job-card ${!active && " inactive-job"}`}
      onClick={(e) => props.onClick(e, id)}
    >
      <div className="job-card-upper-details">
        <p className="job-card-position-id">Job ID: {id}</p>
        <p className="job-card-title">{position}</p>
        <p className="job-card-location">{location}</p>

        {/* <p className="job-card-vacancies">Candidates : </p> */}
      </div>
      <div className="job-card-vacancies-container">
        <div className="job-card-vacancies-numbers total">
          <p className="job-card-vacancies-numbers-title ">VACANCIES</p>
          <p className="job-card-vacancies-numbers-amount-vacancy">
            {noOfOpening}
          </p>
        </div>
        <div className="job-card-vacancies-numbers experience">
          <p className="job-card-vacancies-numbers-title">EXPERIENCE</p>
          <p className="job-card-vacancies-numbers-amount-location">
            {experience}
          </p>
        </div>
      </div>
      <button className="job-card-refer" onClick={(e) => onRefer(e, id)}>
        Refer a friend
      </button>
      <div className="job-card-bottom">
        <p className="job-card-posted">Posted : {created_at} </p>
      </div>
    </div>
  );
};

export default JobCard;
