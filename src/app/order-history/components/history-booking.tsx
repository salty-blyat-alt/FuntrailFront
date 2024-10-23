import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/app/components/ui/badge";


const HistoryBooking = ({ orderHistory }) => {
  return (
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
          {order.date_start}
          {order.date_end}
        </p>
        <p className="mt-2">Total: ${order.total}</p>
        <p className="text-sm text-muted-foreground">
          Booking ID: {order.u_id}
        </p>
      </div>
    </motion.div>
       ))}
  );
};

export default HistoryBooking;
