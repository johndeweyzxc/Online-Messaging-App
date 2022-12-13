import React from "react";
import Tooltip from "@mui/material/Tooltip";

export default function Donation({ SelectedNav }) {
  return (
    <div className={`${SelectedNav === "Donate" ? "block" : "hidden"} font-Nacelle tracking-wide`}>
      <h1 className="text-4xl font-bold mb-4 phone:text-3xl sphone:text-2xl">Donation</h1>
      <div className="text-xl sphone:text-lg mb-4">
        Any ammount will be very much appreciated, for now I only accept payment in cryptocurrencies.
      </div>
      <div className="text-lg sphone:text-base mb-4 flex">
        <b className="mr-4">XMR Wallet Address</b>
        <Tooltip title="Copy Address" placement="top">
          <button
            className="text-CoolBlue underline cursor-pointer tracking-wide"
            onClick={() =>
              navigator.clipboard.writeText(
                "48nYVo8c7Pgc9Top4NEMM89YXq4oiDpJaeVxSytM8FqvKXn6aXBqoSQJQfMbfpXZWbaN4cFQh1wTYbcr34eGBNtCChpYSdw"
              )
            }
          >
            48nYVo...hpYSdw
          </button>
        </Tooltip>
      </div>
      <div className="text-lg sphone:text-base mb-4 flex">
        <b className="mr-4">Metamask Ethereum</b>
        <Tooltip title="Copy Address" placement="top">
          <button
            className="text-CoolBlue underline cursor-pointer tracking-wide"
            onClick={() => navigator.clipboard.writeText("0x01f91f6759A251B5E814F23785068720D89F9Bc5")}
          >
            0x01f91f...9F9Bc5
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
