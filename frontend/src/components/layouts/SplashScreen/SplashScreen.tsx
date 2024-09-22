"use client";

import React from "react";
import {
  Container,
  Stack,
  Title,
  Text,
  Button,
  Image,
  Box,
  Group,
} from "@mantine/core";
import Link from "next/link";
import { SITE_DESCRIPTION, SITE_NAME } from "@/config/config";

const SplashScreen = () => {
  return (
    <Container
      size="md"
      h="100vh"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack align="center" gap="xl">
        <Image src="/logo.svg" alt="Company Logo" w={300} h={200} />
        <Title order={1} ta="center">
          {SITE_NAME}
        </Title>
        <Text size="lg" ta="center">
          {SITE_DESCRIPTION}
        </Text>
        <Group gap="xl">
          <Button
            component={Link}
            href="/auth/login"
            size="lg"
            variant="filled"
          >
            Login
          </Button>
          <Button
            component={Link}
            href="/auth/register"
            size="lg"
            variant="outline"
          >
            Register
          </Button>
        </Group>
      </Stack>
    </Container>
  );
};

export default SplashScreen;
