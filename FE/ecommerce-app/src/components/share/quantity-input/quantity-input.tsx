import "./quantity-input.scss";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

interface CountProps {
  quantity: number;
  setQuantity: (count: number) => void;
}

const QuantityInput: React.FC<CountProps> = ({ quantity, setQuantity }) => {
  return (
    <>
      <div className="detail-qty border radius">
        <a className="qty-down">
          <KeyboardArrowUpOutlinedIcon onClick={() => setQuantity(quantity + 1)}></KeyboardArrowUpOutlinedIcon>
        </a>
        <input
          type="text"
          name="quantity"
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              setQuantity(value ? parseInt(value) : 0);
            }
          }}
          value={quantity}
          className="qty-val"
          defaultValue={quantity}
          min="1"
        />
        <a className="qty-up">
          <KeyboardArrowDownOutlinedIcon onClick={() => setQuantity(quantity - 1)}></KeyboardArrowDownOutlinedIcon>
        </a>
      </div>
    </>
  );
};

export default QuantityInput;
