import "../styles/globals.css";
import Layout from "../components/Layout";
import Transition from "../components/Transition";
import CustomCursor from "../components/CustomCursor";
import Head from "next/head";

import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";

const pageMeta = {
  "/": {
    title: "Harshal Sawatkar | Full Stack Developer",
    description:
      "Full stack developer building production web, mobile, CRM, and AI products with React, Next.js, Go, Node.js, and practical product ownership.",
  },
  "/about": {
    title: "About | Harshal Sawatkar",
    description:
      "Experience, stack, and background behind Harshal Sawatkar's work across full stack engineering, real-time systems, and AI products.",
  },
  "/projects": {
    title: "Projects | Harshal Sawatkar",
    description:
      "Proof-led case studies covering shipped web, mobile, CRM, and AI work, with role, outcome, and verification details for each project.",
  },
  "/qualities": {
    title: "Proof Areas | Harshal Sawatkar",
    description:
      "Concrete strengths across architecture, AI engineering, performance, and leadership, each tied to a direct proof path.",
  },
  "/testimonials": {
    title: "Proof of Work | Harshal Sawatkar",
    description:
      "A proof-focused overview of shipped products, public links, and reference-ready evidence for Harshal Sawatkar's work.",
  },
  "/contact": {
    title: "Contact | Harshal Sawatkar",
    description:
      "Reach out to Harshal Sawatkar for full stack, product engineering, CRM, or AI opportunities.",
  },
};

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const currentMeta = pageMeta[router.pathname] || pageMeta["/"];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const canonicalUrl = siteUrl ? new URL(router.asPath || "/", siteUrl).toString() : null;
  const imageUrl = siteUrl ? new URL("/prof-pic.png", siteUrl).toString() : null;

  return (
    <>
      <Head>
        <title>{currentMeta.title}</title>
        <meta name="description" content={currentMeta.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#05070a" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Harshal Sawatkar Portfolio" />
        <meta property="og:title" content={currentMeta.title} />
        <meta property="og:description" content={currentMeta.description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={currentMeta.title} />
        <meta name="twitter:description" content={currentMeta.description} />
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
        {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
        {imageUrl && <meta property="og:image" content={imageUrl} />}
        {imageUrl && <meta name="twitter:image" content={imageUrl} />}
      </Head>

      <Layout>
        <AnimatePresence mode="wait">
          <motion.div key={router.route} className="h-full">
            <CustomCursor />
            <Transition></Transition>
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </Layout>
    </>
  );
}

export default MyApp;
