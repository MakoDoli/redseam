"use server";

import { BASE_URL } from "@/data/constants";
import { LoginPayload } from "@/types/userTypes";

export async function register(formData: FormData) {
  try {
    const response = await fetch(`${BASE_URL}register`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Failed to register");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function login(payload: LoginPayload) {
  console.log("LOGGING INNNNN", payload);
  try {
    const response = await fetch(`${BASE_URL}login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}
