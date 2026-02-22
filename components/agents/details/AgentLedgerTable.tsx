"use client";

import SectionCard from "@/components/ui/SectionCard";

export default function AgentLedgerTable({
  rows,
  loading,
}: {
  rows: any[];
  loading: boolean;
}) {
  return (
    <SectionCard title="Recent Ledger" subtitle="Last audit records">
      {loading ? (
        <div className="text-sm text-white/50">Loading ledger...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-white/60">
              <tr>
                <th className="py-2">Type</th>
                <th className="py-2">Note</th>
                <th className="py-2">ExternalRef</th>
                <th className="py-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r: any) => (
                <tr key={r.id} className="border-t border-white/10">
                  <td className="py-2">{r.type}</td>
                  <td className="py-2">{r.note}</td>
                  <td className="py-2 text-white/60">{r.externalRef}</td>
                  <td className="py-2 text-white/60">
                    {r.createdAt ? new Date(r.createdAt).toLocaleString() : "-"}
                  </td>
                </tr>
              ))}
              {!rows.length && (
                <tr>
                  <td colSpan={4} className="py-3 text-white/50">
                    No ledger rows
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </SectionCard>
  );
}
