"use client";

import { useSearchParams } from "next/navigation";

const Search = () => {
  const searchParams = useSearchParams();
  console.log(searchParams);

  return (
    <div>
      <input
        type='text'
        placeholder='Search...'
        className='bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md focus:outline-none focus:border-cyan-200/50'
      />
    </div>
  );
};

export default Search;
