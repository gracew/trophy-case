import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { GiFactory, GiPartyPopper } from "react-icons/gi";
import Web3Modal from "web3modal";
import NFT from "../../artifacts/contracts/NFT.sol/NFT.json";
import CenteredSpinner from "../../components/centeredSpinner";
import { duolingoNftAddress, appleNftAddress } from "../../config";
import styles from "../../styles/Badge.module.css";
import { images as appleImages } from "../apple/index";
import { images as duolingoImages } from "../duolingo/index";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export default function Badge() {
  const router = useRouter();
  const { id } = router.query;
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [address, setAddress] = useState();
  const [txPending, setTxPending] = useState(false);
  const [mintingCompleted, setMintingCompleted] = useState(false);
  const [openSeaUrl, setOpenSeaUrl] = useState();
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
  web3Modal.on("connect", (info) => {
    console.log(info.selectedAddress);
    setAddress(info.selectedAddress);
  });
  const imageList = [...duolingoImages, ...appleImages];
  const image = imageList.find(({ text }) => text === id);
  async function createNFT() {
    // first, upload image and metadata to IPFS
    const blob = await fetch(`/images/${image.file}`).then((r) => r.blob());
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
    // when minting begins, show spinner
    setTxPending(true);

    console.log("contract address: ", duolingoNftAddress);
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    // Step 1: Load the NFT contract
    const contract = new ethers.Contract(duolingoNftAddress, NFT.abi, signer);

    // Step 2: give it the URI
    let transaction = await contract.mintNFT(url);
    let tx = await transaction.wait();
    let event = tx.events[0];
    console.log("transaction event: ", event);
    let value = event.args[2];
    let tokenId = value.toNumber();
    console.log("token id: ", tokenId);
    await transaction.wait();
    setTxPending(false);
    setOpenSeaUrl(
      "https://testnets.opensea.io/assets/mumbai/" +
        duolingoNftAddress +
        "/" +
        tokenId
    );
    setMintingCompleted(true);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Trophy Case</title>
        <link rel="icon" href="/trophy.png" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <GiPartyPopper /> Congratulations!
        </h1>
        <h3 className={styles.title}>You have earned a badge.</h3>

        <div className={styles.badgeContainer}>
          <Image
            src={`/images/${image.file}`}
            layout="fill"
            objectFit="contain"
          />
        </div>
        {/* <h3 className={styles.title}>{id}</h3> */}
        <p className={styles.title}>{image.description}</p>
        <Button variant="dark" size="lg" onClick={() => setShowOffcanvas(true)}>
          Claim as NFT
        </Button>
        <Offcanvas
          show={showOffcanvas}
          onHide={() => setShowOffcanvas(false)}
          placement="bottom"
          className={styles.offcanvas}
        >
          <Offcanvas.Header>
            <Offcanvas.Title>Claim your badge as an NFT?</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {txPending ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CenteredSpinner></CenteredSpinner>
                <p>Minting...</p>
              </div>
            ) : (
              ""
            )}

            <Button size="lg" variant="outline-success" onClick={createNFT}>
              <GiFactory /> Mint NFT
            </Button>
            {mintingCompleted ? (
              <p style={{ marginTop: "10%" }}>
                Your badge has been minted as an NFT!{" "}
                <a href={openSeaUrl} target="_blank" rel="noreferrer">
                  <GiSailboat /> View on OpenSea
                </a>
              </p>
            ) : (
              ""
            )}
          </Offcanvas.Body>
        </Offcanvas>
      </main>
    </div>
  );
}
