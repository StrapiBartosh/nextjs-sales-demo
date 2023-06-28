interface footerCTA {
  id: number;
  Title: string;
  description: string;
  Button: {
    id: number;
    url: string;
    newTab: boolean;
    text: string;
    type: string;
  };
}

export default function FooterCta({ data }: { data: footerCTA }) {
  return (
    <section className="py-6 dark:bg-black dark:text-gray-50">
      <div className="container mx-auto flex flex-col justify-center p-4 space-y-8 md:p-10 lg:space-y-0 lg:space-x-12 lg:justify-between lg:flex-row">
        <div className="flex flex-col space-y-4 text-center lg:text-left">
          <h1 className="text-5xl font-bold leading-none">{data.Title}</h1>
          <p className="text-lg">{data.description}</p>
        </div>

        <div className="pointer-events-auto flex items-center justify-between gap-x-6 py-2.5 px-6 sm:rounded-xl sm:py-3 sm:pr-3.5 sm:pl-4 bg-pink-500">
          <p className="text-sm leading-6 text-white">
            <a href={data.Button.url}>{data.Button.text}</a>
          </p>
        </div>
      </div>
    </section>
  );
}
