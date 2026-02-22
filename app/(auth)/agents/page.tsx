"use client";

import AgentCreateModal from "@/components/agents/AgentCreateModal";
import {
  useAgentRegisterMutation,
  useGetAgentsQuery,
} from "@/redux/features/agent/agentApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { useMemo, useState } from "react";

/* ──────────────────────────────────────────────────────────────────────────
 * Agents Page
 * - list agents
 * - create agent (simple form)
 * ────────────────────────────────────────────────────────────────────────── */

export default function AgentsPage() {
  const [search, setSearch] = useState("");
  const { data, isLoading, isFetching, refetch } = useGetAgentsQuery();

  const [agentRegister, { isLoading: creating }] = useAgentRegisterMutation();
  const [openCreate, setOpenCreate] = useState(false);

  const rows = useMemo(() => {
    const arr = data?.data ?? [];
    const filtered = search
      ? arr.filter((x: any) =>
          `${x?.name} ${x?.email} ${x?.phone} ${x?.customerId}`
            .toLowerCase()
            .includes(search.toLowerCase()),
        )
      : arr;

    return filtered.map((a: any) => ({
      id: a?._id,
      ...a,
      status: a?.statusDoc?.status ?? "-",
      creditLimit: a?.statusDoc?.creditLimit ?? 0,
      toDayDeposits: a?.statusDoc?.toDayDeposits ?? 0,
      toDayWithdrawals: a?.statusDoc?.toDayWithdrawals ?? 0,
      toDayCommissions: a?.statusDoc?.toDayCommissions ?? 0,
      walletAvailable: a?.walletDoc?.available ?? 0,
    }));
  }, [data, search]);

  const columns: GridColDef[] = [
    { field: "customerId", headerName: "Customer ID", width: 140 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 230 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "status", headerName: "Status", width: 110 },
    { field: "creditLimit", headerName: "Limit", width: 110 },
    { field: "walletAvailable", headerName: "Wallet", width: 110 },
    { field: "toDayDeposits", headerName: "Today Dep", width: 120 },
    { field: "toDayWithdrawals", headerName: "Today Wd", width: 120 },
    { field: "toDayCommissions", headerName: "Today Com", width: 120 },
    {
      field: "view",
      headerName: "",
      width: 80,
      sortable: false,
      renderCell: (p: any) =>
        p?.row?.id ? (
          <Link
            href={`/agents/${p.row.id}`}
            className="text-teal-300 hover:underline"
          >
            View
          </Link>
        ) : (
          <span className="text-white/30">—</span>
        ),
    },
  ];

  /* ────────── quick create (minimal) ────────── */
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    creditLimit: 0,
    status: "active",
    depositPercent: 10,
    withdrawPercent: 5,
  });

  const onCreate = async () => {
    if (!form.name || !form.email || !form.phone || !form.password) return;
    await agentRegister(form as any).unwrap();
    setForm({
      name: "",
      email: "",
      phone: "",
      password: "",
      creditLimit: 0,
      status: "active",
      depositPercent: 10,
      withdrawPercent: 5,
    });
  };

  return (
    <main className="min-h-screen bg-[#0B0D12] text-[#E6E6E6]">
      <div className="mx-auto max-w-7xl p-6">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold">Agents</h1>
            <p className="text-xs text-white/50">
              Admin dashboard • manage agents
            </p>
          </div>
        </div>

        {/* ────────── toolbar ────────── */}
        <div className="mb-4 flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search agents..."
              className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none"
            />
          </div>

          {/* ────────── create form ────────── */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-6">
            <input
              className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
            />
            <input
              className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm((s) => ({ ...s, email: e.target.value }))
              }
            />
            <input
              className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) =>
                setForm((s) => ({ ...s, phone: e.target.value }))
              }
            />
            <input
              className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm((s) => ({ ...s, password: e.target.value }))
              }
            />
            <input
              className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm"
              placeholder="Limit"
              type="number"
              value={form.creditLimit}
              onChange={(e) =>
                setForm((s) => ({
                  ...s,
                  creditLimit: Number(e.target.value || 0),
                }))
              }
            />
            <button
              onClick={() => setOpenCreate(true)}
              disabled={creating}
              className="rounded-lg bg-teal-600/80 px-3 py-2 text-sm font-semibold hover:bg-teal-600 disabled:opacity-50"
            >
              {creating ? "Creating..." : "Create Agent"}
            </button>
          </div>
        </div>

        {/* ────────── grid ────────── */}
        <div className="h-[calc(100vh-300px)]">
          <DataGrid
            rows={rows}
            columns={columns}
            loading={isLoading || isFetching}
            disableRowSelectionOnClick
            pageSizeOptions={[20, 50, 100]}
            initialState={{
              pagination: { paginationModel: { page: 0, pageSize: 20 } },
            }}
            sx={{
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(230,230,230,0.95)",
              background: "rgba(255,255,255,0.03)",
            }}
          />
        </div>
      </div>
      <AgentCreateModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreated={() => refetch()} // আপনার useGetAgentsQuery থেকে refetch নিয়ে আসবেন
      />
    </main>
  );
}
