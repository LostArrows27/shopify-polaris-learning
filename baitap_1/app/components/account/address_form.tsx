import {
  BlockStack,
  Button,
  ButtonGroup,
  Card,
  TextField,
} from "@shopify/polaris";

const AddressForm = () => {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="400">
        <TextField label="Address" autoComplete="off" />
        <TextField label="City" autoComplete="off" />
      </BlockStack>
      <div className="flex mt-5 w-full gap-2 justify-end">
        <Button>New Address</Button>
        <Button variant="primary">Save</Button>
      </div>
    </Card>
  );
};

export default AddressForm;
