import { useState, useEffect } from "react";
import "./NavBar.css"

const NavBar = () => {
  const [prevScrollpos, setPrevScrollpos] = useState(window.scrollY);
  const [visible, setVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    setVisible(prevScrollpos > currentScrollPos);
    setPrevScrollpos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollpos]);

  return (
    <div className= {`nav-bar ${visible?"":"nav-bar-hidden"}`}>
      <div className="nav-bar-logo">LOGO</div>
      <ul >
        <li>Technology</li>
        <li>Use Cases</li>
        <li>Company</li>
        <li>Create</li>
      </ul>
    </div>
  );
};

export default NavBar;