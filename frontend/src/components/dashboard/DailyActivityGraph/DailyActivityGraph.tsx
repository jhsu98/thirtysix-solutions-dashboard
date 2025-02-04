"use client";
import { Container, Group, Grid, Text, Title, Paper } from "@mantine/core";
import { BarChart, LineChart } from "@mantine/charts";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";

interface DailyActivityGraphProps {
  client_id?: string | null;
}

export function DailyActivityGraph({ client_id }: DailyActivityGraphProps) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const supabase = createClient();

    async function fetchData() {
      console.log(`Fetching data for client: ${client_id}`);
      const { data: dailyLog, error } = await supabase.rpc(
        "get_activity_log_by_day",
        {
          filter_client: client_id ? client_id : null,
        }
      );

      // if (error) {
      //   console.error('Error fetching data:', error);
      // } else {
      //   setData(data);
      // }
      console.log(JSON.stringify(dailyLog, null, 2));

      setData(dailyLog);
    }

    fetchData();
  }, [client_id]);

  return (
    <Paper p="md" shadow="xs" radius="md" withBorder>
      <BarChart
        h={300}
        data={data}
        dataKey="activity_date"
        series={[{ name: "total_rows", color: "primary" }]}
      />
    </Paper>
  );
}
