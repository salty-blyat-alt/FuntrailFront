import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import useAxios from "@/app/hooks/use-axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { Input } from "@/app/components/ui/input";
import { useAuth } from "@/app/context/auth-context";
import { Label } from "@/app/components/ui/label";
import { Checkbox } from "@/app/components/ui/checkbox";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "@/app/hooks/use-toast";

const Account = () => {
  const [open, setOpen] = useState(false);
  const { setUser } = useAuth();
  const {
    triggerFetch: changePassword,
    responseData: success,
    responseDataWithStat: errorStat,
    error,
    finished,
  } = useAxios<FormData, any>({
    endpoint: "/api/auth/change-password",
    method: "POST",
    config: {},
  });

  interface FormInputs {
    new_password: string;
    new_password_confirmation: string;
    current_password: string;
    preserve_current_token: boolean;
  }

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      preserve_current_token: false,
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const formData = new FormData();
    formData.append("new_password", data.new_password);
    formData.append(
      "new_password_confirmation",
      data.new_password_confirmation
    );
    formData.append("current_password", data.current_password);
    formData.append(
      "preserve_current_token",
      data.preserve_current_token.toString()
    );
    changePassword?.(formData);
  };
  const router = useRouter();

  useEffect(() => {
    if (success && finished) {
      const formData = getValues();
      if (!formData.preserve_current_token) {
        deleteCookie("access_token", {
          path: "/",
          domain: process.env.NEXT_PUBLIC_DOMAIN,
        });
        deleteCookie("establishment_id", {
          path: "/",
          domain: process.env.NEXT_PUBLIC_DOMAIN,
        });
        deleteCookie("user", {
          path: "/",
          domain: process.env.NEXT_PUBLIC_DOMAIN,
        });
        setUser(null);
        router.push("/auth/login");
      }
      setOpen(false);
      toast({
        title: "Success",
        description: "Password changed successfully.",
        variant: "success",
      });
    }
  }, [success, finished]);


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
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Account Settings</h2>
      <hr />
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold">Change Password</h3>
            <p className="text-sm text-muted-foreground">
              Update your password regularly for better security
            </p>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setOpen(true)} variant="outline">
                Change
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change Password</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex gap-y-2 flex-col">
                  <Label htmlFor="current_password" className="block">
                    Current Password
                  </Label>
                  <Input
                    id="current_password"
                    type="password"
                    {...register("current_password", {
                      required: "Current password is required",
                    })}
                  />
                  {errors.current_password && (
                    <p className="text-red-500">
                      {errors.current_password.message}
                    </p>
                  )}
                </div>
                <div className="flex gap-y-2 flex-col">
                  <Label htmlFor="new_password" className="block">
                    New Password
                  </Label>
                  <Input
                    id="new_password"
                    type="password"
                    {...register("new_password", {
                      required: "New password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                  />
                  {errors.new_password && (
                    <p className="text-red-500">
                      {errors.new_password.message}
                    </p>
                  )}
                </div>
                <div className="flex gap-y-2 flex-col">
                  <Label htmlFor="new_password_confirmation" className="block">
                    Confirm New Password
                  </Label>
                  <Input
                    id="new_password_confirmation"
                    type="password"
                    {...register("new_password_confirmation", {
                      required: "Please confirm your new password",
                      validate: (value) =>
                        value === getValues("new_password") ||
                        "Passwords do not match",
                    })}
                  />
                  {errors.new_password_confirmation && (
                    <p className="text-red-500">
                      {errors.new_password_confirmation.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="preserve_current_token"
                    defaultChecked={true}
                    onCheckedChange={(checked) => {
                      setValue("preserve_current_token", checked === true);
                    }}
                  />
                  <Label
                    htmlFor="preserve_current_token"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Keep me logged in on this device
                  </Label>
                </div>

                <Button type="submit">Submit</Button>
              </form> 

              {finished && <p>Processing...</p>}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Account;
