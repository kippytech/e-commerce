"use client";

import { useRouter } from "next/navigation";
import queryString from "query-string";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

function SearchBar() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      searchTerm: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.searchTerm) return router.push("/");

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: {
          searchTerm: data.searchTerm,
        },
      },
      { skipNull: true },
    );

    router.push(url);
    reset();
  };

  return (
    <div className="flex items-center">
      <input
        className="md-w-80 w-40 flex-grow rounded-l-md border border-gray-300 p-2 focus:border-[0.5px] focus:border-slate-500 focus:outline-none"
        type="text"
        placeholder="Explore E-Shop"
        autoComplete="off"
        {...register("searchTerm")}
      />
      <button
        className="rounded-r-md bg-slate-700 p-2 text-white hover:opacity-80"
        onClick={handleSubmit(onSubmit)}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
