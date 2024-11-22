import ToutContent from "../../components/ToutContent";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const wrapperRef = useRef(null);
  const cont1Ref = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const cont1 = cont1Ref.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top 60%",
        end: "bottom 100%",
        scrub: 0.3,
        // markers: true,
      },
    });

    tl.to(cont1, {
      opacity: 1,
      duration: 1,
      y: "50",
      ease: "power2.out",
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const header = "About   Skateboarding";
  const content =
    "Skateboarding is a thrilling and dynamic sport that combines elements of art, athleticism, and creativity. It has grown from a niche activity into a global cultural phenomenon, influencing fashion, music, and lifestyles around the world.";

  return (
    <section
      ref={wrapperRef}
      className="relative w-full h-screen  overflow-hidden flex flex-col md:flex-row  items-center md:items-start px-8  py-0 md:py-24 md:px-10"
    >
      {/* 左側文字 */}
      <ToutContent
        className={"opacity-0  md:w-1/2 flex-1  md:mr-0"}
        header={header}
        content={content}
        ref={cont1Ref}
      />
      {/* 右側圖片 */}
      <div className=" relative h-full flex flex-1 items-center  mx-0 mb-5  md:ml-5 md:mb-20 lg:mb-0" >
        <div  className="absolute right-5 top-[-18%]  md:top-0 lg:top-0 w-7/12  md:w-9/12 lg:w-5/12   z-10 ml-10">
            <img src="/assets/images/About3.jpg" alt="placeholder" className=" object-cover shadow-lg" />
          </div>
        <div  className="my-auto  w-12/12 ">
          <img src="/assets/images/About1.jpg" alt="placeholder" className=" object-cover  shadow-lg" />
        </div>
        <div  className="absolute right-[-5%]  lg:right-0 bottom-16 lg:bottom-0 z-10     w-6/12 md:w-8/12 lg:w-4/12  ">
          <img src="/assets/images/About2.jpg" alt="placeholder" className=" object-cover shadow-lg" />
        </div>
      </div>
     
    </section>
  );
};

export default About;
