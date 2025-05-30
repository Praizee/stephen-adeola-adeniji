import React from "react";
import { Typography } from "../../atoms/Typography";
import { Icon } from "../../atoms/Icon";
import "./PriceDisplay.css";

interface PriceDisplayProps {
  label: string;
  value: string | number;
  change?: string | number;
  isPositive?: boolean;
  unit?: string;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({
  label,
  value,
  change,
  isPositive,
  unit,
}) => {
  const valueColor =
    isPositive === true
      ? "success"
      : isPositive === false
      ? "danger"
      : "default";

  return (
    <div className="price-display">
      <Typography
        variant="caption"
        color="muted"
        className="price-display__label"
      >
        {label}
      </Typography>
      <div className="price-display__value-wrapper">
        <Typography
          variant="h5"
          component="span"
          color={valueColor}
          className="price-display__value"
        >
          {value} {unit && <span className="price-display__unit">{unit}</span>}
        </Typography>
        {typeof change !== "undefined" && (
          <Typography
            variant="body2"
            component="span"
            color={valueColor}
            className="price-display__change"
          >
            {isPositive && <Icon name="arrow-up" size="small" />}
            {!isPositive && <Icon name="arrow-down" size="small" />}
            {change}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default PriceDisplay;

