import React from 'react';
import useStore from "../store";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import DownloadButton from './DownloadButton';


function SliderSizes({ itemName }) {
  const setCustomFormatField = useStore((state) => state.setCustomFormatField);
  const currentValue = parseInt(useStore((state) => state.customFormat[itemName].split("px")[0]));

  return (
    <Box className="w-[100%] pr-5">
      <Slider
        min={itemName.startsWith("resumeMargin") ? 0 : -20}
        max={80}
        value={currentValue}
        aria-label="Default"
        valueLabelDisplay="off"
        onChange={(e, newValue) => setCustomFormatField(itemName, newValue)}
      />
    </Box>
  );
}


function UpDown({ itemName }) {
  const incrementCustomFormatField = useStore((state) => state.incrementCustomFormatField);
  const decrementCustomFormatField = useStore((state) => state.decrementCustomFormatField);


  const increment = () => {
    incrementCustomFormatField(itemName);
  };
  const decrement = () => {
    decrementCustomFormatField(itemName);
  };

  return (
    <span className="isolate inline-flex rounded-md shadow-sm">
      <button
        type="button"
        className="relative inline-flex items-center rounded-l-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
      >
        <span className="sr-only">Previous</span>
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" onClick={increment} />
      </button>
      <button
        type="button"
        className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
      >
        <span className="sr-only">Next</span>
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" onClick={decrement} />
      </button>
    </span>
  )
}


export default function FormatSidebar() {

  const { customFormat, setCustomFormatField, undo, redo } = useStore();

  const formatItemNames = ["resumeMarginLeftRight", "headerSectionMarginTop", "sectionMarginTop", "subsectionMarginTop", "subsectionBodyBulletMarginTop"]
  const formatItemDisplayNames = ["Document Left/Right", "Document Top", "Section Spacing", "Subsection Spacing", "Bullet Spacing"];

  return (
    <div className="formatSidebar flex flex-col items-center justify-center bg-white shadow-lg p-6 rounded-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Format</h2>
      <div className="formatSidebarContainer w-full">
        {formatItemNames.map((itemName, i) => (
          <div className="formatSidebarContainerItem items-center border-b border-gray-200 p-2" key={itemName}>
            <label htmlFor="format" className="text-md font-medium">{formatItemDisplayNames[i]}</label>
            <div className="flex items-center justify-between">
              <SliderSizes itemName={itemName} />
              <input
                type="text"
                value={parseInt(customFormat[itemName].split("px")[0])}
                onChange={(e) => setCustomFormatField(itemName, e.target.value)}
                className="border border-gray-300 rounded w-1/4 h-1/2"
              />
              {/* <UpDown itemName={itemName} /> */}
            </div>
          </div>
        ))}
      </div>
      <div className='mt-5'>
        <DownloadButton />
      </div>
      <div className='mt-5 flex gap-5'>
        <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l" onClick={undo}>Undo</button>
        <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r" onClick={redo}>Redo</button>
      </div>
    </div>

  );
};