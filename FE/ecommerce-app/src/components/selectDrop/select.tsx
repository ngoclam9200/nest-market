import React, { useEffect, useState } from "react";
import "../selectDrop/select.scss";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ClickAwayListener } from "@mui/material";

interface SelectDropProps {
  data: any[];
  placeholder: string;
  isAll: boolean;
}
const SelectDrop: React.FC<SelectDropProps> = ({ data, placeholder, isAll }) => {
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [selectedIndex, setselectedIndex] = useState(0);

  const [selectedItem, setselectedItem] = useState({
    name: placeholder,
    id: -1,
  });
  useEffect(() => {
    if (isAll) {
      setselectedItem({ name: placeholder, id: -1 });
    }else{
      setselectedItem({ name: data[0].name, id: data[0].id });
    }
  }, [isAll]);

  const openSelect = () => {
    setIsOpenSelect(!isOpenSelect);
  };
  const closeSelect = (index: number, value: any) => {
    setselectedIndex(index);
    setIsOpenSelect(!isOpenSelect);
    setselectedItem(value);
  };
  return (
    <ClickAwayListener onClickAway={() => setIsOpenSelect(false)}>
      <div>
        <span className="open-select" onClick={openSelect}>
          {selectedItem.name}
          <KeyboardArrowDownIcon className="arrow-icon" />
        </span>
        {isOpenSelect && (
          <div className="select">
            <div className="search-field">
              <input type="text" placeholder="Select here..." />
            </div>
            <ul className="search-results">
              {data.map((item: any, index: number) => {
                return (
                  <li
                    key={index}
                    className={selectedIndex == index ? "active" : ""}
                    onClick={() => {
                      closeSelect(index, item);
                    }}
                  >
                    {item.name}
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
