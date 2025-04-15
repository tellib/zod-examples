import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const RegisterSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = RegisterSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ errors: result.error }, { status: 500 });
  }

  const { email, password } = result.data;
  return NextResponse.json(
    { email, password, message: "Successfully parsed with Zod" },
    { status: 200 }
  );
}
