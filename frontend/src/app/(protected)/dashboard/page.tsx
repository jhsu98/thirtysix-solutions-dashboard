"use client";

import { Container, Group, Grid, Text, Title } from "@mantine/core";
import { StatsGrid } from "@/components/dashboard/StatsGrid/StatsGrid";
import { ClientDropdown } from "@/components/dashboard/ClientDropdown/ClientDropdown";

import { useState } from "react";
import { DailyActivityGraph } from "@/components/dashboard/DailyActivityGraph/DailyActivityGraph";

export default function DashboardPage() {
  const [client, setClient] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <Container fluid pl="md" mb="md">
      <Title order={2} mb="lg" c="primary">
        Home Page
      </Title>
      <ClientDropdown setClient={setClient} />
      <StatsGrid client_id={client} />
      <DailyActivityGraph client_id={client} />
    </Container>
  );
}
