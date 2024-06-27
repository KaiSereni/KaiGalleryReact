import clsx from "clsx";
import { useEffect, useState } from "react";

type Props = {
    title: string;
    date?: string;
    openUrl?: string;
    iconSrc?: string;
    children?: React.ReactNode;
}

export default function ResumeItem({title, date, iconSrc, children, openUrl}: Props) {
    const [windowWidth, setWindowWidth] = useState<number>(0);
    useEffect(() => {
        setWindowWidth(window.innerWidth);
        window.addEventListener("resize", () => {
            setWindowWidth(window.innerWidth);
        });
        return () => {
            window.removeEventListener("resize", () => {
                setWindowWidth(window.innerWidth);
            }
        )}
    }, []);
    
    return (
        <div 
            className={clsx("p-6 m-0", [
                windowWidth < 768 ? "w-full" : windowWidth < 1340 ? "w-1/2" : windowWidth < 1635 ? "w-1/3" : "w-1/4"
            ])}
        >
            <div 
                className="w-full h-fit bg-blue-700 p-0.5 opacity-85 shadow-xl cursor-pointer duration-200 hover:scale-105 hover:shadow-2xl hover:opacity-100 rounded-2xl" 
                style={{
                    backgroundImage: "linear-gradient(150deg, rgb(84, 82, 110), rgb(10, 10, 21))",
                }}
                onClick={
                    openUrl ? ((e) => {
                        // check if user clicked on a link
                        if ((e.target as HTMLElement).tagName.toLowerCase() !== "a") {
                            window.open(openUrl, "_blank")
                        }
                    }) : undefined
                }
            >
                <div className="relative block w-full min-h-[200px] rounded-2xl bg-gray-900 p-3 opacity-100">
                    <div className="w-full h-fit items-center justify-center flex">
                        {
                            iconSrc &&
                            <img src={iconSrc} className="w-6 h-6 mx-2 rounded-full"/>
                        }
                        {title}
                    </div>
                    {
                        date &&
                        <div className="w-full h-fit items-center justify-center flex mt-1 text-xs text-gray-300">
                            {date}
                        </div>
                    }
                    <div className="w-full h-full mt-2">
                        <p className="text-white">
                            {children}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        
    )
}