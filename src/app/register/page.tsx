"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type Step = 1 | 2 | 3 | 4;
type Gender = "male" | "female" | "non-binary" | undefined;
type SkillLevel = "beginner" | "intermediate" | "advanced" | "pro" | undefined;

const FormSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  password: z.string().min(6).max(50).nonempty(),
  gender: z.custom<Gender>(),
  skillLevel: z.custom<SkillLevel>(),
});

const RegisterPage: React.FC = () => {
  const [step, setStep] = useState<Step>(1);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });

  const nextStep = () => {
    setStep((prev) => (prev + 1) as Step);
  };

  const prevStep = () => {
    setStep((prev) => (prev - 1) as Step);
  };

  const register = async () => {};

  return (
    <div className="flex items-center justify-center size-full wavy-background text-white text-2xl md:text-3xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})}>
          {step === 1 && (
            <div className="flex flex-col gap-2">
              <div>Welcome to the Archives, Wizard.</div>
              <div>How do you want to be called?</div>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormControl>
                      <Input
                        placeholder="Lilliana of the Veil"
                        {...field}
                        className="text-white font-medium animate-pulse focus-visible:animate-none border-0 outline-0 focus-visible:ring-0 ring-0 ring-shadow shadow-none placeholder:animate-pulse p-0 text-2xl md:text-3xl lg:text-5xl xl:text-6xl 2xl:text-7xl placeholder:text-2xl placeholder:md:text-3xl placeholder:lg:text-5xl placeholder:xl:text-6xl placeholder:2xl:text-7xl h-fit"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full justify-end">
                <Button
                  variant="ghost"
                  className="hover:bg-transparent hover:text-white hover:scale-150 cursor-pointer"
                >
                  <ArrowRight className="size-20 cursor-pointer" />
                </Button>
              </div>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default RegisterPage;
