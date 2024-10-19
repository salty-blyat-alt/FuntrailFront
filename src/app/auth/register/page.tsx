"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { useAuth } from "@/app/context/auth-context";
import useAxios from "@/app/hooks/use-axios";
import { hasCookie, setCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const Register = () => {
  const { fetchProfile } = useAuth();

  const {
    triggerFetch: registerUser,
    responseData: success,
    error: responseError,
  } = useAxios<
    any,
    | FormData
    | {
        username: string;
        email: string;
        password: string;
        password_confirmation: string;
        phone_number: string;
      }
  >({
    endpoint: "/api/auth/register",
    method: "POST",
    config: {},
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>();

  const onSubmit: SubmitHandler<{
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone_number: string;
  }> = (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("password_confirmation", data.password_confirmation); // Correctly append password_confirmation
    formData.append("phone_number", data.phone_number); // Correctly append password_confirmation

    // Register user with FormData
    registerUser?.(formData);
    reset();
  };
  const router = useRouter();
  useEffect(() => {
    if (success) {
      // Set cookie to expire in 7 days
      setCookie("access_token", success.token);
      fetchProfile?.();
      router.push("/");
    }
    // If an access token already exists in the cookies, redirect as well
    if (hasCookie("access_token")) {
      router.push("/");
    }
  }, [success, router]);

  return (
    <div className="w-full my-auto min-h-dvh flexreverse lg:grid lg:grid-cols-2 overflow-hidden">
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="pt-[40%]">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Register</h1>
            <p className="text-balance text-muted-foreground">
              Enter your details to create your account
            </p>
          </div>
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Username Field */}
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <span className="text-red-500">Username is required</span>
              )}
            </div>

            {/* Email Field */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500">Email is required</span>
              )}
            </div>
            {/* phone_number */}
            <div className="grid gap-2">
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input
                id="phone_number"
                type="text"
                placeholder="Phone Number"
                {...register("phone_number", { required: true })}
              />
              {errors.phone_number && (
                <span className="text-red-500">Phone Number is required</span>
              )}
            </div>
            {/* Password Field */}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password", { required: true, minLength: 8 })}
              />
              {errors.password && (
                <span className="text-red-500">
                  Password must be at least 8 characters
                </span>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                {...register("password_confirmation", { required: true })}
              />
              {errors.password_confirmation && (
                <span className="text-red-500">
                  Please confirm your password
                </span>
              )}
            </div>

            <Button type="submit" className="w-full">
              Register
            </Button>
            {responseError && (
              <span className="text-red-500">{responseError.message}</span>
            )}
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
