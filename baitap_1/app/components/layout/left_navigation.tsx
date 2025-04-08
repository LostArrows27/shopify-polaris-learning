import { Navigation } from "@shopify/polaris";
import { useLocation } from "react-router";
import {
  ArrowLeftIcon,
  HomeFilledIcon,
  HomeIcon,
  LocationFilledIcon,
  LocationIcon,
  PlusCircleIcon,
} from "@shopify/polaris-icons";
import { useNavigate } from "react-router";

const LeftNavigation = () => {
  const { pathname } = useLocation();
  let navigate = useNavigate();

  return (
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
};

export default LeftNavigation;
