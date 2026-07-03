"use client"

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <p>GHOST AI</p>
      <Button className="ml-4" variant="outline">
        Get Started
      </Button>
    </div>
  );
}
