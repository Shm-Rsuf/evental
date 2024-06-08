"use client";

import useDebounce from "@/app/hooks/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const doSearch = useDebounce((text) => {
    const params = new URLSearchParams(searchParams);
    if (text) {
      params.set("query", text);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);
  /* handleChang */
  const handleChang = (text) => {
    doSearch(text);
  };

  return (
    <div>
      <input
        onChange={(e) => handleChang(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
        type='text'
        placeholder='Search...'
        className='bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md focus:outline-none focus:border-cyan-200/50'
      />
    </div>
  );
};

export default Search;
