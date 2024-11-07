"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import useAxios from "../hooks/use-axios";
import { Badge } from "../components/ui/badge";
import { CalendarDays, Clock, CreditCard, Hotel, User } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import { Button } from "../components/ui/button";

type Receipt = {
  receipt_id: number;
  hotel_name: string;
  username: string;
  checkin: string;
  checkout: string;
  ordered_at: string;
  rooms: string[];
  total: number | null;
};

export default function OrderHistory() {
  const { triggerFetch: fetchHistory, responseData: response } = useAxios<
    Receipt[],
    undefined
  >({
    endpoint: "/api/order/history",
    method: "GET",
    config: {
      headers: {
        Accept: "application/json",
      },
    },
  });

  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);

  useEffect(() => {
    fetchHistory?.();
  }, []); 

  function handleOpenModal(receipt: Receipt): void {
    setSelectedReceipt(receipt);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Hotel Booking Timeline</h1>
      <div className="space-y-8">
        {response?.map((receipt, index) => (
          <div key={receipt.receipt_id} className="flex">
            <div className="flex flex-col items-center mr-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                {index + 1}
              </div>
              {index < response.length - 1 && (
                <div className="w-0.5 h-full bg-gray-300 mt-2"></div>
              )}
            </div>
            <Card className="flex-grow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{receipt.hotel_name}</span>
                  <Badge variant="secondary">#{receipt.receipt_id}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>{receipt.username}</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    <span>
                      {receipt.checkin} - {receipt.checkout}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Hotel className="mr-2 h-4 w-4" />
                    <span>{receipt.rooms.join(", ")}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>{receipt.ordered_at}</span>
                  </div>
                  {receipt.total && (
                    <div className="flex items-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>${receipt.total}</span>
                    </div>
                  )}
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => handleOpenModal(receipt)}
                      className="mt-4"
                    >
                      View
                    </Button>
                  </DialogTrigger>
                  {selectedReceipt && (
                    <DialogContent>
                      <Card className="w-full max-w-2xl mx-auto">
                        <CardHeader className="bg-primary text-primary-foreground">
                          <CardTitle className="text-2xl">
                            {receipt.hotel_name} Booking Confirmation
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                              <p className="text-sm text-gray-500">
                                Booking Ticket
                              </p>
                              <p className="text-lg font-semibold">
                                #{receipt.receipt_id}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Guest</p>
                              <p className="flex items-center">
                                <User className="mr-2 h-4 w-4" />
                                {receipt.username}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Ordered</p>
                              <p className="flex items-center">
                                <Clock className="mr-2 h-4 w-4" />
                                {receipt.ordered_at}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Check-in</p>
                              <p className="flex items-center">
                                <CalendarDays className="mr-2 h-4 w-4" />
                                {receipt.checkin}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Check-out</p>
                              <p className="flex items-center">
                                <CalendarDays className="mr-2 h-4 w-4" />
                                {receipt.checkout}
                              </p>
                            </div>
                            <div className="col-span-2">
                              <p className="text-sm text-gray-500">Room Type</p>
                              <p className="flex items-center">
                                <Hotel className="mr-2 h-4 w-4" />
                                {receipt.rooms.join(", ")}
                              </p>
                            </div>
                          </div>
                          <div className="mt-6 pt-6 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                              <span className="text-lg font-semibold">
                                Total Amount
                              </span>
                              <span className="text-2xl font-bold flex items-center">
                                <CreditCard className="mr-2 h-5 w-5" />$
                                {receipt.total ?? 0}
                              </span>
                            </div>
                          </div>
                          <div className="mt-6 text-center text-sm text-gray-500">
                            <p>
                              Thank you for choosing {receipt.hotel_name}. We're
                              excited to host you!
                            </p>
                            <p>
                              If you have any questions, please don't hesitate
                              to contact us.
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </DialogContent>
                  )}
                </Dialog>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
