import { useEffect, useRef } from "react";
import {
  CandlestickSeries,
  HistogramSeries,
  ColorType,
  createChart,
  type IChartApi,
  type ISeriesApi,
} from "lightweight-charts";
import type { ProcessedCandleStickData } from "../../../types/trading"; // Adjust path as needed

type Props = {
  data: ProcessedCandleStickData[];
  width: number;
};

const Chart = ({ data, width }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Dispose of previous chart if it exists
    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
    }

    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "#262932" },
        textColor: "#A7B1BC",
      },
      grid: {
        vertLines: {
          color: "rgba(255, 255, 255, 0.1)",
          visible: true,
        },
        horzLines: {
          color: "rgba(255, 255, 255, 0.1)",
          visible: true,
        },
      },
      width: width,
      height: 500,
      rightPriceScale: {
        borderColor: "#A7B1BC",
        borderVisible: true,
        scaleMargins: {
          top: 0.1,
          bottom: 0.3,
        },
        textColor: "#A7B1BC",
      },
      timeScale: {
        borderColor: "#A7B1BC",
        timeVisible: true,
        secondsVisible: true,
      },
    });

    chartRef.current = chart;

    // Use the correct API pattern: chart.addSeries(SeriesType, options)
    const candleChart = chart.addSeries(CandlestickSeries, {
      upColor: "#00c076",
      downColor: "#ff6838",
      borderVisible: false,
      wickUpColor: "#00c076",
      wickDownColor: "#ff6838",
    });
    candlestickSeriesRef.current = candleChart;

    candleChart.priceScale().applyOptions({
      scaleMargins: {
        top: 0.1,
        bottom: 0.3,
      },
    });

    // Add volume series using the correct API
    const volumeSeries = chart.addSeries(HistogramSeries, {
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "", // bind to a separate price scale
    });
    volumeSeriesRef.current = volumeSeries;

    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.85, // Adjust to place volume at the bottom
        bottom: 0,
      },
    });

    // Set initial data if available
    if (data && data.length > 0) {
      candleChart.setData(data);

      const volumeData = data.map((candle) => ({
        time: candle.time,
        value: candle.volume || 0, // Ensure volume is present
        color: candle.close > candle.open ? "#31413C" : "#4A2C25",
      }));
      volumeSeries.setData(volumeData);

      // Set visible range to show last 200 candles or all if less than 200
      chart.timeScale().setVisibleLogicalRange({
        from: Math.max(0, data.length - 200),
        to: data.length - 1,
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [width]); // Re-create chart only when width changes

  // Effect to update data when `data` prop changes
  useEffect(() => {
    if (
      candlestickSeriesRef.current &&
      volumeSeriesRef.current &&
      data &&
      data.length > 0
    ) {
      candlestickSeriesRef.current.setData(data);

      const volumeData = data.map((candle) => ({
        time: candle.time,
        value: candle.volume || 0,
        color: candle.close > candle.open ? "#31413C" : "#4A2C25",
      }));
      volumeSeriesRef.current.setData(volumeData);

      // Adjust visible range to show last 200 candles
      if (chartRef.current) {
        chartRef.current.timeScale().setVisibleLogicalRange({
          from: Math.max(0, data.length - 200),
          to: data.length - 1,
        });
      }
    } else if (data && data.length === 0) {
      // Clear data if empty
      candlestickSeriesRef.current?.setData([]);
      volumeSeriesRef.current?.setData([]);
    }
  }, [data]); // Depend on data

  // This effect handles chart resizing when the width prop changes
  useEffect(() => {
    if (chartRef.current && width > 100) {
      chartRef.current.resize(width, 500);
    }
  }, [width]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    />
  );
};

export default Chart;
