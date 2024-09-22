"use client";

import React, { useState } from "react";
import { FullScreenFormWithImage } from "@/components/layouts/FullScreenFormWithImage/FullScreenFormWithImage";
import { Login } from "@/components/forms/Login/Login";
import Logo from "@/components/ui/Logo/Logo";

export default function LoginPage() {
  return (
    <FullScreenFormWithImage>
      <Logo />
      <Login />
    </FullScreenFormWithImage>
  );
}
