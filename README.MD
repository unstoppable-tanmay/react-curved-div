# BentRectangle Component

The `BentRectangle` component is a customizable React component that renders a rectangle with bent edges. It supports various configurations for corner radii, edge bending, and styling, making it highly versatile for creating unique UI elements.

![Bent Div](https://github.com/unstoppable-tanmay/react-curved-div/blob/main/images/image-1.png?raw=true)

## Installation

To install the package, use npm or yarn:

```bash
npm install react-curved-div
```

> # Checkout Some Examples Live On [Website](https://react-curved-div-site.vercel.app/).

## Usage

Import the `BentRectangle` component into your React project:

```jsx
import React from "react";
import { BentRectangle } from "react-curved-div";

const App = () => (
  <BentRectangle
    topLeftCornerRadius={10}
    topRightCornerRadius={10}
    bottomLeftCornerRadius={20}
    bottomRightCornerRadius={20}
    topBendPercent={10}
    bottomBendPercent={15}
    leftBendPercent={5}
    rightBendPercent={5}
    bendDirection="outward"
    className="custom-shape"
    style={{ backgroundColor: "lightblue" }}
    contentClassName="custom-content"
    contentStyle={{ padding: "20px" }}
    isFullWidthOfParent={true}
    isFullHeightOfParent={true}
  >
    <p>This is a bent rectangle with custom styles and content.</p>
  </BentRectangle>
);

export default App;
```

## Props

### Corner Radius

- `topLeftCornerRadius` (number): Radius for the top-left corner of the shape (in pixels). Default is `0`.
- `topRightCornerRadius` (number): Radius for the top-right corner of the shape (in pixels). Default is `0`.
- `bottomLeftCornerRadius` (number): Radius for the bottom-left corner of the shape (in pixels). Default is `0`.
- `bottomRightCornerRadius` (number): Radius for the bottom-right corner of the shape (in pixels). Default is `0`.

### Edge Bending

- `topBendPercent` (number): Percentage of the width to bend the top edge of the shape. Values should be between `0` and `100`. Default is `0`.
- `bottomBendPercent` (number): Percentage of the width to bend the bottom edge of the shape. Values should be between `0` and `100`. Default is `0`.
- `leftBendPercent` (number): Percentage of the height to bend the left edge of the shape. Values should be between `0` and `100`. Default is `0`.
- `rightBendPercent` (number): Percentage of the height to bend the right edge of the shape. Values should be between `0` and `100`. Default is `0`.

### Content and Styling

- `children` (React.ReactNode): React children to be rendered inside the shape.
- `className` (string): Additional class name(s) to apply to the shape container. Default is an empty string.
- `style` (React.CSSProperties): Inline styles to apply to the shape container. Excludes properties related to positioning and layout.
- `contentClassName` (string): Additional class name(s) to apply to the content inside the shape. Default is an empty string.
- `contentStyle` (React.CSSProperties): Inline styles to apply to the content inside the shape. Excludes properties related to masking, positioning, and overflow.

### Layout

- `isFullWidthOfParent` (boolean): Whether the shape should take the full width of its parent container. Default is `false`.
- `isFullHeightOfParent` (boolean): Whether the shape should take the full height of its parent container. Default is `false`.

### Bending Direction

- `bendDirection` ("inward" | "outward"): Direction of the bend for the edges of the shape. Can be either `"inward"` or `"outward"`. Default is `"inward"`.

## Behavior

- The component uses `ResizeObserver` to dynamically adjust the size of the shape based on its container or parent dimensions.
- The bending percentages are converted into pixel values based on the container's size.
- The shape is rendered using an SVG path and mask, allowing for precise control over its appearance.

## Example Images

Below are some example images showcasing the `BentRectangle` component you can use for:

1. **Inward Bending**:
   ![Inward Bending Example](https://github.com/unstoppable-tanmay/react-curved-div/blob/main/images/image.png?raw=true)

2. **Outward Bending**:
   ![Outward Bending Example](https://github.com/unstoppable-tanmay/react-curved-div/blob/main/images/image-3.png?raw=true)

## Notes

- Ensure that the parent container has a defined size if using `isFullWidthOfParent` or `isFullHeightOfParent`.
- The component is responsive and adjusts dynamically to changes in its container or parent dimensions.

## License

This project is licensed under the [MIT License](LICENSE).
