import { FixedSizeGrid as Grid } from "react-window";
import React, { useEffect, useState } from "react";
import { Image, Spin } from "antd";
import { Posts } from "../../Pages/HomePage";
import { LoadingOutlined } from "@ant-design/icons";

// import AutoSizer from "react-virtualized-auto-sizer";

interface CellProps {
  columnIndex: number;
  rowIndex: number;
  style: any;
}

const GridContainer = ({ images }: { images: Posts[] }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [columnCount, setColumnCount] = useState(2);

  useEffect(() => {
    const resizeEvent = () => {
      const w = window.innerWidth;
      setWidth(w);

      if (w >= 900) {
        setColumnCount(4);
      } else if (w < 900 && w >= 700) {
        setColumnCount(3);
      } else if (w < 700 && w > 400) {
        setColumnCount(2);
      } else {
        setColumnCount(1);
      }
    };
    resizeEvent();
    window.addEventListener("resize", resizeEvent);

    return () => {
      window.removeEventListener("resize", resizeEvent);
    };
  }, []);
  const Cell = ({ columnIndex, rowIndex, style }: CellProps) => {
    return (
      <div style={style}>
        <Image
          width="100%"
          src={images[rowIndex * columnCount + columnIndex].image}
          placeholder={
            <Image
              preview={false}
              src={images[rowIndex * columnCount + columnIndex].imageThumb}
              width="100%"
            />
          }
        />
      </div>
    );
  };
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 96, color: "#021529" }} spin />
  );

  if (images.length === 0) {
    return (
      <div className="login-form-container">
        <div className="login-form-container">
          <Spin indicator={antIcon} />
        </div>
      </div>
    );
  }
  return (
    <Grid
      columnCount={columnCount}
      columnWidth={width / columnCount}
      style={{ overflow: "hidden" }}
      height={(images.length / columnCount) * 300}
      rowCount={images.length / columnCount}
      rowHeight={300}
      width={width}
    >
      {Cell}
    </Grid>
  );
};

export default GridContainer;
