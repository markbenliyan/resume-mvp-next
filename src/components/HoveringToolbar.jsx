import React from "react";
import { useStore } from "../store";
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import AddIcon from '@material-ui/icons/Add';

const HoveringToolbar = ({ x, y, activeIndices, scale = 1.0, debouncedSync }) => {
  const {
    deleteHandler,
    addHandler,
    moveHandler,
    resume
  } = useStore();
  const {
    sectionIndex,
    subsectionIndex,
    descriptionIndex
  } = activeIndices;

  const style = {
    position: 'fixed',
    right: typeof window !== 'undefined' ? `${window.innerWidth - x}px` : `0px`,
    top: `${y}px`,
    zIndex: 1000,
    transformOrigin: 'right top',
    transform: `scale(${scale})`,
  };

  const debouncedHandleMoveUp = () => {
    if (descriptionIndex !== undefined) {
      if (descriptionIndex > 0) {
        moveHandler(descriptionIndex, descriptionIndex - 1, sectionIndex, subsectionIndex);
      }
    } else if (subsectionIndex !== undefined) {
      if (subsectionIndex > 0) moveHandler(subsectionIndex, subsectionIndex - 1, sectionIndex);
    } else if (sectionIndex !== undefined) {
      if (sectionIndex > 0) moveHandler(sectionIndex, sectionIndex - 1);
    }

    debouncedSync();
  };

  const isHandleMoveUpDisabled = () => {
    if (descriptionIndex !== undefined) {
      return descriptionIndex === 0;
    } else if (subsectionIndex !== undefined) {
      return subsectionIndex === 0;
    } else if (sectionIndex !== undefined) {
      return sectionIndex === 0;
    }

    return true;
  };

  const debouncedHandleMoveDown = () => {
    const sections = resume.sections;

    if (descriptionIndex !== undefined && subsectionIndex !== undefined && sections[sectionIndex] && sections[sectionIndex].subSections[subsectionIndex]) {
      const descriptionsLength = sections[sectionIndex].subSections[subsectionIndex].descriptions.length;
      if (descriptionIndex < descriptionsLength - 1) moveHandler(descriptionIndex, descriptionIndex + 1, sectionIndex, subsectionIndex);
    } else if (subsectionIndex !== undefined && sections[sectionIndex]) {
      const subSectionsLength = sections[sectionIndex].subSections.length;
      if (subsectionIndex < subSectionsLength - 1) moveHandler(subsectionIndex, subsectionIndex + 1, sectionIndex);
    } else if (sectionIndex !== undefined) {
      const sectionsLength = sections.length;
      if (sectionIndex < sectionsLength - 1) moveHandler(sectionIndex, sectionIndex + 1);
    }

    debouncedSync();
  };

  const isHandleMoveDownDisabled = () => {
    const sections = resume.sections;

    if (descriptionIndex !== undefined && subsectionIndex !== undefined && sections[sectionIndex] && sections[sectionIndex].subSections[subsectionIndex]) {
      const descriptionsLength = sections[sectionIndex].subSections[subsectionIndex].descriptions.length;
      return descriptionIndex === descriptionsLength - 1;
    } else if (subsectionIndex !== undefined && sections[sectionIndex]) {
      const subSectionsLength = sections[sectionIndex].subSections.length;
      return subsectionIndex === subSectionsLength - 1;
    } else if (sectionIndex !== undefined) {
      const sectionsLength = sections.length;
      return sectionIndex === sectionsLength - 1;
    }

    return true;
  };

  const debouncedDeleteHandler = (sectionIndex, subsectionIndex, descriptionIndex) => {
    deleteHandler(sectionIndex, subsectionIndex, descriptionIndex);
    debouncedSync();
  };

  const debouncedAddHandler = (sectionIndex, subsectionIndex, descriptionIndex) => {
    addHandler(sectionIndex, subsectionIndex, descriptionIndex);
    debouncedSync();
  };

  const debouncedMoveHandler = (fromIndex, toIndex, sectionIndex, subsectionIndex) => {
    moveHandler(fromIndex, toIndex, sectionIndex, subsectionIndex);
    debouncedSync();
  };

  const toolbarButtons = [
    {
      handler: () => debouncedDeleteHandler(sectionIndex, subsectionIndex, descriptionIndex),
      text: 'Delete',
      icon: <DeleteIcon className="h-4 w-4" aria-hidden="true" />,
    },
    {
      handler: () => debouncedAddHandler(sectionIndex, subsectionIndex, descriptionIndex),
      text: 'Add',
      icon: <AddIcon className="h-4 w-4" aria-hidden="true" />,
    },
    {
      handler: debouncedHandleMoveUp,
      text: 'Move Up',
      icon: <ArrowUpwardIcon className="h-4 w-4" aria-hidden="true" />,
    },
    {
      handler: debouncedHandleMoveDown,
      text: 'Move Down',
      icon: <ArrowDownwardIcon className="h-4 w-4" aria-hidden="true" />,
    },
  ];

  const isButtonDisabled = (text) => {
    switch (text) {
      case 'Move Up':
        return isHandleMoveUpDisabled();
      case 'Move Down':
        return isHandleMoveDownDisabled();
      default:
        return false;
    }
  };

  return (
    <div style={style}>
      <span className="isolate inline-flex rounded-md shadow-sm bg-white resume-toolbar">
        {toolbarButtons.map((button, index) => (
          <button
            key={button.text}
            type="button"
            className={`relative inline-flex items-center px-1 py-1 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 
            ${index === 0 ? 'rounded-l-md' : ''} 
            ${index === toolbarButtons.length - 1 ? 'rounded-r-md' : ''}
            ${isButtonDisabled(button.text) ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={button.handler}
            disabled={isButtonDisabled(button.text)}
          >
            <span className="sr-only">{button.text}</span>
            {button.icon}
          </button>
        ))}
      </span>
    </div>
  );
};

export default HoveringToolbar;