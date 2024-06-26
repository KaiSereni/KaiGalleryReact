"use client";

import React, { useEffect, useState } from "react"
import grid from "../../../public/image/grid.png"
import fai from "../../../public/image/FAILogo.png"
import Loading from "@/components/loading_screen";
import caco from "../../../public/image/CascadesAcademyLogo.png"
import swell from "../../../public/image/SwellAIlogo.svg"
import dhs from "../../../public/image/DHSLogo.png"
import ScrollAnim from "@/components/animated_scroll";
import ResumeItem from "@/components/resume-item-box";

export default function Coding() {

    const [isLoading, setIsLoading] = useState(true);
    const totalImages = 69;

    const idToImgname = (id: number) => {
        let thisName : string;
        if (id.toString().length == 1) {
            thisName = "0" + id;
        }
        else {
            thisName = "" + id;
        }
        return `ide${thisName}.png`;
    }

    return (
        <>
            <div className="block">
                <div className="block h-[700px]">
                    <div className="ansolute flex w-full h-full justify-center bg-gray-50">
                        <img src={grid.src} className="absolute h-[700px] opacity-10"/>
                        <ScrollAnim totalImages={totalImages} idToImgName={idToImgname} setIsLoading={setIsLoading}/>
                    </div>
                </div>
                <div className="block w-full h-auto min-h-64 bg-blue-900 text-white">
                    <div className="flex w-auto p-8">
                        <p className="text-7xl font-bold w-full">Personal Projects</p>
                    </div>               
                    <div className="flex flex-wrap w-full items-center">
                        <ResumeItem 
                            title="Forgot AI" 
                            iconSrc={fai.src}
                            date="April 2024"
                            openUrl="https://forgotai.com"
                        >
                            My personal AI playground. This is where I host an array of open-source AI projects, 100% coded by me. 
                        </ResumeItem>
                    </div>
                </div>
                <div className="block w-full h-auto min-h-64 bg-gray-800 text-white">
                    <div className="flex w-auto p-8">
                        <p className="text-7xl font-bold w-full text-right">Internships and Jobs</p>
                    </div>
                    <div className="flex flex-wrap w-full items-center">
                        <ResumeItem 
                            title="Swell AI" 
                            iconSrc={swell.src}
                            date="Jan 2024 - Current" 
                            openUrl="https://swellai.com"
                        >
                            SwellAI is a company that sells a service that specializes in content repurposing. I got a paid internship there in January of 2024 and got hands-on experience in industry-standard full-stack web development for a paid product. From this experience, I learned how to promote, communnicate, and monetize anything I create using the internet. If I ever create a cool script or AI model, that doesn't really matter unless I share it, which is why learning full-stack development is important.
                        </ResumeItem>
                        <ResumeItem 
                            title="Dermatology Health Specialists" 
                            iconSrc={dhs.src}
                            date="Oct 2024 - Current" 
                            openUrl="https://derm-health.com"
                        >
                            At my school, Cascades Academy, all juniors apply for and participate in an internship for the whole school year. I was lucky enough to get a coding internship at a local company called Dermatology Health Specialists. I worked with the lead surgeon and CEO, Dr. Oliver Wisco, to create a customizable patient database and analytics tool. I taught myself how to create advanced logic using ReactJS, and navigated HIPAA compliance. It took the whole year, and the result is very impressive.
                        </ResumeItem>
                        <ResumeItem 
                            title="Camp CREATE Summer Camp" 
                            iconSrc={caco.src}
                            date="Jun - July 2023, 2022" 
                            openUrl="https://cascadesacademy.org/community/camp-create"
                        >
                                I had an opportunity, after volunteering as a Counselor in Training for a year, to become a paid Junior Counselor for Cascades Academy's Camp Create. It was my job to assist the counselors in giving the 2nd-5th grade kids a fun time at camp, and my responsibilities included keeping the kids on task, cleaning, safety, and I also led my own one-hour curriculum. I learned the importance of helping my communnity, and how to work effectively with kids.
                        </ResumeItem>
                    </div>
                </div>
            </div>
            <Loading isLoading={isLoading}/>
        </>
    )
}