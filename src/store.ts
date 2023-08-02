import { create } from 'zustand'
import { produce } from 'immer'

// Your types/interfaces here...

interface Resume {
  resumeName: string;
  firstName: string;
  lastName: string;
  contactInfo: string[];
  sections: Section[];
}

type SectionType = 'SKILLS' | 'PROJECTS' | 'EDUCATION' | 'EXPERIENCE';

interface Section {
  name: string;
  type: SectionType;
  subSections: SubSection[];
  hidden: boolean;
}

interface SubSection {
  name: string;
  titleTextLeft: string;
  titleTextRight: string;
  subtitleTextLeft: string;
  subtitleTextRight: string;
  descriptions: Description[];
  hidden: boolean;
}

type Description = BulletDescription | SplitDescription;

interface BulletDescription {
  type: 'BULLET';
  value: string;
  hidden: boolean;
}

interface SplitDescription {
  type: 'SPLIT';
  valueLeft: string;
  valueRight: string;
  hidden: boolean;
}
interface CustomFormat {
  resumeMarginLeftRight: string;
  resumeMarginTopBottom: string;
  headerSectionMarginTop: string;
  sectionMarginTop: string;
  subsectionMarginTop: string;
  subsectionBodyBulletMarginTop: string;
}

// Define your store here...

interface Store {
  resume: Resume;
  customFormat: CustomFormat;
  history: Resume[],
  future: Resume[],
  setCustomFormatField: (field: keyof Store['customFormat'], value: string) => void;
  incrementCustomFormatField: (field: keyof Store['customFormat']) => void;
  decrementCustomFormatField: (field: keyof Store['customFormat']) => void;
  setResume: (resume: Resume) => void;
  updateSection: (sectionIndex: number, section: Section) => void;
  updateSubSection: (sectionIndex: number, subSectionIndex: number, subSection: SubSection) => void;
  updateDescription: (sectionIndex: number, subSectionIndex: number, descriptionIndex: number, description: Description) => void;
  updateText: (operation: string, newValue: string, sectionIndex: number, subSectionIndex: number, descriptionIndex:number) => void;
  toggleSectionHidden: (sectionIndex: number) => void;
  addHandler: (sectionIndex: number, subSectionIndex?: number,  descriptionIndex?: number) => void;
  deleteHandler: (sectionIndex: number, subSectionIndex?: number, descriptionIndex?: number) => void;
  moveHandler: (oldIndex: number, newIndex: number, sectionIndex?: number, subsectionIndex?: number) => void;
  undo: () => void;
  redo: () => void;
}

function moveArrayItem<T>(arr: T[], oldIndex: number, newIndex: number): T[] {
  // Guard against out-of-bounds indices
  if (newIndex < 0 || newIndex >= arr.length) {
    return arr;
  }

  const newArr = [...arr]; // Clone array to avoid mutations
  const item = newArr[oldIndex];

  newArr.splice(oldIndex, 1);
  newArr.splice(newIndex, 0, item);

  return newArr;
}

const newDescription: BulletDescription = {
  type: 'BULLET',
  value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  hidden: false,
};

const newSubSection: SubSection = {
  name: 'Dummy SubSection',
  titleTextLeft: 'Subsection Title',
  titleTextRight: 'Month Year - Month Year',
  subtitleTextLeft: 'Subsection Subtitle',
  subtitleTextRight: 'City, State',
  descriptions: [newDescription],
  hidden: false,
};

const newSection: Section = {
  name: "Section Title",
  type: 'EXPERIENCE' as SectionType,
  subSections: [newSubSection],
  hidden: false,
};


const useStore = create<Store>((set) => ({
  customFormat: {
    resumeMarginLeftRight: '30px',
    resumeMarginTopBottom: '0px',
    headerSectionMarginTop: '0px',
    sectionMarginTop: '0px',
    subsectionMarginTop: '0px',
    subsectionBodyBulletMarginTop: '0px',
  },
  incrementCustomFormatField: (field) => set((state) =>
    produce(state, (draft) => {
      const currentValue = parseInt(draft.customFormat[field], 10); 
      draft.customFormat[field] = `${currentValue + 1}px`; 
    })
    ),

  decrementCustomFormatField: (field) => set((state) =>
    produce(state, (draft) => {
      const currentValue = parseInt(draft.customFormat[field], 10); 
      draft.customFormat[field] = `${currentValue - 1}px`;
    })
    ),
  setCustomFormatField: (field, value) => set((state) =>
    produce(state, (draft) => {
      draft.customFormat[field] = value === "" ? "0px" : `${value}px`;
    })
  ),
  resume: {
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
                valueLeft: "Achievements",
                valueRight:
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
                valueLeft: "Languages",
                valueRight: "JavaScript, Python, Java, C++, C#, HTML, CSS",
                hidden: false,
              },
              {
                type: "SPLIT",
                valueLeft: "Frameworks",
                valueRight: "React, Node.js, Express, Flask, Django, Spring Boot, .NET, Bootstrap",
                hidden: false,
              },
              {
                type: "SPLIT",
                valueLeft: "Databases",
                valueRight: "MySQL, MongoDB, PostgreSQL, SQLite",
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
  },
  history: [],
  future: [],
  // setResume may not be updated
  setResume: (resume: Resume) => set((state) => {
    return {
      history: [...state.history, state.resume],
      resume: resume,
      future: [],
    }
  }),
  updateSection: (sectionIndex, section) => set((state) => 
    produce(state, draft => {
      draft.resume.sections[sectionIndex] = section;
    })
  ),
  updateSubSection: (sectionIndex, subSectionIndex, subSection) => set((state) => 
    produce(state, draft => {
      draft.resume.sections[sectionIndex].subSections[subSectionIndex] = subSection;
    })
  ),
  updateDescription: (sectionIndex, subSectionIndex, descriptionIndex, description) => set((state) => 
    produce(state, draft => {
      draft.resume.sections[sectionIndex].subSections[subSectionIndex].descriptions[descriptionIndex] = description;
    })
  ),
  updateText: (operation, newValue, sectionIndex?, subSectionIndex?, descriptionIndex?) => set((state) => {
    const oldState = produce(state, draft => {});

    return produce(state, draft => {
      if (operation === 'firstName') {
        if (draft.resume.firstName === newValue) {
          return;
        }
        draft.resume.firstName = newValue;
      } else if (operation === 'lastName') {
        if (draft.resume.lastName === newValue) {
          return;
        }
        draft.resume.lastName = newValue;
      } else if (descriptionIndex !== undefined) {
        // If descriptionIndex is provided, we are updating a description-level field
        const targetDescription = draft.resume.sections[sectionIndex].subSections[subSectionIndex].descriptions[descriptionIndex];
        
        if (targetDescription.type === "BULLET") {
          if (targetDescription.value === newValue) {
            return;
          }
          targetDescription.value = newValue;
        } else if (targetDescription.type === "SPLIT") {
          if (operation === 'valueLeft') {
            if (targetDescription.valueLeft === newValue) {
              return;
            }
            targetDescription.valueLeft = newValue;
          } else if (operation === 'valueRight') {
            if (targetDescription.valueRight === newValue) {
              return;
            }
            targetDescription.valueRight = newValue;
          }
        }
      } else if (subSectionIndex !== undefined) {
        // If subSectionIndex is provided, we are updating a subsection-level field
        const targetSubsection = draft.resume.sections[sectionIndex].subSections[subSectionIndex];
        if (operation === 'titleTextLeft') {
          if (targetSubsection.titleTextLeft === newValue) {
            return;
          }
          targetSubsection.titleTextLeft = newValue;
        } else if (operation === 'titleTextRight') {
          if (targetSubsection.titleTextRight === newValue) {
            return;
          }
          targetSubsection.titleTextRight = newValue;
        } else if (operation === 'subtitleTextLeft') {
          if (targetSubsection.subtitleTextLeft === newValue) {
            return;
          }
          targetSubsection.subtitleTextLeft = newValue;
        } else if (operation === 'subtitleTextRight') {
          if (targetSubsection.subtitleTextRight === newValue) {
            return;
          }
          targetSubsection.subtitleTextRight = newValue;
        }
      } else {
        // If only sectionIndex is provided, we are updating a section-level field
        const targetSection = draft.resume.sections[sectionIndex];
        if (targetSection.name === newValue) {
          return;
        }
        targetSection.name = newValue;
      }

      // Update history and reset future
      draft.history = [...state.history, oldState.resume];
      draft.future = [];
    });
  }),
  toggleSectionHidden: (sectionIndex) => set((state) => 
    produce(state, draft => {
      draft.resume.sections[sectionIndex].hidden = !draft.resume.sections[sectionIndex].hidden;
    })
  ),
  addHandler: (
    sectionIndex: number,
    subSectionIndex?: number,
    descriptionIndex?: number,
  ) => set((state) => {
    const oldState = produce(state, draft => {});  // Just copy the old state

    return produce(state, (draft) => {
      if (descriptionIndex !== undefined && subSectionIndex !== undefined && sectionIndex !== undefined) {
        if (
          draft.resume.sections[sectionIndex] &&
          draft.resume.sections[sectionIndex].subSections[subSectionIndex] &&
          draft.resume.sections[sectionIndex].subSections[subSectionIndex].descriptions[descriptionIndex]
        ) {
          draft.resume.sections[sectionIndex].subSections[subSectionIndex].descriptions.push(newDescription);
        }
      } else if (subSectionIndex !== undefined && sectionIndex !== undefined) {
        if (
          draft.resume.sections[sectionIndex] &&
          draft.resume.sections[sectionIndex].subSections[subSectionIndex]
        ) {
          draft.resume.sections[sectionIndex].subSections.push(newSubSection);
        }
      } else if (sectionIndex !== undefined) {
        if (
          draft.resume.sections[sectionIndex]
        ) {
          draft.resume.sections.push(newSection);
        }
      }

      // Update history and reset future
      draft.history = [...state.history, oldState.resume];
      draft.future = [];
    }); 
  }
  ),
  deleteHandler: (sectionIndex: number, subSectionIndex?: number, descriptionIndex?: number) =>
    set((state) => {
      const oldState = produce(state, draft => {});  // Just copy the old state
      return produce(state, (draft) => {
        if (descriptionIndex !== undefined && subSectionIndex !== undefined) {
          if (
            draft.resume.sections[sectionIndex] &&
            draft.resume.sections[sectionIndex].subSections[subSectionIndex] &&
            draft.resume.sections[sectionIndex].subSections[subSectionIndex].descriptions[descriptionIndex]
          ) {
            draft.resume.sections[sectionIndex].subSections[subSectionIndex].descriptions.splice(descriptionIndex, 1);
          }
        } else if (subSectionIndex !== undefined) {
          if (
            draft.resume.sections[sectionIndex] &&
            draft.resume.sections[sectionIndex].subSections[subSectionIndex]
          ) {
            draft.resume.sections[sectionIndex].subSections.splice(subSectionIndex, 1);
          }
        } else if (draft.resume.sections[sectionIndex]) {
          draft.resume.sections.splice(sectionIndex, 1);
        }

        // Update history and reset future
        draft.history = [...state.history, oldState.resume];
        draft.future = [];
      });
    }),
  moveHandler: (
    oldIndex: number,
    newIndex: number,
    sectionIndex?: number, 
    subSectionIndex?: number
  ) => set((state) => {
    const oldState = produce(state, draft => {});  // Just copy the old state

    return produce(state, (draft) => {
      if (subSectionIndex !== undefined && sectionIndex !== undefined) {
        if (
          draft.resume.sections[sectionIndex] &&
          draft.resume.sections[sectionIndex].subSections[subSectionIndex]
        ) {
          const descriptions = draft.resume.sections[sectionIndex].subSections[subSectionIndex].descriptions;
          draft.resume.sections[sectionIndex].subSections[subSectionIndex].descriptions = moveArrayItem(descriptions, oldIndex, newIndex);
        }
      } else if (sectionIndex !== undefined) {
        if (
          draft.resume.sections[sectionIndex]
        ) {
          const subSections = draft.resume.sections[sectionIndex].subSections;
          draft.resume.sections[sectionIndex].subSections = moveArrayItem(subSections, oldIndex, newIndex);
        }
      } else {
        const sections = draft.resume.sections;
        draft.resume.sections = moveArrayItem(sections, oldIndex, newIndex);
      }

      // Update history and reset future
      draft.history = [...state.history, oldState.resume];
      draft.future = [];
    })
  }),
  undo: () => set((state) => {
    console.log(state.history)
    if (state.history.length === 0) {
      return state;  // No actions to undo, return current state
    }
    const [last, ...rest] = state.history.slice().reverse();
    console.log(last)
    return {
      ...state,
      history: rest.reverse(),
      resume: last,
      future: [state.resume, ...state.future]
    };
  }),
  redo: () => set((state) => {
    console.log(state.history)
    if (state.future.length === 0) {
      return state; 
    }
    const [next, ...rest] = state.future;
    return {
      ...state,
      history: [state.resume, ...state.history],
      resume: next,
      future: rest
    };
  }),
}));

export default useStore;
