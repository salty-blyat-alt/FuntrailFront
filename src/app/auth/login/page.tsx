"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@components/ui/button";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import useAxios from "@/app/hooks/use-axios";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { hasCookie, setCookie } from "cookies-next";
import { useAuth } from "@/app/context/auth-context";
import BackButton from "@/app/components/back-button/back-button";
import img from "@public/auth_pic/login.jpg";
import { toast } from "@/app/hooks/use-toast";
import { ANY } from "@/app/components/custom-table/custom-table";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>();

  const { fetchProfile } = useAuth();

  const {
    triggerFetch: triggerLogin,
    responseDataWithStat: errorStat, 
    error,
    finished,
    responseData: response,
  } = useAxios<ANY, FormData | { email: string; password: string }>({
    endpoint: "/api/auth/login",
    method: "POST",
    config: { 
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (response && finished) {
      // Set cookie to expire in 7 days
      setCookie("access_token", response.access_token);
      fetchProfile?.();
      router.back();
      toast({
        title: "Success",
        description: "Logged in successfully",
        variant: "success",
      });
    }

    // If an access token already exists in the cookies, redirect as well
    if (hasCookie("access_token")) {
      router.back();
    }
  }, [response, router, finished]);

  useEffect(() => {
    if (errorStat && error) {
      toast({
        title: "Failed to log in",
        description:
          errorStat?.result_message + ". code: " + errorStat.result_code,
        variant: "destructive",
      });
    }
  }, [errorStat, error]);

  const onSubmit: SubmitHandler<{ email: string; password: string }> = (
    data
  ) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    triggerLogin?.(formData);
  };

  return (
    <div className="w-full min-h-dvh my-auto lg:grid lg:grid-cols-2 overflow-hidden">
      <div className="pt-[40%] relative">
        <BackButton className="absolute z-10 top-10 left-10" path="/" />
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: "Email is required" })}
                  required
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                    passHref
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
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
              <Button type="submit" className="w-full mt-4">
                Login
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

export default Login;
