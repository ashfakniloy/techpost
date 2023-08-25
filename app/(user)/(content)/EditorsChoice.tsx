import Image from "next/image";
import Link from "next/link";
import { getEditorsChoicePost } from "@/db/queries/getEditorsChoicePost";
import EditorsChoiceBadge from "@/components/EditorsChoiceBadge";
import { getTimeDistance } from "@/utils/getTimeDistance";
import { getDescription } from "@/utils/getDescription";

async function EditorsChoice() {
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  const { data: post } = await getEditorsChoicePost();

  if (!post) {
    return <></>;
  }

  const description = getDescription(post.article, 200, 200);

  return (
    <section className="mb-8 relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ">
      <Link href={`/post/${post.slug}`}>
        <div className="absolute right-2 top-2 lg:right-5 lg:top-5 z-10">
          <EditorsChoiceBadge />
        </div>
        <div className="h-[280px] lg:h-[470px] relative">
          <Image
            src={post.imageUrl}
            alt="image"
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
            priority
          />
        </div>

        <div className="absolute bottom-0 w-full bg-gradient-to-b from-transparent to-black/60 px-2 lg:px-5 pt-5 pb-3 lg:pt-10 lg:pb-6 flex flex-col justify-center text-white inset-x-0  font-montserrat select-none">
          <p className="capitalize text-sm font-semibold drop-shadow-md">
            {post.categoryName}
          </p>

          <h1 className="pt-2 text-xl lg:text-4xl font-bold drop-shadow-lg">
            {post.title}
          </h1>

          <div className=" mt-2 lg:mt-2 flex items-center gap-3 text-xs lg:text-sm lg:gap-6">
            <div className="flex items-center gap-2">
              <div className="">
                {post.user.profile?.imageUrl ? (
                  <Image
                    src={post.user.profile.imageUrl}
                    alt="user image"
                    width={35}
                    height={35}
                    className="rounded-full"
                  />
                ) : (
                  <Image
                    src="/images/blankUser.jpg"
                    alt="user image"
                    width={35}
                    height={35}
                    className="rounded-full"
                  />
                )}
              </div>

              <p className="capitalize">By {post.user.username}</p>
            </div>
            <p>
              {getTimeDistance(post.createdAt)}
              {/* <ClientFormattedDate date={post.createdAt} /> */}
            </p>
          </div>

          <div className="mt-1 lg:mt-2 !text-white !line-clamp-1 lg:!line-clamp-2 text-xs lg:text-sm">
            {description}
          </div>
        </div>
      </Link>
    </section>
  );
}

export default EditorsChoice;
