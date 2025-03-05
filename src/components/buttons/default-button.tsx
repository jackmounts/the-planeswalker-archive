import React from "react";

interface ButtonProps {
  onClick: () => void;
  label: string;
  color?: string;
  size?: string;
  classes?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  color,
  size,
  classes,
  disabled,
}) => {
  const propsClasses = `${classes || ""} ${size || ""} ${color || ""}`.trim();
  return (
    <button onClick={onClick} className={propsClasses} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
