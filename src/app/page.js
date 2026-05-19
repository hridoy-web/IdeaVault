
import HomePage from "@/components/Home/HeroBanner";
import HowItWorks from "@/components/Home/HowItWorks";
import TopContributors from "@/components/Home/TopContributors";


const Home = () => {
  return (
    <div>
      <HomePage />
      <TopContributors/>
      <HowItWorks />
    </div>
  );
};

export default Home;