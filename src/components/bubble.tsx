"use client"

import { Children, useState } from "react";
import  clsx from "clsx";
import { redirect } from "next/dist/server/api-utils";

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
          <a onMouseOver={() => setHovered(true)} onMouseOut={() => setHovered(false)} href={link} className="flex text-white w-[15vw] h-[15vw] hover:scale-125 rounded-full shadow-2xl cursor-pointer duration-200 justify-center items-center" style={{
            background: 'radial-gradient(circle, rgb(25, 25, 255) 0%, rgb(15, 0, 120) 70%)',
            transformOrigin: 'center center',
          }}>
            {
                <div className="duration-200 flex justify-center items-center">
                    <div className="duration-100" style={hovering ? {opacity: "100%"} : {opacity: "0%"}}>
                        {children}
                    </div>
                    <div className="absolute duration-200" style={
                        hovering ? {transform: "translateY(8.5vw)"} : {transform: "translateY(0)"}
                    }>
                        <div className={clsx("text-xl", [hovering && "scale-75"])}>
                            {title}
                        </div>
                    </div>
                </div>
            }
          </a>
    );
}
  