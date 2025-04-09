"use client";

import AddressList from "@/components/address/address_list";
import { InlineGrid, Box, BlockStack, Text, Card } from "@shopify/polaris";

const Address = () => {
  return (
    <div className="xl:w-3/4 w-[90%]">
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
            <AddressList />
          </Card>
        </BlockStack>
      </InlineGrid>
    </div>
  );
};

export default Address;
