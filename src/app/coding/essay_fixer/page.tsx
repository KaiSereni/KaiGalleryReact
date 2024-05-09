"use client";

import Spinner from "@/components/spinner";
import clsx from "clsx";
import { useState } from "react";

export default function Essay() {
    const [enteredText, setEnteredText] = useState<string>("");
    const [outputList, setOutputList] = useState<boolean | {[key: string]: string[]}>(false);

    

    return (
        <div className="absolute block w-full h-full bg-gray-100">
            <div className="block h-min w-full shadow text-2xl p-4 pl-6 justify-start items-center">
                <div className="font-bold">
                    AI Essay Checker
                </div>
                <div className="text-sm">
                    Get detailed annotation showing where your essay sounds more or less professional, and get suggestions for alternate word choices.<br/>
                    You could get ChatGPT to write it for you, but it's honestly just better if you write it yourself and then ChatGPT modifies it. Yeah that's right I said it.
                </div>
            </div>
            <div className="block h-full">
                {
                    outputList === true || outputList === false ?
                    <textarea 
                        className={clsx("w-full h-[50%] bg-gray-50 p-4", [outputList !== false && "text-gray-700"])} 
                        placeholder="Paste your essay here..." 
                        style={{resize: "none", accentColor: 'transparent', pointerEvents: outputList !== false ? "none" : 'unset'}}
                        value={enteredText}
                        onInput={(ev) => {
                            const el = ev.target as HTMLTextAreaElement;
                            const input = el.value;
                            setEnteredText(input)
                        }}
                        
                    />
                    :
                    <div className="relative flex min-h-[50%] w-full bg-white">
                        <div style={{flexWrap: 'wrap'}} className="relative flex h-min w-full">
                            {
                                Object.keys(outputList).map((value, index) => {
                                    let placeInList = 100;
                                    let candidates = outputList[value]
                                    for (let i = 0; i < candidates.length; i++) {
                                        if (candidates[i] == value) {
                                            placeInList = i;
                                        }
                                    }

                                    return(
                                        <div key={index} style={{backgroundColor: `rgb(${Math.min(100 * placeInList, 255)}, 200, 100)`}} className="h-min w-min px-1">
                                            {value}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                }
                <div className="w-full flex">
                    <div
                        className={clsx("bg-blue-200 h-min py-2 px-4 m-4 mr-2 font-semibold rounded-2xl shadow-lg cursor-pointer duration-200", [outputList === false ? "hover:bg-blue-300 hover:scale-95 hover:shadow-none" : "bg-blue-300 scale-95 shadow-none text-gray-700"])}
                        onClick={
                            outputList === false ?
                            () => {
                                setOutputList(true);
                                if (process.env.NODE_ENV === "production") {
                                    console.error("URL UNKNOWN :3");
                                }
                                else {
                                    setTimeout(() => {
                                        setOutputList({
                                            "The": ["A", "For", "The"],
                                            "sun": ["thing", "object", "day", "ball"],
                                            "is": ["had", "is", "will"],
                                            "hot": ["hot", "big", "very", "not"],
                                            "and": ["without", "because", "for", "and"]
                                        })
                                    }, 1000);
                                }
                        } : undefined}
                    >
                        <div className="flex items-center justify-center">
                            {outputList === true && <Spinner isBlack={true}/>}
                            {outputList === true ? <div className="ml-2">Calculating...</div> : outputList === false ? <div>Calculate</div> : <div>Done!</div>}
                        </div>
                    </div>
                    <div
                        className={clsx("bg-blue-200 h-min py-2 px-4 my-4 font-semibold rounded-2xl shadow-lg cursor-pointer duration-200 hover:bg-blue-300 hover:scale-95 hover:shadow-none")}
                        onClick={() => {
                            setOutputList(false);
                            setEnteredText("");
                        }}
                    >
                        Clear workspace
                    </div>
                </div>
            </div>
        </div>
    )
}