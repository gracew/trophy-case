/* pages/index.js */
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";

import CreateItem from "./create-item";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";

export default function Home() {
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {}, []);
  return (
    <div className="flex justify-center">
      <h1>Redeem as NFT</h1>
      <CreateItem />
      <div className="px-4" style={{ maxWidth: "1600px" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4"></div>
      </div>
    </div>
  );
}
