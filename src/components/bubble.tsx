"use client"

import { useState } from "react";
import  clsx from "clsx";
import { redirect } from "next/navigation";

type Props = {
    children?: React.ReactNode;
    title?: string;
    link: string;
};

export default function Bubble({
    children,
    title,
    link,
}: Props) {

    const [hovering, setHovered] = useState(false);

    return (
          <div onMouseOver={() => setHovered(true)} onMouseOut={() => setHovered(false)} onClick={() => {window.location.href = link;}} className={clsx("flex text-white rounded-full shadow-2xl cursor-pointer duration-500 justify-center items-center", [hovering ? "w-[25vw] h-[25vw]" : "w-[15vw] h-[15vw]"])} style={{
            background: 'radial-gradient(circle, rgb(25, 25, 255) 0%, rgb(15, 0, 120) 70%)',
            transformOrigin: 'center center',
            pointerEvents: "all"
          }}>
            {
                <div className="duration-500 flex justify-center items-center">
                    <div className="duration-500 text-center p-16 rounded-2xl" style={hovering ? {opacity: "100%", fontSize: "calc(0.9vw - 1px)", width: "28vw"} : {opacity: "0%", fontSize: "1pt", width: "15vw"}}>
                        {children}
                    </div>
                    <div className="absolute duration-500" style={
                        hovering ? {transform: "translateY(15vw)"} : {transform: "translateY(0)"}
                    }>
                        <div className={"text-lg duration-500"}>
                            {title}
                        </div>
                    </div>
                </div>
            }
          </div>
    );
}
  