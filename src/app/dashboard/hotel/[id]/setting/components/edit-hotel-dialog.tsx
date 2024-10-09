"use client"; // Add if using Next.js

import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Textarea } from "@/app/components/ui/textarea";
import { facilities, policies } from "@/app/constant/constant";
import { HotelProps } from "@/app/data/mockupData";
import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { PenIcon } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";

interface EditHotelDialog {
  item: HotelProps;
  setHotel: Dispatch<SetStateAction<HotelProps>>;
}

const EditHotelDialog: React.FC<EditHotelDialog> = ({ item, setHotel }) => {
  // const handleChange = (e: FormEvent<HTMLButtonElement>) => {
  //   const { name, value } = e.target;
  //   setHotel((prev: any) => ({ ...prev, [name]: value }));
  // };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="mr-2" variant="outline">
          <PenIcon className="mr-2 size-4 flex-none" /> Edit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Hotel</DialogTitle>
          <DialogDescription>
            Make changes to your hotel here. Click preview when you are done.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-96">
          <div className="grid gap-4 py-4">
            {/* Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={item.name}
                onChange={(e) =>
                  setHotel((prev) => ({ ...prev, name: e.target.value }))
                }
                className="col-span-3"
              />
            </div>
            {/* Address */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Textarea
                id="address"
                name="address"
                value={item.address}
                onChange={(e) =>
                  setHotel((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
                className="col-span-3"
              />
            </div>
            {/* Description */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                value={item.description}
                onChange={(e) =>
                  setHotel((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="col-span-3"
              />
            </div>
            {/* Open at */}
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="open_at" className="text-right mr-4">
                Open at
              </Label>
              <Input
                className="col-span-3"
                id="open_at"
                name="open_at"
                type="time"
                value={item.open_at}
                onChange={(e) =>
                  setHotel((prev) => ({
                    ...prev,
                    open_at: e.target.value,
                  }))
                }
              />
            </div>
            {/* Close at */}
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="close_at" className="text-right mr-4">
                Close at
              </Label>
              <Input
                className="col-span-3"
                id="close_at"
                name="close_at"
                type="time"
                value={item.close_at}
                onChange={(e) =>
                  setHotel((prev) => ({
                    ...prev,
                    close_at: e.target.value,
                  }))
                }
              />
            </div>
            {/* Facilities */}
            <div>
              <Label className="text-right">Facilities</Label>
              <div className="col-span-3 grid gap-2 grid-cols-2">
                {facilities.map((facility) => (
                  <div key={facility} className="flex items-center">
                    <input
                      type="checkbox"
                      className="peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      id={`facility.${facility}`}
                      name={`facility.${facility}`}
                      value={facility}
                      checked={item.facilities.includes(facility)} // Check if the facility is selected
                      onChange={(e) => {
                        const { checked, value } = e.target;
                        console.log(
                          "Checkbox checked:",
                          checked,
                          "Value:",
                          value
                        ); // Log to check

                        setHotel((prev) => {
                          const updatedFacilities = checked
                            ? [...prev.facilities, value] // Add facility if checked
                            : prev.facilities.filter((f) => f !== value); // Remove facility if unchecked

                          return { ...prev, facilities: updatedFacilities };
                        });
                      }}
                    />
                    <Label
                      htmlFor={`facility.${facility}`}
                      className="ml-2 text-balance"
                    >
                      {facility}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div>
              <Label className="text-right">Policies</Label>
              <div className="col-span-3 grid gap-2 grid-cols-2">
                {policies.map((policy) => (
                  <div key={policy} className="flex items-center">
                    <input
                      type="checkbox"
                      className="peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      id={`policy.${policy}`}
                      name={`policy.${policy}`}
                      value={policy}
                      checked={item.policies.includes(policy)} // Check if the policy is selected
                      onChange={(e) => {
                        const { checked, value } = e.target;
                        console.log(
                          "Checkbox checked:",
                          checked,
                          "Value:",
                          value
                        ); // Log to check

                        setHotel((prev) => {
                          const updatedPolicies = checked
                            ? [...prev.policies, value] // Add policy if checked
                            : prev.policies.filter((p) => p !== value); // Remove policy if unchecked

                          return { ...prev, policies: updatedPolicies };
                        });
                      }}
                    />
                    <Label
                      htmlFor={`policy.${policy}`}
                      className="ml-2 text-balance"
                    >
                      {policy}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Preview</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditHotelDialog;
