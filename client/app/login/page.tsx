"use client";

import { GoogleLogin } from "@/components/googleLogin";
import { SignIn } from "@/components/signIn";
import { SignUp } from "@/components/signUp";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useUserState } from "@/zustand/user";
import { redirect } from "next/navigation";
import { useLayoutEffect, useState } from "react";

export default function Login() {
  const [isSignIn, setIsSignIn] = useState(true);
  const { user } = useUserState();

  useLayoutEffect(() => {
    if (user) {
      redirect("/tasks");
    }
  }, [user]);

  return (
    <div className="grid justify-center items-center h-screen w-full ">
      <div className="grid w-full justify-center items-center">
        {isSignIn ? <SignIn /> : <SignUp />}
        <Separator className="mt-4" />
        <Button
          variant="link"
          className="w-full"
          onClick={() => setIsSignIn(!isSignIn)}
        >
          {isSignIn
            ? "Not yet registered? Sign Up!"
            : "Already registered? Sign In!"}
        </Button>
      </div>
      <div className="flex justify-center items-center w-full">
        <GoogleLogin />
      </div>
    </div>
  );
}
