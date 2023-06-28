import { formatDate, getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import { postRenderer } from "@/app/[lang]/utils/post-renderer";
import { fetchAPI } from "../utils/fetch-api";
import FooterCta from "../components/FooterCTA";

import Image from "next/image";

async function getFooterCta(): Promise<any> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!token)
    throw new Error("The Strapi API Token environment variable is not set.");

  const path = `/global?populate[mainFooterCTA][populate]=*`;

  const urlParamsObject = {};
  const options = { headers: { Authorization: `Bearer ${token}` } };

  const response = await fetchAPI(path, urlParamsObject, options);
  return response;
}

interface Article {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
    cover: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    authorsBio: {
      data: {
        attributes: {
          name: string;
          avatar: {
            data: {
              attributes: {
                url: string;
              };
            };
          };
        };
      };
    };
    blocks: any[];
    publishedAt: string;
    ArticleFooter: {
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
    };
  };
}

export default async function Post({ data }: { data: Article }) {
  const { title, description, publishedAt, cover, authorsBio, ArticleFooter } =
    data.attributes;
  const author = authorsBio.data?.attributes;
  const imageUrl = getStrapiMedia(cover.data?.attributes.url);
  const authorImgUrl = getStrapiMedia(
    authorsBio.data?.attributes.avatar.data.attributes.url
  );

  const footerCta = await getFooterCta();

  let footerRender;

  ArticleFooter
    ? (footerRender = ArticleFooter)
    : (footerRender = footerCta.data.attributes.mainFooterCTA);

  //   console.log(ArticleFooter);
  //   console.log(footerCta.data.attributes.mainFooterCTA);
  console.log(footerRender);
  return (
    <article className="space-y-8 dark:bg-black dark:text-gray-50">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="article cover image"
          width={400}
          height={400}
          className="w-full h-96 object-cover rounded-lg"
        />
      )}
      <div className="space-y-6">
        <h1 className="leading-tight text-5xl font-bold ">{title}</h1>
        <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center dark:text-gray-400">
          <div className="flex items-center md:space-x-2">
            {authorImgUrl && (
              <Image
                src={authorImgUrl}
                alt="article cover image"
                width={400}
                height={400}
                className="w-14 h-14 border rounded-full dark:bg-gray-500 dark:border-gray-700"
              />
            )}
            <p className="text-md dark:text-violet-400">
              {author && author.name} • {formatDate(publishedAt)}
            </p>
          </div>
        </div>
      </div>

      <div className="dark:text-gray-100">
        <p>{description}</p>

        {data.attributes.blocks.map((section: any, index: number) =>
          postRenderer(section, index)
        )}
      </div>
      <FooterCta data={footerRender} />
    </article>
  );
}
