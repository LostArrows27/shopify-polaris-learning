import { userSchema } from "@/schema/user_schema";
import { UserFormData } from "@/types/app.type";
import {
  readJSONFileAsync,
  writeJSONFileAsync,
} from "@/utils/crud_json_file_async";
import { serverErrorResponse, serverResponse } from "@/utils/server_response";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

export async function GET() {
  try {
    const data = await readJSONFileAsync();

    return serverResponse({
      status: StatusCodes.OK,
      message: "Get user addresses successfully",
      data: data,
    });
  } catch (err) {
    return serverErrorResponse(err);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    userSchema.parse(body);

    await writeJSONFileAsync(body as UserFormData);

    return serverResponse({
      status: StatusCodes.OK,
      message: "User addresses updated successfully",
    });
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      console.error("Validation error:", err.errors);
      return serverResponse({
        status: StatusCodes.BAD_REQUEST,
        message: "Incorrect form data",
      });
    }

    return serverErrorResponse(err);
  }
}

export async function DELETE() {
  try {
    await writeJSONFileAsync({
      fullName: "",
      email: "",
      addresses: [],
    });

    return serverResponse({
      status: StatusCodes.OK,
      message: "User addresses deleted successfully",
    });
  } catch (err) {
    return serverErrorResponse(err);
  }
}
