import { getFrameMetadata } from "@coinbase/onchainkit";
import { Metadata } from "next";
import Image from "next/image";

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
    images: [`${baseUrl}/pledge-frame.jpg`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <div className="landing">
      <Image
        src="/pledge-frame.jpg"
        alt="sonu pledge"
        width={800}
        height={450}
      />
    </div>
  );
}
