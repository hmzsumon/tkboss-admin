"use client";

export default function AgentHeaderCards({
  agent,
  statusDoc,
  walletDoc,
}: {
  agent: any;
  statusDoc: any;
  walletDoc: any;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="text-xs text-white/50">Agent</div>
        <div className="mt-1 text-sm font-semibold">
          {agent?.name} • {agent?.customerId}
        </div>
        <div className="mt-1 text-xs text-white/60">
          {agent?.email} • {agent?.phone}
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="text-xs text-white/50">Today</div>
        <div className="mt-1 text-xs">
          Deposit: <b>{statusDoc?.toDayDeposits ?? 0}</b>
        </div>
        <div className="mt-1 text-xs">
          Withdraw: <b>{statusDoc?.toDayWithdrawals ?? 0}</b>
        </div>
        <div className="mt-1 text-xs">
          Commission: <b>{statusDoc?.toDayCommissions ?? 0}</b>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="text-xs text-white/50">Wallet</div>
        <div className="mt-1 text-xs">
          Available: <b>{walletDoc?.available ?? 0}</b>
        </div>
        <div className="mt-1 text-xs">
          Total Earned: <b>{walletDoc?.totalEarned ?? 0}</b>
        </div>
        <div className="mt-1 text-xs">
          Total Paid: <b>{walletDoc?.totalPaid ?? 0}</b>
        </div>
      </div>
    </div>
  );
}
