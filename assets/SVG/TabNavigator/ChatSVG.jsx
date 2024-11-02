import * as React from "react";
import Svg, { Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const SvgComponent = ({ color = "#606773", isFill = false }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    data-name="Livello 1"
    viewBox="0 0 128 128"
    width={25}
    height={25}
    fill={isFill ? color : "none"}
  >
    <Path
      fill={color}
      d="M113 0H15A15 15 0 0 0 0 15v64.57a15 15 0 0 0 15 15h23.28a1 1 0 0 1 1 1V121a7 7 0 0 0 11.95 4.95l31.08-31.08a1 1 0 0 1 .71-.29h30a15 15 0 0 0 15-15V15A15 15 0 0 0 113 0Zm9 79.57a9 9 0 0 1-9 9H83a7 7 0 0 0-4.95 2L47 121.7a1 1 0 0 1-1.71-.71V95.57a7 7 0 0 0-7-7H15a9 9 0 0 1-9-9V15a9 9 0 0 1 9-9h98a9 9 0 0 1 9 9Z"
    />
  </Svg>
);
export default SvgComponent;
