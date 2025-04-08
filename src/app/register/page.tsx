"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ScrollText } from "lucide-react";
import Link from "next/link";
import { Reenie_Beanie } from "next/font/google";
import LoadingScroll from "./_loading";
import { Gender, SkillLevel } from "../db";
import { useRouter } from "next/navigation";

type Step = 1 | 2 | 3 | 4 | 5;

const pwd_regex = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

const FormSchema = z
  .object({
    username: z
      .string()
      .min(2, {
        message: "Your name must not be lesser than 1 syllable, Wizard!",
      })
      .max(50)
      .nonempty(),
    email: z.string().email().nonempty(),
    password: z
      .string()
      .regex(pwd_regex, {
        message: "Password does not meet the requirements!",
      })
      .nonempty(),
    confirmPassword: z.string().nonempty(),
    gender: z.custom<Gender>(),
    skillLevel: z.custom<SkillLevel>(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

const handwritten = Reenie_Beanie({ weight: "400", subsets: ["latin"] });

const RegisterPage: React.FC = () => {
  const [step, setStep] = useState<Step>(1);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isSelectsValid, setIsSelectsValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: undefined,
      skillLevel: undefined,
    },
  });

  const nextStep = () => {
    setStep((prev) => (prev + 1) as Step);
  };

  const prevStep = () => {
    setStep((prev) => (prev - 1) as Step);
  };

  const register = async () => {
    setStep(5);
    await new Promise((resolve) => setTimeout(resolve, 3000)).then(() => {
      router.push("/login");
    });
  };

  useEffect(() => {
    setIsUsernameValid(form.getValues("username").length > 2);
    setIsEmailValid(
      form.getValues("email").length > 2 &&
        form.getValues("email").includes("@")
    );
    setIsSelectsValid(
      form.getValues("gender") !== undefined &&
        form.getValues("skillLevel") !== undefined
    );
    setIsPasswordValid(
      pwd_regex.test(form.getValues("password")) &&
        form.getValues("password") === form.getValues("confirmPassword")
    );
  }, [
    form.watch("username"),
    form.watch("email"),
    form.watch("gender"),
    form.watch("skillLevel"),
    form.watch("password"),
    form.watch("confirmPassword"),
  ]);

  return (
    <div className="flex items-center justify-center size-full  text-white text-3xl lg:text-5xl xl:text-6xl 2xl:text-7xl p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})}>
          {step === 1 && (
            <div className="flex flex-col gap-2">
              <div>Welcome to the Archives, Wizard.</div>
              <div>How do you want to be called?</div>
              <div className="flex flex-row w-full items-center justify-between">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="mt-2 flex-1">
                      <FormControl>
                        <Input
                          autoFocus
                          placeholder="Lilliana of the Veil"
                          {...field}
                          className={
                            handwritten.className +
                            " text-white font-medium border-0 outline-0 focus-visible:ring-0 ring-0 ring-shadow shadow-none placeholder:animate-pulse p-0 text-2xl md:text-3xl lg:text-5xl xl:text-6xl 2xl:text-7xl placeholder:text-2xl placeholder:md:text-3xl placeholder:lg:text-5xl placeholder:xl:text-6xl placeholder:2xl:text-7xl h-fit placeholder:text-white/50 bg-muted-foreground/10"
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="hover:bg-transparent hover:text-white hover:scale-125 cursor-pointer"
                  disabled={!isUsernameValid}
                  onClick={nextStep}
                >
                  <ArrowRight className="size-10 lg:size-20 cursor-pointer" />
                </Button>
              </div>
              <div className="flex w-full justify-between items-center mt-4">
                <div className="text-sm md:text-base lg:text-lg">
                  If you already have your name inscribed,{" "}
                  <Link href={"/login"}>
                    you can go directly go to the{" "}
                    <span className="underline">main entrance</span>.
                  </Link>
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="flex flex-col gap-2">
              <div>We will need a few more information...</div>
              <div>Where can we send you our letters?</div>
              <div className="flex flex-row w-full items-center justify-between">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mt-2 flex-1">
                      <FormControl>
                        <Input
                          autoFocus
                          placeholder="liliana@veil.com"
                          {...field}
                          className={
                            handwritten.className +
                            " text-white font-medium border-0 outline-0 focus-visible:ring-0 ring-0 ring-shadow shadow-none placeholder:animate-pulse p-0 text-2xl md:text-3xl lg:text-5xl xl:text-6xl 2xl:text-7xl placeholder:text-2xl placeholder:md:text-3xl placeholder:lg:text-5xl placeholder:xl:text-6xl placeholder:2xl:text-7xl h-fit placeholder:text-white/50 bg-muted-foreground/10"
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="hover:bg-transparent hover:text-white hover:scale-125 cursor-pointer"
                  disabled={!isEmailValid}
                  onClick={nextStep}
                >
                  <ArrowRight className="size-10 lg:size-20 cursor-pointer" />
                </Button>
              </div>
              <Button
                variant="ghost"
                className="w-fit flex flex-row items-center gap-2 hover:bg-transparent hover:text-white cursor-pointer hover:font-semibold hover:underline"
                onClick={prevStep}
              >
                <ArrowLeft />
                <div className="text-base">
                  Do you want to change your name?
                </div>
              </Button>
            </div>
          )}
          {step === 3 && (
            <div className="flex flex-col gap-2">
              <div>
                How dexterous are you in the arts of Magic: The Gathering?
              </div>
              <FormField
                control={form.control}
                name="skillLevel"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-fit lg:min-w-100">
                        <SelectTrigger
                          className={
                            handwritten.className +
                            " data-[placeholder]:text-white data-[placeholder]:text-4xl [&_svg:not([class*='text-'])]:text-white data-[size=default]:h-20 *:data-[slot=select-value]:text-4xl bg-muted-foreground/10"
                          }
                        >
                          <SelectValue placeholder="Please select a rank" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="unspecified" className="text-xl">
                          I&apos;m new to the arts
                        </SelectItem>
                        <SelectItem value="beginner" className="text-xl">
                          A beginner
                        </SelectItem>
                        <SelectItem value="intermediate" className="text-xl">
                          An intermediate
                        </SelectItem>
                        <SelectItem value="advanced" className="text-xl">
                          Quite good
                        </SelectItem>
                        <SelectItem value="pro" className="text-xl">
                          I&apos;m level 20
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <div className="mt-8">Would you mind telling us your gender?</div>
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-fit lg:min-w-100">
                        <SelectTrigger
                          className={
                            handwritten.className +
                            " data-[placeholder]:text-white data-[placeholder]:text-4xl [&_svg:not([class*='text-'])]:text-white data-[size=default]:h-20 *:data-[slot=select-value]:text-4xl bg-muted-foreground/10"
                          }
                        >
                          <SelectValue placeholder="Please select a gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male" className="text-xl">
                          Male
                        </SelectItem>
                        <SelectItem value="female" className="text-xl">
                          Female
                        </SelectItem>
                        <SelectItem value="non-binary" className="text-xl">
                          Non Binary
                        </SelectItem>
                        <SelectItem value="unspecified" className="text-xl">
                          It&apos;s a secret
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <div className="flex w-full justify-between items-center mt-8">
                <Button
                  type="button"
                  variant="ghost"
                  className="hover:bg-transparent hover:text-white hover:scale-125 cursor-pointer"
                  onClick={prevStep}
                >
                  <ArrowLeft className="size-10 lg:size-20 cursor-pointer" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="hover:bg-transparent hover:text-white hover:scale-125 cursor-pointer"
                  disabled={!isSelectsValid}
                  onClick={nextStep}
                >
                  <ArrowRight className="size-10 lg:size-20 cursor-pointer" />
                </Button>
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="flex flex-col gap-2">
              <div>
                <Button
                  type="button"
                  variant="ghost"
                  className="hover:bg-transparent hover:text-white hover:scale-125 cursor-pointer"
                  onClick={prevStep}
                >
                  <ArrowLeft className="size-5 lg:size-10 cursor-pointer" /> Go
                  back
                </Button>
              </div>
              <div>Lastly, imprint your rune to the application scroll!</div>
              <div className="text-base lg:text-4xl">
                (Two times, just to be safe!)
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-4 lg:col-span-3 flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="mt-2">
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            autoFocus
                            {...field}
                            className="text-white font-medium border-0 outline-0 focus-visible:ring-0 ring-0 ring-shadow shadow-none placeholder:animate-pulse p-0 text-2xl md:text-3xl lg:text-5xl xl:text-6xl 2xl:text-7xl placeholder:text-2xl placeholder:md:text-3xl placeholder:lg:text-5xl placeholder:xl:text-6xl placeholder:2xl:text-7xl h-fit placeholder:text-white/50 bg-muted-foreground/10"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="mt-2">
                        <FormLabel>Confirm password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            {...field}
                            className="text-white font-medium border-0 outline-0 focus-visible:ring-0 ring-0 ring-shadow shadow-none placeholder:animate-pulse p-0 text-2xl md:text-3xl lg:text-5xl xl:text-6xl 2xl:text-7xl placeholder:text-2xl placeholder:md:text-3xl placeholder:lg:text-5xl placeholder:xl:text-6xl placeholder:2xl:text-7xl h-fit placeholder:text-white/50 bg-muted-foreground/10"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="text-xs md:text-base lg:text-xl col-span-4 lg:col-span-1 items-start justify-start ps-4 mt-0 md:mt-8">
                  <div>
                    Your password <span className="underline">must</span> have:
                  </div>
                  <ul className="w-full list-disc">
                    <li>Minimum 8 characters in length</li>
                    <li>At least one uppercase English letter</li>
                    <li>At least one lowercase English letter</li>
                    <li>At least one digit</li>
                    <li>At least one special character</li>
                  </ul>
                </div>
                <div className="col-span-4 w-full flex justify-center items-center mt-6">
                  <Button
                    type="button"
                    variant="ghost"
                    className="hover:bg-transparent hover:text-white hover:scale-105 hover:underline cursor-pointer text-2xl lg:text-4xl italic max-w-full whitespace-break-spaces"
                    disabled={!isPasswordValid}
                    onClick={register}
                  >
                    Complete your registration to the Archives
                    <ScrollText className="size-5 lg:size-10 max-sm:hidden" />
                    <ArrowRight className="size-5 lg:size-10" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </form>
      </Form>
      {step === 5 && <LoadingScroll />}
    </div>
  );
};

export default RegisterPage;
