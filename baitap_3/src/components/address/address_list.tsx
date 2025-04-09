import {
  Text,
  Avatar,
  ResourceItem,
  ResourceList,
  EmptyState,
} from "@shopify/polaris";
import shortenName from "@/utils/shorten_name";
import { useRouter } from "next/navigation";
import { useUserAddressStore } from "@/hooks/use_user_store";

const AddressList = () => {
  const { addresses, loading } = useUserAddressStore();

  const router = useRouter();

  const emptyStateMarkup =
    !addresses.length && !addresses.length ? (
      <EmptyState
        heading="You have no addresses yet"
        action={{
          onAction() {
            router.push("/account");
          },
          content: "Add new address",
        }}
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      ></EmptyState>
    ) : undefined;

  return (
    <ResourceList
      loading={loading}
      emptyState={emptyStateMarkup}
      resourceName={{ singular: "customer", plural: "customers" }}
      items={addresses.map((address) => ({
        id: address.id,
        name: address.city,
        location: address.address,
      }))}
      renderItem={(item) => {
        const { id, name, location } = item;
        return (
          <ResourceItem
            key={id}
            id={id}
            url={"#"}
            media={
              <Avatar
                initials={shortenName(name)}
                size="md"
                name={shortenName(name)}
              />
            }
            accessibilityLabel={`View details for ${name}`}
          >
            <Text variant="bodyMd" fontWeight="bold" as="h3">
              {name}
            </Text>
            <div>{location}</div>
          </ResourceItem>
        );
      }}
    />
  );
};

export default AddressList;
