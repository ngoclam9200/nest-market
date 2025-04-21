import CategorySlider from "./category-slider/category-slider";
import HomeSlider from "./home-slider/home-slider";
import PopularProduct from "./popular-product/popular-product";
import "./home.scss";
import BestSell from "./best-sell/best-sell";
import Deal from "./Deal/Deal";
import TrendingProduct from "./TrendingProduct/TrendingProduct";
const Home = () => {
  return (
    <>
      <HomeSlider></HomeSlider>
      <CategorySlider></CategorySlider>
      <PopularProduct></PopularProduct>
      <BestSell></BestSell>
      <Deal></Deal>
      <TrendingProduct></TrendingProduct>
    </>
  );
};
export default Home;
