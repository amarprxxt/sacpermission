import { Card } from "./AboutCSS";
import profile from "./pic.png"

function About() {

  const amar = {
    name: "Amarpreet Singh",
    designation: "Pre-Final Year",
    image: profile,
  };

  return (
    <>
      <h1 className="font-bold text-white text-center text-5xl">
        Hey, I am Amarpreet!
      </h1>
      <div className="py-20 sm:py-25 flex gap-10 flex-wrap justify-center align-center">
        <Card member={amar} />
      </div>
    </>
  );
}
export { About };
