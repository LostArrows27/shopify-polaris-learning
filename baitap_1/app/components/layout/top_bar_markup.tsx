import { TopBar } from "@shopify/polaris";
import UserMenuHeader from "./user_menu_header";
import { useUserStore } from "~/hooks/use_user_store";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";

const TopBarMarkup = () => {
  const [searchValue, setSearchValue] = useState("");
  const [userMenuActive, setUserMenuActive] = useState(false);

  const fullName = useUserStore((state) => state.fullName);
  const navigate = useNavigate();

  const handleSearchChange = useCallback(
    (value: string) => setSearchValue(value),
    []
  );

  const userMenuActions = useMemo(
    () => [
      {
        items: [
          {
            content: "Profile",
            onTouchStart: () => {
              navigate("/profile");
            },
          },
          { content: "Settings" },
        ],
      },
      {
        items: [{ content: "Sign out" }],
      },
    ],
    []
  );

  return (
    <TopBar
      showNavigationToggle
      userMenu={
        <UserMenuHeader
          fullName={fullName}
          userMenuActive={userMenuActive}
          setUserMenuActive={setUserMenuActive}
          actions={userMenuActions}
        />
      }
      searchField={
        <TopBar.SearchField
          onChange={handleSearchChange}
          value={searchValue}
          placeholder="Search"
        />
      }
    />
  );
};

export default TopBarMarkup;
