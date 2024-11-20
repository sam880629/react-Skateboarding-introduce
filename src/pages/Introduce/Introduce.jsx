import ToutContent from "../../components/ToutContent";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Introduce = () => {
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
      y:"50",
      ease: "power2.out",
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const header = "This is a Header";
  const content =
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quaeab illo inventore veritatis et quasi architecto beatae vitae dictasunt explicabo. Nemo enim ipsam voluptatem quia voluptas sitaspernatur aut odit aut fugit, sed quia consequuntur magni dolores eosqui ratione voluptatem sequi nesciunt. Neque porro quisquam est, quidolorem ipsum";

  return (
    <div className="relative h-screen bg-black">
      <section
        ref={wrapperRef}
        className="relative w-full h-screen overflow-hidden"
      >
        <ToutContent
          className={"opacity-0"}
          header={header}
          content={content}
          ref={cont1Ref}
        />
      </section>
    </div>
  );
};

export default Introduce;