// src/pages/ListProduct/components/PriceFilter.tsx
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { formatCurrencyDecimal } from "../../../utils/helpers";

interface PriceFilterProps {
  value: number[];
  handleChange: (event: Event, newValue: number | number[]) => void;
  startValue: number;
  endValue: number;
  setIsFilterProduct : (value: boolean) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ value, handleChange, startValue, endValue, setIsFilterProduct }) => {
  function valuetext(value: number) {
    return `${value}°C`;
  }

  return (
    <div className="sidebar-widget price_range range mb-30">
      <h5 className="section-title style-1 mb-30">Lọc theo giá</h5>
      <div className="price-filter">
        <div className="price-filter-inner">
          <Slider
            sx={{
              color: "#3bb77e", // Change the track and thumb color
              "& .MuiSlider-thumb": {
                backgroundColor: "#3bb77e", // Change the thumb color
              },
              "& .MuiSlider-track": {
                backgroundColor: "#3bb77e", // Change the track color
              },
              "& .MuiSlider-rail": {
                backgroundColor: "grey", // Change the rail color
              },
            }}
            size="medium"
            max={10000000}
            getAriaLabel={() => "Temperature range"}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="off"
            getAriaValueText={valuetext}
          />
          <Box sx={{ width: 200 }}></Box>
          <div className="d-flex justify-content-between">
            <div className="caption">
              Từ:
              <strong id="slider-range-value1" className="text-brand">
                {formatCurrencyDecimal(startValue)}
              </strong>
            </div>
            <div className="caption">
              Đến:
              <strong id="slider-range-value2" className="text-brand">
                {formatCurrencyDecimal(endValue)}
              </strong>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <a className="btn btn-sm btn-default" onClick={() => setIsFilterProduct(true)}>
          <i className="fi-rs-filter mr-5"></i> Lọc
        </a>
      </div>
    </div>
  );
};

export default PriceFilter;
