import * as React from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { ethers } from "ethers";
import { useDebounce } from "use-debounce";

export function Mint() {
  const [tokenQuantity, setTokenQuantity] = React.useState("");
  const debouncedQuantity = useDebounce(tokenQuantity);

  const { config } = usePrepareContractWrite({
    address: "0xd89524902023B38265A3738a0400bb550d528Da4",
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
    value: ethers.utils.parseEther("1.15"),
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
