import Section from "@/components/Admin/Section";
import { ClientFormattedDate } from "@/components/ClientFormattedDate";
// import { getFormatedDate } from "@/utils/getFormatedDate";
import Image from "next/image";

type CategoryInfoProps = {
  category_name: string;
  total_quotes: number;
  total_posts: number;
  created_at: Date;
  updated_at: Date;
  imageUrl: string;
};

function CategoryInfo({
  category_name,
  total_quotes,
  total_posts,
  created_at,
  updated_at,
  imageUrl,
}: CategoryInfoProps) {
  const infoData = [
    {
      name: "Name",
      value: category_name,
    },
    {
      name: "Total Quotes",
      value: total_quotes,
    },
    {
      name: "Total Posts",
      value: total_posts,
    },
    {
      name: "Created At",
      // value: getFormatedDate(created_at),
      value: <ClientFormattedDate date={created_at} />,
    },
    {
      name: "Updated At",
      // value: getFormatedDate(updated_at),
      value: <ClientFormattedDate date={updated_at} />,
    },
  ];
  return (
    <Section title="Category Info" className="min-w-[500px] h-[548px]">
      <div className="relative h-[200px]">
        <Image
          src={imageUrl}
          alt="image"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover rounded-lg"
        />
      </div>
      <div className="mt-5 space-y-6">
        {infoData.map((info, i) => (
          <div key={i} className="w-full flex">
            <p className="w-2/5">{info.name}</p>
            <p className="capitalize">{info.value}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default CategoryInfo;
