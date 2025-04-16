// Dropdown.tsx
import React, { ReactNode } from "react";
import './dropdown.scss'

interface DropdownItemProps {
  children: ReactNode;
  nested?: ReactNode;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ children, nested }) => {
  return (
    <div className="dropdown-item">
      <div className="dropdown-title">
        {children}
        {/* {nested && <span className="dropdown-arrow">{open ? "▼" : "▶"}</span>} */}
      </div>
      {nested && <div className="dropdown-content">{nested}</div>}
    </div>
  );
};

interface DropdownProps {
  items: Array<{
    title: ReactNode;
    nested?: Array<{
      title: ReactNode;
      nested?: Array<any>;
    }>;
  }>;
}

const Dropdown: React.FC<DropdownProps> = ({ items }) => {
  return (
    <div className="dropdown">
      {items.map((item, index) => (
        <DropdownItem
          key={index}
          nested={item.nested && <Dropdown items={item.nested} />}
        >
          {item.title}
        </DropdownItem>
      ))}
    </div>
  );
};

export default Dropdown;
