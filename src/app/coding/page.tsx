"use client";

import React, { useEffect, useRef, useState } from "react"
import grid from "../../../public/image/grid.png"
import clsx from "clsx";
import Spinner from "@/components/spinner";
import Loading from "@/components/loading_screen";

export default function Coding() {

    const [shownImage, setShownImage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const totalImages = 69;
    function handleScroll() {
        let sh = window.scrollY;
        setShownImage(Math.floor(sh/9));
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            setIsLoading(false);
        };
    });
    
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
                <img key={i} src={thisPath} style={shownImage == i ? {display: "block"} : {display: "none"}} className="absolute h-[700px] w-[1244px]"/>
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
                    <Loading isLoading={isLoading}/>
            </div>
        </div>
    )
}