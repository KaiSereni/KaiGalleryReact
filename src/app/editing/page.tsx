"use client";

import { useEffect, useState } from "react";

export default function Editing() {

    const [shownImage, setShownImage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const totalImages = 59;

    useEffect(() => {

        function idToImgname(id: number): string {
            let thisName : string;
            if (id.toString().length == 1) {
                thisName = "0000" + id;
            }
            else {
                thisName = "000" + id;
            }
            return `MAIN_${thisName}.png`;
        }

        for (let i = 0; i <= totalImages; i++) {
            const thisName = idToImgname(i);

            console.log("thisName: " + thisName)

            const container = document.getElementById('clapContainer');
            const imgel = document.createElement('img');
            imgel.src = thisName;
            imgel.id = thisName;
            imgel.style.display = 'none'
            imgel.className = 'absolute h-[256px]'
            container?.appendChild(imgel);
        }

        const updateImages = (img: number | string) => {
            if (typeof img === 'number') {
                img = idToImgname(img);
            }

            let imgEl = document.getElementById(img);

            if (imgEl !== null) {
                for (let i = 0; i < totalImages; i++) {
                    document.getElementById(idToImgname(i))!.style.display = 'none'
                }
                imgEl.style.display = 'block'
            }
        }
        
        updateImages(0);
    
        function handleScroll() {
            let sh = window.scrollY;
            updateImages(Math.floor(sh/9)*2);
        }
        
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            setIsLoading(false);
        };
    }, []);

    return (
        <>
            <div 
                style={{
                    background: 'radial-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3))',
                }}
                className="w-full h-full fixed z-80"
            />
            <div className="fixed w-full h-fit" style={{pointerEvents: 'none'}} id='clapContainer'>
            </div>
            <div className="absolute w-full h-[500%]">
                
            </div>
        </>
    )
}