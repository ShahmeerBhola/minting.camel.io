import * as React from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useContractRead,
} from "wagmi";
import { useDebounce } from "use-debounce";
import { ethers } from "ethers";

export function Mint() {
  const [tokenQuantity, setTokenQuantity] = React.useState("");
  const debouncedQuantity = useDebounce(tokenQuantity);

  const contractRead = useContractRead({
    address: process.env.REACT_APP_CONTRACT_ADDRESS,
    abi: [
      {
        inputs: [],
        name: "latestPrice",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "latestPrice",
  });

  console.log(
    ethers.utils
      .parseEther((100 / (parseInt(contractRead.data) / 10)).toString())
      .toString()
  );

  const { config } = usePrepareContractWrite({
    address: process.env.REACT_APP_CONTRACT_ADDRESS,
    abi: [
      {
        inputs: [
          {
            internalType: "address payable",
            name: "_referrer",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_quantity",
            type: "uint256",
          },
        ],
        name: "safeMint",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
    ],
    functionName: "safeMint",
    args: [
      "0x0000000000000000000000000000000000000000",
      parseInt(debouncedQuantity),
    ],
    value: ethers.utils
      .parseEther((100 / (parseInt(contractRead.data) / 10)).toString())
      .toString(),
    enabled: Boolean(debouncedQuantity),
  });
  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        write?.();
      }}
    >
      <label htmlFor="tokenQuantity">Quantity</label>
      <input
        id="tokenQuantity"
        onChange={(e) => setTokenQuantity(e.target.value)}
        placeholder="Enter No of Tokens"
        value={tokenQuantity}
      />
      <button disabled={!write || isLoading}>
        {isLoading ? "Minting..." : "Mint"}
      </button>
      {isSuccess && (
        <div>
          Successfully minted your NFT!
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
    </form>
  );
}
