import { getServerSession } from "next-auth";
import { SendCard } from "../../../components/SendCard";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { OnRampTransactions } from "../../../components/OnRampTransactions";

async function getP2PTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.p2pTransfer.findMany({
    where: {
      fromUserId: Number(session?.user?.id),
    },
  });
  return txns.map((t) => ({
    time: t.timeStamp,
    amount: t.amount,
    status: "",
    provider: "",
  }));
}
export default async function () {
  const transactions = await getP2PTransactions();
  return (
    <div>
      <div className="text-4xl text-[#6a51a6] pt-8  font-bold">P2PTransfer</div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4 w-screen">
        <SendCard />

        <div className="flex items-center">
          <OnRampTransactions transactions={transactions} heading="Send INR" />
        </div>
      </div>
    </div>
  );
}
