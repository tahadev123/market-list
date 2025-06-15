import axios from "axios";
import { NextResponse } from "next/server";

type Coin = {
  id: string;
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
};

const COIN_LIMIT = 15;
const CACHE_DURATION = 3000;

const cache: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  lastFetch: number;
} = {
  data: null,
  lastFetch: 0,
};

const testSubZeroCoins: Coin[] = [
  {
    id: "subzero-1",
    name: "TestSubZero1",
    symbol: "tsz1",
    image: "https://via.placeholder.com/30",
    current_price: 0.00000312,
    price_change_percentage_24h: 9,
  },
  {
    id: "subzero-2",
    name: "TestSubZero2",
    symbol: "tsz2",
    image: "https://via.placeholder.com/30",
    current_price: 0.000000586,
    price_change_percentage_24h: 2,
  },
];

const applyFakePriceFluctuation = (price: number): number => {
  const change = (Math.random() - 0.5) * 0.3;
  return +(price + price * change).toFixed(6);
};

export async function GET() {
  const now = Date.now();

  if (cache.data && now - cache.lastFetch < CACHE_DURATION) {
    return NextResponse.json(cache.data);
  }

  try {
    const { data } = await axios.get<Coin[]>(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: COIN_LIMIT,
          page: 1,
          sparkline: false,
          price_change_percentage: "24h",
        },
      }
    );

    const coins = [
      ...data.map((coin) => ({
        ...coin,
        current_price: applyFakePriceFluctuation(coin.current_price),
      })),
      ...testSubZeroCoins,
    ];

    const HotList = coins.slice(0, 5);
    const NewCoins = coins.slice(5, 10);
    const TopGainers = [...coins]
      .sort(
        (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
      )
      .slice(0, 5);

    const result = {
      HotList,
      NewCoins,
      TopGainers,
      lastUpdated: new Date().toISOString(),
    };

    cache.data = result;
    cache.lastFetch = now;

    return NextResponse.json(result);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Error fetching coins:", err.message);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
