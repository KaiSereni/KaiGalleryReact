"use client";

import { useEffect, useState } from "react"
import b from "../../../public/image/ide_elements/b.png"
import c from "../../../public/image/ide_elements/c.png"
import d from "../../../public/image/ide_elements/d.png"
import e from "../../../public/image/ide_elements/e.png"
import grid from "../../../public/image/grid.png"

export default function Coding() {

    const [sh, updateScroll] = useState(0);
    const IDETitleWidth = 800

    useEffect(() => {
        const handleScroll = () => {
            let scroll = window.scrollY;
            updateScroll(scroll);
        }

        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    })


    return (
        <div className="block">
            <div className="block h-[700px]">
                <div className="flex w-full h-full justify-center bg-gray-100">
                    <img src={b.src} className={"absolute w-[" + IDETitleWidth + "px]"} style={{transform: "translateY(" + sh * 0.4 + "px)"}}/>
                    <img src={c.src} className={"absolute w-[" + IDETitleWidth + "px]"} style={{transform: "translateY(" + sh * 0.1 + "px)"}}/>
                    <h2 className="absolute text-white" style={{fontSize: "40pt", transform: "translateY(" + (sh * -5 + 200) + "px)"}}>Kai's Code</h2>
                    <img src={d.src} className={"absolute w-[" + IDETitleWidth + "px]"} style={{transform: "translateY(" + (sh * 0.2) + "px)"}}/>
                    <img src={e.src} className={"absolute w-[" + IDETitleWidth + "px]"} style={{transform: "translateY(" + (sh * 0.7 ) + "px)"}}/> 
                    <img src={grid.src} className="opacity-60 scale-150" style={{mixBlendMode: "darken"}}/>
                </div>
            </div>
            <div className="block w-full h-[150vh]">
                <div className="absolute bg-gray-800 w-full h-[150vh] text-white">

                </div>
            </div>
            <div className="bg-white w-full h-[150vh]">

            </div>
        </div>
    )
}