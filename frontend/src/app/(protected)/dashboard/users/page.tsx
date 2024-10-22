"use client";

import { ColorSchemeToggle } from "@/components/ui/ColorSchemeToggle/ColorSchemeToggle";
import {
  Grid,
  Title,
  Container,
  Skeleton,
  Paper,
  PasswordInput,
  Stack,
  Button,
  Group,
} from "@mantine/core";
import { UsersTable } from "@/components/tables/UsersTable/UsersTable";

export default function UsersPage() {
  return (
    <Container fluid pl="md" mb="md">
      <Title order={2} mb="lg" c="primary">
        Users
      </Title>
      <UsersTable />
    </Container>
  );
}
