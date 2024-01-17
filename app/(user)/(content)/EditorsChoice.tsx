import Image from "next/image";
import Link from "next/link";
import EditorsChoiceBadge from "@/components/EditorsChoiceBadge";
import { getTimeDistance } from "@/utils/getTimeDistance";
import { fetchEditorsChoice } from "@/db/fetch/fetchEditorsChoice";
// import { getEditorsChoicePost } from "@/db/queries/getEditorsChoicePost";
// import { getImagePlaceholder } from "@/utils/getImagePlaceholder";

async function EditorsChoice() {
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  // const { data: post } = await getEditorsChoicePost();

  const post = await fetchEditorsChoice();

  if (!post) {
    return <></>;
  }

  // const blurDataUrl = await getImagePlaceholder(post.imageUrl);

  return (
    <section className="mb-8 relative h-[280px] lg:h-[470px] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ">
      <Link href={`/post/${post.slug}`}>
        <div className="absolute right-2 top-2 lg:right-5 lg:top-5 z-10">
          <EditorsChoiceBadge />
        </div>
        <div className="h-full w-full relative">
          <Image
            src={post.imageUrl}
            // placeholder="blur"
            // blurDataURL={blurDataUrl}
            alt="editors choice post image"
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
            priority
          />
        </div>

        <div className="absolute bottom-0 w-full bg-gradient-to-b from-transparent to-black/60 px-2 lg:px-5 pt-5 pb-3 lg:pt-10 lg:pb-6 flex flex-col justify-center text-white inset-x-0 select-none">
          <p className="capitalize text-sm font-semibold drop-shadow-md">
            {post.categoryName}
          </p>

          <h1 className="pt-2 text-xl lg:text-4xl font-montserrat font-bold drop-shadow-lg">
            {post.title}
          </h1>

          <div className="mt-2 flex items-center gap-3 text-xs lg:text-sm lg:gap-6">
            <div className="flex items-center gap-2">
              <div className="relative w-[35px] h-[35px] rounded-full overflow-hidden">
                {post.user.profile?.imageUrl ? (
                  <Image
                    src={post.user.profile.imageUrl}
                    alt={post.user.username}
                    fill
                    sizes="35px"
                    className="object-cover"
                  />
                ) : (
                  <Image
                    src="/images/blankUser.jpg"
                    alt={post.user.username}
                    width={35}
                    height={35}
                    className="rounded-full"
                  />
                )}
              </div>

              <p className="capitalize">{`By ${post.user.username}`}</p>
            </div>
            <p>{getTimeDistance(post.createdAt)}</p>
          </div>

          <div className="mt-1 lg:mt-2 !text-white line-clamp-2 text-sm">
            {`${post.shortDescription}`}
          </div>
        </div>
      </Link>
    </section>
  );
}

export default EditorsChoice;
