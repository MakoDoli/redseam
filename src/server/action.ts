"use server";

import { BASE_URL } from "@/data/constants";
import { CartProduct } from "@/types/productTypes";
import { LoginPayload } from "@/types/userTypes";

export async function register(formData: FormData) {
  try {
    const response = await fetch(`${BASE_URL}register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

    const data = await response.json();

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

export const addToCart = async (
  payload: CartProduct,
  authToken: string,
  id: number
) => {
  try {
    const response = await fetch(`${BASE_URL}cart/products/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + authToken,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};
