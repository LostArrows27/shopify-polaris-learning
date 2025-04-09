import { testApiHandler } from "next-test-api-route-handler";
import * as appHandler from "@/app/api/address/route";
import { ServerResponse, UserFormData } from "@/types/app.type";
import { StatusCodes } from "http-status-codes";

it("should return all address", async () => {
  await testApiHandler({
    appHandler,
    async test({ fetch }) {
      const res = await fetch({ method: "GET" });

      const data = (await res.json()) as ServerResponse;

      expect(res.status).toBe(StatusCodes.OK);
      expect(data.status).toBe(StatusCodes.OK);
      expect(data.message).toBe("Get user addresses successfully");
      expect(data.data?.addresses.length).toBeGreaterThan(0);
    },
  });
});

it("should update address", async () => {
  await testApiHandler({
    appHandler,
    async test({ fetch }) {
      const res = await fetch({ method: "GET" });

      const oldData = (await res.json()) as ServerResponse;

      const newData = {
        fullName: "Sakurajima Mai",
        email: "mai@gmail.com",
        addresses: [
          ...oldData.data!.addresses,
          {
            id: "test-address",
            address: "Tokyo, Japan",
            city: "Tokyo",
          },
        ],
      } as UserFormData;

      // NOTE: test POST method
      const resPost = await fetch({
        method: "POST",
        body: JSON.stringify(newData),
      });

      const data = (await resPost.json()) as ServerResponse;

      expect(resPost.status).toBe(StatusCodes.OK);
      expect(data.status).toBe(StatusCodes.OK);
      expect(data.message).toBe("User addresses updated successfully");

      // NOTE: test GET method again to check if the address is updated

      const resGet = await fetch({ method: "GET" });

      const updatedData = (await resGet.json()) as ServerResponse;
      expect(resGet.status).toBe(StatusCodes.OK);
      expect(updatedData.status).toBe(StatusCodes.OK);
      expect(updatedData.message).toBe("Get user addresses successfully");
      expect(updatedData.data?.addresses.length).toBe(newData.addresses.length);
      expect(updatedData.data?.fullName).toBe(newData.fullName);
      expect(updatedData.data?.email).toBe(newData.email);

      // NOTE: make a POST request to recover old address
      await fetch({
        method: "POST",
        body: JSON.stringify(oldData.data),
      });
    },
  });
});

it("should reject update request with wrong schema", async () => {
  await testApiHandler({
    appHandler,
    async test({ fetch }) {
      const res = await fetch({ method: "POST", body: JSON.stringify({}) });

      const data = (await res.json()) as ServerResponse;

      expect(res.status).toBe(StatusCodes.BAD_REQUEST);
      expect(data.status).toBe(StatusCodes.BAD_REQUEST);
      expect(data.message).toBe("Incorrect form data");
    },
  });
});

it("should delete address", async () => {
  await testApiHandler({
    appHandler,
    async test({ fetch }) {
      // NOTE: get old data
      const res = await fetch({ method: "GET" });

      const oldData = (await res.json()) as ServerResponse;

      const resDelete = await fetch({
        method: "DELETE",
      });

      // NOTE: test DELETE method
      const deleteData = (await resDelete.json()) as ServerResponse;

      expect(resDelete.status).toBe(StatusCodes.OK);
      expect(deleteData.status).toBe(StatusCodes.OK);
      expect(deleteData.message).toBe("User addresses deleted successfully");

      // NOTE: re-check GET to know if -> address is deleted
      const resGet = await fetch({ method: "GET" });

      const updatedData = (await resGet.json()) as ServerResponse;

      expect(resGet.status).toBe(StatusCodes.OK);
      expect(updatedData.status).toBe(StatusCodes.OK);
      expect(updatedData.message).toBe("Get user addresses successfully");
      expect(updatedData.data?.addresses.length).toBe(0);

      // NOTE: make a POST request to recover old address
      await fetch({
        method: "POST",
        body: JSON.stringify(oldData.data),
      });
    },
  });
});
