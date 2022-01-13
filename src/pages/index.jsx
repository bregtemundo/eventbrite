import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
const EventbriteButton = dynamic(() => import("react-eventbrite-popup-checkout"), { ssr: false });
import eventbrite from "eventbrite";

// i18n
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// Styles
import Styles from "./index.module.scss";

// Page Component
const Home = ({ events }) => {
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
      <div className={Styles["page"]}>
        {events.map((event) => {
          return (
            <div>
              <h2>{event.name.html}</h2>
              <p>{event.summary}</p>
              <EventbriteButton ebEventId={event.id}>Checkout</EventbriteButton>
            </div>
          );
        })}
      </div>
    </>
  );
};

export async function getStaticProps({ locale }) {
  const sdk = eventbrite({ token: "OIOUH4MNLRFX6Z7PZQ6G" });
  //https://www.eventbrite.com/o/40047371923

  // test: get org ids
  /*
  sdk.request("/users/me/organizations/").then((res) => {
    console.log(res);
  });
  */

  const { events } = await sdk.request("/organizations/767644255693/events/");

  return {
    props: {
      events: events,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

// Track Re-Renders
Home.whyDidYouRender = false;

// Export Pure Component
export default React.memo(Home);
