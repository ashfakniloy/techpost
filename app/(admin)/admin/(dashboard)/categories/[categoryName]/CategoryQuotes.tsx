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
    <div className="bg-gray-50 dark:bg-custom-gray6 py-6 px-3 rounded-lg shadow-md w-full">
      <h3 className="text-xl font-semibold px-3">Category Quotes</h3>

      <ScrollArea className="mt-6 h-[440px] px-3">
        {quotes.map((quote, i) => (
          <div key={i}>
            <p>
              {quote.quote} -
              <span className="font-semibold"> {quote.author}</span>
            </p>

            <Separator className="my-4 bg-gray-300 dark:bg-gray-500" />
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
