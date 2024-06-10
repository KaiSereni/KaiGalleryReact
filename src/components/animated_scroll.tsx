"use client";

import { useEffect } from "react";

type props = {
    idToImgName: (id: number) => string
    totalImages: number
}

export default function ScrollAnim({idToImgName, totalImages}: props) {

    useEffect(() => {

        for (let i = 0; i < totalImages; i++) {
            const thisName = idToImgName(i);

            console.log("thisName: " + thisName)

            const container = document.getElementsByClassName('animation_container')[0];
            const imgel = document.createElement('img');
            imgel.src = thisName;
            imgel.id = thisName;
            imgel.style.display = 'none'
            imgel.className = 'absolute h-[256px]'
            container?.appendChild(imgel);
        }

        const updateImages = (img: number | string) => {
            if (typeof img === 'number') {
                img = idToImgName(img);
            }

            let imgEl = document.getElementById(img);

            if (imgEl) {
                for (let i = 0; i < totalImages; i++) {
                    try {
                        document.getElementById(idToImgName(i))!.style.display = 'none'
                    }catch(e){}
                }
                try {
                    imgEl.style.display = 'block'
                }catch(e){}
            }
            else {
                try {
                    document.getElementById(idToImgName(totalImages-1))!.style.display = 'block'
                }catch(e){}
            }
        }
        
        updateImages(0);
    
        function handleScroll() {
            let sh = window.scrollY;
            try {
                updateImages(Math.floor(sh/9));
            }catch(e){}
        }
        
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="animation_container"></div>
    )
}