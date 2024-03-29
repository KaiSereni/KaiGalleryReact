import Bubble from "@/components/bubble";
import { getBlurbs } from "@/components/static_text";

export default function Home() {
  const blurbs = getBlurbs();

  return (
    <div className="h-full w-full block">
      <div className="block items-center justify-center mt-8">
        <h1>KAI'S PORTFOLIO</h1>
        <h2>Hover your mouse over a bubble to expand, then click for more info</h2>
      </div>
      <div className="h-content w-full mt-[15vh] flex justify-center items-center space-x-8 hover:space-x-2" style={{pointerEvents: "none"}}>
        <Bubble link="/coding" title="Coding">
          {blurbs.coding}
        </Bubble>
        <Bubble link="/editing" title="Film & Video Editing">
          {blurbs.editing}
        </Bubble>
        <Bubble link="/school" title="Academics">
          {blurbs.school}
        </Bubble>
        <Bubble link="/about" title="About me">
          {blurbs.about}
        </Bubble>
      </div>
    </div>
  );
}
