import './Deal.scss'
import DealItem from './DealItem/DealItem'

const Deal=()=>{
    return (
      <>
        <div className="container-fluid">
          <div className="title-deal">
            <h2>
                Deals of the day
            </h2>
          </div>
          <div className="row">
            <DealItem></DealItem>
            <DealItem></DealItem>
            <DealItem></DealItem>
            <DealItem></DealItem>
          </div>
        </div>
      </>
    );
}

export default Deal;