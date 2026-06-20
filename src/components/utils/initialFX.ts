// import { SplitText } from "gsap-trial/SplitText";
import gsap from "gsap";
// import { smoother } from "../Navbar";

export function initialFX() {
  document.body.style.overflowY = "auto";

  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      delay: 0.1,
    },
  );
}


