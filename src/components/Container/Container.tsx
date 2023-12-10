import { useMemo, useState } from "react";
import useElementSize from "../../hooks/useElementSize";
import React from "react";
import _ from 'lodash'

export interface ContainerProps {
    rowHeight?: number;
    children: Array<JSX.Element>;
    gap?: number;
    isVirtualizationEnabled?: boolean;
  }
  const bufferedItems = 2;
const Container = ({children, rowHeight = 0, gap = 10}: ContainerProps) => {
    const [containerRef, { height: containerHeight }] = useElementSize<
    HTMLUListElement
  >();
  const [scrollPosition, setScrollPosition] = useState(0);
    console.log("in container")
  // get the children to be renderd
  const visibleChildren = useMemo(() => {
    // if (!isVirtualizationEnabled)
    //   return children.map((child, index) =>
    //     React.cloneElement(child, {
    //       style: {
    //         position: "absolute",
    //         top: index * rowHeight + index * gap,
    //         height: rowHeight,
    //         left: 0,
    //         right: 0,
    //         lineHeight: `${rowHeight}px`
    //       }
    //     })
    //   );
    const startIndex = Math.max(
      Math.floor(scrollPosition / rowHeight) - bufferedItems,
      0
    );
    const endIndex = Math.min(
      Math.ceil((scrollPosition + containerHeight) / rowHeight - 1) +
        bufferedItems,
      children.length - 1
    );

    return children.slice(startIndex, endIndex + 1).map((child, index) =>
      React.cloneElement(child, {
        style: {
          position: "absolute",
          top: (startIndex + index) * rowHeight + index * gap,
          height: rowHeight,
          left: 0,
          right: 0,
          lineHeight: `${rowHeight}px`
        }
      })
    );
  }, [
    children,
    containerHeight,
    rowHeight,
    scrollPosition,
    gap,
  ]);

  const onScroll = React.useMemo(
    () =>
      _.throttle(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function (e: any) {
          setScrollPosition(e.target.scrollTop);
        },
        50,
        { leading: false }
      ),
    []
  );

  return (
    <ul
      onScroll={onScroll}
      style={{
        overflowY: "scroll",
        position: "relative"
      }}
      ref={containerRef}
      className="container w-full items-center justify-center h-full overflow-y-scroll list-none bg-green-300 flex flex-col"
    >
      {visibleChildren}
    </ul>
  );
}

export default Container