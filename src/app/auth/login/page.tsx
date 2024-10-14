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

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>();

  const { triggerFetch: triggerLogin, responseData: response } = useAxios<
    any,
    FormData | { email: string; password: string }
  >({
    endpoint: "/api/auth/login",
    method: "POST",
    config: {
      headers: {
        Accept: "application/json",
      },
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (response) {
      // Set cookie to expire in 7 days
      setCookie("access_token", response.access_token);
      router.push("/");
    }
    // If an access token already exists in the cookies, redirect as well
    if (hasCookie("access_token")) {
      router.push("/");
    }
  }, [response, router]);

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
      <div className="pt-[40%]">
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
                  placeholder="your_email@example.com"
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
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
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
          src="/placeholder.svg"
          alt="Image"
          width={1920}
          height={1080}
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}

export default Login;
