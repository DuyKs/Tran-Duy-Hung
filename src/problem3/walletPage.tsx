const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case 'Osmosis': return 100;
      case 'Ethereum': return 50;
      case 'Arbitrum': return 30;
      case 'Zilliqa': return 20;
      case 'Neo': return 20;
      default: return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance) => getPriority(balance.blockchain) > -99 && balance.amount > 0)
      .sort((lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain));
  }, [balances]);

  const formattedBalances = sortedBalances.map((balance) => ({
    ...balance,
    formatted: balance.amount.toFixed(2),
  }));

  const rows = formattedBalances.map((balance, index) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};
