import EventDetails from "@/components/details/EventDetails";
import EventVenue from "@/components/details/EventVenue";
import HeroSection from "@/components/details/HeroSection";
import { getSingleEvent } from "@/db/queries";

const DetailsPage = async ({ params: { id } }) => {
  const eventInfo = await getSingleEvent(id);
  return (
    <>
      <HeroSection eventInfo={eventInfo} />
      <section class='container'>
        <div class='grid grid-cols-5 gap-12 my-12'>
          <EventDetails details={eventInfo?.details} swags={eventInfo?.swags} />
          <EventVenue location={eventInfo.location} />
        </div>
      </section>
    </>
  );
};

export default DetailsPage;
