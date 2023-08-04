import React, { useState, useEffect } from "react";
import useStore from "../store";
import HoveringToolbar from "./HoveringToolbar";
import * as DOMPurify from 'dompurify';

const Resume = ({ editable = false, resumeOnly = false, scale = 1.0 }) => {
  const { resume, customFormat, updateText, undo, redo } = useStore();
  const TOOLBAR_OFFSET = 15 * scale;
  const style = {
    canvas: {
      width: '816px', // 8.5 inches at 96 DPI
      height: '1056px', // 11 inches at 96 DPI
      transformOrigin: '50% 0',
      transform: `scale(${scale})`,
    },
    resume: {
      margin: `${customFormat.resumeMarginTopBottom} ${customFormat.resumeMarginLeftRight}`
    },
    headerSection: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: customFormat.headerSectionMarginTop,
      marginBottom: 0,
    },
    headerName: {
      fontSize: '48px',
      textAlign: 'center',
      margin: '0px',
      padding: '0px',
    },
    headerFirstName: {
      fontWeight: '800',
      marginRight: '10px',
    },
    headerLastName: {
      fontWeight: '500',
    },
    headerContacts: {
      fontSize: '11px',
      fontWeight: '600',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'row',
      //gap: '20px',
      justifyContent: 'center',
      alignItems: 'center',
      //position: 'relative',
      //top: '-7px',
    },
    headerContactsText: {
      padding: '0px 10px',
    },
    headerContactsDivider: {
      display: 'block',
      height: '10px',
      borderRight: '2px solid black',
      marginLeft: '10px',
      marginRight: '10px',
      width: '2px',
    },
    section: {
      marginTop: customFormat.sectionMarginTop,
    },
    sectionTitle: {
      fontSize: '22px',
      fontWeight: '800',
      marginBottom: '5px',
      borderBottom: 'solid black'
    },
    subsection: {
      marginTop: customFormat.subsectionMarginTop,
    },
    subsectionTitle: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    subsectionTitleText1: {
      fontSize: '16px',
      fontWeight: '800',
    },
    subsectionTitleText2: {
      fontSize: '12px',
      fontWeight: '600',
    },
    subsectionSubtitle: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '5px',
    },
    subsectionSubtitleText1: {
      fontSize: '12px',
      fontWeight: '500',
      fontStyle: 'italic',
    },
    subsectionSubtitleText2: {
      fontSize: '12px',
      fontWeight: '400',
      fontStyle: 'italic',
    },
    subsectionBody: {
      marginBottom: '5px',
    },
    subsectionBodySplit: {
      display: 'grid',
      gridTemplateColumns: '1fr 5fr',
      gap: '0px',
      marginBottom: '0px',
    },
    subsectionBodySplitText1: {
      fontSize: '15px',
      fontWeight: '800',
      alignSelf: 'center',
      justifySelf: 'left',
      paddingLeft: '15px',
    },
    subsectionBodySplitText2: {
      fontSize: '14px',
      fontWeight: '400',
      alignSelf: 'center',
      paddingLeft: '10px',
      lineHeight: '1.3',
    },
    subsectionBodyBullet: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      listStyleType: 'disc',
      listStylePosition: 'outside',
      marginLeft: '25px',
    },
    subsectionTextArea: {
      fontSize: '14px',
      fontWeight: '400',
      alignSelf: 'center',
      lineHeight: '1.3',
      marginLeft: '1em',
    },
  };

  useEffect(() => {
    let initialHTML = null;

    const focusHandler = (event) => {
      if (event.target instanceof HTMLElement && event.target.getAttribute('contenteditable')) {
        initialHTML = event.target.innerHTML;
      }
    };

    const keydownHandler = (event) => {
      // If the user is currently editing text inside a text box, we undo all of those changes first
      // before we undo the last change to the resume state.

      const targetIsEditable = event.target.getAttribute('contenteditable') === 'true';
      const currentHTML = event.target.innerHTML;

      if (
        (event.ctrlKey || event.metaKey) &&
        !event.shiftKey &&
        event.key === 'z' &&
        (!targetIsEditable || (targetIsEditable && currentHTML === initialHTML))
      ) {
        event.preventDefault();
        undo();
      } else if (
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey &&
        event.key === 'z' &&
        (!targetIsEditable || (targetIsEditable && currentHTML === initialHTML))
      ) {
        event.preventDefault();
        redo();
      }
    };

    window.addEventListener('focus', focusHandler, true); // Use capture to catch the event early
    window.addEventListener('keydown', keydownHandler);

    return () => {
      window.removeEventListener('focus', focusHandler, true);
      window.removeEventListener('keydown', keydownHandler);
    };
  }, [undo, redo]);

  const [toolbarPos, setToolbarPos] = useState({ x: 0, y: 0 });
  const [prevHoveredElem, setPrevHoveredElem] = useState(null);

  const hasTitleText = (subsection) => {
    return (Boolean(subsection.titleTextLeft) || Boolean(subsection.titleTextRight));
  }

  const hasSubtitleText = (subsection) => {
    return (Boolean(subsection.subtitleTextLeft) || Boolean(subsection.subtitleTextRight));
  }

  const [activeItemIndices, setActiveItemIndices] = useState({ sectionIndex: null, subsectionIndex: null, descriptionIndex: null });

  function handleBlur(e, operation, sectionIndex = undefined, subsectionIndex = undefined, descriptionIndex = undefined) {
    const cleanHTML = DOMPurify.sanitize(e.target.innerHTML, { USE_PROFILES: { html: true } });
    console.log(cleanHTML)

    updateText(operation, cleanHTML, sectionIndex, subsectionIndex, descriptionIndex);
  }

  const handleMouseMove = (sectionIndex, subsectionIndex, descriptionIndex) => (e) => {
    e.stopPropagation();

    if (prevHoveredElem && prevHoveredElem === e.currentTarget) { return; }

    const currentRect = e.currentTarget.getBoundingClientRect();

    setToolbarPos({
      x: currentRect.left - TOOLBAR_OFFSET,
      y: currentRect.top,
    });

    setActiveItemIndices({ sectionIndex, subsectionIndex, descriptionIndex });


    // If there was a previously hovered element, remove the class from it
    if (prevHoveredElem) {
      prevHoveredElem.classList.remove('bg-gray-100');
    }

    // Add the class to the currently hovered element
    e.currentTarget.classList.add('bg-gray-100');

    console.log('adding class to ', e.currentTarget, ' and removing from ', prevHoveredElem)
    // Update the reference to the currently hovered element
    setPrevHoveredElem(e.currentTarget);

  };

  const handleMouseLeave = () => (e) => {
    // Remove the hover element
    if (prevHoveredElem) {
      prevHoveredElem.classList.remove('bg-gray-100')
    }
  };

  return (
    <>
      {!resumeOnly && editable && <HoveringToolbar scale={scale} {...toolbarPos} activeIndices={activeItemIndices} />}
      <div id="canvas" style={style.canvas} className="bg-white shadow-2xl">
        <div id="resume" style={style.resume}>
          <div id="headerSection" style={style.headerSection}>
            <h1 id="headerName" style={style.headerName}>
              <span
                contentEditable={editable}
                dangerouslySetInnerHTML={{ __html: resume.firstName }}
                id="firstName"
                onBlur={(e) => handleBlur(e, 'firstName')}
                style={style.headerFirstName}
                suppressContentEditableWarning
              />
              <span
                contentEditable={editable}
                dangerouslySetInnerHTML={{ __html: resume.lastName }}
                id="lastName"
                onBlur={(e) => handleBlur(e, 'lastName')}
                style={style.headerLastName}
                suppressContentEditableWarning
              />
            </h1>
            {resume.contactInfo.length > 0 &&
              <div
                id="headerContacts"
                style={style.headerContacts}
                onMouseMove={handleMouseMove()}
                onMouseLeave={handleMouseLeave()}
              >
                {resume.contactInfo.map((info, index) => (
                  <div className="contactContainer" style={{ display: 'flex', alignItems: 'center' }} key={index}>
                    <p
                      className="headerContactsText"
                      contentEditable={editable}
                      dangerouslySetInnerHTML={{ __html: info }}
                      onBlur={(e) => handleBlur(e, 'contactInfo', index)}
                      style={style.headerContactsText}
                      suppressContentEditableWarning
                    />
                    {index < resume.contactInfo.length - 1 &&
                      <div style={style.headerContactsDivider} />
                    }
                  </div>
                ))}
              </div>
            }
          </div>
          {resume.sections.map((section, sectionIndex) =>
            section.hidden ? null : (
              <div
                className="section"
                id={`${section.type.toLowerCase()}Section`}
                key={sectionIndex}
                style={style.section}
                onMouseMove={handleMouseMove(sectionIndex)}
                onMouseLeave={handleMouseLeave()}
              >
                <h2
                  className="sectionTitle"
                  contentEditable={editable}
                  dangerouslySetInnerHTML={{ __html: section.name }}
                  onBlur={(e) => handleBlur(e, 'name', sectionIndex)}
                  style={style.sectionTitle}
                  suppressContentEditableWarning
                />
                {section.subSections.map((subSection, subSectionIndex) =>
                  subSection.hidden ? null : (
                    <div
                      className="subsection"
                      style={style.subsection}
                      key={subSectionIndex}
                      onMouseMove={handleMouseMove(sectionIndex, subSectionIndex)}
                      onMouseLeave={handleMouseLeave()}
                    >
                      {section.type !== 'SKILLS' &&
                        (hasTitleText(subSection) || hasSubtitleText(subSection)) &&
                        <div>
                          {hasTitleText(subSection) &&
                            <div className="subsectionTitle" style={style.subsectionTitle}>
                              <p
                                className="subsectionTitleText1"
                                contentEditable={editable}
                                suppressContentEditableWarning
                                onBlur={(e) => handleBlur(e, 'titleTextLeft', sectionIndex, subSectionIndex)}
                                style={style.subsectionTitleText1}
                                dangerouslySetInnerHTML={{ __html: subSection.titleTextLeft }}
                              />
                              <p
                                className="subsectionTitleText2"
                                contentEditable={editable}
                                suppressContentEditableWarning
                                onBlur={(e) => handleBlur(e, 'titleTextRight', sectionIndex, subSectionIndex)}
                                style={style.subsectionTitleText2}
                                dangerouslySetInnerHTML={{ __html: subSection.titleTextRight }}
                              />
                            </div>
                          }
                          {hasSubtitleText(subSection) &&
                            <div className="subsectionSubtitle" style={style.subsectionSubtitle}>
                              <p
                                className="subsectionSubtitleText1"
                                contentEditable={editable}
                                suppressContentEditableWarning
                                onBlur={(e) => handleBlur(e, 'subtitleTextLeft', sectionIndex, subSectionIndex)}
                                style={style.subsectionSubtitleText1}
                                dangerouslySetInnerHTML={{ __html: subSection.subtitleTextLeft }}
                              />
                              <p
                                className="subsectionSubtitleText2"
                                contentEditable={editable}
                                suppressContentEditableWarning
                                onBlur={(e) => handleBlur(e, 'subtitleTextRight', sectionIndex, subSectionIndex)}
                                style={style.subsectionSubtitleText2}
                                dangerouslySetInnerHTML={{ __html: subSection.subtitleTextRight }}
                              />
                            </div>
                          }
                        </div>
                      }
                      <div style={style.subsectionBody}>
                        {subSection.descriptions.map((desc, descriptionIndex) =>
                          desc.hidden ? null : desc.type === "SPLIT" ? (
                            <div
                              className="subsectionBodySplit"
                              onMouseMove={handleMouseMove(sectionIndex, subSectionIndex, descriptionIndex)}
                              onMouseLeave={handleMouseLeave()}
                              style={style.subsectionBodySplit}
                            >
                              <p
                                className="subsectionBodySplitText1"
                                contentEditable={editable}
                                dangerouslySetInnerHTML={{ __html: desc.valueLeft }}
                                onBlur={(e) => handleBlur(e, 'valueLeft', sectionIndex, subSectionIndex, descriptionIndex)}
                                style={style.subsectionBodySplitText1}
                                suppressContentEditableWarning
                              />
                              <p
                                className="subsectionBodySplitText2"
                                contentEditable={editable}
                                dangerouslySetInnerHTML={{ __html: desc.valueRight }}
                                onBlur={(e) => handleBlur(e, 'valueRight', sectionIndex, subSectionIndex, descriptionIndex)}
                                style={style.subsectionBodySplitText2}
                                suppressContentEditableWarning
                              />
                            </div>
                          ) : (
                            <div
                              className="subsectionTextArea"
                              contentEditable={editable}
                              suppressContentEditableWarning
                              onBlur={(e) => handleBlur(e, 'value', sectionIndex, subSectionIndex, descriptionIndex)}
                              dangerouslySetInnerHTML={{ __html: desc.value }}
                              style={style.subsectionTextArea}
                            />
                          ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Resume;