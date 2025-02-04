"use client";

import { Autocomplete, Select } from "@mantine/core";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

interface Clients {
  value: string;
  label: string;
}

export function ClientDropdown({
  setClient,
}: {
  setClient: (client: string) => void;
}) {
  const supabase = createClient();
  const [clients, setClients] = useState<Clients[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      const { data, error } = await supabase
        .from("clients")
        .select("id,company_name")
        .order("company_name");

      if (error) {
        console.error("Error fetching clients:", error);
        return;
      }
      // console.log(JSON.stringify(data));
      setClients(
        data.map((client) => {
          return { value: client.id, label: client.company_name };
        })
      );
    };

    fetchClients();
  }, []);
  return (
    <Select
      data={clients}
      label="Select Client"
      placeholder="Select client"
      clearable
      allowDeselect
      onChange={(_value, option) => {
        console.log(`Selected client: ${option?.label} ${option?.value}`);
        setClient(option?.value ?? "");
      }}
    />
  );
}
