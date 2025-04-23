// src/pages/ListProduct/components/CategorySidebar.tsx
import { List, ListItemButton, ListItemText, ListSubheader, Collapse } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { CategoryResponse } from "../../../response/category";
import { domainMedia } from "../../../enums/Enum";

interface CategorySidebarProps {
  parentCategory: CategoryResponse[];
  handleClickCategory: (id: number) => void;
  setCurrentCategory: (category: CategoryResponse) => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({ parentCategory, handleClickCategory, setCurrentCategory }) => {
  return (
    <div className="sidebar-widget widget-category-2 mb-30">
      <h5 className="section-title style-1 mb-30">Danh mục</h5>
      <ul>
        {parentCategory.map((item) => (
          <li key={item.id} className="p-0">
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper", padding: 0 }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={<ListSubheader component="div" id="nested-list-subheader"></ListSubheader>}
            >
              <ListItemButton
                onClick={() => {
                  handleClickCategory(item.id);
                }}
              >
                <ListItemText>
                  <a>
                    <img src={domainMedia + item.media.url} alt="" />
                    {item.name}
                  </a>
                </ListItemText>
                {item.is_open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={item.is_open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.children?.map((child) => (
                    <ListItemButton key={child.id}>
                      <a style={{ wordBreak: "break-all" }} onClick={() => setCurrentCategory(child)} className="ml-15 breaks-all w-full">
                        <p className="flex items-center">{child.name}</p>
                      </a>
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </List>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;
