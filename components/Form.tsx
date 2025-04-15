"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formSchema } from "@/types";
import { serverLog } from "@/actions";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  return (
    <form
      onSubmit={handleSubmit((d) => {
        console.log(`Form submitted on the frontend`, d);
        serverLog(d);
        alert("Form submitted");
      })}
      className="space-y-4"
    >
      {/* name */}
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...register("name")} placeholder="Enter your name" />
        {errors.name?.message && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* age */}
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          type="number"
          {...register("age", { valueAsNumber: true })}
          placeholder="Enter your age"
        />
        {errors.age?.message && (
          <p className="text-xs text-red-500">{errors.age.message}</p>
        )}
      </div>

      {/* email */}
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="Enter your email"
        />
        {errors.email?.message && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* website (optional) */}
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="website">Website (Optional)</Label>
        <Input
          id="website"
          type="url"
          {...register("website")}
          placeholder="https://github.com/tellib"
        />
        {errors.website?.message && (
          <p className="text-xs text-red-500">{errors.website.message}</p>
        )}
      </div>

      {/* submit button */}
      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
}
