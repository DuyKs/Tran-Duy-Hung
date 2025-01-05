export const calculateAmountToReceive = (
  amountSend: string,
  sendCurrency: string,
  receiveCurrency: string,
  prices: Record<string, number>
): string => {
  const sendPrice = prices[sendCurrency];
  const receivePrice = prices[receiveCurrency];
  const sendAmount = parseFloat(amountSend);

  if (!sendPrice || !receivePrice || isNaN(sendAmount) || sendAmount <= 0) {
    return "";
  }

  const rate = receivePrice / sendPrice;
  return (sendAmount * rate).toFixed(2);
};
