import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "../shared/RenderTag";
import { getPopularTags } from "@/lib/actions/tag.action";
import { Badge } from "../ui/badge";

interface Props {
  id: string;
  clerkId: string;
  name: string;
  username: string;
  picture: string;
}

const CommunityCard = async ({
  id,
  clerkId,
  name,
  username,
  picture,
}: Props) => {
  const popularTags = await getPopularTags({ limit: 3 });

  return (
    <div>
      <Link
        href={`/profile/${clerkId}`}
        className="card-wrapper flex-center w-full flex-col gap-2 rounded-3xl p-9 max-xs:min-w-full xs:w-[260px]"
      >
        <>
          <Image
            src={picture}
            alt={name}
            height={100}
            width={100}
            className="rounded-full"
          />
          <div className="flex-center mt-4 flex-col">
            <h3 className="h3-bold text-dark200_light800 line-clamp-1">
              {name}
            </h3>
            <p className="body-regular text-light400_light500">@{username}</p>
          </div>

          <div className="mt-5">
            {popularTags.length > 0 ? (
              <div className="flex items-center gap-2">
                {popularTags?.map((tag) => (
                  <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
                ))}
              </div>
            ) : (
              <Badge>No tags yet</Badge>
            )}
          </div>
        </>
      </Link>
    </div>
  );
};

export default CommunityCard;
