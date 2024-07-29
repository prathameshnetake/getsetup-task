"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useCallback } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";

export const MobileMenu = () => {
  const logout = useCallback(async () => {
    await signOut(auth);
  }, []);

  return (
    <div className="sm:hidden p-4 mb-4 sticky top-0 z-10 h-[50px]">
      <Drawer>
        <DrawerTrigger asChild>
          <Button>
            <Menu />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Menu</DrawerTitle>
            </DrawerHeader>
            <DrawerFooter>
              <Button
                className="bg-yellow-400 w-full mt-6 text-black font-bold hover:bg-yellow-500"
                onClick={logout}
              >
                Sign Out
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
