import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const NotchComponent = (
  props: {
    cx: number;
    cy: number;
    className?: string;
  },
  ref: Ref<SVGSVGElement>
) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={136}
    height={42}
    fill='none'
    ref={ref}
    {...props}
  >
    <path
      fill='url(#a)'
      fillRule='evenodd'
      d='M7.488 10.373c-1.995-2-6.343-2-7.488-2v-3.5h135v7.5c-1.145 0-5.493 0-7.488 2-.619.621-1.012 1.435-1.012 2.5v12.5a8 8 0 0 1-8 8h-102a8 8 0 0 1-8-8v-12.5c0-1.065-.393-5.879-1.012-6.5Zm127.512 0v2.597c-.767 0 .5 0 0 0-2 0-4.5 2.403-4.5 4.403v12c0 6.628-5.373 12-12 12h-102c-6.627 0-12-5.372-12-12v-12.5C4.354 16.791 4 13 1 12.97c-1.384-.014.07 0-.697 0L0 10.373v-9.5h135v9.5Z'
      clipRule='evenodd'
    />
    <defs>
      <radialGradient
        id='a'
        cx={props.cx}
        cy={props.cy}
        r={1}
        gradientTransform='matrix(49.99998 20.49996 -72.3828 176.54365 21.5 20)'
        gradientUnits='userSpaceOnUse'
        className='mix-blend-screen'
      >
        <stop stopColor='#B4C7FF' />
        <stop stopColor='rgba(255,255,255,0)' offset={1} stopOpacity={0} />
      </radialGradient>
    </defs>
  </svg>
);
const NotchOutline = forwardRef(NotchComponent);
export default NotchOutline;
