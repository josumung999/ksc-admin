"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface inputProps {
  placeholder: string;
  type: string;
}

export function SearchBar(data: inputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the initial searchName value from the URL, if it exists
  const initialSearchValue = searchParams.get("searchName") ?? "";
  const [searchValue, setSearchValue] = useState<string>(initialSearchValue);

  // Update the searchValue state when input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // Handle search button click
  const handleSearch = () => {
    if (searchValue.trim()) {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set("searchName", searchValue);
      router.push(`/manage/clients?${newSearchParams.toString()}`);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full max-w-sm items-center justify-center space-x-2">
        <Input
          type={data.type}
          placeholder={data.placeholder}
          value={searchValue}
          onChange={handleInputChange}
        />
        <Button type="button" onClick={handleSearch}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </Button>
      </div>

      {searchValue !== "" && (
        <div className=" mt-5 flex w-full justify-start">
          <p className="font-satoshi text-sm text-black">
            Resultats pour -- {searchValue} --
          </p>
        </div>
      )}
    </div>
  );
}
