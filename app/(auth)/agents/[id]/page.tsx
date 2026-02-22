"use client";

import { useParams } from "next/navigation";

import {
  useGetAgentByIdQuery,
  useGetAgentLedgerQuery,
} from "@/redux/features/agent/agentApi";

import AgentAccountEdit from "@/components/agents/details/AgentAccountEdit";
import AgentConfigCard from "@/components/agents/details/AgentConfigCard";
import AgentCredentialsCard from "@/components/agents/details/AgentCredentialsCard";
import AgentHeaderCards from "@/components/agents/details/AgentHeaderCards";
import AgentLedgerTable from "@/components/agents/details/AgentLedgerTable";
import AgentMonitoringTabs from "@/components/agents/details/AgentMonitoringTabs";

export default function AgentDetailsPage() {
  const params = useParams();
  const id = String((params as any)?.id || "");

  const { data, isLoading, isFetching, refetch } = useGetAgentByIdQuery(id, {
    skip: !id,
  });

  const { data: ledgerData, isLoading: ledgerLoading } = useGetAgentLedgerQuery(
    { id, limit: 50 },
    { skip: !id },
  );

  const agent = data?.data?.agent;
  const statusDoc = data?.data?.statusDoc;
  const walletDoc = data?.data?.walletDoc;
  const commissionConfigReadOnly = data?.data?.commissionConfig;

  const ledgerRows = (ledgerData?.data ?? []).map((x: any) => ({
    id: x?._id,
    type: x?.type,
    note: x?.note,
    externalRef: x?.externalRef,
    createdAt: x?.createdAt,
  }));

  return (
    <main className="min-h-screen bg-[#0B0D12] text-[#E6E6E6]">
      <div className="mx-auto max-w-6xl p-6">
        <div className="mb-4">
          <h1 className="text-xl font-semibold">Agent Details</h1>
          <p className="text-xs text-white/50">Monitoring • config • limits</p>
        </div>

        {isLoading || isFetching ? (
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            Loading...
          </div>
        ) : (
          <>
            <AgentHeaderCards
              agent={agent}
              statusDoc={statusDoc}
              walletDoc={walletDoc}
            />
            <AgentCredentialsCard agent={agent} />
            <AgentAccountEdit agent={agent} onSaved={() => refetch()} />

            <AgentConfigCard
              agent={agent}
              statusDoc={statusDoc}
              commissionConfigReadOnly={commissionConfigReadOnly}
              agentId={id}
              onRefetch={() => refetch()}
            />

            <AgentMonitoringTabs
              agentId={id}
              onRefreshAgent={() => refetch()}
            />
            <AgentLedgerTable rows={ledgerRows} loading={ledgerLoading} />
          </>
        )}
      </div>
    </main>
  );
}
