import React, { useState } from "react";
import "../selectDrop/select.scss";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ClickAwayListener } from "@mui/material";

interface SelectDropProps {
  data: string[];
  placeholder: string;
}
const SelectDrop :React.FC<SelectDropProps> = ({data, placeholder}) => {
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [selectedIndex, setselectedIndex] = useState(0);
  const [selectedItem, setselectedItem] = useState(placeholder);

  const openSelect = () => {
    setIsOpenSelect(!isOpenSelect);
  };
  const closeSelect = (index: number, value: string) => {
    setselectedIndex(index);
    setIsOpenSelect(!isOpenSelect);
    setselectedItem(value);
  };
  return (
    <ClickAwayListener onClickAway={() => setIsOpenSelect(false)}>
      <div>
        <span className="open-select" onClick={openSelect}>
          {selectedItem}
          <KeyboardArrowDownIcon className="arrow-icon" />
        </span>
        {isOpenSelect && (
          <div className="select">
            <div className="search-field">
              <input type="text" placeholder="Select here..." />
            </div>
            <ul className="search-results">
                {data.map((item: any, index : number)=>{
                    return (
                      <li key={index}
                        className={selectedIndex == index ? "active" : ""}
                        onClick={() => {
                          closeSelect(index, item);
                        }}
                      >
                       {item}
                      </li>
                    );
                })}
            </ul>
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};
export default SelectDrop;
