import { BentRectangle, ShapeProps } from "@/BentRectangle";
import React, { useState } from "react";

const MasterDiv = () => {
  const [params, setParams] = useState<ShapeProps>({
    topLeftCornerRadius: 15,
    topRightCornerRadius: 15,
    bottomLeftCornerRadius: 15,
    bottomRightCornerRadius: 15,
    topBendPercent: 7,
    bottomBendPercent: 7,
    leftBendPercent: 7,
    rightBendPercent: 7,
    bendDirection: "inward",
    style: {
      width: "300px",
      height: "200px",
    },
  });
  return <BentRectangle {...params}></BentRectangle>;
};

export default MasterDiv;
