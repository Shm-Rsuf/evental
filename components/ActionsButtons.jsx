"use client";
import { addInterested } from "@/app/actions";
import useAuth from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

const ActionsButtons = ({
  eventId,
  fromDetails,
  interestedUserIds,
  goingUserIds,
}) => {
  const { auth } = useAuth();
  const router = useRouter();
  const isInterested = interestedUserIds?.find((id) => id === auth?.id);
  const isGoing = goingUserIds?.find((id) => id === auth?.id);

  const [interested, setInterested] = useState(isInterested);
  const [going, setGoing] = useState(isGoing);

  const [isPending, startTransition] = useTransition();

  async function togglemodeOnOff() {
    if (auth) {
      await addInterested(eventId, auth?.id);
      setInterested(!interested);
    } else {
      router.push("/login");
    }
  }

  /* handleMarkGoing */
  const handleMarkGoing = () => {
    if (auth) {
      router.push(`/payment/${eventId}`);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className={`w-full flex gap-4 mt-4 ${fromDetails && "flex-1"}`}>
      <button
        className={`w-full ${
          interested && "bg-indigo-600 hover:bg-indigo-800"
        }`}
        onClick={() =>
          startTransition(() => {
            togglemodeOnOff();
          })
        }
      >
        Interested
      </button>

      <button
        disabled={auth && going}
        onClick={handleMarkGoing}
        className=' text-center w-full bg-[#464849] py-2 px-2 rounded-md border border-[#5F5F5F]/50 shadow-sm cursor-pointer hover:bg-[#3C3D3D] transition-colors active:translate-y-1'
      >
        Going
      </button>
    </div>
  );
};

export default ActionsButtons;
