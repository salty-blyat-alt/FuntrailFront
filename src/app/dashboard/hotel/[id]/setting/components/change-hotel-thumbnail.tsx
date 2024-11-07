import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { useAuth } from "@/app/context/auth-context";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAxios from "@/app/hooks/use-axios";
import { HotelSettingProps } from "./name-textbox";

const ChangeHotelThumbnail: React.FC<HotelSettingProps> = ({
  hotel,
  fetchHotel,
}) => {
  const [hovered, setHovered] = useState(false);
  const { user } = useAuth();
  const {
    triggerFetch: editHotel,
    responseData: success,
    finished,
  } = useAxios<any, FormData>({
    endpoint: `/api/hotel/update`,
    config: {},
    method: "POST",
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("thumbnail", file);
      editHotel?.(formData);
    }
  };

  useEffect(() => {
    if (success && finished) {
      fetchHotel?.();
    }
  }, [success, finished]);
  console.log(hotel);
  return (
    <div className="flex items-center space-x-4">
      <div
        className="relative group size-32"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Avatar className="size-32 object-center object-cover rounded-sm">
          <Image
            width={400}
            height={400}
            src={
              hotel?.thumbnail
                ? process.env.NEXT_PUBLIC_BASE_URL + hotel?.thumbnail
                : ""
            }
            alt="Hotel profile"
            className="rounded-sm"
          />
          <AvatarFallback>{user?.username?.slice(0, 2) || "JD"}</AvatarFallback>
        </Avatar>

        {hovered && (
          <motion.div
            className="absolute rounded-sm text-center inset-0 bg-opacity-50 bg-white flex justify-center items-center text-sm"
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
    </div>
  );
};

export default ChangeHotelThumbnail;
