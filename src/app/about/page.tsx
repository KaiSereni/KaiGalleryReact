"use client";

import { useEffect, useState } from "react";
import arrow from "../../../public/image/arrow_icon.png";

interface tl {
    [date: string]: {
        title?: string,
        location?: string,
        description?: string,
        months_since_birth: number
    }
}

export default function About() {
    const timeline_items:tl = {
        "Nov 2006": {
            "title": "birth",
            "location": "melbourne",
            "description": undefined,
            "months_since_birth": 0
        },
        "Jul 2012": {
            "title": "birth",
            "location": "melbourne",
            "description": undefined,
            "months_since_birth": 6
        },
    }

    const [scrollSpeed, setScrollSpeed] = useState(0);

    useEffect(() => {
        let lastScrollTop = 0;
        let lastScrollTime = Date.now();

        // Function to calculate scroll speed
        function calculateScrollSpeed() {
            const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
            const currentTime = Date.now();
            
            // Calculate time difference
            const timeDiff = currentTime - lastScrollTime;
            
            // Calculate distance scrolled
            const scrollDistance = Math.abs(currentScrollTop - lastScrollTop);
            
            // Calculate scroll speed in pixels per second
            const scrollSpeed = (scrollDistance / timeDiff) * 100;
            
            // Update last scroll position and time
            lastScrollTop = currentScrollTop;
            lastScrollTime = currentTime;
            
            return Math.min(scrollSpeed, 1000);
        }

        setTimeout(() => {
            checkHasntScrolled();
        }, 2000);

        function checkHasntScrolled() {
            const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
            if (currentScrollTop === 0) {
                document.getElementById("scroll-indicator")?.classList.add("shown");
                document.getElementById("scroll-indicator")?.classList.remove("hidden");
                setTimeout(() => {
                    checkHasntScrolled();
                }, 1000);
            }
            else {
                document.getElementById("scroll-indicator")?.remove();
            }
        }

        const handleScroll = () => {
            setScrollSpeed(calculateScrollSpeed());
            setTimeout(() => {
                handleScroll();
            }, 100);
        }
        
        handleScroll();
    }, []);

    return (
        <>
            <div className="flex justify-center items-center w-full h-[8000px] bg-white">
                <div className="relative flex justify-center w-[200px] h-full">
                    <div className="w-[20px] h-full absolute bg-black"></div>
                    {
                        Object.entries(timeline_items).map(([date, details], index) => {
                            const top = `${details.months_since_birth * 100 + 50}px`
                            return (
                                <div 
                                    className={`absolute block bg-black w-full h-[200px] rounded-full duration-200`}
                                    style={{
                                        transform: `translateY(${top}) scale(${1 - scrollSpeed / 2000}, ${1 + scrollSpeed / 1000})`,
                                        
                                    }}
                                    key={index}
                                >
                                    <div className="flex h-fit w-full items-center justify-center text-white font-bold text-3xl mt-[80px]">
                                        {date}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="fixed flex w-fit h-fit hidden bottom-16 justify-center items-center p-4 rounded fadeDown" id="scroll-indicator" style={{backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
                    <p className="text-white text-3xl">Scroll down</p>
                    <img src={arrow.src} alt="arrow" className="w-[50px] h-[50px] rotate-90" style={{filter: "invert(1)"}}/>
                </div>
            </div>
        </>
    )
}