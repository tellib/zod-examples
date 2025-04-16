"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formSchema } from "@/types";
import { serverLog } from "@/actions";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function Form() {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors, isSubmitted, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const date = watch("date");

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <form
        onSubmit={handleSubmit((parsedData) => {
          console.log(`Form submitted on the frontend`, parsedData);
          serverLog(parsedData);
        })}
        className="space-y-4 w-96"
      >
        {/* name */}
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            {...register("name")}
            placeholder="Enter your name"
          />
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

        {/* date of birth */}
        <div className="flex flex-col space-y-1.5">
          <Label>Date of Birth</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? (
                  format(date, "PPP")
                ) : (
                  <span>Enter your date of birth</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(selected) => {
                  if (selected)
                    setValue("date", selected, { shouldValidate: true });
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.date?.message && (
            <p className="text-xs text-red-500">{errors.date.message}</p>
          )}
        </div>
        {/* submit button */}
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
      {isSubmitted && (
        <div className="w-96">
          {!isSubmitSuccessful && (
            <p className="text-red-600 font-bold">
              Submission did not parse successfully.
            </p>
          )}
          {isSubmitSuccessful && (
            <p className="text-green-600 font-bold">Successfully submitted!</p>
          )}
          <pre className="text-sm py-4">
            {JSON.stringify(getValues(), null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
