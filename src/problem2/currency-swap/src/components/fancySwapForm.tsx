import React, { useState, useEffect } from "react";
import TokenDropdown from "./tokens";
import { fetchPrices } from "../utils/fetchPrices";
import { calculateAmountToReceive } from "../utils/calculateAmount";

const fancySwapForm: React.FC = () => {
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [amountSend, setAmountSend] = useState("");
  const [sendCurrency, setSendCurrency] = useState("BLUR");
  const [receiveCurrency, setReceiveCurrency] = useState("ETH");
  const [amountReceive, setAmountReceive] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [hideButton, setHideButton] = useState(false);
  const [resultLoading, setResultLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadPrices = async () => {
      setLoading(true);
      try {
        const pricesData = await fetchPrices();
        setPrices(pricesData);
      } catch {
        setError("Failed to load prices. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadPrices();
  }, []);

  useEffect(() => {
    if (!amountSend || parseFloat(amountSend) <= 0) {
      setAmountReceive("");
      return;
    }

    setResultLoading(true);
    const timeout = setTimeout(() => {
      const calculatedAmount = calculateAmountToReceive(
        amountSend,
        sendCurrency,
        receiveCurrency,
        prices
      );
      setAmountReceive(calculatedAmount);
      setResultLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [amountSend, sendCurrency, receiveCurrency, prices]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    if (value === "" || parseFloat(value) <= 0) {
      setError("Number must be greater than 0");
      setAmountSend("");
      setAmountReceive("");
    } else {
      setError("");
      setAmountSend(value);
    }
  };

  const handleAmountBlur = () => {
    if (amountSend && !amountSend.includes(".")) {
      const formattedAmount = parseFloat(amountSend).toFixed(2);
      setAmountSend(formattedAmount);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amountSend || parseFloat(amountSend) <= 0) {
      setError("Number must be greater than 0");
      return;
    }

    setIsSubmitting(true);
    setHideButton(true);

    setTimeout(() => {
      setShowResult(true);
      setIsSubmitting(false);
    }, 500);
  };

  const validTokens = Object.keys(prices);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 via-blue-300 to-blue-500 p-12 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-xl p-12 max-w-5xl w-full">
        {loading ? (
          <p className="text-center text-2xl font-semibold text-gray-600">Loading...</p>
        ) : (
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="space-y-3">
                <label className="block text-lg font-medium text-black">Amount</label>
                <input
                  type="number"
                  value={amountSend}
                  onChange={handleAmountChange}
                  onBlur={handleAmountBlur}
                  placeholder="Enter amount"
                  className="w-full p-5 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </div>

              <div className="space-y-3">
                <label className="block text-lg font-medium text-black">From</label>
                <TokenDropdown
                  selectedToken={sendCurrency}
                  setSelectedToken={setSendCurrency}
                  validTokens={validTokens}
                />
              </div>

              <div className="space-y-3">
                <label className="block text-lg font-medium text-black">To</label>
                <TokenDropdown
                  selectedToken={receiveCurrency}
                  setSelectedToken={setReceiveCurrency}
                  validTokens={validTokens}
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-start mt-8 gap-6">
              {showResult && (
                <div className="bg-gray-50 bg-opacity-70 p-6 rounded-xl shadow-lg w-full lg:w-2/3 transition-all duration-500 opacity-100 transform translate-y-0">
                  {resultLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <>
                      <div className="text-gray-600 text-sm">
                        <span>
                          {amountSend} {sendCurrency} =
                        </span>
                      </div>
                      <p className="text-2xl font-extrabold text-black-600">
                        {amountReceive} {receiveCurrency}
                      </p>
                      <div className="mt-4 border-t pt-4 text-sm text-gray-700">
                        <p>
                          1 {sendCurrency} ={" "}
                          {prices[receiveCurrency] && prices[sendCurrency]
                            ? (prices[receiveCurrency] / prices[sendCurrency]).toFixed(6)
                            : "N/A"}{" "}
                          {receiveCurrency}
                        </p>
                        <p>
                          1 {receiveCurrency} ={" "}
                          {prices[sendCurrency] && prices[receiveCurrency]
                            ? (prices[sendCurrency] / prices[receiveCurrency]).toFixed(6)
                            : "N/A"}{" "}
                          {sendCurrency}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              )}

              {!hideButton && (
                <div className="flex justify-end w-full lg:w-auto">
                  <button
                    type="submit"
                    className="py-4 px-10 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition-all"
                    disabled={isSubmitting || error !== ""}
                  >
                    {isSubmitting ? "Processing..." : "Convert"}
                  </button>
                </div>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default fancySwapForm;
