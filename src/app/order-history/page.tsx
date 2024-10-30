"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { ScrollArea } from "@components/ui/scroll-area";
import useAxios from "../hooks/use-axios";
import CurrentBooking from "./components/current-booking";
import HistoryBooking from "./components/history-booking";

const orderHistory = [
  {
    id: 3,
    room_id: 102,
    hotel_id: 1,
    user_id: 1,
    date_start: "2023-05-01",
    date_end: "2023-05-03",
    total: 300,
    created_at: "2023-04-15T10:00:00Z",
    updated_at: "2023-04-15T10:00:00Z",
    status: "completed",
    u_id: "USER125",
  },
  {
    id: 4,
    room_id: 102,
    hotel_id: 1,
    user_id: 1,
    date_start: "2023-05-01",
    date_end: "2023-05-03",
    total: 300,
    created_at: "2023-04-15T10:00:00Z",
    updated_at: "2023-04-15T10:00:00Z",
    status: "completed",
    u_id: "USER125",
  },
  {
    id: 5,
    room_id: 102,
    hotel_id: 1,
    user_id: 1,
    date_start: "2023-05-01",
    date_end: "2023-05-03",
    total: 300,
    created_at: "2023-04-15T10:00:00Z",
    updated_at: "2023-04-15T10:00:00Z",
    status: "completed",
    u_id: "USER125",
  },
  // Add more mock data as needed
];

export default function OrderHistory() {
  const { triggerFetch: fetchHistory, responseData: response } = useAxios<
    any,
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

  useEffect(() => {
    fetchHistory?.();
  }, []);
 
  const active_orders = response?.active_orders;
  const history_orders = response?.history_orders;

  return (
    <div className="container mx-auto p-4 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Your Bookings</h1>
        <CurrentBooking currentOrders={active_orders ?? []} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Booking History</CardTitle>
            <CardDescription>Your past reservations</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[40rem] pr-4">
              {!history_orders || history_orders.length <= 0 ? (
                <div className="flex justify-center items-center h-full">
                  <p className="text-lg font-semibold text-muted-foreground">
                    No booking record found.
                  </p>
                </div>
              ) : (
                <HistoryBooking orderHistory={history_orders ?? []} />
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
