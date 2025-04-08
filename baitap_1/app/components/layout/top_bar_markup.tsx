import { BlockStack, Modal, TopBar } from "@shopify/polaris";
import UserMenuHeader from "./user_menu_header";
import { useUserStore } from "~/hooks/use_user_store";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import type { UserMenuProps } from "@shopify/polaris/build/ts/src/components/TopBar";

const TopBarMarkup = () => {
  const [searchValue, setSearchValue] = useState("");
  const [userMenuActive, setUserMenuActive] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  const fullName = useUserStore((state) => state.fullName);
  const reset = useUserStore((state) => state.reset);

  const navigate = useNavigate();

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
    navigate("/");
  }, []);

  const userMenuActions: UserMenuProps["actions"] = useMemo(
    () => [
      {
        items: [
          {
            content: "Profile",
            onAction: () => {
              navigate("/account");
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
