import React, { useState, useCallback } from "react";

const BASE_URL = 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/';

const tokenData: { [key: string]: string } = {
  BLUR: 'BLUR',
  bNEO: 'bNEO',
  BUSD: 'BUSD',
  USD: 'USD',
  ETH: 'ETH',
  GMX: 'GMX',
  LUNA: 'LUNA',
  STRD: 'STRD',
  EVMOS: 'EVMOS',
  IBCX: 'IBCX',
  IRIS: 'IRIS',
  ampLUNA: 'ampLUNA',
  KUJI: 'KUJI',
  USDC: 'USDC',
  ATOM: 'ATOM',
  ZIL: 'ZIL',
  NEO: 'NEO',
  YieldUSD: 'YieldUSD',
  wstETH: 'wstETH',
  WBTC: 'WBTC',
  USC: 'USC',
  SWTH: 'SWTH',
  OKT: 'OKT',
  OKB: 'OKB',
  LSI: 'LSI',
  OSMO: 'OSMO',
  STLUNA: 'stLUNA',
  rSWTH: 'rSWTH',
  STATOM: 'stATOM',
  axlUSDC: 'axlUSDC',
  STOSMO: 'stOSMO',
  RATOM: 'rATOM',
  STEVMOS: 'stEVMOS',
};

const tokenIcons = Object.keys(tokenData).reduce((acc, token) => {
  const tokenLink = tokenData[token];
  acc[token] = `${BASE_URL}${tokenLink}.svg`;
  return acc;
}, {} as { [key: string]: string });

interface Props {
  selectedToken: string;
  setSelectedToken: (token: string) => void;
  validTokens: string[];
}

const Tokens: React.FC<Props> = ({ selectedToken, setSelectedToken, validTokens }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = useCallback(
    (token: string) => {
      setSelectedToken(token);
      setIsOpen(false);
    },
    [setSelectedToken]
  );

  return (
    <div className="relative w-full">
      {/* Dropdown header */}
      <div
        className="flex items-center gap-2 p-4 bg-white border border-gray-300 rounded-lg cursor-pointer shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <img
          src={tokenIcons[selectedToken] || ""}
          alt={`${selectedToken} icon`}
          className="w-6 h-6"
        />
        <span className="text-black text-xl">{selectedToken}</span>
      </div>

      {/* Dropdown list */}
      <ul
        className={`absolute top-full left-0 right-0 z-10 bg-white border border-gray-300 rounded-lg shadow-lg max-h-52 overflow-y-auto mt-2 transition-all ease-in-out duration-300 ${
          isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
        } origin-top`}
      >
        {validTokens.map((token) => (
          <li
            key={token}
            className="flex items-center gap-3 p-3 cursor-pointer transition-all ease-in-out duration-300 hover:bg-gray-100"
            onClick={() => handleSelect(token)}
          >
            <img
              src={tokenIcons[token] || ""}
              alt={`${token} icon`}
              className="w-6 h-6"
            />
            <span className="text-black text-lg">{token}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tokens;
