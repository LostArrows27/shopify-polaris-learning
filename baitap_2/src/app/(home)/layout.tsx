"use client";

import LeftNavigation from "@/components/layout/left_navigation";
import TopBarMarkup from "@/components/layout/top_bar_markup";
import logo from "@/constants/logo";
import { AppProvider, Frame } from "@shopify/polaris";
import { useCallback, useState } from "react";

const HomeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive
      ),
    []
  );

  return (
    <AppProvider i18n={[]}>
      <div style={{ height: "100vh" }}>
        <Frame
          topBar={
            <TopBarMarkup
              setMobileNavigationActive={toggleMobileNavigationActive}
            />
          }
          navigation={<LeftNavigation />}
          logo={logo}
          showMobileNavigation={mobileNavigationActive}
          onNavigationDismiss={toggleMobileNavigationActive}
        >
          <div className="flex justify-center items-center pl-0 pb-4 pt-10">
            {children}
          </div>
        </Frame>
      </div>
    </AppProvider>
  );
};

export default HomeLayout;
