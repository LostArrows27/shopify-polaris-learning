/* eslint-disable react-hooks/exhaustive-deps */
import { BlockStack, Modal, TopBar } from "@shopify/polaris";
import UserMenuHeader from "./user_menu_header";
import { useCallback, useMemo, useState } from "react";
import type { UserMenuProps } from "@shopify/polaris/build/ts/src/components/TopBar";
// import { useUserStore } from "@/hooks/use_user_store";
import { useRouter } from "next/navigation";
import { useUserAddressStore } from "@/hooks/use_user_store";
import { api } from "@/config/axios";
import { ServerResponse } from "@/types/app.type";
import { useToast } from "@/hooks/use-toast";
import { StatusCodes } from "http-status-codes";
import { useUserInformation } from "@/hooks/use_user_information";

type TopBarMarkupProps = {
  setMobileNavigationActive: () => void;
};

const TopBarMarkup = ({ setMobileNavigationActive }: TopBarMarkupProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [userMenuActive, setUserMenuActive] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const { fullName } = useUserAddressStore();

  const { reset } = useUserInformation();

  const router = useRouter();

  const handleSearchChange = useCallback(
    (value: string) => setSearchValue(value),
    []
  );

  const handleModalChange = useCallback(
    () => setModalActive(!modalActive),
    [modalActive]
  );

  const handleSignOut = useCallback(async () => {
    setLoading(true);

    const res = (await api.delete("/address")).data as ServerResponse;

    if (res.status === StatusCodes.OK) {
      toast({
        title: "Sign out successfully",
        description: res.message,
      });
    } else {
      toast({
        title: "Sign out failed",
        description: res.message,
      });
    }

    setLoading(false);

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
          loading: loading,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            disabled: loading,
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
