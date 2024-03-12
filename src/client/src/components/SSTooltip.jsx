import { useState } from "react";
import { FaQuestionCircle } from 'react-icons/fa';

const SSTooltip = ({ content }) => {

    const [isVisible, setIsVisible] = useState(false);
  
    const showTooltip = () => setIsVisible(true);
    const hideTooltip = () => setIsVisible(false);
  
    return (
      <div className="tooltip-container" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
        <span className="question-mark d-flex align-items-center"><FaQuestionCircle size={12} /></span>
        {isVisible && <div className="tooltip">{content}</div>}
      </div>
    );
  };
  
  export default SSTooltip;