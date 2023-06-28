"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";
import FormSubmit from "./FormSubmit";

import { CgWebsite } from "react-icons/cg";
import { FaDiscord } from "react-icons/fa";
import { AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai";

interface FooterLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
  social?: string;
}

interface MenuLinks {
  id: number;
  attributes: {
    order: number;
    title: string;
    children: {
      [key: string]: any;
    };
  };
}

interface InnerLink {
  id: number;
  attributes: {
    target: string;
    title: string;
    url: string;
  };
}

function FooterLink({ url, text }: FooterLink) {
  const path = usePathname();
  return (
    <li className="flex">
      <Link
        href={url}
        className={`hover:dark:text-violet-400 ${
          path === url && "dark:text-violet-400 dark:border-violet-400"
        }}`}
      >
        {text}
      </Link>
    </li>
  );
}

function InnerLink({ id, attributes }: InnerLink) {
  return (
    <li className="flex" key={id}>
      <Link href={`${attributes.url}`} className="hover:dark:text-violet-400">
        {attributes.title}
      </Link>
    </li>
  );
}

function RenderSocialIcon({ social }: { social: string | undefined }) {
  switch (social) {
    case "WEBSITE":
      return <CgWebsite />;
    case "TWITTER":
      return <AiFillTwitterCircle />;
    case "YOUTUBE":
      return <AiFillYoutube />;
    case "DISCORD":
      return <FaDiscord />;
    default:
      return null;
  }
}

export default function Footer({
  logoUrl,
  logoText,
  legalLinks,
  socialLinks,
  footerLinkCategories,
}: {
  logoUrl: string | null;
  logoText: string | null;
  legalLinks: Array<FooterLink>;
  socialLinks: Array<FooterLink>;
  footerLinkCategories: Array<MenuLinks>;
}) {
  return (
    <footer className="py-6 dark:bg-black dark:text-gray-50">
      <div className="container px-6 mx-auto space-y-6 divide-y divide-gray-400 md:space-y-12 divide-opacity-50">
        <div className="grid grid-cols-12">
          <div className="pb-6 col-span-full md:pb-0 md:col-span-6">
            <Logo src={logoUrl}>
              {logoText && <h2 className="text-2xl font-bold">{logoText}</h2>}
            </Logo>
          </div>

          <div className="flex justify-between pb-6 col-span-full md:pb-0 md:col-span-6">
            {footerLinkCategories.map((cat) => {
              return (
                <div className="text-center md:text-left">
                  <>
                    <p className="pb-1 text-lg font-medium" key={cat.id}>
                      {cat.attributes.title}
                    </p>
                    <ol>
                      {cat.attributes.children.data.map(
                        (menuItem: InnerLink) => (
                          <InnerLink key={menuItem.id} {...menuItem} />
                        )
                      )}
                    </ol>
                  </>
                </div>
              );
            })}
          </div>
        </div>
        <div className="grid justify-center pt-6 lg:justify-between">
          <div className="flex">
            <span className="mr-2">
              ©{new Date().getFullYear()} All rights reserved
            </span>
            <ul className="flex">
              {legalLinks.map((link: FooterLink) => (
                <Link
                  key={link.id}
                  href={link.url}
                  className="text-gray-400 hover:text-gray-300 mr-2"
                >
                  {link.text}
                </Link>
              ))}
            </ul>
          </div>
          <div className="flex justify-center pt-4 space-x-4 lg:pt-0 lg:col-end-13">
            {socialLinks.map((link: FooterLink) => {
              return (
                <a
                  key={link.id}
                  rel="noopener noreferrer"
                  href={link.url}
                  title={link.text}
                  target={link.newTab ? "_blank" : "_self"}
                  className="flex items-center justify-center w-10 h-10 rounded-full dark:bg-violet-400 dark:text-gray-900"
                >
                  <RenderSocialIcon social={link.social} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
