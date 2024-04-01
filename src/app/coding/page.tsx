"use client";

import React, { useEffect, useRef, useState } from "react"
import grid from "../../../public/image/grid.png"

export default function Coding() {

    const [sh, updateScroll] = useState(0);
    const [shownImage, setShownImage] = useState(0);
    const [loadStatuses, setLoadStatuses] = useState<{[key : number] : boolean}>({});

    const totalImages = 69;

    useEffect(() => {
        const handleScroll = () => {
            let scroll = window.scrollY;
            updateScroll(scroll);
            setShownImage(Math.floor(scroll/12))
        }

        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    })
    
    const IDENodeList = () => {
        let r = []
        for (let i = 0; i <= totalImages; i++) {
            let thisName;
            if (i.toString().length == 1) {
                thisName = "0" + i;
            }
            else {
                thisName = i.toString();
            }
            const thisPath = `ide${thisName}.png`

            r.push(
                <img src={thisPath} style={shownImage == i ? {display: "block"} : {display: "none"}} className="absolute h-[700px]" onLoad={() => {
                    let current = loadStatuses;
                    current[i] = true
                    setLoadStatuses(current);
                    console.log(loadStatuses);
                }}/>
            )
        }
        return r;
    }

    return (
        <div className="block">
            <div className="block h-[700px]">
                <div className="flex w-full h-full justify-center bg-gray-100">
                    {
                        IDENodeList()
                    }
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