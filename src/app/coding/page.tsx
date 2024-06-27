"use client";

import React, { useEffect, useState } from "react"
import grid from "../../../public/image/grid.png"
import fai from "../../../public/image/FAILogo.png"
import pohakoo from "../../../public/image/pohakoo.jpg"
import rockstar from "../../../public/image/rockstar.jpg"
import Loading from "@/components/loading_screen";
import caco from "../../../public/image/CascadesAcademyLogo.png"
import swell from "../../../public/image/SwellAIlogo.svg"
import dhs from "../../../public/image/DHSLogo.png"
import pc from "../../../public/image/PC.jpg"
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
                            My personal AI playground. This is where I host an array of open-source AI projects, 100% coded by me. I have a fascination with AI, and while researching it, I identified several potential products that didn't yet exist but were in demand. I couldn't just stand by waiting for large companies to develop these things, so I just made them myself and made them open source. I learned how to create a website from concept to launch, how to integrate a backend with advanced code, and how to maintain cost-effectiveness.
                        </ResumeItem>
                        <ResumeItem 
                            title="PohakuRockstar (Old YouTube channel)" 
                            iconSrc={rockstar.src}
                            date="April 2016 - Aug 2020"
                            openUrl="https://youtube.com/DudePerfict"
                        >
                            This YouTube channel is where I first started making videos with my friends, and adding simple VFX wherever I could. I loved editing, and used any free software I could get my hands on to make creative videos. I made videos on this channel ranging from <a className="text-blue-400 underline" href="https://youtu.be/4Khc1lve8NA?si=qMuVPD6TIZvv6z_w" target="blank">electrical engineering and coding</a> to <a className="text-blue-400 underline" href="https://youtu.be/HWNwnK0-w1g?si=oX1-7pxl-r9kzghW" target="blank">spy skits</a> I made with my friends in my neighborhood.
                        </ResumeItem>
                        <ResumeItem 
                            title="Pohakoo (New YouTube channel)" 
                            iconSrc={pohakoo.src}
                            date="May 2020 - Current"
                            openUrl="https://youtube.com/Pohakoo"
                        >
                            I've always loved making videos. I started my first YouTube channel in April 2016, and made videos with my friends. In May 2020, I started a new channel called Pohakoo, where I make videos about whatever I'm interested in. While making content for this channel, I developed my fascination with VFX and video editing. I watch a hours and hours of content from channels that explain how VFX in movies are made.
                        </ResumeItem>
                        <ResumeItem 
                            title="Building my own computer" 
                            date="2019 - 2023"
                            openUrl="https://youtube.com/Pohakoo"
                        >
                            <div className="block w-full h-full">
                                <div className="w-full h-fit flex items-center justify-center">
                                    <img src={pc.src} className="w-1/3 h-fit m-2"/>
                                </div>
                                I've been building this computer for years. An iPad sufficed when I was young, but when my interests moved to advanced video editing and coding, I needed a PC. My parents were unable to buy one for me, but luckily, my dad's office threw out a really old one and he gave it to me. Then, I kind of Thesius's Ship'ed it, slowly replacing each part with an upgraded one, until the only evidence that this was the same computer was the software. Since this was very early on, this gave me a confidence in my ability to teach myself how to so something like this using YouTube tutorials and intuition.
                            </div>
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
                            SwellAI is a company that sells a service that specializes in content repurposing. I got a paid internship there in January of 2024 and got hands-on experience in industry-standard full-stack web development for a paid product. From this experience, I learned how to promote, communnicate, and monetize anything I create using the internet. If I ever create a cool script or AI model, that doesn't really matter unless I share it and allow others to use it, which is why learning full-stack development is important.
                        </ResumeItem>
                        <ResumeItem 
                            title="Dermatology Health Specialists" 
                            iconSrc={dhs.src}
                            date="Oct 2024 - Current" 
                            openUrl="https://derm-health.com"
                        >
                            At my school, Cascades Academy, all juniors apply for and participate in an internship for the whole school year. I was lucky enough to get a coding internship at a local company called Dermatology Health Specialists. I worked with the lead surgeon and CEO, Dr. Oliver Wisco, to create a customizable patient database and analytics tool. I taught myself how to create advanced logic using ReactJS, and navigated HIPAA compliance. My primary goal was to gather a dataset to train a model to identify skin cancer, and the product is designed to gather the dataset in a way that also improves doctors' lives; a valuable learning experience.
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