import "./QuantityInput.scss";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

interface CountProps {
  count: number;
}

const QuantityInput: React.FC<CountProps> = ({ count }) => {
  return (
    <>
      <div className="detail-qty border radius">
        <a className="qty-down">
          <KeyboardArrowUpOutlinedIcon></KeyboardArrowUpOutlinedIcon>
        </a>
        <input
          type="text"
          name="quantity"
          className="qty-val"
          defaultValue={count}
          min="1"
        />
        <a className="qty-up">
          <KeyboardArrowDownOutlinedIcon></KeyboardArrowDownOutlinedIcon>
        </a>
      </div>
    </>
  );
};

export default QuantityInput;
