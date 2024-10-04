import { ModeToggle } from "@/theme/toggle-theme";
import logo from "@public/logo/logo.svg";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[60] py-4 px-4 shadow bg-background">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link href="/">
            <div className="flex items-center space-x-2">
              <Image src={logo} alt="Logo" className="size-9" />
              <span className="text-xl font-bold">Funtrail</span>
            </div>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="flex items-center space-x-2">
          {/* Dropdown for "Join Us" */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default">Join Us</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href="/register-hotel" passHref>
                <DropdownMenuItem>Register Hotel</DropdownMenuItem>
              </Link>
              <Link href="/register-restaurant" passHref>
                <DropdownMenuItem>Register Restaurant</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Account Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="overflow-hidden">
                <User className="size-4" />
                {/* prod */}
                {/* <Image
                  src="/placeholder-user.jpg"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                /> */}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={"/auth/login"}>
                <DropdownMenuItem>Login</DropdownMenuItem>
              </Link>
              <Link href={"/auth/register"}>
                <DropdownMenuItem>Register</DropdownMenuItem>
              </Link>

              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link href="/dashboard/hotel/id">
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
