'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronDown,
  UserRound,
  LogOut,
  Settings,
  User,
  Home,
  MapPin,
  UserPlus,
  LogIn,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { useSession, signOut } from 'next-auth/react';

function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="border-b border-blue-400 border-dotted text-blue-600 h-[60px] shadow-sm bg-white">
      <div className="flex items-center justify-between h-full max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-2 cursor-pointer">
          <Image
            src="/Secure_docs_logo.jpg"
            alt="SecureDocs Logo"
            width={40}
            height={40}
            className="rounded-lg mr-2"
          />
          <span className="text-xl font-bold text-blue-700">Secure Docs</span>
        </div>

        <div className="hidden sm:flex space-x-6">
          <Link href="/plant-listing">
            <Button className="bg-transparent text-black hover:text-blue-700 hover:bg-transparent">
              Btn
            </Button>
          </Link>
          <Link href="/about">
            <Button className="bg-transparent text-black hover:text-blue-700 hover:bg-transparent">
              About Us
            </Button>
          </Link>
          <Link href="/contact">
            <Button className="bg-transparent text-black hover:text-blue-700 hover:bg-transparent">
              Contact Us
            </Button>
          </Link>
        </div>

        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="w-10 h-10 flex items-center justify-center hover:border-blue-600 transition duration-200 cursor-pointer">
                <UserRound className="text-blue-700 hover:text-blue-700" size={20} />
                <ChevronDown className="text-blue-700 mt-1 hover:text-blue-700" size={16} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">

              {/* Mobile nav links */}
              <div className="sm:hidden">
                <Link href="/plant-listing">
                  <DropdownMenuItem className="group hover:text-blue-700">
                    <MapPin className="mr-2 h-4 w-4 text-blue-400 group-hover:text-blue-700" />
                    Btn1
                  </DropdownMenuItem>
                </Link>
                <Link href="/about">
                  <DropdownMenuItem className="group hover:text-blue-700">
                    <User className="mr-2 h-4 w-4 text-blue-400 group-hover:text-blue-700" />
                    About Us
                  </DropdownMenuItem>
                </Link>
                <Link href="/contact">
                  <DropdownMenuItem className="group hover:text-blue-700">
                    <User className="mr-2 h-4 w-4 text-blue-400 group-hover:text-blue-700" />
                    Contact Us
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
              </div>

              <Link href="/">
                <DropdownMenuItem className="group hover:text-blue-700">
                  <Home className="mr-2 h-4 w-4 text-blue-400 group-hover:text-blue-700" />
                  Home
                </DropdownMenuItem>
              </Link>
              <Link href="/nursery-listing">
                <DropdownMenuItem className="group hover:text-blue-700">
                  <MapPin className="mr-2 h-4 w-4 text-blue-400 group-hover:text-blue-700" />
                  Btn2
                </DropdownMenuItem>
              </Link>

              {!session?.user && (
                <>
                  <Link href="/Login">
                    <DropdownMenuItem className="group hover:text-blue-700">
                      <LogIn className="mr-2 h-4 w-4 text-blue-400 group-hover:text-blue-700" />
                      Login
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/register">
                    <DropdownMenuItem className="group hover:text-blue-700">
                      <UserPlus className="mr-2 h-4 w-4 text-blue-400 group-hover:text-blue-700" />
                      Register
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                </>
              )}

              {session?.user && (
                <>
                  <Link href="/profile">
                    <DropdownMenuItem className="group hover:text-blue-700">
                      <User className="mr-2 h-4 w-4 text-blue-400 group-hover:text-blue-700" />
                      My Profile
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/settings">
                    <DropdownMenuItem className="group hover:text-blue-700">
                      <Settings className="mr-2 h-4 w-4 text-blue-400 group-hover:text-blue-700" />
                      Settings
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/register-nursery">
                    <DropdownMenuItem className="group hover:text-blue-700">
                      <UserPlus className="mr-2 h-4 w-4 text-blue-400 group-hover:text-blue-700" />
                      Btn3
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="group hover:text-blue-700"
                  >
                    <LogOut className="mr-2 h-4 w-4 text-blue-400 group-hover:text-blue-700" />
                    Logout
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
