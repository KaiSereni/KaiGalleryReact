"use client";

import React, { useEffect, useRef, useState } from "react"
import grid from "../../../public/image/grid.png"
import clsx from "clsx";

export default function Coding() {

    const [shownImage, setShownImage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const totalImages = 69;

    function handleLoad() {
        console.log("loaded")
        setIsLoading(false);
    }
    window.addEventListener("load", handleLoad);

    useEffect(() => {
        function handleScroll() {
            let sh = window.scrollY;
            setShownImage(Math.floor(sh/9));
        }

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [])
    
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
                <img key={i} src={thisPath} style={shownImage == i ? {display: "block"} : {display: "none"}} className="absolute h-[700px]"/>
            )
        }
        return r;
    }

    return (
        <div className="block">
            <div className="block h-[700px]">
                <div className="flex w-full h-full justify-center bg-gray-400">
                    <img src={grid.src} style={{mixBlendMode: "screen"}} className="absolute h-[700px]"/>
                    {
                        IDENodeList()
                    }
                </div>
            </div>
            <div className="block w-full h-[150vh] bg-gray-800 text-white">
                
            </div>
            <div className="bg-white w-full h-[150vh]">

            </div>
            <div className={clsx("absolute w-[100vw] h-[100vh] top-0 left-0 bg-blue-800 text-2xl justify-center items-center text-center p-8 text-white", [isLoading ? "block" : "hidden"])}>
                Loading...
            </div>
        </div>
    )
}