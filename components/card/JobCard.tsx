import Image from "next/image";
import React from "react";
import Metric from "../shared/Metric";

const JobCard = () => {
  return (
    <div className="background-light900_dark200 light-border shadow-light100_darknone flex flex-col items-start gap-6 rounded-lg border p-6 sm:flex-row sm:p-8">
      <div>
        <Image src={"/"} alt="Company Logo" height={64} width={64} />
      </div>
      <div>
        <div>
          <p className="base-semibold text-dark200_light900">Walk in Job</p>
        </div>
        <p className="body-regular text-dark500_light700 mt-2 line-clamp-2">
          Amazon Fulfillment Center Warehouse Associate Job Overview You’ll be
          part of the Amazon warehouse team that gets orders ready for customers
          relying on Amazon services.
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
              value={"FULLTIME"}
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
            href="/"
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
