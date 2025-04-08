import { Frame, Navigation, TopBar } from "@shopify/polaris";
import { Outlet, useLocation } from "react-router";
import {
  ArrowLeftIcon,
  HomeFilledIcon,
  HomeIcon,
  LocationFilledIcon,
  LocationIcon,
  PlusCircleIcon,
} from "@shopify/polaris-icons";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { useUserStore } from "~/store/use_user_store";
import shortenName from "~/utils/shorten_name";

const Layout = () => {
  const [searchValue, setSearchValue] = useState("");
  const [userMenuActive, setUserMenuActive] = useState(false);
  const fullName = useUserStore((state) => state.fullName);

  let navigate = useNavigate();
  const { pathname } = useLocation();

  const handleSearchChange = useCallback(
    (value: string) => setSearchValue(value),
    []
  );

  const userMenuActions = [
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
  ];

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={userMenuActions}
      name={fullName}
      initials={shortenName(fullName)}
      open={userMenuActive}
      onToggle={() => setUserMenuActive(!userMenuActive)}
    />
  );

  const searchFieldMarkup = (
    <TopBar.SearchField
      onChange={handleSearchChange}
      value={searchValue}
      placeholder="Search"
    />
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      searchField={searchFieldMarkup}
    />
  );

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        items={[
          {
            excludePaths: ["#"],
            matches: pathname === "/",
            label: "Home",
            icon: ArrowLeftIcon,
            onClick() {
              navigate("/");
            },
          },
        ]}
      />
      <Navigation.Section
        title="Exercises 1"
        items={[
          {
            excludePaths: ["#"],
            matches: pathname === "/account",
            label: "Account",
            icon: pathname === "/account" ? HomeFilledIcon : HomeIcon,
            onClick() {
              navigate("/account");
            },
          },
          {
            excludePaths: ["#"],
            label: "Addresses",
            matches: pathname === "/addresses",
            icon: pathname === "/addresses" ? LocationFilledIcon : LocationIcon,
            onClick() {
              navigate("/addresses");
            },
          },
        ]}
        action={{
          accessibilityLabel: "IDK",
          icon: PlusCircleIcon,
          onClick() {},
        }}
      />
    </Navigation>
  );

  const logo = {
    width: 86,
    topBarSource:
      "https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png",
    contextualSaveBarSource:
      "https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png",
    accessibilityLabel: "Shopify",
  };

  return (
    <div style={{ height: "100vh" }}>
      <Frame topBar={topBarMarkup} navigation={navigationMarkup} logo={logo}>
        <div className="pl-[200px] pb-4 pt-10">
          <Outlet />
        </div>
      </Frame>
    </div>
  );
};

export default Layout;
