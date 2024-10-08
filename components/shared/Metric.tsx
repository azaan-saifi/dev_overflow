import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MetricProps {
  imgUrl: string;
  alt: string;
  height?: number;
  width?: number;
  iconPosition?: string;
  value: string | number;
  title: string;
  href?: string;
  textStyles?: string;
  isAuthor?: boolean;
  containerGap?: string;
}

const Metric = ({
  imgUrl,
  alt,
  height = 16,
  width = 16,
  iconPosition = "left",
  value,
  title,
  href,
  textStyles,
  isAuthor,
  containerGap = "gap-1",
}: MetricProps) => {
  const metricContent = (
    <>
      {iconPosition === "left" && (
        <Image
          src={imgUrl}
          width={height}
          height={width}
          alt={alt}
          className={`object-contain ${href ? "rounded-full" : ""}`}
        />
      )}

      <p className={`${textStyles} flex items-center gap-1`}>
        {value}

        <span
          className={`small-regular line-clamp-1 ${isAuthor ? "max-sm:hidden" : ""}`}
        >
          {title}
        </span>
      </p>

      {iconPosition === "right" && (
        <Image
          src={imgUrl}
          width={height}
          height={width}
          alt={alt}
          className={`object-contain ${href ? "rounded-full" : ""}`}
        />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className="flex-center  gap-1">
        {metricContent}
      </Link>
    );
  }

  return (
    <div className={`flex-center flex-wrap ${containerGap}`}>
      {metricContent}
    </div>
  );
};

export default Metric;
