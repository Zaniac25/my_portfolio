import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Data Science Intern</h4>
                <h5>SkillOTech</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Performed data analysis, preprocessing, visualization and
              exploratory data analysis using Python, SQL, Pandas and NumPy.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI & Cloud Technologies Intern</h4>
                <h5>Edunet Foundation</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Built AI-based applications and worked with cloud-enabled AI
              development workflows.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI/ML Intern</h4>
                <h5>Internship Studio</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Developed Face Recognition systems using Python and OpenCV and
              applied computer vision techniques to real-world problems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
