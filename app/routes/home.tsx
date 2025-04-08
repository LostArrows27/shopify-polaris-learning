import { useNavigate } from "react-router";
import type { Route } from "./+types/home";
import { Page, Text, Button, BlockStack } from "@shopify/polaris";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Shopify Polaris Demo" },
    {
      name: "description",
      content: "Testing Shopify Polaris with React Router!",
    },
  ];
}

export default function Home() {
  let navigate = useNavigate();

  return (
    <Page fullWidth>
      <div className="flex flex-col items-center justify-center h-screen py-0 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          {/* Shopify Logo */}
          <div>
            <img
              className="mx-auto h-16 w-auto"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Shopify_logo.svg/2560px-Shopify_logo.svg.png"
              alt="Shopify"
            />
          </div>

          {/* Main text */}
          <BlockStack gap="400">
            <Text
              variant="headingXl"
              as="h1"
              alignment="center"
              fontWeight="bold"
            >
              Welcome to Shopify Admin
            </Text>

            {/* Secondary text */}
            <Text variant="bodyLg" as="p" alignment="center" tone="subdued">
              Manage your account and shipping address details in one place.
            </Text>
          </BlockStack>

          {/* Button */}
          <div className="mt-8">
            <Button
              variant="primary"
              size="large"
              fullWidth
              onClick={() => navigate("/account")}
            >
              Create Account
            </Button>
          </div>
        </div>
      </div>
    </Page>
  );
}
