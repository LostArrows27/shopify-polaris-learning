import { Navigation } from "@shopify/polaris";
import {
  ArrowLeftIcon,
  HomeFilledIcon,
  HomeIcon,
  LocationFilledIcon,
  LocationIcon,
  PlusCircleIcon,
} from "@shopify/polaris-icons";
import { usePathname, useRouter } from "next/navigation";

const LeftNavigation = () => {
  const pathname = usePathname();
  const router = useRouter();

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
              router.push("/");
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
              router.push("/account");
            },
          },
          {
            excludePaths: ["#"],
            label: "Addresses",
            matches: pathname === "/addresses",
            icon: pathname === "/addresses" ? LocationFilledIcon : LocationIcon,
            onClick() {
              router.push("/addresses");
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
