import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              M TARINI
              <br />
              <span>PRASAD</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>A Creative</h3>
            <h2 className="landing-info-h2">
              <span className="role role-developer">Python</span>
              <span className="role role-analyst">Data</span>
            </h2>
            <h2>
              <span className="role role-developer">Developer</span>
              <span className="role role-analyst">Analyst</span>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
