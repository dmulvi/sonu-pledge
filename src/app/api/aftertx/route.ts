import {
  FrameRequest,
  getFrameMessage,
  getFrameHtmlResponse,
} from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: "NEYNAR_ONCHAIN_KIT",
  });

  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  console.log("afterTx post data: ", message);

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          action: "link",
          label: "NFT Minted! Learn More",
          target: "https://sonu.stream/",
        },
      ],
      image: {
        src: `${baseUrl}/sonu-penny.jpg`,
        aspectRatio: "1:1",
      },
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
