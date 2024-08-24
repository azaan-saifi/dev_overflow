import Image from "next/image";
import React from "react";
import Metric from "../shared/Metric";
import Link from "next/link";

interface Props {
  imgSrc: string;
  title: string;
  description: string;
  employmentType: string;
  applyLink: string;
  employerWebsite: string;
}

const JobCard = ({
  imgSrc,
  title,
  description,
  employmentType,
  applyLink,
  employerWebsite,
}: Props) => {
  return (
    <div className="background-light900_dark200 light-border shadow-light100_darknone flex flex-col items-start gap-6 rounded-lg border p-6 sm:flex-row sm:p-8">
      <Link
        href={employerWebsite}
        className="background-light800_dark400 relative rounded-xl"
      >
        <div className="background-light800_dark400 flex size-16 items-center justify-center rounded-xl p-2">
          <Image src={imgSrc} alt="Company Logo" height={48} width={48} />
        </div>
      </Link>
      <div>
        <div>
          <p className="base-semibold text-dark200_light900">{title}</p>
        </div>
        <p className="body-regular text-dark500_light700 mt-2 line-clamp-2">
          {description}
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-between gap-4 ">
          <div className="flex gap-4">
            <Metric
              imgUrl="/assets/icons/clock-2.svg"
              alt="clock"
              width={20}
              height={20}
              iconPosition="left"
              title=""
              value={employmentType}
              textStyles="text-light-500 body-medium"
              containerGap="gap-2"
            />
            <Metric
              imgUrl="/assets/icons/currency-dollar-circle.svg"
              alt="doller"
              width={20}
              height={20}
              iconPosition="left"
              title=""
              value={"Not Disclosed"}
              textStyles="text-light-500 body-medium"
              containerGap="gap-2"
            />
          </div>
          <Metric
            imgUrl="/assets/icons/arrow-up-right.svg"
            alt="doller"
            width={20}
            height={20}
            iconPosition="right"
            title=""
            href={applyLink}
            value={"View Job"}
            textStyles="primary-text-gradient body-semibold"
            containerGap="gap-2"
          />
        </div>
      </div>
    </div>
  );
};

export default JobCard;
