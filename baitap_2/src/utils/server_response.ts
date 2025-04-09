import { ServerResponse } from "@/types/app.type";
import { StatusCodes } from "http-status-codes";

export const serverResponse = (response: ServerResponse) => {
  return new Response(JSON.stringify(response), {
    status: response.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const serverErrorResponse = (err: unknown) => {
  console.error("Server error:", err);
  return serverResponse({
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    message: "Server error",
  });
};
