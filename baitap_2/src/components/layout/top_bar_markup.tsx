import { BlockStack, Modal, TopBar } from "@shopify/polaris";
import UserMenuHeader from "./user_menu_header";
import { useCallback, useMemo, useState } from "react";
import type { UserMenuProps } from "@shopify/polaris/build/ts/src/components/TopBar";
import { useUserStore } from "@/hooks/use_user_store";
import { useRouter } from "next/navigation";

type TopBarMarkupProps = {
  setMobileNavigationActive: () => void;
};

const TopBarMarkup = ({ setMobileNavigationActive }: TopBarMarkupProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [userMenuActive, setUserMenuActive] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  const fullName = useUserStore((state) => state.fullName);
  const reset = useUserStore((state) => state.reset);

  const router = useRouter();

  const handleSearchChange = useCallback(
    (value: string) => setSearchValue(value),
    []
  );

  const handleModalChange = useCallback(
    () => setModalActive(!modalActive),
    [modalActive]
  );

  const handleSignOut = useCallback(() => {
    reset();
    router.push("/");
  }, []);

  const userMenuActions: UserMenuProps["actions"] = useMemo(
    () => [
      {
        items: [
          {
            content: "Profile",
            onAction: () => {
              router.push("/account");
            },
          },
        ],
      },
      {
        items: [
          {
            content: "Sign out",
            onAction: () => {
              setModalActive(true);
            },
          },
        ],
      },
    ],
    []
  );

  return (
    <>
      <Modal
        activator={<></>}
        open={modalActive}
        onClose={handleModalChange}
        title="Sign out of your account?"
        primaryAction={{
          destructive: true,
          content: "Sign out",
          onAction: handleSignOut,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: handleModalChange,
          },
        ]}
      >
        <Modal.Section>
          <BlockStack>
            <p>
              All your unsaved changes and saved account, addresses data will be
              lost.
            </p>
          </BlockStack>
        </Modal.Section>
      </Modal>
      <TopBar
        showNavigationToggle
        onNavigationToggle={setMobileNavigationActive}
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
    </>
  );
};

export default TopBarMarkup;
