import { PayloadToSign721withQuantity, ThirdwebSDK } from "@thirdweb-dev/sdk";
import type { NextApiRequest, NextApiResponse } from "next";
import { CONTRACT_ADDRESS } from "../../consts";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Initialize the SDK
    const sdk = ThirdwebSDK.fromPrivateKey(
      process.env.WALLET_PRIVATE_KEY!,
      "ethereum",
      {
        secretKey: process.env.TW_SECRET_KEY!,
      }
    );

    const contract = await sdk.getContract(CONTRACT_ADDRESS);

    const address = req.body.address;

    // Create the metadata for the NFT
    const payload: PayloadToSign721withQuantity = {
      to: address,
      metadata: {
        name: "My Thriends loyalty card",
        description: "My loyalty card description.",
        image:
          "ipfs://QmWXZYFQn8a3HQTPDgEE7KkZkamHXnnjA1XRbpq77hMy81",
        attributes: [
          {
            trait_type: "Thriends Loyalty",
            value: "Loyalty Card",
          },
          {
            trait_type: "points",
            value: 100,
          },
        ],
      },
    };

    // Generate the signature with the metadata
    const signedPayload = await contract.erc721.signature.generate(payload);

    return res.status(200).json({ signedPayload });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default handler;
