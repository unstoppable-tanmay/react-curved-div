import React, { useId, useRef, useEffect, useState } from "react";

export interface ShapeProps {
  topLeftCornerRadius?: number;
  topRightCornerRadius?: number;
  bottomLeftCornerRadius?: number;
  bottomRightCornerRadius?: number;

  // Bend values as percentages of width/height
  topBendPercent?: number;
  bottomBendPercent?: number;
  leftBendPercent?: number;
  rightBendPercent?: number;

  children?: React.ReactNode;

  className?: string;
  style?: Omit<
    React.CSSProperties,
    "position" | "display" | "alignItems" | "justifyContent"
  >;

  bendDirection?: "inward" | "outward";

  contentClassName?: string;
  contentStyle?: Omit<
    React.CSSProperties,
    "mask" | "WebkitMask" | "position" | "width" | "height" | "overflowY"
  >;

  // Whether to take full width of parent
  isFullWidthOfParent?: boolean;

  // Whether to take full height of parent
  isFullHeightOfParent?: boolean;
}

export const BentRectangle: React.FC<ShapeProps> = ({
  topLeftCornerRadius = 20,
  topRightCornerRadius = 20,
  bottomLeftCornerRadius = 20,
  bottomRightCornerRadius = 20,
  topBendPercent = 5,
  bottomBendPercent = 5,
  leftBendPercent = 5,
  rightBendPercent = 5,
  children,
  className = "",
  style = {},
  bendDirection = "inward",
  contentClassName = "",
  contentStyle = {},
  isFullWidthOfParent = false,
  isFullHeightOfParent = false,
}) => {
  const id = useId().replaceAll(":", "-");
  const containerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  // Resize observer to track changes in the container's size
  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setSize({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
        }
      });

      resizeObserver.observe(containerRef.current);
      return () => resizeObserver.disconnect();
    }
  }, []);

  // Resize observer to track changes in the parent's size if using full width/height
  useEffect(() => {
    if (isFullWidthOfParent || isFullHeightOfParent) {
      if (containerRef.current && containerRef.current.parentElement) {
        parentRef.current = containerRef.current
          .parentElement as HTMLDivElement;

        const resizeObserver = new ResizeObserver(() => {
          if (parentRef.current) {
            const parentRect = parentRef.current.getBoundingClientRect();
            setSize((prevSize) => ({
              width: isFullWidthOfParent ? parentRect.width : prevSize.width,
              height: isFullHeightOfParent
                ? parentRect.height
                : prevSize.height,
            }));
          }
        });

        resizeObserver.observe(parentRef.current);
        return () => resizeObserver.disconnect();
      }
    }
  }, [isFullWidthOfParent, isFullHeightOfParent]);

  // Convert percentage to actual pixel values based on container size
  const topBend = Math.round((size.height * topBendPercent) / 100);
  const bottomBend = Math.round((size.height * bottomBendPercent) / 100);
  const leftBend = Math.round((size.width * leftBendPercent) / 100);
  const rightBend = Math.round((size.width * rightBendPercent) / 100);

  // Generate the path for the bent rectangle
  const getPath = () => {
    const { width, height } = size;
    if (!width || !height) return "";

    if (bendDirection === "outward") {
      const leftX = leftBend;
      const topY = topBend;
      const rightX = width - rightBend;
      const bottomY = height - bottomBend;

      return `
        M ${leftX + topLeftCornerRadius},${topY}
        Q ${(leftX + rightX) / 2},${topY - topBend} ${
        rightX - topRightCornerRadius
      },${topY}
        Q ${rightX},${topY} ${rightX},${topY + topRightCornerRadius}
        
        Q ${rightX + rightBend},${(topY + bottomY) / 2} ${rightX},${
        bottomY - bottomRightCornerRadius
      }
        Q ${rightX},${bottomY} ${rightX - bottomRightCornerRadius},${bottomY}
    
        Q ${(leftX + rightX) / 2},${bottomY + bottomBend} ${
        leftX + bottomLeftCornerRadius
      },${bottomY}
        Q ${leftX},${bottomY} ${leftX},${bottomY - bottomLeftCornerRadius}
    
        Q ${leftX - leftBend},${(topY + bottomY) / 2} ${leftX},${
        topY + topLeftCornerRadius
      }
        Q ${leftX},${topY} ${leftX + topLeftCornerRadius},${topY}
        Z
      `;
    }

    // Original inward bending path
    const leftX = 0;
    const topY = 0;
    const rightX = width;
    const bottomY = height;

    return `
      M ${leftX + topLeftCornerRadius},${topY}
      Q ${width / 2},${topY + topBend} ${rightX - topRightCornerRadius},${topY}
      Q ${rightX},${topY} ${rightX},${topY + topRightCornerRadius}
      
      Q ${rightX - rightBend},${height / 2} ${rightX},${
      bottomY - bottomRightCornerRadius
    }
      Q ${rightX},${bottomY} ${rightX - bottomRightCornerRadius},${bottomY}
  
      Q ${width / 2},${bottomY - bottomBend} ${
      leftX + bottomLeftCornerRadius
    },${bottomY}
      Q ${leftX},${bottomY} ${leftX},${bottomY - bottomLeftCornerRadius}
  
      Q ${leftX + leftBend},${height / 2} ${leftX},${topY + topLeftCornerRadius}
      Q ${leftX},${topY} ${leftX + topLeftCornerRadius},${topY}
      Z
    `;
  };

  // Construct the container style
  const containerStyle: React.CSSProperties = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  // Add full width/height styles if requested
  if (isFullWidthOfParent) {
    containerStyle.width = "100%";
  }

  if (isFullHeightOfParent) {
    containerStyle.height = "100%";
  }

  return (
    <div
      ref={containerRef}
      className={`bent-div-container${className}`}
      style={{ ...containerStyle, ...style }}
    >
      {/* SVG that defines the path and mask */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          {/* Define the path */}
          <path id={`bentPath-${id}`} d={getPath()} />

          {/* Define the mask */}
          <mask id={`bentMask-${id}`}>
            <path d={getPath()} fill="white" />
          </mask>
        </defs>
      </svg>

      {/* The actual container with masking applied */}
      <div
        className={`${contentClassName}`}
        style={{
          mask: `url(#bentMask-${id})`,
          WebkitMask: `url(#bentMask-${id})`,
          position: "absolute",
          width: "100%",
          height: "100%",
          overflowY: "scroll",
          ...contentStyle,
        }}
      >
        {children}
      </div>
    </div>
  );
};
