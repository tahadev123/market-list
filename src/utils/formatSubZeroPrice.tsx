import { JSX } from "react";

export function formatSubZeroPrice(price: number): JSX.Element {
  if (price < 0.0001) {
    const match = price.toExponential().match(/e-(\d+)/);
    const zeroCount = match ? parseInt(match[1]) - 1 : 0;
    const digits = price.toFixed(zeroCount + 2).slice(2);
    return (
      <>
        $0.0<sub>{zeroCount - 1}</sub>
        {digits.slice(zeroCount)}
      </>
    );
  }

  if (price < 1) {
    const decimals = price.toString().split(".")[1] || "";
    const i = decimals.search(/[^0]/);
    return <>$0.{decimals.slice(0, i + 3)}</>;
  }

  return <>${price.toFixed(2)}</>;
}
