
import HeroBanner from "@/components/Home/HeroBanner";
import HowItWorks from "@/components/Home/HowItWorks";
import TopContributors from "@/components/Home/TopContributors";
import TrendingIdeas from "@/components/Home/TrendingIdeas";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { Suspense } from "react";


const HomePage = () => {
  return (
    <div>
      <HeroBanner />
      <Suspense fallback={<LoadingSpinner />}>
         <TrendingIdeas />
       </Suspense>
      <TopContributors/>
      <HowItWorks />
    </div>
  );
};

export default HomePage;