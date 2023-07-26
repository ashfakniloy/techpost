import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

type CategoryQuotesProps = {
  quotes: {
    quote: string;
    author: string;
  }[];
};

function CategoryQuotes({ quotes }: CategoryQuotesProps) {
  return (
    <div className="bg-custom-gray6 py-6 px-3 rounded-lg h-[548px] w-full">
      <h3 className="text-xl font-semibold px-4">Category Quotes</h3>

      <ScrollArea className="mt-5 h-[440px] px-3">
        {quotes.map((quote, i) => (
          <div key={i} className="">
            <p className="">
              {quote.quote} -
              <span className="font-semibold"> {quote.author}</span>
            </p>

            <Separator className="my-4 bg-gray-500" />
            {/* <Separator
              className={`my-4 ${
                quotes.length - 1 > i ? "bg-gray-500" : "bg-transparent"
              }`}
            /> */}
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}

export default CategoryQuotes;
