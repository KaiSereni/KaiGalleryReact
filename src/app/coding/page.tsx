"use client";

import React, { useEffect, useRef, useState } from "react"
import grid from "../../../public/image/grid.png"
import clsx from "clsx";

export default function Coding() {
    interface numJson {
        [index : number] : boolean
    }
    
    const [shownImage, setShownImage] = useState(0);
    const [loadStatuses, setLoadStatuses] = useState<Number[]>([]);

    const totalImages = 69;

    useEffect(() => {
        const handleScroll = () => {
            let sh = window.scrollY;
            setShownImage(Math.floor(sh/9))
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
                <img src={thisPath} style={shownImage == i ? {display: "block"} : {display: "none"}} className="absolute max-h-[700px]" onLoad={() => {
                    console.log(i + " loaded");
                    let current = loadStatuses;
                    current.push(i);
                    setLoadStatuses(current);
                }}
                onError={() => {
                    console.error("ERROR RENDERING IMAGE " + i + " IN ANIMATION");
                }}
                />
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
            <div className="block w-full h-[150vh] bg-gray-800 text-white">
                
            </div>
            <div className="bg-white w-full h-[150vh]">

            </div>
            <div className={clsx("absolute w-[100vw] h-[100vw] top-0 left-0 bg-blue-600 text-white text-center text-2xl", [loadStatuses.length >= totalImages ? "none" : "block"])}>
                <p className="my-64">LOADING</p>
            </div>
        </div>
    )
}