import type { Route } from "./+types/home";
import { Page, Card, Text, Banner, Button, Layout } from "@shopify/polaris";

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
  return (
    <Page title="Shopify Polaris Demo">
      <Layout>
        <Layout.Section>
          <Banner
            title="Shopify Polaris is working!"
            tone="success"
            action={{
              content: "Learn more",
              url: "https://polaris.shopify.com",
            }}
          > 
            <p>
              You've successfully integrated Shopify Polaris with React Router.
            </p>
          </Banner>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <Text as="h2" variant="headingMd">
              Welcome to Polaris
            </Text>
            <Text as="p" variant="bodyMd">
              This is a simple card component from Shopify Polaris.
            </Text>
            <div style={{ marginTop: "1rem" }}>
              <Button>Polaris Button</Button>
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
