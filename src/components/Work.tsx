import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const projects = [
  {
    number: "01",
    title: "Smart Attendance System",
    category: "AI • Computer Vision",
    tools: "Python, Django, OpenCV, Face Recognition, SQLite, REST API",
    image: "/images/projects/attendance.webp",
  },
  {
    number: "02",
    title: "Smart Data Analytics Dashboard",
    category: "Data Analytics",
    tools: "Python, Streamlit, Pandas, NumPy, Plotly, Data Cleaning",
    image: "/images/projects/dashboard.webp",
  },
  {
    number: "03",
    title: "BizBuddy",
    category: "AI Business Assistant (In Development)",
    tools: "Python, AI, Business Intelligence, Automation",
    image: "/images/projects/bizbuddy.webp",
  },
  {
    number: "04",
    title: "Hand Gesture & Voice Control System",
    category: "Computer Vision",
    tools: "Python, OpenCV, MediaPipe, Speech Recognition, PyAutoGUI",
    image: "/images/projects/gesture.webp",
  },
  {
    number: "05",
    title: "AI Assistant Chatbot",
    category: "Generative AI",
    tools: "Python, Streamlit, Gemini API, Session Memory",
    image: "/images/projects/chatbot.webp",
  },
  {
    number: "06",
    title: "ladgames.online",
    category: "Gaming Website",
    tools: "HTML, CSS, JavaScript, Netlify, GameMonetize",
    image: "/images/projects/ladgames.webp",
  },
];

const Work = () => {
  useGSAP(() => {
  let translateX: number = 0;

  function setTranslateX() {
    const box = document.getElementsByClassName("work-box");
    const rectLeft = document
      .querySelector(".work-container")!
      .getBoundingClientRect().left;
    const rect = box[0].getBoundingClientRect();
    const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
    let padding: number =
      parseInt(window.getComputedStyle(box[0]).padding) / 2;
    translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
  }

  setTranslateX();

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: `+=${translateX}`, // Use actual scroll width
      scrub: true,
      pin: true,
      id: "work",
    },
  });

  timeline.to(".work-flex", {
    x: -translateX,
    ease: "none",
  });

  // Clean up (optional, good practice)
  return () => {
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project) => (
            <div className="work-box" key={project.number}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{project.number}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image={project.image} alt={project.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
