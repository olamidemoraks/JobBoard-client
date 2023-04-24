import SearchModal from "@/components/Modals/Job/SearchModal";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  HiBriefcase,
  HiChevronDown,
  HiChevronUp,
  HiOfficeBuilding,
  HiX,
} from "react-icons/hi";
import { IoFilter } from "react-icons/io5";
import SavedFilters from "./SavedFilters";

type SearchFilterProps = {};

const SearchFilter: React.FC<SearchFilterProps> = () => {
  const router = useRouter();
  const { query } = router;
  const [openFilter, setOpenFilter] = useState(false);
  const [title, setTitle] = useState<any>(query.Title ?? "");
  const [location, setLocation] = useState<any>(query.Address ?? "");

  const handleClose = () => {
    setOpenFilter(false);
  };

  const handleSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const path = router.pathname;

    query["Title"] = title;
    query["Address"] = location;

    router.push({ pathname: path, query });
  };

  return (
    <div className="my-2 border border-gray-300  rounded-md">
      <div className="p-4">
        <form
          onSubmit={(e) => handleSubmitSearch(e)}
          className="flex md:flex-row flex-col items-center gap-4 "
        >
          <div className="flex items-center border border-gray-300 rounded-md px-2 py-1 w-full gap-2 h-10">
            <HiBriefcase className=" text-gray-400 text-[20px]" />
            <input
              type="text"
              className="w-full outline-none placeholder:text-gray-400"
              placeholder="Add a job title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded-md px-2 py-1 w-full  gap-2 h-10">
            <HiOfficeBuilding className=" text-gray-400 text-[19px]" />
            <input
              type="text"
              className="w-full outline-none placeholder:text-gray-400"
              placeholder="Add a location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <button className="hidden" type="submit">
            submit
          </button>
        </form>

        <SavedFilters />

        <SearchModal
          handleClose={handleClose}
          open={openFilter}
          location={location}
          title={title}
          setTitle={setTitle}
          setLocation={setLocation}
        />
      </div>

      <div
        className="flex items-center justify-center border-t border-t-gray-300 gap-1 py-2 cursor-pointer"
        onClick={() => setOpenFilter((prev) => !prev)}
      >
        <IoFilter className=" text-teal-700 text-[17px]" /> Filters
        {openFilter ? <HiChevronUp /> : <HiChevronDown />}
      </div>
    </div>
  );
};
export default SearchFilter;
