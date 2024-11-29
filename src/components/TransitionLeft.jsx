import { gsap } from "gsap";
import { useEffect, useRef } from "react";

const TransitionLeft = () => {

  const barsRef = useRef([]); 
  const counterRef = useRef(null); 

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(counterRef,{
        opacity: 0
    }).to(
      barsRef.current,
      {
        x: "-100%",
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1, 
      },
    );
  }, []);

  return (
    <div
      ref={counterRef}
      className="flex  flex-col w-full  h-screen fixed top-0 left-0 optional-1 z-20 "
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="w-full h-1/5 bg-[#222]" 
          ref={(el) => (barsRef.current[index] = el)} 
        ></div>
      ))}
    </div>
  );
};

export default TransitionLeft;
