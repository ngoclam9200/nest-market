import "./quantity-input.scss";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

interface CountProps {
  quantity: number;
  setQuantity: (count: number) => void;
  minQuantity?: number;
}

const QuantityInput: React.FC<CountProps> = ({ quantity, setQuantity, minQuantity = 0 }) => {
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > minQuantity) {
      setQuantity(quantity - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const newValue = value ? parseInt(value) : minQuantity;
      setQuantity(Math.max(newValue, minQuantity));
    }
  };

  return (
    <>
      <div className="detail-qty border radius">
        <a className="qty-up">
          <KeyboardArrowUpOutlinedIcon onClick={handleIncrement}></KeyboardArrowUpOutlinedIcon>
        </a>
        <input type="text" name="quantity" onChange={handleInputChange} value={quantity} className="qty-val" min={minQuantity} />
        <a className="qty-down">
          <KeyboardArrowDownOutlinedIcon onClick={handleDecrement}></KeyboardArrowDownOutlinedIcon>
        </a>
      </div>
    </>
  );
};

export default QuantityInput;
