"use client";

import { SignupForm } from "@/app/signup/signup-form";
import Image from "next/image";

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <Image
                src="/logo-unienf-vf.png"
                alt="Logo"
                width={120}
                height={120}
              />
            </div>
            UNIENF
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="bg-muted hidden h-full w-full items-center justify-center lg:flex">
        <Image
          src="/logo-unienf-vf.png"
          alt="Logo"
          width={120}
          height={120}
          className="max-h-[40vh] max-w-[40vw] object-contain"
          priority
        />
      </div>
    </div>
  );
}
