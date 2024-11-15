import ToutImage from "./ToutImage";
import React, { forwardRef } from 'react';

const ToutContent = forwardRef(({ className, header, content }, ref) => (
    <div ref={ref} className={className}>
      <div className="toutCopy w-full ">
        {/* 標題 */}
        <h1 className="toutHeader mt-5 mb-4 sm:mb-1 sm:mt-0">{header}</h1>
        {/* 內容 */}
        <div className="toutText mr-3 sm:mx-0 text-[#ccc]">
          <p>{content}</p>
        </div>
        <div className="cta text-center text-white w-auto relative inline-flex mt-12 p-4 px-8 cursor-pointer rounded-full">
          <a href="#" className="font-bold">
            Link Text
          </a>
        </div>
      </div>
      <ToutImage />
    </div>
));

export default ToutContent;