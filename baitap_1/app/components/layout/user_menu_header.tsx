import { TopBar } from "@shopify/polaris";
import type { UserMenuProps } from "@shopify/polaris/build/ts/src/components/TopBar";
import shortenName from "~/utils/shorten_name";

type UserMenuHeaderProps = {
  fullName: string | undefined;
  userMenuActive: boolean;
  actions: UserMenuProps["actions"];
  setUserMenuActive: (active: boolean) => void;
};

const UserMenuHeader = ({
  fullName,
  userMenuActive,
  actions: userMenuActions,
  setUserMenuActive,
}: UserMenuHeaderProps) => {
  return (
    <TopBar.UserMenu
      actions={userMenuActions}
      name={fullName || ""}
      initials={shortenName(fullName || "")}    
      open={userMenuActive}
      onToggle={() => setUserMenuActive(!userMenuActive)}
    />
  );
};

export default UserMenuHeader;
