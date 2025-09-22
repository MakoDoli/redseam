"use server";

import { BASE_URL } from "@/data/constants";
import { LoginPayload } from "@/types/userTypes";

export async function register(formData: FormData) {
  try {
    const response = await fetch(`${BASE_URL}register`, {
      method: "POST",
      body: formData,
    });
    //console.log("ERRORS!", await response.text());
    const data = await response.json();
    if (!response.ok) {
      return data;
    }
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function login(payload: LoginPayload) {
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
