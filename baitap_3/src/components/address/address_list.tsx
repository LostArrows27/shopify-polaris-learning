import {
  Text,
  Avatar,
  ResourceItem,
  ResourceList,
  EmptyState,
} from "@shopify/polaris";
import shortenName from "@/utils/shorten_name";
import { useRouter } from "next/navigation";
import {
  useAddressStoreDispatch,
  useAddressStoreSelector,
} from "@/hooks/use_address_store";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  setAddresses,
  setError,
  setLoading,
} from "@/libs/slices/address_slice";
import { api } from "@/config/axios";
import { Address, ServerResponse } from "@/types/app.type";

const AddressList = () => {
  const dispatch = useAddressStoreDispatch();

  const { addresses, loading } = useAddressStoreSelector(
    (state) => state.addresses
  );

  const router = useRouter();

  const { toast } = useToast();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        dispatch(setLoading(true));
        const res = await api.get("/address");
        const data = res.data as ServerResponse;

        if (data.status === 200 && data.data) {
          toast({
            title: "Address Value",
            description: (
              <pre className="mt-2 w-[340px] rounded-md overflow-x-auto bg-slate-950 p-4">
                <code className="text-white whitespace-pre-wrap break-words">
                  {JSON.stringify(data.data.addresses, null, 2)}
                </code>
              </pre>
            ),
          });
          dispatch(setAddresses(data.data.addresses as Address[]));
        } else {
          dispatch(setError(data.message || "Failed to fetch addresses"));
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
        dispatch(setError("Error fetching addresses"));
      }
    };

    fetchAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
