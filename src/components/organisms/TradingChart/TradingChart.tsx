import React, { useEffect, useRef, useState } from "react";
import { Typography } from "../../atoms/Typography";
import { Button } from "../../atoms/Button";
import { useCandlestickData } from "../../../hooks/useCandlestickData";
import "./TradingChart.css";
import type { CandleStickInterval } from "../../../types/trading";
import LoadingSpinner from "../../atoms/LoadingSpinner/LoadingSpinner";
import Chart from "../../molecules/Chart/Chart";

interface TradingChartProps {
  symbol: string;
}

const intervalOptions: { label: string; value: CandleStickInterval }[] = [
  { label: "1H", value: "1h" },
  { label: "2H", value: "2h" },
  { label: "4H", value: "4h" },
  { label: "1D", value: "1d" },
  { label: "1W", value: "1w" },
  { label: "1M", value: "1M" },
];

const TradingChart: React.FC<TradingChartProps> = ({ symbol }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState<number>(0);

  const [selectedInterval, setSelectedInterval] =
    useState<CandleStickInterval>("1h");
  const { data, loading, error } = useCandlestickData(symbol, selectedInterval);

  useEffect(() => {
    const handleResize = () => {
      if (chartContainerRef.current) {
        // You'll need to decide how to calculate the width based on your layout.
        // The working example uses `window.innerWidth - 560` for non-mobile.
        // Let's use `clientWidth` of the container for simplicity.
        setChartWidth(chartContainerRef.current.clientWidth);
      }
    };

    handleResize(); // Set initial width
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // if (loading)
  //   return (
  //     <div className="trading-chart__message">
  //       <LoadingSpinner />
  //     </div>
  //   );
  if (error)
    return (
      <div className="trading-chart__message trading-chart__message--error">
        Error: {error.message}
      </div>
    );

  return (
    <div className="trading-chart">
      <div className="trading-chart__controls">
        <div className="trading-chart__intervals">
          Time
          {intervalOptions.map((option) => (
            <Button
              key={option.value}
              variant={selectedInterval === option.value ? "primary" : "ghost"}
              size="small"
              onClick={() => setSelectedInterval(option.value)}
              className={`trading-chart__interval-button ${
                selectedInterval === option.value ? "is-active" : ""
              }`}
            >
              {option.label}
            </Button>
          ))}
        </div>
        <div className="trading-chart__fx-indicators">
          <Typography variant="body2" color="muted">
            Fx Indicators
          </Typography>
        </div>
      </div>

      <div
        ref={chartContainerRef}
        className="trading-chart__container"
        style={{ position: "relative" }}
      >
        <Chart data={data} width={chartWidth} />
        {loading && (
          <div className="trading-chart__chart-overlay">
            <LoadingSpinner />
          </div>
        )}
      </div>

      <div className="trading-chart__footer">
        <div className="trading-chart__price-info">
          <Typography variant="caption" color="muted">
            BTC/USD{" "}
            <span style={{ color: "var(--color-success)" }}>36,641.84</span>{" "}
            <span style={{ color: "var(--color-danger)" }}>36,641.54</span> C
            36,641.54 Change:{" "}
            <span style={{ color: "var(--color-success)" }}>0.25%</span>{" "}
            Amplitude{" "}
            <span style={{ color: "var(--color-success)" }}>0.39%</span>
          </Typography>
        </div>
        <div className="trading-chart__recent-trades-placeholder">
          <Typography variant="body2" color="muted">
            Recent trades
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default TradingChart;

