import ToutImage from "./ToutImage";
import React, { forwardRef } from 'react';

const ToutContent = forwardRef(({ className, header, content }, ref) => (
    <div ref={ref} className={className}>
      <div className="toutCopy w-full  ">
        {/* 標題 */}
        <h1 className="toutHeader mt-5 mb-4 sm:mb-1 sm:mt-0 text-2xl md:text-4xl lg:text-6xl"  style={{ fontFamily: "'Rubik Mono One', sans-serif" }}>{header}</h1>
        {/* 內容 */}
        <div className="mt-6 mr-3 sm:mx-0 text-[#ccc] text-sm md:text-xl lg:text-2xl">
          <p>{content}</p>
        </div>
      </div>
    </div>
));

export default ToutContent;