// fetchPrices.ts
export interface PriceItem {
  currency: string;
  date: string;
  price: number;
}

export const fetchPrices = async (): Promise<Record<string, number>> => {
  try {
    // Check localStorage for cached prices
    const cachedPrices = localStorage.getItem("prices");
    if (cachedPrices) {
      return JSON.parse(cachedPrices) as Record<string, number>;
    }

    // Fetch data from the API
    const response = await fetch("https://interview.switcheo.com/prices.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: PriceItem[] = await response.json();

    // Extract the latest prices
    const latestPrices = data.reduce<Record<string, number>>((acc, { currency, price }) => {
      acc[currency] = price; // Overwrite to ensure the latest entry is stored
      return acc;
    }, {});

    // Cache the latest prices in localStorage
    localStorage.setItem("prices", JSON.stringify(latestPrices));
    return latestPrices;
  } catch (error) {
    console.error("Error fetching prices:", error);
    throw new Error("Failed to load prices. Please try again later.");
  }
};
