import Hero from "@/components/Home/Hero";
import useProfile from "@/hooks/useProfile";
import { getServerSideProps } from "@/utils/profileServerSide";

export default function Home() {
  return (
    <>
      <Hero />
    </>
  );
}

getServerSideProps();
