import { FrameRequest, getFrameMessage } from "@coinbase/onchainkit/frame";
import { Abi } from "abitype";
import { NextRequest, NextResponse } from "next/server";
import { encodeFunctionData, parseEther } from "viem";
import { base } from "viem/chains";
import type { FrameTransactionResponse } from "@coinbase/onchainkit/frame";
import abi from "@utils/contractABI";

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
  const contractAddr = process.env.NEXT_PUBLIC_CONTRACT_ADDR;
  const body: FrameRequest = await req.json();

  const { isValid } = await getFrameMessage(body, {
    neynarApiKey: "NEYNAR_ONCHAIN_KIT",
  });

  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  // get the pledge amount, default to 0.00025
  const inputText = body.untrustedData.inputText;
  const pledgeAmount =
    !inputText || isNaN(Number(inputText)) || Number(inputText) < 0.00025
      ? "0.00025"
      : inputText;

  // get the wallet address of the user (and do it in a hacky way since address isn't yet defined on FrameData)
  const wallet = (body.untrustedData as any).address;

  const data = encodeFunctionData({
    abi,
    functionName: "mint",
    args: [wallet, 1],
  });

  const txData: FrameTransactionResponse = {
    chainId: `eip155:${base.id}`,
    method: "eth_sendTransaction",
    params: {
      abi: abi as Abi,
      data,
      to: contractAddr as `0x${string}`,
      value: parseEther(pledgeAmount).toString(),
    },
  };

  return NextResponse.json(txData, { status: 200 });
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
