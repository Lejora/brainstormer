"use client";

import Link from "next/link";
import { NoTeam } from "./_components/dashboard/no-team";
import { useOrganization } from "@clerk/clerk-react";
import { CanvasList } from "./_components/dashboard/canvas-list";

export default function DashboardPage() {
  const { organization } = useOrganization();

  return (
    <div className="flex-1 h-[calc(100%-100px)] p-6">
      {!organization ? <NoTeam /> : <CanvasList teamId={organization.id} />}
      {/* <Link href="/canvas">キャンバス テストリンク</Link> */}
    </div>
  );
}
