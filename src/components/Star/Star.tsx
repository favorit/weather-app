import React from "react";
import styles from "./Star.module.css";
import classnames from "classnames";

interface Props {
  isFilled?: boolean;
  onClick: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  className?: string;
}

const Star = ({ isFilled = false, onClick, className }: Props) => {
  return (
    <div className={classnames(styles.star, className)} onClick={onClick}>
      {isFilled ? "★" : "☆"}
    </div>
  );
};

export default Star;
