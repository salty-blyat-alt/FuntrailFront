"use client";

import Image from "next/image";
import Link from "next/link";
import BackButton from "@/app/components/back-button/back-button";
import img from "@public/auth_pic/login.jpg";
import { Button } from "@/app/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import useAxios from "@/app/hooks/use-axios";
import { useEffect } from "react";
import { toast } from "@/app/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    email: string;
    token: string;
    password: string;
    password_confirmation: string;
  }>();
  const {
    triggerFetch: triggerForgotPassword,
    responseDataWithStat: errorStat,
    error,
    finished,
    responseData: response,
  } = useAxios<any, FormData>({
    endpoint: "/api/auth/forgot-password",
    method: "POST",
    config: {
      headers: {
        Accept: "application/json",
      },
    },
  });
  const searchParam = useSearchParams();
  const token = searchParam.get("token") || "";
  const emailParam = searchParam.get("email") || "";
 

  const onSubmit: SubmitHandler<{
    email: string;
    token: string;
    password: string;
    password_confirmation: string;
  }> = (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("token", token);
    formData.append("password", data.password);
    formData.append("password_confirmation", data.password_confirmation);
     
    triggerForgotPassword?.(formData);
  };

  const router = useRouter();
  useEffect(() => {
    if (response && finished) {
      router.push("/");
      toast({
        title: "Success",
        description: "Password changed successfully",
        variant: "success",
      });
    }
  }, [response, finished]);

  useEffect(() => {
    if (errorStat && error) {
      toast({
        title: "Failed to change password",
        description:
          errorStat?.result_message + ". code: " + errorStat.result_code,
        variant: "destructive",
      });
    }
  }, [errorStat, error]);
  return (
    <div className="w-full min-h-dvh my-auto lg:grid lg:grid-cols-2 overflow-hidden">
      <div className="pt-[40%] relative">
        <BackButton className="absolute z-10 top-10 left-10" path="/" />
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Reset Password</h1>
            <p className="text-balance text-muted-foreground">
              Please enter your email. We will send you a verification code in
              your email.
            </p>
          </div>
          <div className="grid gap-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your_email@example.com"
                  value={emailParam}
                  {...register("email", { required: "Email is required" })}
                  required
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  required
                />
                {errors.password && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password_confirmation">
                  Password Confirmation
                </Label>
                <Input
                  id="password_confirmation"
                  type="password"
                  placeholder="Password Confirmation"
                  {...register("password_confirmation", {
                    required: "Password Confirmation is required",
                  })}
                  required
                />
                {errors.password_confirmation && (
                  <span className="text-red-500">
                    {errors.password_confirmation.message}
                  </span>
                )}
              </div>
              <Button type="submit" className="w-full mt-4">
                Reset password
              </Button>
            </form>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src={img}
          alt="Image"
          width={"1920"}
          height={"1080"}
          className="h-full object-cover object-right-bottom w-auto blur-sm"
        />
      </div>
    </div>
  );
}

export default ForgotPassword;
