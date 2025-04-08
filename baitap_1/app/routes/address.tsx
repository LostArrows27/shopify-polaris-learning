import {
  InlineGrid,
  Box,
  BlockStack,
  Text,
  Avatar,
  ResourceItem,
  ResourceList,
  Card,
  EmptyState,
} from "@shopify/polaris";
import type { Route } from "./+types/home";
import { useUserStore } from "~/store/use_user_store";
import shortenName from "~/utils/shorten_name";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Addresses" },
    {
      name: "description",
    },
  ];
}

const Address = () => {
  const addresses = useUserStore((state) => state.addresses);

  let navigate = useNavigate();

  const emptyStateMarkup =
    !addresses.length && !addresses.length ? (
      <EmptyState
        heading="You have no addresses yet"
        action={{
          onAction() {
            navigate("/account");
          },
          content: "Add new address",
        }}
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      ></EmptyState>
    ) : undefined;

  return (
    <div className="w-3/4">
      <div className="mb-10">
        <Text variant="headingLg" as="h1" fontWeight="bold">
          My Addresses
        </Text>
      </div>
      <InlineGrid columns={{ xs: "1fr", md: "3fr 0.2fr 5fr" }} gap="400">
        <Box as="section">
          <BlockStack gap="400">
            <Text as="h3" variant="headingMd">
              Addresses Details
            </Text>
            <Text as="p" variant="bodyMd">
              You can click on Account menu to edit your address details.
            </Text>
          </BlockStack>
        </Box>
        <div></div>
        <BlockStack gap={"400"}>
          <Card>
            <ResourceList
              emptyState={emptyStateMarkup}
              resourceName={{ singular: "customer", plural: "customers" }}
              items={addresses.map((address) => ({
                id: address.id,
                name: address.city,
                location: address.address,
              }))}
              renderItem={(item) => {
                const { id, name, location } = item;
                const media = (
                  <Avatar
                    initials={shortenName(name)}
                    size="md"
                    name={shortenName(name)}
                  />
                );

                return (
                  <ResourceItem
                    id={id}
                    url={"#"}
                    media={media}
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
          </Card>
        </BlockStack>
      </InlineGrid>
    </div>
  );
};

export default Address;
