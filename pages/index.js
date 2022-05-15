import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import useSWR from "swr";

export default function Home() {
  const [query, setQuery] = useState("");

  const { data, error } = useSWR(
    `/get-ip${query}`,
    (...args) => fetch(...args).then((res) => res.json()),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  let [initial, setInitial] = useState(null);

  useEffect(() => {
    if (data && !initial) {
      setInitial(data);
    }
  }, [data, initial]);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const MapWithNoSSR = dynamic(() => import("../lib/map"), {
    ssr: false,
    loading: () => <div>loading...</div>,
  });

  return (
    <main className="w-screen h-screen">
      <form
        className="flex fixed -top-3 p-5 rounded-lg left-1/2 transform -translate-x-1/2 z-[9999] bg-slate-800 w-52 sm:w-auto"
        onSubmit={(e) => {
          e.preventDefault();
          setQuery(`/${e.target.search.value}`);
        }}
      >
        <input
          aria-label="Search Input"
          className="h-12 w-full sm:w-60 lg:w-96 text-xs px-4 pr-0 focus:outline-none bg-white border-2 border-white rounded-l-xl focus:border-white transition "
          type="text"
          name="search"
          placeholder="Search for any IP address or domain"
          defaultValue={data.query}
        />
        <div className="rounded-r-xl bg-white">
          <button
            aria-label="Search Button"
            className="flex justify-center items-center h-12 w-12 bg-slate-900 border-4 border-white transition rounded-xl"
            type="submit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14">
              <path
                fill="none"
                stroke="#FFF"
                strokeWidth="3"
                d="M2 1l6 6-6 6"
              />
            </svg>
          </button>
        </div>
      </form>
      <MapWithNoSSR
        data={data}
        initialPosition={initial?.query === data.query}
      />
    </main>
  );
}
