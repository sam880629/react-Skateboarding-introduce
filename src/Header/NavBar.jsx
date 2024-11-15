import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./NavBar.css"

const NavBar = () => {
  const navBarRef = useRef(null);
  const prevScrollposRef = useRef(null);
 


  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    const isScrollingUp = prevScrollposRef.current > currentScrollPos;
    // 使用 GSAP 改變 NavBar 的位置
    gsap.to(navBarRef.current, {
      y: isScrollingUp ? 0 : -65, // 上滑顯示，向下隱藏
      duration: 0.4,
      ease: "power2.out",
    });

    prevScrollposRef.current = currentScrollPos;

  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={navBarRef} className="nav-bar">
      <div className="nav-bar-logo ">LOGO</div>
      {/* <ul>
        <li>Technology</li>
        <li>Use Cases</li>
        <li>Company</li>
        <li>Create</li>
      </ul> */}
    </div>
  );
};

export default NavBar;