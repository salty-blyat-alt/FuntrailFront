import { useState, useEffect, Dispatch } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { motion } from "framer-motion";
import { Mail, MapPin, Calendar, PhoneCall, Save } from "lucide-react";
import RedStar from "@components/redstar/redstar";
import { useAuth } from "@/app/context/auth-context";
import useAxios from "@/app/hooks/use-axios";
import { Province } from "@/app/home/components/search-group";
import { Button } from "@/app/components/ui/button";
import { toast } from "@/app/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@components/ui/dialog";
import { ANY } from "@/app/components/custom-table/custom-table";
import Image from "next/image";

const Profile = ({
  isEditing,
  toggleEdit,
  setIsEditing,
}: {
  isEditing: boolean;
  toggleEdit: () => void;
  setIsEditing: Dispatch<boolean>;
}) => {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false); // State for save confirmation
  const { handleSubmit, reset, register, setValue } = useForm<{
    username?: string;
    email?: string;
    province_id?: number;
    phone_number?: string;
  }>();

  const { user, fetchProfile } = useAuth();

  const { triggerFetch: fetchProvinces, responseData: provinces } = useAxios<
    ANY,
    undefined
  >({
    endpoint: "/api/province/list",
    method: "GET",
    config: {},
  });

  const {
    triggerFetch: updateUser,
    responseData: success,
    responseDataWithStat: errorStat,
    error,
    finished,
  } = useAxios<ANY, FormData>({
    endpoint: `/api/user/update/${user?.id}`,
    method: "POST",
    config: {},
  });

  useEffect(() => {
    fetchProvinces?.();
  }, []);

  useEffect(() => {
    if (user?.province) {
      setSelectedProvince(user.province.toString());
      const provinceData = provinces?.find(
        (p: Province) => p.name.toString() === user.province?.toString()
      );
      if (provinceData) {
        setValue("province_id", provinceData.id);
      }
    }
  }, [provinces]);

  useEffect(() => {
    if (finished && success) {
      setIsEditing(false);
      fetchProfile?.();
      toast({
        title: "Success",
        description: "User Information updated successfully",
        variant: "success",
      });
    }
  }, [finished, success]);

  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value);
    const provinceData = provinces?.find((p: Province) => p.name === value);
    if (provinceData) {
      setValue("province_id", provinceData.id);
    }
  };

  const onSubmit: SubmitHandler<{
    username?: string;
    email?: string;
    province_id?: number;
    phone_number?: string;
  }> = async (data) => {
    const formData = new FormData();

    if (data.username) {
      formData.append("username", data.username);
    }
    if (data.email) {
      formData.append("email", data.email);
    }
    if (data.province_id) {
      formData.append("province_id", data.province_id.toString());
    }
    if (data.phone_number) {
      formData.append("phone_number", data.phone_number);
    }

    try {
      updateUser?.(formData); // Call updateUser function here
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleCancel = () => {
    setShowCancelDialog(true); // Show cancel confirmation dialog
  };

  const confirmCancel = () => {
    reset();
    setShowCancelDialog(false);
    toggleEdit(); // Close editing mode
  };

  const confirmSave = () => {
    handleSubmit(onSubmit)(); // Trigger form submission after confirmation
    setShowSaveDialog(false); // Close the save dialog
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("profile_img", file);
      updateUser?.(formData);
    }
  };

  useEffect(() => {
    if (errorStat && error) {
      toast({
        title: "Failed to update your information",
        description:
          errorStat?.result_message + ". code: " + errorStat.result_code,
        variant: "destructive",
      });
    }
  }, [errorStat, error]); 
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div
          className="relative group w-20 h-20"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Avatar className="size-20 object-center object-cover">
            <Image
              width={200}
              height={200}
              src={`${process.env.NEXT_PUBLIC_BASE_URL}${user?.profile_img}`}
              alt="Profile picture"
            />
            <AvatarFallback>
              {user?.username?.slice(0, 2) || "JD"}
            </AvatarFallback>
          </Avatar>

          {hovered && (
            <motion.div
              className="absolute rounded-full text-center inset-0 bg-opacity-50 bg-white flex justify-center items-center text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              Choose Image
            </motion.div>
          )}

          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleImageChange}
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{user?.username || "John Doe"}</h2>
          <p className="text-muted-foreground">{user?.user_type}</p>
        </div>
      </div>

      {isEditing ? (
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <Label htmlFor="name">Username</Label>
            <Input
              id="name"
              defaultValue={user?.username}
              {...register("username")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue={user?.email}
              {...register("email")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone_number">Phone number</Label>
            <Input
              id="phone_number"
              type="number"
              defaultValue={user?.phone_number}
              {...register("phone_number")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="province_id">
              Province <RedStar />
            </Label>
            <Select
              value={selectedProvince}
              onValueChange={handleProvinceChange}
              defaultValue={user?.province?.toString()}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a province" />
              </SelectTrigger>
              <SelectContent>
                {provinces?.map((province: Province) => (
                  <SelectItem key={province.id} value={province.name}>
                    {province.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <input type="hidden" {...register("province_id")} />
          </div>
          <div className="flex gap-x-4">
            <Button
              size={"sm"}
              variant={"outline"}
              className="flex gap-x-4"
              onClick={handleCancel}
            >
              Cancel
            </Button>

            <Button
              size={"sm"}
              className="flex gap-x-2"
              onClick={() => setShowSaveDialog(true)} // Show save confirmation dialog
            >
              <Save className="size-4" /> Save
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-4   ">
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4" />
            <span>{user?.email || "No Data"}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>{user?.province || "No Data"}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Joined {user?.created_at ?? "No Data"}</span>
          </div>
          <div className="flex items-center space-x-2">
            <PhoneCall className="h-4 w-4" />
            <span>{user?.phone_number || "No Data"}</span>
          </div>
        </div>
      )}

      {/* Cancel Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unsaved Changes</DialogTitle>
          </DialogHeader>
          <p>Changes made are unsaved. Are you sure you want to cancel?</p>
          <DialogFooter className="space-x-4">
            <Button
              onClick={() => setShowCancelDialog(false)}
              variant="outline"
            >
              No, keep editing
            </Button>
            <Button onClick={confirmCancel} variant="destructive">
              Yes, cancel changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Save Confirmation Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Changes</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to save the changes?</p>
          <DialogFooter className="space-x-4">
            <Button onClick={() => setShowSaveDialog(false)} variant="outline">
              No, keep editing
            </Button>
            <Button onClick={confirmSave} variant="default">
              Yes, save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
