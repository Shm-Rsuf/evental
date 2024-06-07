"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  /* handleChang */
  const handleChang = (text) => {
    const params = new URLSearchParams(searchParams);
    if (text) {
      params.set("query", text);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div>
      <input
        onChange={(e) => handleChang(e.target.value)}
        type='text'
        placeholder='Search...'
        className='bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md focus:outline-none focus:border-cyan-200/50'
      />
    </div>
  );
};

export default Search;
