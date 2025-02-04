"use client";

import {
  IconArrowDownRight,
  IconArrowUpRight,
  IconCoin,
  IconDatabase,
  IconBug,
  IconActivity,
  IconFunction,
  IconDiscount2,
  IconReceipt2,
  IconUserPlus,
} from "@tabler/icons-react";
import { Group, NumberFormatter, Paper, SimpleGrid, Text } from "@mantine/core";
import classes from "./StatsGrid.module.css";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface GetActivityLogStats {
  total_rows: number;
  total_errors: number;
  count_supabase_strapi: number;
  count_edge_digital: number;
}

const icons = {
  activity: IconActivity,
  bug: IconBug,
  database: IconDatabase,
  function: IconFunction,
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
};

interface StatsGridProps {
  client_id?: string | null;
}

export function StatsGrid({ client_id }: StatsGridProps) {
  const supabase = createClient();
  const [data, setData] = useState([
    { title: "Total Activity", icon: "activity", value: 0, diff: 34 },
    { title: "Errors", icon: "bug", value: 0, diff: -13 },
    { title: "Database", icon: "database", value: 0, diff: 18 },
    { title: "Functions", icon: "function", value: 0, diff: -30 },
  ]);

  useEffect(() => {
    console.log("Fetching data...");
    const fetchData = async () => {
      const { data, error } = await supabase
        .rpc("get_activity_log_stats", {
          filter_client: client_id ? client_id : null,
        })
        .single();

      if (error) {
        console.error("Error fetching stats:", error);
        return;
      }

      if (data) {
        const {
          total_rows,
          total_errors,
          count_supabase_strapi,
          count_edge_digital,
        } = data as GetActivityLogStats;

        setData([
          {
            title: "Total Activity",
            icon: "activity",
            value: total_rows,
            diff: 34,
          },
          { title: "Errors", icon: "bug", value: total_errors, diff: -13 },
          {
            title: "Database",
            icon: "database",
            value: count_supabase_strapi,
            diff: 18,
          },
          {
            title: "Functions",
            icon: "function",
            value: count_edge_digital,
            diff: -30,
          },
        ]);
      }
    };

    fetchData();
  }, [client_id]);

  const stats = data.map((stat) => {
    const Icon = icons[stat.icon as keyof typeof icons];
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group justify="space-between">
          <Text size="xs" c="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          <Icon className={classes.icon} size={22} stroke={1.5} />
        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          <Text className={classes.value}>
            <NumberFormatter value={stat.value} thousandSeparator />
          </Text>
        </Group>
      </Paper>
    );
  });

  return (
    <div className={classes.root}>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{stats}</SimpleGrid>
    </div>
  );
}
