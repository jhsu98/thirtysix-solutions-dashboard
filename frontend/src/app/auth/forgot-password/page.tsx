import { FullScreenFormWithImage } from "@/components/layouts/FullScreenFormWithImage/FullScreenFormWithImage";
import { ForgotPassword } from "@/components/forms/ForgotPassword/ForgotPassword";
import Logo from "@/components/ui/Logo/Logo";

export default function ForgotPasswordPage() {
  return (
    <FullScreenFormWithImage>
      <Logo />
      <ForgotPassword />
    </FullScreenFormWithImage>
  );
}
