import Image from "next/image";
import Section from "@/components/Admin/Section";
import { ClientFormattedDate } from "@/components/ClientFormattedDate";

type CategoryInfoProps = {
  category_name: string;
  total_quotes: number;
  total_posts: number;
  created_at: Date;
  updated_at: Date;
  imageUrl: string;
  blurDataUrl: string;
};

function CategoryInfo({
  category_name,
  total_quotes,
  total_posts,
  created_at,
  updated_at,
  imageUrl,
  blurDataUrl,
}: CategoryInfoProps) {
  const infoData = [
    {
      name: "Name",
      value: <span className="capitalize">{category_name}</span>,
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
      value: <ClientFormattedDate date={created_at} />,
    },
    {
      name: "Updated At",
      value: <ClientFormattedDate date={updated_at} />,
    },
  ];

  return (
    <Section title="Category Info" className="lg:min-w-[500px] h-[548px]">
      <div className="relative h-[200px]">
        <Image
          src={imageUrl}
          placeholder="blur"
          blurDataURL={blurDataUrl}
          alt={category_name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover rounded-lg"
        />
      </div>
      <div className="mt-5 space-y-6">
        {infoData.map((info, i) => (
          <div key={i} className="w-full flex">
            <p className="w-2/5">{info.name}</p>
            <p>{info.value}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default CategoryInfo;
