import { ANY } from "@/app/components/custom-table/custom-table";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const CurrentBooking = ({ currentOrders }: { currentOrders: ANY }) => {
  const [currentOrderIndex, setCurrentOrderIndex] = useState(0);

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
    <Card>
      <CardHeader>
        <CardTitle>Current Bookings</CardTitle>
        <CardDescription>Your active reservations</CardDescription>
      </CardHeader>
      <CardContent>
        {currentOrders.length > 0 ? (
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
                    Room {currentOrders[currentOrderIndex].room_type || ""}
                  </p>
                  <p className="font-semibold underline">
                    At Hotel: {currentOrders[currentOrderIndex].hotel_name}
                  </p>
                  <p>Check-in: {currentOrders[currentOrderIndex].date_start}</p>
                  <p>Check-out: {currentOrders[currentOrderIndex].date_end}</p>
                </div>
                <div>
                  <p>Total: ${currentOrders[currentOrderIndex].total}</p>
                  <p>
                    Booked on: {currentOrders[currentOrderIndex].created_at}
                  </p>
                  <p>
                    Status:{" "}
                    <Badge>{currentOrders[currentOrderIndex].status}</Badge>
                  </p>
                  <p>Ticket ID: {currentOrders[currentOrderIndex].id}</p>
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
        ) : (
          <p className="text-center text-gray-500 py-4">No rooms booked yet.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default CurrentBooking;
