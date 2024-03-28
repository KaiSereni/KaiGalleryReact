import Bubble from "@/components/bubble";

export default function Home() {
  return (
    <div className="h-full w-full block">
      <div className="block items-center justify-center mt-8">
        <h1>KAI'S PORTFOLIO</h1>
        <h2>Hover your mouse over a bubble to expand, then click for more info</h2>
      </div>
      <div className="h-[50%] w-full mt-32 flex justify-center items-center">
        <Bubble link="/coding" title="Coding">
          hi
        </Bubble>
      </div>
    </div>
  );
}
