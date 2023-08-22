import Link from "next/link";

function TechPostLogo() {
  return (
    <div className="text-xl lg:text-2xl font-extrabold font-montserrat uppercase group px-1.5 py-1 rounded bg-custom-gray3 select-none">
      <Link href="/">
        <span className="text-white lg:group-hover:text-lime-500 transition-color duration-300">
          TECH
        </span>
        <span className="text-lime-500 lg:group-hover:text-white transition-color duration-300">
          POST
        </span>
      </Link>
    </div>
  );
}

export default TechPostLogo;
