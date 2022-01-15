import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import Web3Modal from "web3modal";
import NFT from "../../artifacts/contracts/NFT.sol/NFT.json";
import CenteredSpinner from "../../components/centeredSpinner";
import { nftaddress } from "../../config";
import styles from "../../styles/Badge.module.css";
import { images } from "../duolingo/index";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export default function Badge() {
  const router = useRouter();
  const { id } = router.query;
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [address, setAddress] = useState();

  useEffect(() => {
    const { ethereum } = window;
    if (ethereum && ethereum.selectedAddress) {
      setAddress(ethereum.selectedAddress);
    }
  });

  if (!id) {
    return (
      <div className={styles.container}>
        <CenteredSpinner />
      </div>
    );
  }

  const web3Modal = new Web3Modal({ providerOptions: {} });
  web3Modal.on('connect', info => {
    console.log(info.selectedAddress);
    setAddress(info.selectedAddress);
  });
  const image = images.find(({ text }) => text === id);

  async function createNFT() {
    // first, upload image and metadata to IPFS
    const blob = await fetch(`/images/${image.file}`).then(r => r.blob());
    const imageResult = await client.add(blob);

    const data = {
      name: image.text,
      description: image.description,
      image: `https://ipfs.infura.io/ipfs/${imageResult.path}`,
    };
    try {
      const metadataResult = await client.add(JSON.stringify(data));
      const url = `https://ipfs.infura.io/ipfs/${metadataResult.path}`;
      console.log("info has been uploaded: ", url);
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      mintNFT(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function mintNFT(url) {
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    // Step 1: Load the NFT contract
    const contract = new ethers.Contract(nftaddress, NFT.abi, signer);

    // Step 2: give it the URI
    let transaction = await contract.mintNFT(url);
    let tx = await transaction.wait();
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();
    console.log("token id: ", tokenId);
    await transaction.wait();
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          {id} Achievement
        </h1>

        <div className={styles.badgeContainer}>
          <Image src={`/images/${image.file}`} layout="fill" objectFit="contain" />
        </div>

        <Button size="lg" onClick={() => setShowOffcanvas(true)}>Claim as NFT</Button>
        <Offcanvas show={showOffcanvas} onHide={() => setShowOffcanvas(false)} placement="bottom" className={styles.offcanvas}>
          <Offcanvas.Header>
            <Offcanvas.Title>Claim as NFT</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Button size="lg" onClick={createNFT}>Claim</Button>
          </Offcanvas.Body>
        </Offcanvas>
      </main>
    </div>
  )
}
