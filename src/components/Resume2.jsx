import React from "react";
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const Resume2 = () => {
  const styles = StyleSheet.create({
    resume: {
      width: '816pt', // 8.5 inches at 72pt per inch
      height: '1056pt', // 11 inches at 72pt per inch
      padding: '0pt 30pt', // Padding around the content.
      border: '1pt solid black',
    },
    headerSection: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerName: {
      fontSize: '48pt',
      textAlign: 'center',
      margin: '0pt',
      padding: '0pt',
    },
    headerFirstName: {
      fontWeight: '800',
    },
    headerLastName: {
      fontWeight: '500',
    },
    headerContacts: {
      fontSize: '11pt',
      fontWeight: '600',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerContactsText: {
      padding: '0pt 10pt',
    },
    headerContactsDivider: {
      display: 'block',
      height: '10pt',
      borderRight: '2pt solid black',
      marginLeft: '10pt',
      marginRight: '10pt',
      width: '2pt',
    },
    educationSection: {
      marginBottom: '0pt',
    },
    experienceSection: {
      marginBottom: '0pt',
    },
    skillsSection: {
      marginBottom: '0pt',
    },
    projectsSection: {
      marginBottom: '0pt',
    },
    sectionTitle: {
      fontSize: '22pt',
      fontWeight: '900',
      marginBottom: '5pt',
      borderBottom: '2px solid black',
    },
    sectionContent: {},
    sectionContentTitle: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    sectionContentTitleText1: {
      fontSize: '16pt',
      fontWeight: '800',
    },
    sectionContentTitleText2: {
      fontSize: '12pt',
      fontWeight: '600',
    },
    sectionContentSubtitle: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '5pt',
    },
    sectionContentSubtitleText1: {
      fontSize: '12pt',
      fontWeight: '500',
      fontStyle: 'italic',
    },
    sectionContentSubtitleText2: {
      fontSize: '12pt',
      fontWeight: '400',
      fontStyle: 'italic',
    },
    sectionContentBody: {
      marginBottom: '5pt',
    },
    sectionContentBodySplit: {
    },
    sectionContentBodySplitText1: {
      fontSize: '15pt',
      fontWeight: '800',
      alignSelf: 'center',
      justifySelf: 'left',
      paddingLeft: '15pt',
      display: 'inline-block',
      width: '20%',
    },
    sectionContentBodySplitText2: {
      fontSize: '14pt',
      fontWeight: '400',
      alignSelf: 'center',
      paddingLeft: '10pt',
      lineHeight: '1.3',
      display: 'inline-block',
      width: '80%',
    },
    sectionContentBodyBullet: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      listStyleType: 'disc',
      listStylePosition: 'outside',
      marginBottom: '5pt',
      marginLeft: '25pt',
    },
    sectionContentBodyBulletText: {
      fontSize: '14pt',
      fontWeight: '400',
      alignSelf: 'center',
      lineHeight: '1.3',
    },
  });
  const resume = {
    resumeName: "John Doe Resume",
    firstName: "John",
    lastName: "Doe",
    contactInfo: [
      "1234 Some St, Some City, Some Country",
      "Phone: 123-456-7890",
      "Email: john.doe@example.com",
    ],
    sections: [
      {
        name: "Education",
        type: "EDUCATION",
        subSections: [
          {
            name: "University of California, Irvine",
            titleTextLeft: "University of California, Irvine",
            titleTextRight: "June 2020",
            subtitleTextLeft: "Bachelor of Science, Computer Science",
            subtitleTextRight: "Irvine, CA",
            descriptions: [
              {
                type: "SPLIT",
                label: "Achievements",
                value:
                  "174 LSAT Score (99th Percentile) | President - Alpha Epsilon Omega | Dean's Honor List President's Scholarship at UF Levine Law (#21 US News)",
                hidden: false,
              },
            ],
            hidden: false,
          },
        ],
        hidden: false,
      },
      {
        name: "Experience",
        type: "EXPERIENCE",
        subSections: [
          {
            name: "Some Company",
            titleTextLeft: "Some Company",
            titleTextRight: "June 2020 - Present",
            subtitleTextLeft: "Software Developer",
            subtitleTextRight: "Irvine, CA",
            descriptions: [
              {
                type: "BULLET",
                value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                hidden: false,
              },
              {
                type: "BULLET",
                value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                hidden: false,
              },
              {
                type: "BULLET",
                value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                hidden: false,
              },
            ],
            hidden: false,
          },
          {
            name: "Some Company",
            titleTextLeft: "Some Company",
            titleTextRight: "June 2020 - Present",
            subtitleTextLeft: "Software Developer",
            subtitleTextRight: "Irvine, CA",
            descriptions: [
              {
                type: "BULLET",
                value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                hidden: false,
              },
              {
                type: "BULLET",
                value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                hidden: false,
              },
              {
                type: "BULLET",
                value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                hidden: false,
              },
            ],
            hidden: false,
          }
        ],
        hidden: false,
      },
      {
        name: "Skills",
        type: "SKILLS",
        subSections: [
          {
            name: "Languages and Frameworks",
            titleTextLeft: "",
            titleTextRight: "",
            subtitleTextLeft: "",
            subtitleTextRight: "",
            descriptions: [
              {
                type: "SPLIT",
                label: "Languages",
                value: "JavaScript, Python, Java, C++, C#, HTML, CSS",
                hidden: false,
              },
              {
                type: "SPLIT",
                label: "Frameworks",
                value: "React, Node.js, Express, Flask, Django, Spring Boot, .NET, Bootstrap",
                hidden: false,
              },
              {
                type: "SPLIT",
                label: "Databases",
                value: "MySQL, MongoDB, PostgreSQL, SQLite",
                hidden: false,
              },
            ],
            hidden: false,
          },
        ],
        hidden: false,
      },
      {
        name: "Projects",
        type: "PROJECTS",
        subSections: [
          {
            name: "Some Project",
            titleTextLeft: "Some Project",
            titleTextRight: "June 2020 - Present",
            subtitleTextLeft: "Python, PyGame, NEAT-Python",
            subtitleTextRight: "View",
            descriptions: [
              {
                type: "BULLET",
                value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                hidden: false,
              },
              {
                type: "BULLET",
                value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                hidden: false,
              },
              {
                type: "BULLET",
                value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                hidden: false,
              },
            ],
            hidden: false,
          },
        ],
        hidden: false,
      },
    ],
  };
  return (
    <Document>
      <Page size="Letter" style={styles.resume}>
        <View style={styles.headerSection}>
          <Text style={styles.headerName}>
            <Text style={styles.headerFirstName}>
              {resume.firstName}
            </Text>
            <Text style={styles.headerLastName}>
              {` ${resume.lastName}`}
            </Text>
          </Text>
          <View style={styles.headerContacts}>
            {resume.contactInfo.map((info, index) => (
              <View style={{ display: 'flex', alignItems: 'center' }} key={index}>
                <Text style={styles.headerContactsText}>
                  {info}
                </Text>
                {/* {index < resume.contactInfo.length - 1 &&
                  <Text style={styles.headerContactsDivider} />
                } */}
              </View>
            ))}
          </View>
        </View>
        {resume.sections.map((section) =>
          section.hidden ? null : (
            <View key={section.name} style={styles[`${section.type.toLowerCase()}Section`]}>
              <Text style={styles.sectionTitle}>{section.name}</Text>
              {section.subSections.map((subSection) =>
                subSection.hidden ? null : (
                  <View key={subSection.titleTextLeft} style={styles.sectionContent}>
                    <View style={styles.sectionContentTitle}>
                      <Text style={styles.sectionContentTitleText1}>
                        {subSection.titleTextLeft}
                      </Text>
                      <Text style={styles.sectionContentTitleText2}>
                        {subSection.titleTextRight}
                      </Text>
                    </View>
                    <View style={styles.sectionContentSubtitle}>
                      <Text style={styles.sectionContentSubtitleText1}>
                        {subSection.subtitleTextLeft}
                      </Text>
                      <Text style={styles.sectionContentSubtitleText2}>
                        {subSection.subtitleTextRight}
                      </Text>
                    </View>
                    <View style={styles.sectionContentBody}>
                      {subSection.descriptions.map((desc) =>
                        desc.hidden ? null : desc.type === "SPLIT" ? (
                          <View style={styles.sectionContentBodySplit}>
                            <Text style={styles.sectionContentBodySplitText1}>
                              {desc.label}:
                            </Text>
                            <Text style={styles.sectionContentBodySplitText2}>
                              {desc.value}
                            </Text>
                          </View>
                        ) : (
                          <View style={styles.sectionContentBodyBullet}>
                            <Text style={styles.sectionContentBodyBulletText}>
                              {desc.value}
                            </Text>
                          </View>
                        )
                      )}
                    </View>
                  </View>
                )
              )}
            </View>
          )
        )}
      </Page>
    </Document>
  );
};

export default Resume2;