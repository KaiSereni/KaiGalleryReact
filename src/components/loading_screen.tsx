import clsx from "clsx";
import Spinner from "./spinner";

type Props = {
    isLoading: boolean
}

export default function Loading({isLoading} : Props) {
    return(
        <div className={clsx("fixed block w-[100vw] h-[100vh] top-0 left-0 bg-blue-800 text-2xl p-8 text-white", [isLoading ? "block" : "hidden"])}>
            <div className="mt-32 flex w-full mx-auto justify-center items-center text-center space-x-2">
                <Spinner/> <p className="w-16">Loading...</p>
            </div>
        </div>
    )
}