
import HeroBanner from "@/components/Home/HeroBanner";
import HowItWorks from "@/components/Home/HowItWorks";
import TopContributors from "@/components/Home/TopContributors";
import TrendingIdeas from "@/components/Home/TrendingIdeas";


const HomePage = () => {
  return (
    <div>
      <HeroBanner />
      <TrendingIdeas/>
      <TopContributors/>
      <HowItWorks />
    </div>
  );
};

export default HomePage;