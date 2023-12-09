import React, { useEffect, useState } from "react";
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { useStore } from '../store';
import * as DOMPurify from 'dompurify';
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { app, db } from '../../lib/firebase';
import HoveringToolbar from "./HoveringToolbar";
import LoadingSpinner from '../components/LoadingSpinner';
import { debounce } from 'lodash';



function ResumePDF() {
  const { textResume, customFormat, updateText } = useStore();
  const resume = textResume
  const scale = 1.0
  const editable = true

  const styles = StyleSheet.create({
    viewer: {
      width: '816px', // 8.5 inches at 96 DPI
      height: '1056px', // 11 inches at 96 DPI
    },
    canvas: {
      // width: '816px', // 8.5 inches at 96 DPI
      // height: '1056px', // 11 inches at 96 DPI
      transformOrigin: '50% 0',
      transform: `scale(${scale})`,
      fontFamily: 'Helvetica',
    },
    resume: {
      margin: `${customFormat.resumeMarginTopBottom} ${customFormat.resumeMarginLeftRight}`,
      display: 'block',
    },
    headerSection: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: customFormat.headerSectionMarginTop,
      marginBottom: 0,
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    headerName: {
      fontSize: '48px',
      textAlign: 'center',
      margin: '0px',
      padding: '0px',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    headerFirstName: {
      // fontWeight: '800',
      paddingRight: '10px',
      fontFamily: 'Helvetica-Bold',
    },
    headerLastName: {
      // fontWeight: '500',
    },
    headerContacts: {
      fontSize: '11px',
      // fontWeight: '600',
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
      // padding: '0px 10px',
      fontSize: '11px',
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
      display: 'flex',
      flexDirection: 'column',
      width: '100%'
    },
    sectionTitle: {
      fontSize: '22px',
      fontFamily: 'Helvetica-Bold',
      // fontWeight: '800',
      marginBottom: '5px',
      borderBottom: '2px solid black',
      position: 'relative',
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
      fontFamily: 'Helvetica-Bold',

      // fontWeight: '800',
    },
    subsectionTitleText2: {
      fontSize: '12px',
      // fontWeight: '600',
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
      // fontFamily: 'Helvetica-Italic',
    },
    subsectionSubtitleText2: {
      fontSize: '12px',
      // fontFamily: 'Helvetica-Italic',

      // fontWeight: '400',
      fontStyle: 'italic',
    },
    subsectionBody: {
      marginBottom: '5px',
    },
    subsectionBodySplit: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: '0px',
      // maxWidth: '50%',
      display: 'flex',
      maxWidth: '100%',
      width: '100%',
    },
    subsectionBodySplitText1: {
      fontSize: '14px',
      // fontWeight: '800',
      fontFamily: 'Helvetica-Bold',
      alignSelf: 'center',
      display: 'block',
      // width: '20%',
      minWidth: '20%',
      maxWidth: '30%',
      // justifySelf: 'left',
      // paddingLeft: '15px',
    },
    subsectionBodySplitText2: {
      fontSize: '12px',
      // fontWeight: '400',
      alignSelf: 'center',
      display: 'block',
      minWidth: '70%',
      maxWidth: '80%',
      // paddingLeft: '10px',
      // lineHeight: '1.3',
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
      fontSize: '12px',
      // fontWeight: '400',
      alignSelf: 'center',
      // lineHeight: '1.3',
      // marginLeft: '1em',
    },
    contactContainer: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
    },
    // subsectionTextAreaBullet: {
    //   display: 'list-item',
    // },
    row: {
      display: 'flex',
      flexDirection: 'row',
    },
    bullet: {
      height: '100%',
      marginRight: '5px',
    },
  });


  const ListItem = ({ children }) => {
    return (
      <View style={styles.row}>
        <View style={styles.bullet}>
          <Text>{'\u2022'}</Text>
        </View>
        <Text contentEditable style={{ fontSize: '12px', lineHeight: '1.5' }}>{children}</Text>
      </View>
    )
  }

  const hasTitleText = (subsection) => {
    return (Boolean(subsection.titleTextLeft) || Boolean(subsection.titleTextRight));
  }

  const hasSubtitleText = (subsection) => {
    return (Boolean(subsection.subtitleTextLeft) || Boolean(subsection.subtitleTextRight));
  }

  function handleBlur(e, operation, sectionIndex = undefined, subsectionIndex = undefined, descriptionIndex = undefined) {
    // sanitize the HTML to avoid XSS attacks 
    const cleanHTML = DOMPurify.sanitize(e.target.innerHTML, { USE_PROFILES: { html: true } });

    updateText(operation, cleanHTML, sectionIndex, subsectionIndex, descriptionIndex);
    // debouncedSync();
  }
  return (
    // <PDFViewer style={styles.viewer}>
    <Document size="letter" className="bg-white shadow-2xl">
      <Page >
        <View style={styles.canvas}>
          <View style={styles.resume}>
            <View style={styles.headerSection}>
              <View id="headerName" style={styles.headerName} className="w-full">
                <Text
                  contentEditable={editable}
                  // dangerouslySetInnerHTML={{ __html: resume.firstName }}
                  id="firstName"
                  onBlur={(e) => handleBlur(e, 'firstName')}
                  style={styles.headerFirstName}
                  suppressContentEditableWarning
                // onPaste={handlePaste}
                >
                  {resume.firstName}
                </Text>
                <Text
                  contentEditable={editable}
                  // dangerouslySetInnerHTML={{ __html: resume.firstName }}
                  id="firstName"
                  onBlur={(e) => handleBlur(e, 'lastName')}
                  style={styles.headerLastName}
                  suppressContentEditableWarning
                // onPaste={handlePaste}
                >
                  {resume.lastName}
                </Text>
              </View>
              <View style={styles.headerContacts}>
                {resume.contactInfo.map((info, index) => (
                  <View style={styles.contactContainer} key={index}>
                    <Text contentEditable suppressContentEditableWarning style={styles.headerContactsText} key={index} onBlur={(e) => handleBlur(e, 'contactInfo', index)}
                    >
                      {info}
                    </Text>
                    {index < resume.contactInfo.length - 1 &&
                      <View style={styles.headerContactsDivider} />
                    }
                  </View>
                ))}
              </View>
            </View>
            {resume.sections.map((section, sectionIndex) =>
              section.hidden ? null : (
                <View
                  className="section"
                  id={`${section.type.toLowerCase()}Section`}
                  key={sectionIndex}
                  style={styles.section}
                // onMouseMove={handleMouseMove(sectionIndex)}
                // onMouseLeave={handleMouseLeave()}
                >
                  <Text
                    className="sectionTitle"
                    contentEditable
                    // dangerouslySetInnerHTML={{ __html: section.name }}
                    onBlur={(e) => handleBlur(e, 'name', sectionIndex)}
                    style={styles.sectionTitle}
                    suppressContentEditableWarning
                  // onPaste={handlePaste}
                  >
                    {section.name}
                  </Text>
                  {section.subSections.map((subSection, subSectionIndex) =>
                    subSection.hidden ? null : (
                      <View
                        className="subsection"
                        style={styles.subsection}
                        key={subSectionIndex}
                      // onMouseMove={handleMouseMove(sectionIndex, subSectionIndex)}
                      // onMouseLeave={handleMouseLeave()}
                      >
                        {section.type !== 'SKILLS' &&
                          (hasTitleText(subSection) || hasSubtitleText(subSection)) &&
                          <View>
                            {hasTitleText(subSection) &&
                              <View className="subsectionTitle" style={styles.subsectionTitle}>
                                <Text
                                  className="subsectionTitleText1"
                                  contentEditable
                                  suppressContentEditableWarning
                                  onBlur={(e) => handleBlur(e, 'titleTextLeft', sectionIndex, subSectionIndex)}
                                  style={styles.subsectionTitleText1}
                                // dangerouslySetInnerHTML={{ __html: subSection.titleTextLeft }}
                                // onPaste={handlePaste}
                                >
                                  {subSection.titleTextLeft}
                                </Text>
                                <Text
                                  className="subsectionTitleText2"
                                  contentEditable
                                  suppressContentEditableWarning
                                  onBlur={(e) => handleBlur(e, 'titleTextRight', sectionIndex, subSectionIndex)}
                                  style={styles.subsectionTitleText2}
                                // dangerouslySetInnerHTML={{ __html: subSection.titleTextRight }}
                                // onPaste={handlePaste}
                                >
                                  {subSection.titleTextRight}
                                </Text>
                              </View>
                            }
                            {hasSubtitleText(subSection) &&
                              <View className="subsectionSubtitle" style={styles.subsectionSubtitle}>
                                <Text
                                  className="subsectionSubtitleText1"
                                  contentEditable
                                  suppressContentEditableWarning
                                  onBlur={(e) => handleBlur(e, 'subtitleTextLeft', sectionIndex, subSectionIndex)}
                                  style={styles.subsectionSubtitleText1}
                                // dangerouslySetInnerHTML={{ __html: subSection.subtitleTextLeft }}
                                // onPaste={handlePaste}
                                >
                                  {subSection.subtitleTextLeft}
                                </Text>
                                <Text
                                  className="subsectionSubtitleText2"
                                  contentEditable
                                  suppressContentEditableWarning
                                  onBlur={(e) => handleBlur(e, 'subtitleTextRight', sectionIndex, subSectionIndex)}
                                  style={styles.subsectionSubtitleText2}
                                // dangerouslySetInnerHTML={{ __html: subSection.subtitleTextRight }}
                                // onPaste={handlePaste}
                                >
                                  {subSection.subtitleTextRight}
                                </Text>
                              </View>
                            }
                          </View>
                        }
                        <View style={styles.subsectionBody}>
                          {subSection.descriptions.map((desc, descriptionIndex) =>
                            desc.hidden ? null : desc.type === "SPLIT" ? (
                              <View
                                className="subsectionBodySplit"
                                // onMouseMove={handleMouseMove(sectionIndex, subSectionIndex, descriptionIndex)}
                                // onMouseLeave={handleMouseLeave()}
                                style={styles.subsectionBodySplit}
                              >
                                <Text
                                  className="subsectionBodySplitText1"
                                  contentEditable={editable}
                                  // dangerouslySetInnerHTML={{ __html: desc.valueLeft }}
                                  onBlur={(e) => handleBlur(e, 'valueLeft', sectionIndex, subSectionIndex, descriptionIndex)}
                                  style={styles.subsectionBodySplitText1}
                                  suppressContentEditableWarning
                                // onPaste={handlePaste}
                                >
                                  {desc.valueLeft}
                                </Text>
                                <Text
                                  className="subsectionBodySplitText2"
                                  contentEditable={editable}
                                  // dangerouslySetInnerHTML={{ __html: desc.valueRight }}
                                  onBlur={(e) => handleBlur(e, 'valueRight', sectionIndex, subSectionIndex, descriptionIndex)}
                                  style={styles.subsectionBodySplitText2}
                                  suppressContentEditableWarning
                                // onPaste={handlePaste}
                                >
                                  {desc.valueRight}
                                </Text>
                              </View>
                            ) : (
                              desc.value !== '' &&
                              <View>
                                <ListItem>{desc.value}</ListItem>
                              </View>

                              // <Text
                              //   className="subsectionTextArea"
                              //   contentEditable={editable}
                              //   suppressContentEditableWarning
                              //   onBlur={(e) => handleBlur(e, 'value', sectionIndex, subSectionIndex, descriptionIndex)}
                              //   // dangerouslySetInnerHTML={{ __html: desc.value }}
                              //   style={styles.subsectionTextArea}
                              // // onPaste={handlePaste}
                              // >
                              //   {desc.value}
                              // </Text>
                            ))}
                        </View>
                      </View>
                    )
                  )}
                </View>
              )
            )}
          </View>
        </View>
      </Page>
    </Document >
    // </PDFViewer>
  );
}

export default ResumePDF;
