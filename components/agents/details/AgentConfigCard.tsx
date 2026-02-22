"use client";

import SectionCard from "@/components/ui/SectionCard";
import {
  useDeleteAgentMutation,
  useSetAgentCreditLimitMutation,
  useUpdateAgentMutation,
} from "@/redux/features/agent/agentApi";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

export default function AgentConfigCard({
  agent,
  statusDoc,
  commissionConfigReadOnly,
  agentId,
  onRefetch,
}: {
  agent: any;
  statusDoc: any;
  commissionConfigReadOnly: any;
  agentId: string;
  onRefetch: () => void;
}) {
  const [updateAgent, { isLoading: updating }] = useUpdateAgentMutation();
  const [setLimit, { isLoading: limitUpdating }] =
    useSetAgentCreditLimitMutation();
  const [deleteAgent, { isLoading: deleting }] = useDeleteAgentMutation();

  const [status, setStatus] = useState<"active" | "inactive" | "blocked">(
    "active",
  );
  const [creditLimit, setCreditLimit] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(true);

  useMemo(() => {
    if (statusDoc?.status) setStatus(statusDoc.status);
    if (typeof statusDoc?.creditLimit === "number")
      setCreditLimit(statusDoc.creditLimit);
    if (typeof agent?.is_active === "boolean") setIsActive(agent.is_active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agent?._id]);

  const onSave = async () => {
    try {
      await updateAgent({
        agentId: agentId,
        status,
        creditLimit,
        is_active: isActive,
      } as any).unwrap();
      toast.success("Saved ✅");
      onRefetch();
    } catch (err: any) {
      toast.error(err?.data?.message || err?.error || "Save failed");
    }
  };

  const onLimitOnly = async () => {
    try {
      await setLimit({ id: agentId, creditLimit }).unwrap();
      toast.success("Limit updated ✅");
      onRefetch();
    } catch (err: any) {
      toast.error(err?.data?.message || err?.error || "Limit update failed");
    }
  };

  const onDisable = async () => {
    try {
      await deleteAgent(agentId).unwrap();
      toast.success("Agent disabled ✅");
      onRefetch();
    } catch (err: any) {
      toast.error(err?.data?.message || err?.error || "Disable failed");
    }
  };

  return (
    <SectionCard title="Config" subtitle="Status • creditLimit • is_active">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-4">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
          className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm"
        >
          <option value="active">active</option>
          <option value="inactive">inactive</option>
          <option value="blocked">blocked</option>
        </select>

        <input
          type="number"
          value={creditLimit}
          onChange={(e) => setCreditLimit(Number(e.target.value || 0))}
          placeholder="Credit Limit"
          className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm"
        />

        <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          is_active
        </label>

        <div className="flex gap-2">
          <button
            onClick={onSave}
            disabled={updating}
            className="w-full rounded-lg bg-teal-600/80 px-3 py-2 text-sm font-semibold hover:bg-teal-600 disabled:opacity-50"
          >
            {updating ? "Saving..." : "Save"}
          </button>
          <button
            onClick={onLimitOnly}
            disabled={limitUpdating}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10 disabled:opacity-50"
          >
            {limitUpdating ? "Updating..." : "Limit Only"}
          </button>
        </div>
      </div>

      <div className="mt-3 text-xs text-white/60">
        Commission Override (read-only):{" "}
        <b>
          {commissionConfigReadOnly?.depositPercent ?? "-"}% deposit /{" "}
          {commissionConfigReadOnly?.withdrawPercent ?? "-"}% withdraw
        </b>{" "}
        • Active: <b>{commissionConfigReadOnly?.isActive ? "yes" : "no"}</b>
      </div>

      <div className="mt-3">
        <button
          onClick={onDisable}
          disabled={deleting}
          className="rounded-lg border border-rose-400/30 bg-rose-400/10 px-3 py-2 text-sm text-rose-300 hover:bg-rose-400/15 disabled:opacity-50"
        >
          {deleting ? "Disabling..." : "Disable Agent"}
        </button>
      </div>
    </SectionCard>
  );
}
