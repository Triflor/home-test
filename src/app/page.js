import dynamic from "next/dynamic";
const Landing = dynamic(() => import('./home/page'))

export default function Home() {
  return (
    <div className="">
      <Landing/>
    </div>
  );
}
