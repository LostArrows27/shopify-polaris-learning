import { DeleteIcon, UndoIcon } from "@shopify/polaris-icons";
import {
  BlockStack,
  Box,
  Button,
  Card,
  EmptyState,
  InlineGrid,
  Text,
  TextField,
  Toast,
  Tooltip,
} from "@shopify/polaris";
import type { Route } from "./+types/home";
import AccountForm from "~/components/account/account_form";
import AddressForm from "~/components/account/address_form";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import type { UserFormData } from "~/types/app.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "~/schema/user_schema";
import { useUserStore } from "~/hooks/use_user_store";
import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Account" },
    {
      name: "description",
    },
  ];
}

const AccountPage = () => {
  const [toastActive, setToastActive] = useState(false);

  const { fullName, email, addresses, setUserInfo, setAddresses } =
    useUserStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      fullName: "",
      email: "",
      addresses: [
        {
          id: "1",
          address: "",
          city: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "addresses",
  });

  // NOTE: load init data from store
  useEffect(() => {
    if (fullName && email) {
      reset({
        fullName,
        email,
        addresses,
      });
    }
  }, [fullName, email, addresses, reset]);

  const onSubmit = (data: UserFormData) => {
    setUserInfo(data.fullName.trim(), data.email);
    setAddresses(
      data.addresses.map((address) => ({
        id: address.id,
        address: address.address.trim(),
        city: address.city.trim(),
      }))
    );
    reset(data);
    setToastActive(true);
  };

  const addNewAddressInput = useCallback(() => {
    append({ id: uuidv4(), address: "", city: "" });
  }, [append]);

  return (
    <>
      <div className="w-3/4">
        <div className="mb-10">
          <Text variant="headingLg" as="h1" fontWeight="bold">
            Account
          </Text>
        </div>
        <InlineGrid columns={{ xs: "1fr", md: "3fr 0.2fr 5fr" }} gap="400">
          <Box as="section">
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Account details
              </Text>
              <Text as="p" variant="bodyMd">
                Update your account details to keep your store running smoothly.
              </Text>
            </BlockStack>
          </Box>
          <div></div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <BlockStack gap={"400"}>
              <Card roundedAbove="sm">
                <BlockStack gap="400">
                  <Controller
                    render={({ field }) => (
                      <TextField
                        label="Fullname"
                        error={errors.fullName?.message}
                        {...field}
                        autoComplete="off"
                      />
                    )}
                    name="fullName"
                    control={control}
                  />
                  <Controller
                    render={({ field }) => (
                      <TextField
                        label="Email"
                        error={errors.email?.message}
                        {...field}
                        autoComplete="off"
                      />
                    )}
                    name="email"
                    control={control}
                  />
                  <div className="flex w-full justify-end">
                    <Tooltip dismissOnMouseOut content="Reset">
                      <Button
                        icon={UndoIcon}
                        onClick={() => {
                          reset({
                            fullName,
                            email,
                          });
                        }}
                      />
                    </Tooltip>
                  </div>
                </BlockStack>
              </Card>
              <Card roundedAbove="sm">
                <BlockStack gap="400">
                  {fields.length >= 1 ? (
                    fields.map((field, index) => (
                      <Box
                        key={field.id}
                        borderRadius="300"
                        padding="400"
                        background="bg-surface-secondary"
                      >
                        <BlockStack gap="400">
                          <Controller
                            name={`addresses.${index}.address`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                label={`Address ${index + 1}`}
                                autoComplete="off"
                                error={
                                  errors.addresses?.[index]?.address?.message
                                }
                                {...field}
                              />
                            )}
                          />
                          <Controller
                            name={`addresses.${index}.city`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                label="City"
                                autoComplete="off"
                                error={errors.addresses?.[index]?.city?.message}
                                {...field}
                              />
                            )}
                          />
                          <div className="flex w-full justify-end mt-2">
                            <Tooltip dismissOnMouseOut content="Remove address">
                              <Button
                                onClick={() => remove(index)}
                                icon={DeleteIcon}
                              />
                            </Tooltip>
                          </div>
                        </BlockStack>
                      </Box>
                    ))
                  ) : (
                    <EmptyState
                      heading="Please add your address"
                      image="https://cdn.shopify.com/s/files/1/2376/3301/products/emptystate-files.png"
                    >
                      <p>
                        Add your address to make sure your orders are shipped to
                        the right place.
                      </p>
                    </EmptyState>
                  )}
                </BlockStack>
                <div className="flex mt-5 w-full gap-2 justify-end">
                  <Button onClick={addNewAddressInput}>New Address</Button>
                  <Button submit variant="primary">
                    Save
                  </Button>
                </div>
              </Card>
            </BlockStack>
          </form>
        </InlineGrid>
      </div>
      {toastActive && (
        <Toast
          onDismiss={() => {
            setToastActive(false);
          }}
          content="Update successfully!"
          duration={2000}
        />
      )}
    </>
  );
};

export default AccountPage;
