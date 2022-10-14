import React from 'react'

function TopButtons({setQuery}) {

    const cities = [
        {
            id: 1,
            title: "Mumbai"
        },
        {
            id: 2,
            title: "New Delhi"
        },{
            id: 3,
            title: "Kolkata"
        },{
            id: 4,
            title: "Chennai"
        },{
            id: 5,
            title: "Bangalore"
        },
    ];

    const handleOnClick = (val) => {
            setQuery({q: val});
    }

    return (
        <div className="flex items-center justify-around -mt-8 mb-6 space-x-6 md:space-x-0 flex-wrap">
            {cities.map((city) => (
                <button key={city.id} className="text-white text-sm md:text-lg font-medium p-2 hover:bg-white hover:text-gray-700 underline-offset-2 underline" onClick={()=>{handleOnClick(city.title)}}>{city.title}</button>
            ))}
        </div>
    )
}

export default TopButtons