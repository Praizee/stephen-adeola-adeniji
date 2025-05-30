import "./Header.css";
import Separator from "../../atoms/Separator/Separator";
import coinPair from "/coin-pair.svg";
import down from "/caret-down.svg";
import React from "react";

import clock from "/clock.svg";
import arrowUp from "/arrow-up.svg";
import arrowDown from "/arrow-down.svg";
import chart from "/chart.svg";

const data = [
  {
    imgUrl: clock,
    label: "24h change",
    value: "520.80 +1.25%",
  },
  {
    imgUrl: arrowUp,
    label: "24h high",
    value: "520.80 +1.25%",
  },
  {
    imgUrl: arrowDown,
    label: "24h low",
    value: "520.80 +1.25%",
  },
  {
    imgUrl: chart,
    label: "24h volume",
    value: "75,655.26",
  },
];

const Header = () => {
  // const isPricePositive = priceChange24h >= 0;

  return (
    <header className="header">
      <div className="header__market-overview">
        <div className="header__current-pair">
          <img className="coin_image" src={coinPair} alt="BTC/USDT" />

          <p className="coin_label">BTC/USDT</p>

          <img className="coin_caret" src={down} alt="caret down" />

          <p className="coin_volume">$20,600</p>
        </div>

        <Separator className="market-overview_separator" />

        <CoinInfo />
      </div>
    </header>
  );
};

export default Header;

const CoinInfo = () => {
  return (
    <div className="info hide-scrollbar">
      {data.map(({ imgUrl, label, value }, index) => (
        <React.Fragment key={index}>
          <div className="info_group">
            <div className="info_sub">
              <img src={imgUrl} alt={label} />
              <p className="info_label">{label}</p>
            </div>

            <p
              className={`info_value ${
                index === 0 ? "info_value--green" : ""
              } `}
            >
              {value}
            </p>
          </div>
          {index !== data.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </div>
  );
};

