import CategorySlider from "./CategorySlider/CategorySlider";
import HomeSlider from "./HomeSlider/HomeSlider";
import PopularProduct from "./PopularProduct/PopularProduct";
import './Home.scss'
import BestSell from "./BestSell/BestSell";
import Deal from "./Deal/Deal";
import TrendingProduct from "./TrendingProduct/TrendingProduct";
const Home=()=>{
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
}
export default Home