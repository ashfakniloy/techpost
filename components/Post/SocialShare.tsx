import Link from "next/link";
import { IconFacebook } from "../Icons/IconFacebook";
import { IconLinkedin } from "../Icons/IconLinkedin";
import { IconTwitter } from "../Icons/IconTwitter";

function SocialShare({
  articleUrl,
  articleTitle,
  via,
}: {
  articleUrl: string;
  articleTitle: string;
  via?: string;
}) {
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    articleUrl
  )}`;

  const twitterShareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    articleUrl
  )}&text=${articleTitle}`;

  const linkedInShareLink = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
    articleUrl
  )}&title=`;

  return (
    <div className="flex items-center gap-4">
      <Link href={facebookShareUrl} target="_blank">
        <button>
          <IconFacebook className="w-[25px] h-[25px] fill-gray-800 dark:fill-gray-100 lg:hover:fill-blue-500 dark:lg:hover:fill-blue-300 transition-colors duration-200" />
        </button>
      </Link>

      <Link href={twitterShareLink} target="_blank">
        <button>
          <IconTwitter className="w-[25px] h-[25px] fill-gray-800 dark:fill-gray-100 lg:hover:fill-blue-500 dark:lg:hover:fill-blue-300 transition-colors duration-200" />
        </button>
      </Link>

      <Link href={linkedInShareLink} target="_blank">
        <button>
          <IconLinkedin className="w-[25px] h-[25px] fill-gray-800 dark:fill-gray-100 lg:hover:fill-blue-500 dark:lg:hover:fill-blue-300 transition-colors duration-200" />
        </button>
      </Link>
    </div>
  );
}

export default SocialShare;
