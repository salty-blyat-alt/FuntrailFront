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

function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
      email: string; 
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
    config: {},
  });


  const onSubmit: SubmitHandler<{ 
    email: string; 
  }> = (data) => {
    const formData = new FormData();
    formData.append("email", data.email); 
    triggerForgotPassword?.(formData);
  };

  useEffect(() => {
    if (response && finished) {
      toast({
        title: "Success",
        description: "We have sent the email. Please check your inbox",
        variant: "success",
      });
    }
  }, [response, finished]);

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
  return (
    <div className="w-full min-h-dvh my-auto lg:grid lg:grid-cols-2 overflow-hidden">
      <div className="pt-[40%] relative">
        <BackButton className="absolute z-10 top-10 left-10" path="/" />
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Forgot password</h1>
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
                  {...register("email", { required: "Email is required" })}
                  required
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
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

export default ResetPassword;
