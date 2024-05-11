"use client";

import Spinner from "@/components/spinner";
import clsx from "clsx";
import { useEffect, useState } from "react";
import copy from "../../../../public/image/copyClipboard.svg"
import useSWR from "swr";

export default function Essay() {
    const [enteredText, setEnteredText] = useState<string>("");
    const [outputList, setOutputList] = useState<boolean | (string | number)[][]>(false);
    const [clickedToken, setClickedToken] = useState<number | undefined>(undefined);

    useEffect(() => {
        const docClicked = (e : MouseEvent) => {
            if (!(e.target as HTMLElement).classList.contains("tooltip-click")) {
                setClickedToken(undefined);
            }
        }

        document.body.addEventListener('click', docClicked)
        return () => {
            document.body.removeEventListener('click', docClicked)
        }
    }, [])

    return (
        <div className="absolute block w-full h-full bg-gray-100">
            <div className="block h-min w-full text-2xl p-4 pl-6 justify-start items-center">
                <div className="font-bold">
                    AI Essay Checker
                </div>
                <div className="text-sm w-2/3">
                    Get detailed annotation showing which parts of your essay ChatGPT likes and doesn't like. Click to get suggestions for alternate word choices. Large Language Models work by taking a string of text, usually the text they already sent, and deciding what the next word should be. This tool shows how much ChatGPT agrees with your word choices.<br/>
                </div>
            </div>
            {
                // show if outputList is not a boolean value
                outputList !== false && outputList !== true &&
                <img 
                    src={copy.src}
                    className="relative mt-8 mb-2 ml-4 w-8 h-8 p-1 bg-blue-200 rounded-lg shadow cursor-pointer hover:scale-105 duration-200"
                    onClick={() => {
                        let allTokens = []
                        for (let i = 0; i < outputList.length; i++) {
                            let token = outputList[i][0];
                            allTokens.push(token);
                        }
                        navigator.clipboard.writeText(allTokens.join(""))   
                    }}
                />
            }
            <div className="block h-full">
                {
                    outputList === true || outputList === false ?
                    <textarea 
                        name="essay-input"
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
                        <div style={{flexWrap: 'wrap'}} className="relative flex h-min w-full wrap m-2">
                            {
                                outputList.map((value, index) => {
                                    let token = value[0] as string;
                                    let confidence = value[1] as number;
                                    let candidates;
                                    if (token === " ") {
                                        confidence = 100;
                                    }
                                    else {
                                        candidates = [value[2], value[3], value[4]] as [string, string, string] || undefined;
                                    }

                                    return(

                                        <div 
                                            key={index} 
                                            style={{
                                                backgroundColor: `hsl(${confidence} 90 60)`,
                                                whiteSpace:'pre',
                                            }} 
                                            className="h-min w-min cursor-pointer tooltip-click hover:scale-105 duration-200"
                                            onClick={() => {
                                                setClickedToken(index);
                                            }}
                                        >
                                            {token}

                                            {
                                                clickedToken === index && candidates &&
                                                <div className="absolute block bg-blue-200 w-fit h-fit p-1 my-1 shadow-lg">
                                                    {candidates.map((candidate, candidateIndex) => {
                                                        return (
                                                            <div className="p-1 cursor-pointer duration-200" key={candidateIndex}>
                                                                {candidate}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            }
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
                            () => {
                                setOutputList(true);
                                fetch('http://localhost:5000/correct', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({ "string": enteredText, "context_title": "What is the hottest object?" })
                                })
                                .then(response => response.json())
                                .then(j => j["data"])
                                .then(data => {
                                    setOutputList(data);
                                })
                                .catch(error => {
                                    console.error(error);
                                });
                            }
                    }
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