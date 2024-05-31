import Image from "next/image";
import Link from "next/link";
import ActionsButtons from "../ActionsButtons";

const EventCard = ({ event }) => {
  return (
    <div className='overflow-hidden rounded-md bg-[#242526]'>
      <div className='w-[500px] h-[220px] overflow-hidden'>
        <Image
          src={event?.imageUrl}
          alt={event?.name}
          width={500}
          height={500}
          className='w-full object-cover'
        />
      </div>

      <div className='p-3'>
        <Link href={`/details/${event.id}`} className='font-bold text-lg'>
          {event?.name}
        </Link>
        <p className='text-[#9C9C9C] text-sm mt-1 h-16 overflow-hidden'>
          {event?.details.length < 115
            ? event.details
            : event.details.substring(0, 115)}
        </p>
        <div className='text-[#737373] text-sm mt-1'>
          <span>{event?.interested_ids?.length}k Interested</span>
          <span>|</span>
          <span>{event?.going_ids?.length}K Going</span>
        </div>

        <ActionsButtons
          eventId={event?.id}
          interestedUserIds={event?.interested_ids}
          goingUserIds={event?.going_ids}
        />
      </div>
    </div>
  );
};

export default EventCard;
