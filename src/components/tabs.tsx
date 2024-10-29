import { useState } from "react";
import clsx from "clsx";
import { tabsList } from "../constants";
import TabBody from "./tab-body";
const Tabs = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const changeActiveIndex = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="max-w-2xl bg-white min-w-96">
      <div
        className="grid grid-cols-4 w-full
      "
      >
        {tabsList.map((tab, index) => (
          <div
            data-testid={`Tab ${tab.index}`}
            onClick={() => changeActiveIndex(tab.index)}
            key={index}
            className={clsx(
              activeIndex == tab.index ? "bg-blue-950" : "bg-gray-900",
              " text-white text-center py-4 px-8 cursor-pointer "
            )}
          >
            {tab.name}
          </div>
        ))}
      </div>
      <TabBody activeIndex={activeIndex} />
    </div>
  );
};

export default Tabs;
