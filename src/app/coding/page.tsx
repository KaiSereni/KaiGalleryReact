"use client";

import React, { useEffect, useState } from "react"
import grid from "../../../public/image/grid.png"
import Loading from "@/components/loading_screen";
import caco from "../../../public/image/CascadesAcademyLogo.png"
import swell from "../../../public/image/SwellAIlogo.svg"
import dhs from "../../../public/image/DHSLogo.png"

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
                <img key={i} src={thisPath} style={shownImage == i ? {display: "block"} : {display: "none"}} className="absolute h-[700px] min-w-[1244px]"/>
            )
        }
        return r;
    }

    return (
        <>
            <div className="block">
                <div className="block h-[700px]">
                    <div className="flex w-full h-full justify-center bg-gray-50">
                        <img src={grid.src} className="absolute h-[700px] opacity-10"/>
                        <IDENodeList/>
                    </div>
                </div>
                <div className="flex w-full h-auto min-h-64 bg-gray-800 text-white">
                    <div className="flex w-auto p-8">
                        <p className="text-7xl font-bold">Internships and Jobs</p>
                    </div>
                    <div className="block w-full items-center space-y-8 my-16 mr-8">
                        <div className="flex w-auto space-x-2">
                            <img src={swell.src} className="w-12 h-12 cursor-pointer" onClick={() => {window.open("https://swellai.com", "_blank")}}/>
                            <div className="flex">
                                SwellAI is a company that sells a service that specializes in content repurposing. I got a paid internship there in January of 2024 and got hands-on experience in industry-standard full-stack web development for a paid product. From this experience, I learned how to promote, communnicate, and monetize anything I create using the internet. If I ever create a cool script or AI model, that doesn't really matter unless I share it, which is why learning full-stack development is important.
                            </div>
                        </div>
                        <div className="flex w-auto space-x-2">
                            <img src={dhs.src} className="w-10 h-10 m-1 cursor-pointer shadow" onClick={() => {window.open("https://derm-health.com", "_blank")}}/>
                            <div className="flex">
                                At my school, Cascades Academy, all juniors apply for and participate in an internship for the whole school year. I was lucky enough to get a coding internship at a local company called Dermatology Health Specialists. I worked with the lead surgeon and CEO, Dr. Oliver Wisco, to create a customizable patient database and analytics tool. I taught myself how to create advanced logic using ReactJS, and navigated HIPAA compliance. It took the whole year, and the result is very impressive.
                            </div>
                        </div>
                        <div className="flex w-auto space-x-2">
                            <img src={caco.src} className="w-10 h-10 m-1 cursor-pointer shadow" onClick={() => {window.open("https://www.cascadesacademy.org/community/camp-create", "_blank")}}/>
                            <div className="flex">
                                I had an opportunity, after volunteering as a Counselor in Training for a year, to become a paid Junior Counselor for Cascades Academy's Camp Create. It was my job to assist the counselors in giving the 2nd-5th grade kids a fun time at camp, and my responsibilities included keeping the kids on task, cleaning, safety, and I also led my own one-hour curriculum. I learned the importance of helping my communnity, and how to work effectively with kids.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white w-full h-[150vh]">
                        <Loading isLoading={isLoading}/>
                </div>
            </div>
        </>
    )
}