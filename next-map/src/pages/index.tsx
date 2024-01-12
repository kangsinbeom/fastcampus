/*global kakao*/

import Map from "@/components/Map";
import Markers from "@/components/Markers";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Home() {
  return (
    <>
      <Map />
      <Markers />
    </>
  );
}

export async function getStaticProps() {
  const stores = await fetch();
}
