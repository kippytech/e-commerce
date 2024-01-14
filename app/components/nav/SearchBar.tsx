'use client'

import { useRouter } from "next/navigation"
import queryString from "query-string"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

function SearchBar() {

    const router = useRouter()

    const { register, handleSubmit, reset, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            searchTerm: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (!data.searchTerm) return router.push('/')

        const url = queryString.stringifyUrl({
            url: '/',
            query: {
                searchTerm: data.searchTerm
            }
        }, {skipNull: true})

        router.push(url)
        reset()
    }

  return (
    <div className='flex items-center'>
        <input 
          className='p-2 border border-gray-300 rounded-l-md focus:border-[0.5px] focus:border-slate-500 focus:outline-none w-80'
          type='text'
          placeholder='Explore SokoMall'
          autoComplete="off"
          {...register('searchTerm')}
        />
        <button className="p-2 rounded-r-md bg-slate-700 hover:opacity-80 text-white"
          onClick={handleSubmit(onSubmit)}
        >
            Search
        </button>
    </div>
  )
}

export default SearchBar