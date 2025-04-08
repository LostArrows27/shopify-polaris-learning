import { Frame } from "@shopify/polaris";
import { Outlet } from "react-router";
import TopBarMarkup from "~/components/layout/top_bar_markup";
import logo from "~/constants/logo";
import LeftNavigation from "~/components/layout/left_navigation";
import { useCallback, useState } from "react";

const Layout = () => {
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive
      ),
    []
  );

  return (
    <div style={{ height: "100vh" }}>
      <Frame
        topBar={
          <TopBarMarkup
            mobileNavigationActive={mobileNavigationActive}
            setMobileNavigationActive={toggleMobileNavigationActive}
          />
        }
        navigation={<LeftNavigation />}
        logo={logo}
        showMobileNavigation={mobileNavigationActive}
        onNavigationDismiss={toggleMobileNavigationActive}
      >
        <div className="pl-[200px] pb-4 pt-10">
          <Outlet />
        </div>
      </Frame>
    </div>
  );
};

export default Layout;
