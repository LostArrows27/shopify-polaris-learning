import { Frame, Navigation } from "@shopify/polaris";
import { Outlet, useLocation } from "react-router";
import {
  ArrowLeftIcon,
  HomeFilledIcon,
  HomeIcon,
  LocationFilledIcon,
  LocationIcon,
  PlusCircleIcon,
} from "@shopify/polaris-icons";
import { useNavigate } from "react-router";
import TopBarMarkup from "~/components/layout/top_bar_markup";
import logo from "~/constants/logo";
import LeftNavigation from "~/components/layout/left_navigation";

const Layout = () => {
  return (
    <div style={{ height: "100vh" }}>
      <Frame
        topBar={<TopBarMarkup />}
        navigation={<LeftNavigation />}
        logo={logo}
      >
        <div className="pl-[200px] pb-4 pt-10">
          <Outlet />
        </div>
      </Frame>
    </div>
  );
};

export default Layout;
