"use client";
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
  Tooltip,
} from "@shopify/polaris";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import type { ServerResponse, UserFormData } from "@/types/app.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/schema/user_schema";
import { useCallback, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUserAddressStore } from "@/hooks/use_user_store";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/config/axios";
import { StatusCodes } from "http-status-codes";
import { useUserInformation } from "@/hooks/use_user_information";

const AccountPage = () => {
  const { fullName, email, addresses, loading } = useUserAddressStore();

  const { setUserInfo, setAddresses } = useUserInformation();

  const { toast } = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
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

  const onSubmit = async (data: UserFormData) => {
    await updateUserAddress(data);

    reset(data);

    toast({
      title: "Update address successfully",
    });
  };

  const updateUserAddress = async (submitData: UserFormData) => {
    try {
      const res = (await api.post("/address", submitData))
        .data as ServerResponse;

      if (res.status === StatusCodes.OK) {
        toast({
          title: "Update address successfully",
        });

        setUserInfo(submitData.fullName.trim(), submitData.email);
        setAddresses(
          submitData.addresses.map((address) => ({
            id: address.id,
            address: address.address.trim(),
            city: address.city.trim(),
          }))
        );
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      console.error("Error updating address:", error);
      toast({
        title: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const addNewAddressInput = useCallback(() => {
    append({ id: uuidv4(), address: "", city: "" });
  }, [append]);

  return (
    <>
      <div className="xl:w-3/4 w-[90%]">
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
                        disabled={loading || isSubmitting}
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
                        disabled={loading || isSubmitting}
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
                            addresses: addresses || [],
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
                                disabled={loading || isSubmitting}
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
                                disabled={loading || isSubmitting}
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
                  <Button
                    disabled={loading || isSubmitting}
                    onClick={addNewAddressInput}
                  >
                    New Address
                  </Button>
                  <Button
                    loading={loading || isSubmitting}
                    submit
                    variant="primary"
                  >
                    Save
                  </Button>
                </div>
              </Card>
            </BlockStack>
          </form>
        </InlineGrid>
      </div>
    </>
  );
};

export default AccountPage;
