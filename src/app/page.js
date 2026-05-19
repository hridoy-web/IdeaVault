
import HomePage from "@/components/Home/HeroBanner";
import HowItWorks from "@/components/Home/HowItWorks";
import TopContributors from "@/components/Home/TopContributors";
import TrendingIdeas from "@/components/Home/TrendingIdeas";


const Home = () => {
  return (
    <div>
      <HomePage />
      <TrendingIdeas/>
      <TopContributors/>
      <HowItWorks />
    </div>
  );
};

export default Home;