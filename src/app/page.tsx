import { getFrameMetadata } from "@coinbase/onchainkit";
import { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      action: "tx",
      label: "Make the Pledge",
      target: `${baseUrl}/api/pledge`,
    },
    {
      action: "link",
      label: "Pledge with Crossmint",
      target: "https://pledge.sonu.stream/",
    },
  ],
  image: {
    src: `${baseUrl}/pledge-frame.jpg`,
    aspectRatio: "1.91:1",
  },
  input: {
    text: "pledge amount 0.00025 ETH",
  },
  postUrl: `${baseUrl}/api/aftertx`,
});

export const metadata: Metadata = {
  title: "Make the Pledge",
  description: "Sonu Stream Artist Fund",
  openGraph: {
    title: "Make the Pledge",
    description: "Sonu Stream Artist Fund",
    images: [`${baseUrl}/button.webp`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>Leaderboard</h1>
      <p>TODO</p>
    </>
  );
}
