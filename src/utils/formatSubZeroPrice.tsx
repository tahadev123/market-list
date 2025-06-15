import { JSX } from "react";

export function formatSubZeroPrice(price: number): JSX.Element {
  if (price < 0.0001) {
    const match = price.toExponential().match(/e-(\d+)/);
    const totalZeroCount = match ? parseInt(match[1]) : 0;
    const shownZeroCount = 1;
    const subZeroCount = totalZeroCount - shownZeroCount;

    const digits = price.toFixed(subZeroCount + 2).slice(2);

    return (
      <>
        $0.0<sub>{subZeroCount}</sub>
        {digits.slice(subZeroCount)}
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
