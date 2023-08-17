import Image from "next/image";
import { getCategoryByName } from "@/prisma/find/getCategoryByName";
import { notFound } from "next/navigation";

async function CategoryTopSection({ categoryName }: { categoryName: string }) {
  // const getImage = () => {
  //   switch (categoryName) {
  //     case "programming":
  //       return programming;
  //     case "robotics":
  //       return robotics;
  //     case "space":
  //       return space;

  //     default:
  //       return space;
  //   }
  // };

  // const imageSrc = getImage();

  const { data: category } = await getCategoryByName({
    categoryName: categoryName,
  });

  if (!category) {
    notFound();
  }

  const generateRandom = (maxLimit = 0) => {
    const randomNumber = Math.floor(Math.random() * maxLimit);

    return randomNumber;
  };

  const randomIndex = generateRandom(category?.quotes.length);
  // generateRandom(500)

  // console.log("random", randomIndex);

  const randomQuote = category.quotes[randomIndex];

  return (
    <section className="relative bg-black rounded-md overflow-hidden">
      {/* {categoryName && ( */}
      <div className="-mt-5 w-full h-[250px] lg:h-[400px] relative">
        <Image
          src={category.imageUrl}
          alt={category.name}
          fill
          className="object-cover opacity-75"
        />
      </div>
      {/* )} */}
      <div className="absolute flex flex-col justify-center items-center text-white inset-0 font-montserrat select-none">
        <h1 className="text-3xl lg:text-5xl tracking-wider font-bold capitalize">
          {category.name}
        </h1>

        <div className="mt-8 lg:w-[500px] px-2 lg:px-0">
          <p className="text-center italic text-sm lg:text-base">
            {randomQuote.quote}{" "}
            <span className="font-semibold"> - {randomQuote.author}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default CategoryTopSection;
