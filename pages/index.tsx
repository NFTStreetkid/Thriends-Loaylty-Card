import {
  Web3Button,
  useAddress,
  useContract,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import { NextPage } from "next";
import { Header } from "../components/Header";
import { NFTCard } from "../components/NFT";
import { CONTRACT_ADDRESS } from "../consts";
import styles from "../styles/Home.module.css";
import { useState } from "react";

const Home: NextPage = () => {
  const address = useAddress();
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data: nfts, isLoading, isError } = useOwnedNFTs(contract, address);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    try {
      setLoading(true);
      // Call the generate-sig API endpoint to get a signed payload
      const res = await fetch("/api/generate-sig", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
        }),
      });

      const data = await res.json();

      // Use the signed payload to call the erc721.signature.mint function
      await contract?.erc721.signature.mint(data.signedPayload);
      alert("NFT minted!");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <Header />
      <Web3Button
        action={() => generate()}
        contractAddress={CONTRACT_ADDRESS}
        isDisabled={loading}
      >
        {loading ? "Generating..." : "Generate NFT"}
      </Web3Button>
      `&quot;`Welcome to the Thriends Loyalty Dashboard! I am thrilled to have you onboard. If you are reading this, it means you have successfully joined my project. If you don't have Thriends NFT yet, don't worry, you can still explore the dashboard by clicking on the "Thriends Loyalty Dashboard" text above. However, if you are already a holder of Thriends NFT, kindly connect your wallet and generate your Thriends NFT to receive your loyalty Thriends Street Card.`&quot;`
      {nfts && (
        <div className={styles.nfts}>
          {nfts.map((nft) => (
            <NFTCard nft={nft} key={nft.metadata.id} />
          ))}
        </div>
      )}

      {address && isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}
    </main>
  );
};

export default Home;
