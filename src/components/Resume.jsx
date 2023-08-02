import React, { useState } from "react";
import useStore from "../store";
import HoveringToolbar from "./HoveringToolbar";


const Resume = ({ editable = false, resumeOnly = false, scale = 1.0 }) => {
  const { resume, customFormat, updateTitleTextLeft, updateText } = useStore();
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
    subsectionBodyBulletText: {
      fontSize: '14px',
      fontWeight: '400',
      alignSelf: 'center',
      lineHeight: '1.3',
      '&:not(:firstChild)': {
        marginTop: customFormat.subsectionBodyBulletMarginTop,
      },
    },
  };

  const hasTitleText = (subsection) => {
    return (Boolean(subsection.titleTextLeft) || Boolean(subsection.titleTextRight));
  }

  const hasSubtitleText = (subsection) => {
    return (Boolean(subsection.subtitleTextLeft) || Boolean(subsection.subtitleTextRight));
  }

  const [activeItemIndices, setActiveItemIndices] = useState({ sectionIndex: null, subsectionIndex: null, descriptionIndex: null });

  function handleBlur(e, operation, sectionIndex = undefined, subsectionIndex = undefined, descriptionIndex = undefined) {
    updateText(operation, e.target.textContent, sectionIndex, subsectionIndex, descriptionIndex);
  }

  const [toolbarPos, setToolbarPos] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (sectionIndex, subsectionIndex, descriptionIndex) => (e) => {
    const currentRect = e.currentTarget.getBoundingClientRect();
    // const resumeRect = document.getElementById('canvas').getBoundingClientRect();

    setToolbarPos({
      x: currentRect.left - TOOLBAR_OFFSET,
      y: currentRect.top,
    });

    setActiveItemIndices({ sectionIndex, subsectionIndex, descriptionIndex });
    e.currentTarget.classList.add('bg-gray-100');
  };

  const handleMouseLeave = () => (e) => {
    // Remove the hover element
    e.currentTarget.classList.remove('bg-gray-100');
  };


  return (
    <>
      {!resumeOnly && editable && <HoveringToolbar scale={scale} {...toolbarPos} activeIndices={activeItemIndices} />}
      <div id="canvas" style={style.canvas} className="bg-white shadow-2xl">
        <div id="resume" style={style.resume}>
          <div id="headerSection" style={style.headerSection}>
            <h1 id="headerName" style={style.headerName}>
              <span id="firstName" contentEditable={editable} suppressContentEditableWarning={true}
                onBlur={(e) => handleBlur(e, 'firstName')}
                style={style.headerFirstName}>
                {resume.firstName}
              </span>

              <span id="lastName" contentEditable={editable} suppressContentEditableWarning={true}
                onBlur={(e) => handleBlur(e, 'lastName')}
                style={style.headerLastName}>
                {resume.lastName}
              </span>
            </h1>
            <div id="headerContacts" style={style.headerContacts}>
              {resume.contactInfo.map((info, index) => (
                <div className="contactContainer" style={{ display: 'flex', alignItems: 'center' }} key={index}>
                  <p className="headerContactsText" contentEditable={editable} suppressContentEditableWarning={true}
                    // onBlur={(e) => handleBlur(e, 'contactInfo', index)} 
                    style={style.headerContactsText}>
                    {info}
                  </p>
                  {index < resume.contactInfo.length - 1 &&
                    <div style={style.headerContactsDivider} />
                  }
                </div>
              ))}
            </div>
          </div>
          {resume.sections.map((section, sectionIndex) =>
            section.hidden ? null : (
              <div className="section" id={`${section.type.toLowerCase()}Section`} style={style.section} key={sectionIndex}>
                <h2 onMouseEnter={handleMouseEnter(sectionIndex)} onMouseLeave={handleMouseLeave()} className="sectionTitle" contentEditable={editable} suppressContentEditableWarning={true} onBlur={(e) => handleBlur(e, 'name', sectionIndex)} style={style.sectionTitle}>
                  {section.name}
                </h2>
                {section.subSections.map((subSection, subSectionIndex) =>
                  subSection.hidden ? null : (
                    <div className="subsection" style={style.subsection} key={subSectionIndex}>
                      {section.type !== 'SKILLS' && (hasTitleText(subSection) || hasSubtitleText(subSection)) &&
                        <div onMouseEnter={handleMouseEnter(sectionIndex, subSectionIndex)} onMouseLeave={handleMouseLeave()}>
                          {hasTitleText(subSection) &&
                            <div className="subsectionTitle" style={style.subsectionTitle}>
                              <p className="subsectionTitleText1" contentEditable={editable} suppressContentEditableWarning={true} onBlur={(e) => handleBlur(e, 'titleTextLeft', sectionIndex, subSectionIndex)} style={style.subsectionTitleText1}>
                                {subSection.titleTextLeft}
                              </p>
                              <p className="subsectionTitleText2" contentEditable={editable} suppressContentEditableWarning={true} onBlur={(e) => handleBlur(e, 'titleTextRight', sectionIndex, subSectionIndex)} style={style.subsectionTitleText2}>
                                {subSection.titleTextRight}
                              </p>
                            </div>
                          }
                          {hasSubtitleText(subSection) &&
                            <div className="subsectionSubtitle" style={style.subsectionSubtitle}>
                              <p className="subsectionSubtitleText1" contentEditable={editable} suppressContentEditableWarning={true} onBlur={(e) => handleBlur(e, 'subtitleTextLeft', sectionIndex, subSectionIndex)} style={style.subsectionSubtitleText1}>
                                {subSection.subtitleTextLeft}
                              </p>
                              <p className="subsectionSubtitleText2" contentEditable={editable} suppressContentEditableWarning={true} onBlur={(e) => handleBlur(e, 'subtitleTextRight', sectionIndex, subSectionIndex)} style={style.subsectionSubtitleText2}>
                                {subSection.subtitleTextRight}
                              </p>
                            </div>
                          }
                        </div>
                      }
                      <div style={style.subsectionBody}>
                        {subSection.descriptions.map((desc, descriptionIndex) =>
                          desc.hidden ? null : desc.type === "SPLIT" ? (
                            <div className="subsectionBodySplit" style={style.subsectionBodySplit}>
                              <p className="subsectionBodySplitText1" contentEditable={editable} suppressContentEditableWarning={true} onBlur={(e) => handleBlur(e, 'valueLeft', sectionIndex, subSectionIndex, descriptionIndex)} style={style.subsectionBodySplitText1}>
                                {desc.valueLeft}
                              </p>
                              <p className="subsectionBodySplitText2" contentEditable={editable} suppressContentEditableWarning={true} onBlur={(e) => handleBlur(e, 'valueRight', sectionIndex, subSectionIndex, descriptionIndex)} style={style.subsectionBodySplitText2}>
                                {desc.valueRight}
                              </p>
                            </div>
                          ) : (
                            <div onMouseEnter={handleMouseEnter(sectionIndex, subSectionIndex, descriptionIndex)}
                              onMouseLeave={handleMouseLeave()}>
                              <ul className="subsectionBodyBullet" style={style.subsectionBodyBullet}>
                                <li
                                  className="subsectionBodyBulletText"
                                  contentEditable={editable} suppressContentEditableWarning={true}
                                  onBlur={(e) => handleBlur(e, 'value', sectionIndex, subSectionIndex, descriptionIndex)}
                                  style={{
                                    ...style.subsectionBodyBulletText,
                                    marginTop: descriptionIndex !== 0 ? customFormat.subsectionBodyBulletMarginTop : '0px',
                                  }}
                                >
                                  {desc.value}
                                </li>
                              </ul>
                            </div>
                          )
                        )}
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