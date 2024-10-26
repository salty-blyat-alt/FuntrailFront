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
import { Badge } from "@components/ui/badge";
import { ScrollArea } from "@components/ui/scroll-area";
import useAxios from "../hooks/use-axios";
import CurrentBooking from "./components/current-booking";
 
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

  console.log(response);

  return (
    <div className="container mx-auto p-4 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Your Bookings</h1>
        <CurrentBooking currentOrders={response?.active_orders || []} />
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
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-8">
                {orderHistory.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="relative pl-8 pb-8 border-l border-muted-foreground last:pb-0"
                  >
                    <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary" />
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-semibold">Room {order.room_id}</p>
                        <Badge>{order.status}</Badge>
                      </div>
                      <p>
                        {order.date_start }
                       { order.date_end }
                      </p>
                      <p className="mt-2">Total: ${order.total}</p>
                      <p className="text-sm text-muted-foreground">
                        Booking ID: {order.u_id}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}