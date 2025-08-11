"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.ok) {
      toast.success("Logged in successfully");
      router.push("/");
    } else {
      toast.error(result?.error || "Login failed");
    }
  };

  const handleForgotPassword = () => {
    toast.info("Redirecting to forgot password page");

    router.push("/Forgot-Password");
  }



  return (
    <div className="min-h-screen flex items-center justify-center ">
      <Card className="w-full max-w-md shadow-xl border-blue-300">
        <CardHeader className="flex flex-col items-center">
          <Image
            src="/Secure_docs_logo.jpg"
            alt="SecureDocs Logo"
            width={40}
            height={40}
            className="mb-2"
          />
          <CardTitle className="text-3xl text-blue-800">SecureDocs</CardTitle>
          <CardDescription className=" text-center">
            Login to your account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-blue-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-blue-700">
                    Password
                  </Label>
                  <a
                    onClick={handleForgotPassword}
                      className="text-sm text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative flex items-center">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="pr-10 w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-900 transition-colors duration-150 ease-in-out"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                Login
              </Button>
              {/* <Button
                variant="outline"
                className="w-full text-blue-700 border-blue-400 hover:bg-blue-50"
                // You can add Google login handler here later
              >
                <FcGoogle className="mr-2 h-5 w-5" />
                Login with Google
              </Button> */}
            </div>
            <div className="mt-4 text-center text-sm text-blue-700">
              Don&apos;t have an account?{" "}
              <a
                href="/register"
                className="underline text-blue-800 hover:text-blue-900"
              >
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
