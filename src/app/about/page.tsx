"use client";

import { useEffect, useState } from "react";
import arrow from "../../../public/image/arrow_icon.png";

interface tl {
    [date: string]: {
        title?: string,
        location?: string,
        description?: string,
        time_since_birth: number
    }
}

export default function About() {
    const timeline_items:tl = {
        "Nov 2006": {
            "title": "Birth",
            "location": "Melbourne, Australia",
            "description": "In November of 2006, Kai was born to Holly Sereni, an Oregonian who works in fundraising for education, and John Sereni, an Australian with a Master's in advertising.",
            "time_since_birth": 0
        },
        "Jul 2012": {
            "title": "Moving to Hawai`i",
            "location": "Hawaii",
            "description": "When Kai was 6, he moved from Australia to Hawai`i before starting kindergarten at Punahou school.",
            "time_since_birth": 5
        },
        "2015": {
            "title": "Interest in coding",
            "location": "Hawaii",
            "description": "In 4th grade, Kai developed a strong interest in coding and, as a result, was tutored one-on-one in Scratch (block code) for the rest of his 4th grade year.",
            "time_since_birth": 9
        },
        "2016": {
            "title": "Robotics",
            "location": "Hawaii",
            "description": "In 3rd grade, Kai joined a LEGO robotics team. The age range was 4th - 6th grade, but an exception was made due to his interest.",
            "time_since_birth": 12
        },
        "Apr 2016 - 2020": {
            "title": "Filmmaking",
            "location": "Hawaii",
            "description": "Kai's interest in video editing and filmmaking led to the creation of his first YouTube channel, Pohaku Rockstar (see portfolio).",
            "time_since_birth": 14
        },
        "2018": {
            "title": "Python",
            "location": "Hawaii",
            "description": "Began experimenting with Python and Java, made some utilities and macros",
            "time_since_birth": 18
        },
        "2020": {
            "title": "Filmmaking and video",
            "location": "Hawaii",
            "description": "Started a new YouTube channel called Pohakoo which reached over 1,000 subscribers",
            "time_since_birth": 21
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
            <div className="flex w-full h-[8000px] bg-white">
                <div className="w-fit h-full px-16">
                    <div className="relative flex justify-center w-[200px] h-full">
                        <div className="w-[20px] h-full absolute bg-black"></div>
                        {
                            Object.entries(timeline_items).map(([date, details], index) => {
                                const top = `${details.time_since_birth * 100 + 50}px`
                                return (
                                    <div 
                                        className="absolute w-[200px] h-[200px]"
                                        style={{
                                            transform: `translateY(${top})`,
                                        }}
                                        key={index}
                                    >
                                        <div 
                                            className="relative block bg-black w-full h-full rounded-full duration-200 shadow-lg"
                                            style={{
                                                transform: `scale(${1 - scrollSpeed / 2000}, ${1 + scrollSpeed / 1000})`
                                            }}
                                        >
                                            <div className="flex h-full w-full items-center justify-center text-white text-center font-bold text-3xl">
                                                {date}
                                            </div>
                                        </div>

                                        <div 
                                            className="absolute flex items-center w-[30vw] h-full items-center p-2"
                                            style={{
                                                left: "calc(100% + 0.5em)",
                                                top: "0px"
                                            }}
                                        >
                                            <div className="block w-fit h-fit">
                                                <div className="font-bold">
                                                    {details['title']}
                                                </div>
                                                <div className="text-sm">
                                                    {details['location']}
                                                </div>
                                                <div className="mt-1">
                                                    {details["description"]}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="fixed flex w-fit h-fit hidden bottom-16 justify-center items-center p-4 rounded fadeDown" id="scroll-indicator" style={{backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
                    <p className="text-white text-3xl">Scroll down</p>
                    <img src={arrow.src} alt="arrow" className="w-[50px] h-[50px] rotate-90" style={{filter: "invert(1)"}}/>
                </div>
            </div>
        </>
    )
}