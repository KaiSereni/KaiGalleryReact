"use client";

import ScrollAnim from "@/components/animated_scroll";
import { Prompt } from "next/font/google";
import { useEffect, useState } from "react";

const prompt = Prompt({weight: "500", subsets : ["latin"]});

export default function Editing() {
    const totalImages = 75;

    const idToImgname = (id: number) => {
        let thisName : string;
        if (id.toString().length == 1) {
            thisName = "000" + id;
        }
        else {
            thisName = "00" + id;
        }
        return `clap${thisName}.png`;
    }

    return (
        <div className="absolute w-full h-full min-h-[200vh] bg-black">
            <div 
                style={{
                    background: 'radial-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3))',
                }}
                className="w-full h-full fixed z-80"
            />
            <div className="fixed flex h-content w-full justify-center items-center h-fit" style={{pointerEvents: 'none'}}>
                <div className="w-32 h-32">
                    <ScrollAnim idToImgName={idToImgname} totalImages={totalImages}/>
                </div>
                <div className={`relative text-white max-w-full text-2xl -ml-2 ${prompt.className}`}>
                    Kai's Editing
                </div>
            </div>
            <div className="absolute w-full h-[500%]">
                
            </div>
        </div>
    )
}