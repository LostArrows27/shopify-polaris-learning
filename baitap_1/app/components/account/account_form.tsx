import { BlockStack, Card, TextField } from "@shopify/polaris";

const AccountForm = () => {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="400">
        <TextField label="Fullname" autoComplete="off" />
        <TextField label="Email" autoComplete="off" />
      </BlockStack>
    </Card>
  );
};

export default AccountForm;
