import { Button } from "@/app/components/ui/button";
import React from "react";

const RecentActivity = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Recent Activity</h2>
      <div className="space-y-4">
        {[
          { action: "Completed project", date: "2 days ago" },
          {
            action: "Submitted a pull request",
            date: "1 week ago",
          },
          {
            action: "Attended a conference",
            date: "2 weeks ago",
          },
          {
            action: "Published a blog post",
            date: "1 month ago",
          },
        ].map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{item.action}</h3>
              <p className="text-sm text-muted-foreground">{item.date}</p>
            </div>
            <Button variant="ghost" size="sm">
              View
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
