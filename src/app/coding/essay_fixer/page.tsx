"use client";

import Spinner from "@/components/spinner";
import clsx from "clsx";
import { useState } from "react";

export default function Essay() {
    const [enteredText, setEnteredText] = useState<string>("");
    const [outputList, setOutputList] = useState<boolean | any[][]>(false);

    const testInput = "On the Great Barrier Reef, there are at least 400 different species of coral"
    const testOutput = [['On', 23.920625447028794, '<h1>', 'package', 'The'], [' the', 100.0, ' the', ' a', ' January'], [' Great', 0, ' occasion', ' first', ' morning'], [' Barrier', 91.57519128171118, ' Wall', ' Lakes', ' Plains'], [' Reef', 100.0, ' Reef', ' Re', ','], [',', 100.0, ',', '’', ' ('], [' there', 76.05596437756127, ' the', ' a', ' there'], [' are', 100.0, ' are', ' is', '’'], [' at', 55.97928177303322, ' many', ' a', ' two'], [' least', 100.0, ' least', 'least', 'titudes'], [' ', 0, ' two', ' three', ' five'], ['4', 84.47529208460213, '1', '2', 'two'], ['0', 100.0, '0', '5', '2'], ['0', 100.0, '0', ' ,', '2'], [' different', 66.37263330209878, '0', ' ,', ' species'], [' species', 100.0, ' species', ' kinds', ' types'], [' of', 100.0, ' of', '.', ' .'], [' coral', 96.2389435689176, ' fish', ' coral', ' reef']]

    return (
        <div className="absolute block w-full h-full bg-gray-100">
            <div className="block h-min w-full shadow text-2xl p-4 pl-6 justify-start items-center">
                <div className="font-bold">
                    AI Essay Checker
                </div>
                <div className="text-sm">
                    Get detailed annotation showing which parts of your essay ChatGPT likes and doesn't like, and get suggestions for alternate word choices.<br/>
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
                                outputList.map((value, index) => {
                                    let token = value[0];
                                    let confidence = -value[1] + 100
                                    let candidates = value[2]
                                    

                                    return(
                                        <div key={index} style={{backgroundColor: `rgb(${2.55 * confidence}, 200, 100)`}} className="h-min w-min px-1 cursor-pointer">
                                            {token}
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
                                        setOutputList(testOutput)
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