import React from 'react'
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons'

function Inputs() {
  return (
    <div className="flex flex-row justify-center my-6">
        <div className="flex flex-row w-3/4 items-center justify-center space-x-4">

            <input type="text" className="text-xl font-light p-2 focus:outline-none w-full shadow-xl capitalize placeholder:lowercase" placeholder="Search for city..." />
            <UilSearch color="white" size={25} className="cursor-pointer transition ease-out hover:scale-125"/>
            <UilLocationPoint color="white" size={25} className="cursor-pointer transition ease-out hover:scale-125"/>

        </div>

        <div className="flex flex-row w-1/4 items-center justify-center">

            <button name="metric" className="text-xl text-white font-light">°C</button>
            <p className="text-xl text-white mx-1">|</p>
            <button name="imperial" className="text-xl text-white font-light">°F</button>

        </div>
    </div>
  )
}

export default Inputs