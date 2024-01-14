'use client'

function SearchBar() {
  return (
    <div className='flex items-center'>
        <input 
          className='p-2 border border-gray-300 rounded-l-md focus:border-[0.5px] focus:border-slate-500 focus:outline-none w-80'
          type='text'
          placeholder='Explore SokoMall'
          autoComplete="off"
        />
        <button className="p-2 rounded-r-md bg-slate-700 hover:opacity-80 text-white">Search</button>
    </div>
  )
}

export default SearchBar