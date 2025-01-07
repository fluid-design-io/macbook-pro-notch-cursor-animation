# MacOS Notch Cursor Interaction

A delightful implementation of cursor interactions with the MacBook notch, enhancing user experience through visual feedback and playful animations.

<Callout type="info">
This project demonstrates how thoughtful UI interactions can improve both user experience and accessibility, while adding a touch of delight to everyday interactions.
</Callout>

## Implementation Overview

<Steps>
<Step>

### Cursor Tracking System

The project uses two custom hooks for precise cursor tracking:

```typescript
// Custom hook for tracking cursor position
const { x, y } = useMousePosition(elementRef);

// Custom hook for calculating distance from notch
const distance = useElementDistance(notchRef, containerRef);
```

</Step>

<Step>

### Visual Feedback System

The notch outline uses dynamic gradients that respond to cursor proximity:

```typescript
<radialGradient
  cx={calculateDistanceAroundNotch.left / (135 / 2)}
  cy={
    calculateDistanceAroundNotch.bottom > -8
      ? 1 - Math.abs(calculateDistanceAroundNotch.bottom) / 33
      : -1
  }
>
  <stop stopColor='#B4C7FF' />
  <stop offset={1} stopColor='rgba(255,255,255,0)' stopOpacity={0} />
</radialGradient>
```

</Step>

<Step>

### Gooey Effect Integration

The liquid-like cursor effect uses SVG filters:

```typescript
<svg className='w-0 h-0'>
  <filter id='gooey'>
    <feGaussianBlur in='SourceGraphic' stdDeviation='10' />
    <feColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -10' />
  </filter>
</svg>
```

</Step>
</Steps>

## Custom Hooks Explained

### useMousePosition

<DynamicCodeBlock lang="typescript" code={`
const useMousePosition = (ref: React.RefObject<HTMLDivElement>) => {
const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

useEffect(() => {
const handleMouseMove = (e: MouseEvent) => {
const { left, top } = ref.current!.getBoundingClientRect();
const x = e.clientX - left;
const y = e.clientY - top;
setMousePosition({ x, y });
};

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);

}, [ref]);

return mousePosition;
};
`} />

This hook:

- Tracks cursor position relative to a referenced element
- Uses requestAnimationFrame for performance optimization
- Returns real-time x/y coordinates

### useElementDistance

<DynamicCodeBlock lang="typescript" code={`
const useElementDistance = (
targetRef: RefObject<any>,
parentRef: RefObject<HTMLElement>
) => {
const [distance, setDistance] = useState<{
x: number;
y: number;
width: number;
height: number;
} | null>(null);

// Returns distance metrics between two elements
return distance;
};
`} />

This hook:

- Calculates distances between two DOM elements
- Updates on window resize
- Provides dimensional information for precise animations

<Callout type="warning">
Remember to provide refs to both hooks for proper functionality. The hooks are designed to work together but can be used independently if needed.
</Callout>

## Technical Implementation Details

The project combines several technical approaches:

1. **SVG Filters**: Used for creating the gooey effect
2. **Framer Motion**: Handles smooth animations
3. **Tailwind CSS**: Provides responsive styling
4. **Next.js**: Powers the overall application

<DynamicCodeBlock lang="typescript" code={`
// Example of combining these technologies
<motion.div
className="backdrop-blur-2xl"
style={{
    filter: "url(#gooey)",
    x: mousePosition.x,
    y: mousePosition.y
  }}
animate={{
    scale: isHovered ? 1.2 : 1
  }}

> {/_ Notch content _/}
> </motion.div>
> `} />

## Getting Started

<Steps>
<Step>

### Installation

```bash
pnpm install
```

</Step>

<Step>

### Development

```bash
pnpm dev
```

</Step>

<Step>

### Build

```bash
pnpm build
```

</Step>
</Steps>

## Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests

## License

MIT License - feel free to use this in your own projects!
