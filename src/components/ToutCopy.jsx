import React from "react";
import ReactDOM from "react-dom";
import { motion } from 'framer-motion';
// import {Fade} from "react-reveal/Fade";
import ToutText from "./ToutText";
import ToutHeader from "./ToutHeader";
import Cta from "./Cta";

class ToutCopy extends React.Component {
  render() {
    return (
      <div className="toutCopy w-full sm:w-1/2">
        <motion.div bottom>
          <ToutHeader />
          <ToutText />
          <Cta />
        </motion.div>
      </div>
    );
  }
}

export default ToutCopy;
