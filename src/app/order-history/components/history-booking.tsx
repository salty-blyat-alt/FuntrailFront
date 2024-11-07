import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/app/components/ui/badge";
import { ANY } from "@/app/components/custom-table/custom-table";

const HistoryBooking = ({ orderHistory }:{orderHistory:ANY}) => {
  return (
    <div className="space-y-8">
      {orderHistory.map((order:ANY, index:number) => (
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
              <p className="font-semibold">Room: {order.room_type}</p>
              <Badge>{order.status}</Badge>
            </div>

            <div>
              <p>Check-in: {order.date_start}</p>
              <p>Check-out: {order.date_end}</p>
            </div>

            <p className="mt-2">Total: ${order.total}</p>
            <p className="text-sm text-muted-foreground">
              Ticket id: {order.u_id}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default HistoryBooking;
