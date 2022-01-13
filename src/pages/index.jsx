import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
const EventbriteButton = dynamic(() => import("react-eventbrite-popup-checkout"), { ssr: false });

// i18n
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// Styles
import Styles from "./index.module.scss";

// Page Component
const Home = () => {
  /**
   * i18n:
   */
  const { t } = useTranslation();

  /**
   * DOM:
   */
  return (
    <>
      <Head>
        <title>Home | Next starter</title>
        <meta name="description" content="home des" />
      </Head>

      <div className={Styles["page"]}>{typeof window !== "undefined" && <EventbriteButton ebEventId="236438954277">Checkout</EventbriteButton>}</div>
    </>
  );
};

// Load Translations
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

// Track Re-Renders
Home.whyDidYouRender = false;

// Export Pure Component
export default React.memo(Home);
