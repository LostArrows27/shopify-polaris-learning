import { api } from "@/config/axios";
import { ServerResponse } from "@/types/app.type";
import { useEffect, useState } from "react";
import { useUserInformation } from "./use_user_information";

export const useUserAddressStore = () => {
  const { setAddresses, setUserInfo, fullName, email, addresses } =
    useUserInformation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        setLoading(true);

        const res = await api.get("/address");

        const data = res.data as ServerResponse;

        if (data.status === 200 && data.data) {
          setAddresses(data.data?.addresses);
          setUserInfo(data.data?.fullName, data.data?.email);
        } else {
          console.error("Error fetching addresses:", data.message);
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    addresses,
    fullName,
    email,
    loading,
  };
};
