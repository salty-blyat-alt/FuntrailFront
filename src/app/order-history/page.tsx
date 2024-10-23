"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { ScrollArea } from "@components/ui/scroll-area";

// Mock data (expanded to include multiple current orders)
const currentOrders = [
  {
    id: 1,
    room_id: 101,
    hotel_id: 1,
    user_id: 1,
    date_start: "2023-06-01",
    date_end: "2023-06-05",
    total: 500,
    created_at: "2023-05-15T10:00:00Z",
    updated_at: "2023-05-15T10:00:00Z",
    status: "confirmed",
    u_id: "USER123",
  },
  {
    id: 2,
    room_id: 202,
    hotel_id: 2,
    user_id: 1,
    date_start: "2023-07-10",
    date_end: "2023-07-15",
    total: 750,
    created_at: "2023-05-20T14:30:00Z",
    updated_at: "2023-05-20T14:30:00Z",
    status: "pending",
    u_id: "USER124",
  },
];

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
  // Add more mock data as needed
];

export default function OrderHistory() {
  const [mounted, setMounted] = useState(false);
  const [currentOrderIndex, setCurrentOrderIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const nextOrder = () => {
    setCurrentOrderIndex((prevIndex) => (prevIndex + 1) % currentOrders.length);
  };

  const prevOrder = () => {
    setCurrentOrderIndex(
      (prevIndex) =>
        (prevIndex - 1 + currentOrders.length) % currentOrders.length
    );
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Your Bookings</h1>

        <Card>
          <CardHeader>
            <CardTitle>Current Bookings</CardTitle>
            <CardDescription>Your active reservations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentOrderIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-2 gap-4"
                >
                  <div>
                    <p className="font-semibold">
                      Room {currentOrders[currentOrderIndex].room_id}
                    </p>
                    <p>Hotel ID: {currentOrders[currentOrderIndex].hotel_id}</p>
                    <p>
                      Check-in:{" "}
                      {format(
                        new Date(currentOrders[currentOrderIndex].date_start),
                        "PPP"
                      )}
                    </p>
                    <p>
                      Check-out:{" "}
                      {format(
                        new Date(currentOrders[currentOrderIndex].date_end),
                        "PPP"
                      )}
                    </p>
                  </div>
                  <div>
                    <p>Total: ${currentOrders[currentOrderIndex].total}</p>
                    <p>
                      Booked on:{" "}
                      {format(
                        new Date(currentOrders[currentOrderIndex].created_at),
                        "PPP"
                      )}
                    </p>
                    <p>
                      Status:{" "}
                      <Badge>{currentOrders[currentOrderIndex].status}</Badge>
                    </p>
                    <p>Booking ID: {currentOrders[currentOrderIndex].u_id}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="absolute top-1/2 -left-4 -translate-y-1/2">
                <Button variant="ghost" size="icon" onClick={prevOrder}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute top-1/2 -right-4 -translate-y-1/2">
                <Button variant="ghost" size="icon" onClick={nextOrder}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
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
                        {format(new Date(order.date_start), "PP")} -{" "}
                        {format(new Date(order.date_end), "PP")}
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
