import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const NotchComponent = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={135}
    height={33}
    fill='none'
    ref={ref}
    {...props}
  >
    <path
      fill='inherit'
      d='M126.5 12.5c0-4.5 7-4.5 8.5-4.5H0c1.5 0 8.5 0 8.5 4.5V25a8 8 0 0 0 8 8h102a8 8 0 0 0 8-8V12.5Z'
    />
    <path fill='inherit' d='M0 8h135V.5H0V8Z' />
  </svg>
);
const Notch = forwardRef(NotchComponent);
export default Notch;
