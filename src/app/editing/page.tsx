"use client";

import ScrollAnim from "@/components/animated_scroll";
import { useEffect, useState } from "react";

export default function Editing() {
    const totalImages = 59;

    const idToImgname = (id: number) => {
        let thisName : string;
        if (id.toString().length == 1) {
            thisName = "0000" + id;
        }
        else {
            thisName = "000" + id;
        }
        return `MAIN_${thisName}.png`;
    }

    return (
        <>
            <div className="absolute w-full h-full min-h-[200vh] bg-black">
                <div 
                    style={{
                        background: 'radial-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3))',
                    }}
                    className="w-full h-full fixed z-80"
                />
                <div className="fixed w-1/5 justify-center items-center h-fit" style={{pointerEvents: 'none'}}>
                    <ScrollAnim idToImgName={idToImgname} totalImages={totalImages}/>
                </div>
                <div className="absolute w-full h-[500%]">
                    
                </div>
            </div>
        </>
    )
}