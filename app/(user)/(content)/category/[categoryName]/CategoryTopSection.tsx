import Image from "next/image";

function CategoryTopSection({
  categoryName,
  imageUrl,
  quotes,
}: {
  categoryName: string;
  imageUrl: string;
  quotes: {
    quote: string;
    author: string;
  }[];
}) {
  const generateRandom = (maxLimit = 0) => {
    const randomNumber = Math.floor(Math.random() * maxLimit);

    return randomNumber;
  };

  const randomIndex = generateRandom(quotes.length);

  const randomQuote = quotes[randomIndex];

  // console.log("image", category.imageUrl);

  // const blurDataUrl = await getImagePlaceholder(category.imageUrl);

  return (
    <section className="relative bg-black rounded-md overflow-hidden">
      <div className="w-full h-[250px] lg:h-[400px] relative">
        <Image
          src={imageUrl}
          // placeholder="blur"
          // blurDataURL={blurDataUrl}
          alt={categoryName}
          fill
          sizes="(max-width: 768px) 100vw, 1176px"
          className="object-cover opacity-50"
        />
      </div>

      <div className="absolute flex flex-col justify-center items-center text-white inset-0 font-montserrat select-none">
        <h1 className="text-3xl lg:text-5xl tracking-wider font-bold capitalize drop-shadow-lg">
          {categoryName}
        </h1>

        <div className="mt-8 lg:w-[500px] px-2 lg:px-0">
          <p className="text-center italic text-sm lg:text-base drop-shadow-md">
            {`"${randomQuote.quote}"`}
            <span className="font-semibold"> - {randomQuote.author}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default CategoryTopSection;

// import Image from "next/image";
// import { notFound } from "next/navigation";
// // import { fetchSingleCategory } from "@/db/fetch/fetchSingleCategory";
// // import { getImagePlaceholder } from "@/utils/getImagePlaceholder";
// import { getCategoryByName } from "@/db/queries/getCategoryByName";

// async function CategoryTopSection({ categoryName }: { categoryName: string }) {
//   const { data: category } = await getCategoryByName({
//     categoryName: categoryName,
//   });

//   // const category = await fetchSingleCategory({ categoryName });

//   if (!category) {
//     notFound();
//   }

//   const generateRandom = (maxLimit = 0) => {
//     const randomNumber = Math.floor(Math.random() * maxLimit);

//     return randomNumber;
//   };

//   const randomIndex = generateRandom(category?.quotes.length);

//   const randomQuote = category.quotes[randomIndex];

//   // console.log("image", category.imageUrl);

//   // const blurDataUrl = await getImagePlaceholder(category.imageUrl);

//   return (
//     <section className="relative bg-black rounded-md overflow-hidden">
//       <div className="w-full h-[250px] lg:h-[400px] relative">
//         <Image
//           src={category.imageUrl}
//           // placeholder="blur"
//           // blurDataURL={blurDataUrl}
//           alt={category.name}
//           fill
//           sizes="(max-width: 768px) 100vw, 1176px"
//           className="object-cover opacity-50"
//         />
//       </div>

//       <div className="absolute flex flex-col justify-center items-center text-white inset-0 font-montserrat select-none">
//         <h1 className="text-3xl lg:text-5xl tracking-wider font-bold capitalize drop-shadow-lg">
//           {category.name}
//         </h1>

//         <div className="mt-8 lg:w-[500px] px-2 lg:px-0">
//           <p className="text-center italic text-sm lg:text-base drop-shadow-md">
//             {`"${randomQuote.quote}"`}
//             <span className="font-semibold"> - {randomQuote.author}</span>
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default CategoryTopSection;
