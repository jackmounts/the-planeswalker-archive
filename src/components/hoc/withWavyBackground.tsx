import React from "react";

const withWavyBackground = <P extends object>(
  Component: React.ComponentType<P>
) => {
  /**
   * DEEP: #8761eb
   * LIGHT: #b19ec5
   */
  return function WavyBackgroundComponent(props: any) {
    const getWavyBackground = () => {
      return `
        background: linear-gradient(135deg, #8761eb, #b19ec5);
        background-size: 400% 400%;
        animation: gradientAnimation 15s ease infinite;

        @keyframes gradientAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `;
    };

    const wavyBackgroundStyle = getWavyBackground();
    return (
      <div style={getWavyBackground()}>
        <Component {...props} />
      </div>
    );
  };
};

export default withWavyBackground;
