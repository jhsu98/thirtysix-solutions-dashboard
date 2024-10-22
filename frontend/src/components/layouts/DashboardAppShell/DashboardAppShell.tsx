"use client";

import { AppShell, Burger, Image, Title, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { DashboardNavbar } from "@/components/layouts/DashboardNavbar/DashboardNavbar";
import Logo from "@/components/ui/Logo/Logo";
import { SITE_NAME } from "@/config/config";

interface DashboardAppShellProps {
  children: React.ReactNode;
}

export function DashboardAppShell({ children }: DashboardAppShellProps) {
  const [opened, { toggle }] = useDisclosure(false);
  const theme = useMantineTheme();

  return (
    <AppShell
      header={{ height: 80 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header
        style={{
          display: "flex",
          // flex: 1,
        }}
      >
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="md"
          my="auto"
          mx="md"
        />
        <Image src="/ecocentric01.png" alt="Ecocentric Logo" pl="md" my="sm" />
        {/* <Logo /> */}
        {/* <Title my="auto" order={2}>
          {SITE_NAME}
        </Title> */}
      </AppShell.Header>

      <AppShell.Navbar>
        <DashboardNavbar />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
      <AppShell.Footer
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: theme.fontSizes.sm,
          padding: theme.spacing.sm,
        }}
      >
        Copyright &copy; {new Date().getFullYear()} {SITE_NAME}
      </AppShell.Footer>
    </AppShell>
  );
}
