// lib/metadata.ts
import { Metadata } from "next";

import logo from "public/LOGOJ3.png";

console.log(logo);
export const siteUrl = process.env.VERCEL_URL
  ? process.env.VERCEL_URL
  : "http://localhost:3000";
export const ogImage = logo.src;

/* ----------------------------- HOME PAGE ----------------------------- */
export const homeMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "CENSCOPE | Restoring Dignity, Inclusion & Hope",
  description:
    "CENSCOPE empowers vulnerable communities across Northeast Nigeria through medical care, rehabilitation, advocacy, and inclusive development. Discover our 2024 impact—105 survivors supported, 1.7 million people reached, and stronger communities built.",
  keywords: [
    "CENSCOPE",
    "disability inclusion",
    "humanitarian aid",
    "mine action",
    "explosive ordnance risk education",
    "community resilience",
    "Nigeria NGOs",
  ],
  openGraph: {
    title: "CENSCOPE | Restoring Dignity, Inclusion & Hope",
    description:
      "Building safer, more inclusive communities through rehabilitation, advocacy, and empowerment.",
    url: "",
    siteName: "CENSCOPE",
    locale: "en_US",
    type: "website",
    images: [ogImage],
  },
};

/* ----------------------------- ABOUT US ----------------------------- */
export const aboutMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "About Us | CENSCOPE - Empowering Inclusive Communities",
  description:
    "At CENSCOPE, our mission is rooted in dignity, inclusion, and resilience. We support survivors of explosive ordnance, promote disability inclusion, and strengthen community engagement across Nigeria.",
  openGraph: {
    title: "About CENSCOPE - Empowering Inclusive Communities",
    description:
      "Learn about CENSCOPE’s vision, values, and commitment to restoring hope and promoting inclusion for vulnerable communities.",
    url: "/about-us",
    siteName: "CENSCOPE",
    type: "article",
    images: [ogImage],
  },
};

/* ----------------------------- NEWS ----------------------------- */
export const newsMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "News & Updates | CENSCOPE Impact Stories",
  description:
    "Read the latest updates and stories from CENSCOPE’s humanitarian and inclusion programs—featuring survivor journeys, advocacy highlights, and 2024 achievements across Northeast Nigeria.",
  openGraph: {
    title: "CENSCOPE News & Impact Stories",
    description:
      "Stay informed on CENSCOPE’s latest achievements, advocacy efforts, and community resilience projects.",
    url: "/news",
    siteName: "CENSCOPE",
    type: "article",
    images: [ogImage],
  },
};

/* ----------------------------- SUPPORT US ----------------------------- */
export const supportMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Support Us | Partner with CENSCOPE to Build Safer Communities",
  description:
    "Join us in restoring dignity and hope. Your support helps CENSCOPE provide rehabilitation, education, and livelihood opportunities for survivors and vulnerable communities across Nigeria.",
  openGraph: {
    title: "Support CENSCOPE’s Mission",
    description:
      "Help CENSCOPE empower survivors, promote inclusion, and strengthen community resilience through your donations and partnerships.",
    url: "/support-us",
    siteName: "CENSCOPE",
    type: "website",
    images: [ogImage],
  },
};

/* ----------------------------- JOIN US ----------------------------- */
export const joinMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Join Us | Volunteer or Work with CENSCOPE",
  description:
    "Be part of a movement transforming lives across Nigeria. Join CENSCOPE as a volunteer, partner, or team member to advance inclusion, empowerment, and resilience.",
  openGraph: {
    title: "Join CENSCOPE - Make an Impact",
    description:
      "Collaborate with CENSCOPE to empower communities, support survivors, and promote inclusive development.",
    url: "/join-us",
    siteName: "CENSCOPE",
    type: "profile",
    images: [ogImage],
  },
};

/* ----------------------------- OUR ACTIONS ----------------------------- */
export const actionsMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Our Actions | CENSCOPE - Building Resilience and Inclusion",
  description:
    "Discover CENSCOPE’s life-changing actions across Northeast Nigeria — from survivor support and disability inclusion to community resilience, advocacy, and humanitarian response. Every action brings us closer to a safer, more inclusive future for all.",
  openGraph: {
    title: "CENSCOPE Actions - Empowering Change Across Communities",
    description:
      "Explore how CENSCOPE supports survivors, promotes inclusion, and strengthens resilience through rehabilitation, advocacy, and community education.",
    url: "/our-actions",
    siteName: "CENSCOPE",
    type: "article",
    images: [ogImage],
  },
};
