"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm, UseFormReturnType } from "@mantine/form";
import { createClient } from "@/utils/supabase/client";
import classes from "./Register.module.css";
import { SITE_NAME } from "@/config/config";

// Define the prop types for the form values
interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

function Register() {
  const router = useRouter();
  const [isRegistering, setIsRegistering] = useState(false);

  const form: UseFormReturnType<FormValues> = useForm<FormValues>({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      email: (value) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
          ? null
          : "Please enter a valid email address",
      password: (value) =>
        value.length > 6 ? null : "Password must be at least 6 characters",
      confirmPassword: (value) => {
        const { password } = form.getValues();
        if (value !== password) {
          return "Passwords do not match";
        } else {
          return null;
        }
      },
    },
  });

  // Define the function to handle form submission
  const handleSubmit = async (values: FormValues) => {
    setIsRegistering(true);
    try {
      const supabase = createClient();

      const data = {
        email: values.email,
        password: values.password,
      };

      const { error } = await supabase.auth.signUp(data);

      if (error) {
        notifications.show({
          title: "Error",
          message: error.message,
          color: "failure",
        });
      } else {
        notifications.show({
          title: "Success",
          message: "You have successfully registered",
          color: "success",
        });

        router.push("/dashboard");
      }
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message: error?.message || "An error occurred while registering",
        color: "failure",
      });
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
        Sign up for {SITE_NAME}!
      </Title>

      <TextInput
        withAsterisk
        size="md"
        label="Email address"
        placeholder="hello@gmail.com"
        key={form.key("email")}
        {...form.getInputProps("email")}
      />
      <PasswordInput
        withAsterisk
        mt="md"
        size="md"
        label="Password"
        placeholder="Your password"
        key={form.key("password")}
        {...form.getInputProps("password")}
      />
      <PasswordInput
        withAsterisk
        mt="md"
        size="md"
        label="Confirm Password"
        placeholder="Confirm your password"
        key={form.key("confirmPassword")}
        {...form.getInputProps("confirmPassword")}
      />
      <Button
        type="submit"
        fullWidth
        mt="xl"
        size="md"
        disabled={isRegistering}
        loading={isRegistering}
      >
        Register
      </Button>
      <Text ta="center" mt="md">
        Already have an account?{" "}
        <Anchor<"a"> href="/auth/login" fw={700}>
          Login
        </Anchor>
      </Text>
    </form>
  );
}

export { Register };
