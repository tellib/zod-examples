"use server";

import { Form } from "@/types";

export async function serverLog(d: Form) {
  console.log(`Form submitted on the backend`, d);
}
