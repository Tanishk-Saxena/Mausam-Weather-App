import React from 'react'

function TopButtons({setQuery}) {

    const cities = [
        {
            id: 1,
            title: "London"
        },
        {
            id: 2,
            title: "Sydney"
        },{
            id: 3,
            title: "Tokyo"
        },{
            id: 4,
            title: "Toronto"
        },{
            id: 5,
            title: "Paris"
        },
    ];

    const handleOnClick = (val) => {
            setQuery({q: val});
    }

    return (
        <div className="flex items-center justify-around my-6 space-x-4 md:space-x-0">
            {cities.map((city) => (
                <button key={city.id} className="text-white text-sm md:text-lg font-medium" onClick={()=>{handleOnClick(city.title)}}>{city.title}</button>
            ))}
        </div>
    )
}

export default TopButtons