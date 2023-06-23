import Image from "next/image";
import space from "@/public/images/space.jpg";
import robotics from "@/public/images/robotics.jpg";
import programming from "@/public/images/programming.jpg";

function CategoryTopSection({ categoryName }: { categoryName: string }) {
  const getImage = () => {
    switch (categoryName) {
      case "programming":
        return programming;
      case "robotics":
        return robotics;
      case "space":
        return space;

      default:
        return space;
    }
  };

  const imageSrc = getImage();

  return (
    <div className="relative bg-black">
      {categoryName && (
        <div className="-mt-5 w-full h-[250px] lg:h-[400px] relative">
          <Image
            src={imageSrc}
            alt="category"
            fill
            className="object-cover opacity-75"
          />
        </div>
      )}
      <div className="absolute flex flex-col justify-center items-center text-white inset-0 text-3xl lg:text-5xl  font-montserrat tracking-wider font-bold capitalize select-none">
        {categoryName}
      </div>
    </div>
  );
}

export default CategoryTopSection;
