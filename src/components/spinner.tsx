import clsx from "clsx"
import wheel from "../../public/image/loadingSpinner.png"

type Props = {
    size?: number
    isBlack?: boolean
}

export default function Spinner({size, isBlack = false}: Props) {
    const s = size || 25

    return (
        <img src={wheel.src} width={s} height={s} className={"relative spinner"} style={isBlack ? {filter: "none"} : {filter: "invert(1)"}}/>
    )
}