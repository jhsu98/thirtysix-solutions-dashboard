"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Grid,
  Stack,
  Title,
  Paper,
  PasswordInput,
  Button,
} from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { createClient } from "@/utils/supabase/client";

interface FormValues {
  newPassword: string;
  confirmNewPassword: string;
}

export default function ChangePasswordForm() {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  const form: UseFormReturnType<FormValues> = useForm<FormValues>({
    mode: "uncontrolled",
    initialValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    validate: {
      newPassword: (value) =>
        value.length > 6 ? null : "Password must be at least 6 characters",
      confirmNewPassword: (value, values) =>
        value === values.newPassword ? null : "Passwords do not match",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    setIsUpdating(true);
    const supabase = createClient();
    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: values.newPassword,
      });

      if (updateError) {
        throw updateError;
      }

      notifications.show({
        title: "Success",
        message: "Your password has been updated successfully",
        color: "success",
      });

      form.reset();
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message:
          error?.message || "An error occurred while updating your password",
        color: "failure",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Paper radius="md" p="md" shadow="md" withBorder>
        <Title order={4} c="primary">
          Change Password
        </Title>
        <Stack px="md" pt="md" pb="sm">
          <PasswordInput
            withAsterisk
            size="md"
            label="New Password"
            placeholder="New password"
            key={form.key("newPassword")}
            {...form.getInputProps("newPassword")}
          />
          <PasswordInput
            withAsterisk
            size="md"
            label="Confirm New Password"
            placeholder="Confirm new password"
            key={form.key("confirmNewPassword")}
            {...form.getInputProps("confirmNewPassword")}
          />
          <Button
            type="submit"
            fullWidth
            mt="md"
            size="md"
            disabled={isUpdating}
            loading={isUpdating}
          >
            Change Password
          </Button>
        </Stack>
      </Paper>
    </form>
  );
}
