import { ToastType, cssClassNames } from "@toastup/core";
import React from "react";
import { IconProps } from "../reactTypes";

const Svg: React.FC<React.SVGProps<SVGSVGElement>> = ({ children }) => {
  return (
    <svg
      width="41.093mm"
      height="41.007mm"
      version="1.1"
      viewBox="0 0 41.093 41.007"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
};

interface BuiltInIconProps {
  stroke: string;
  fill: string;
}

function BaseIcon({ stroke, fill }: BuiltInIconProps) {
  return (
    <Svg>
      <g transform="translate(-148.59 -192.01)" strokeWidth={3.7042}>
        <ellipse
          style={{ fill }}
          className={`${cssClassNames.toastIconFill}`}
          cx="164.2"
          cy="205.49"
          rx="2.8477"
          ry="3.8206"
        />
        <ellipse
          style={{ fill }}
          className={`${cssClassNames.toastIconFill}`}
          cx="174.07"
          cy="205.49"
          rx="2.8477"
          ry="3.8206"
        />
        <path
          style={{ stroke }}
          className={`${cssClassNames.toastIconStroke}`}
          d="m161.21 217.24c5.1515 5.6161 10.42 5.6352 15.863-0.1094"
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeWidth={3.7042}
        />
        <path
          style={{ stroke }}
          className={`${cssClassNames.toastIconStroke}`}
          d="m180.65 197.82a18.696 18.652 0 0 1 4.9199 23.598 18.696 18.652 0 0 1-22.517 8.7357 18.696 18.652 0 0 1-12.353-20.714 18.696 18.652 0 0 1 18.44-15.573"
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3.7042}
        />
      </g>
    </Svg>
  );
}

function SuccessIcon({ stroke }: BuiltInIconProps) {
  return (
    <Svg>
      <g transform="translate(-8.8587 -176.45)" strokeWidth="3.7042">
        <g
          style={{ stroke }}
          className={`${cssClassNames.toastIconStroke}`}
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m20.931 198.7c3.4294 2.513 4.0134 2.6281 5.5929 6.9911" />
          <path d="m26.524 205.69c1.2385-8.0911 5.9746-13.073 11.361-17.478" />
          <path d="m40.918 182.25a18.696 18.652 0 0 1 4.9199 23.598 18.696 18.652 0 0 1-22.517 8.7357 18.696 18.652 0 0 1-12.353-20.714 18.696 18.652 0 0 1 18.44-15.573" />
        </g>
      </g>
    </Svg>
  );
}

function InfoIcon({ stroke }: BuiltInIconProps) {
  return (
    <Svg>
      <g transform="translate(-84.333 -192.97)" strokeWidth="3.7042">
        <g
          style={{ stroke }}
          className={`${cssClassNames.toastIconStroke}`}
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m104.88 210.32v14.196" />
          <path d="m104.88 202.43v1.2713" />
          <path d="m116.6 198.94a18.696 18.652 0 0 1 4.6211 23.607 18.696 18.652 0 0 1-22.546 8.5217 18.696 18.652 0 0 1-12.219-20.735 18.696 18.652 0 0 1 18.429-15.509" />
        </g>
      </g>
    </Svg>
  );
}

function WarningIcon({ stroke }: BuiltInIconProps) {
  return (
    <Svg>
      <g transform="translate(-144.8 -131.75)" strokeWidth="3.7042">
        <g
          style={{ stroke }}
          className={`${cssClassNames.toastIconStroke}`}
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m165.35 155.41v-14.196" />
          <path d="m165.35 163.29v-1.2713" />
          <path d="m176.86 137.56a18.696 18.652 0 0 1 4.9199 23.598 18.696 18.652 0 0 1-22.517 8.7357 18.696 18.652 0 0 1-12.353-20.714 18.696 18.652 0 0 1 18.44-15.573" />
        </g>
      </g>
    </Svg>
  );
}

function ErrorIcon({ stroke }: BuiltInIconProps) {
  return (
    <Svg>
      <g transform="translate(-61.254 -121.56)" strokeWidth="3.7042">
        <g
          style={{ stroke }}
          className={`${cssClassNames.toastIconStroke}`}
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m73.781 152.04c4.0448-7.9527 10.073-13.922 16.046-19.946" />
          <path d="m74.335 133.3c3.4073 6.5707 8.1275 11.959 13.912 16.388" />
          <path d="m93.314 127.37a18.696 18.652 0 0 1 4.9199 23.598 18.696 18.652 0 0 1-22.517 8.7357 18.696 18.652 0 0 1-12.353-20.714 18.696 18.652 0 0 1 18.44-15.573" />
        </g>
      </g>
    </Svg>
  );
}

const getIcon = (type: ToastType, stroke: string, fill: string) => {
  const all = {
    base: <BaseIcon stroke={stroke} fill={fill} />,
    success: <SuccessIcon stroke={stroke} fill={fill} />,
    info: <InfoIcon stroke={stroke} fill={fill} />,
    warning: <WarningIcon stroke={stroke} fill={fill} />,
    error: <ErrorIcon stroke={stroke} fill={fill} />,
  } as const;
  return all[type];
};

const BuiltInIcon = ({
  type,
  stroke,
  fill,
}: {
  type: ToastType;
  stroke: string;
  fill: string;
}) => getIcon(type, stroke, fill);

export const Icon: React.FC<IconProps> = ({
  className,
  style,
  type,
}: IconProps) => {
  const { stroke, fill, ...restStyles } = style;

  return (
    <i
      role="img"
      aria-label={`icon-${type}`}
      className={`${cssClassNames.toastIcon}${
        className ? ` ${className}` : ""
      }`}
      style={restStyles}
    >
      <BuiltInIcon
        type={type}
        stroke={stroke ? stroke : ""}
        fill={fill ? fill : ""}
      />
    </i>
  );
};
