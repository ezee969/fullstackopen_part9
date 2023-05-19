interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface ExtendedCoursePartBase extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends ExtendedCoursePartBase {
  kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackground extends ExtendedCoursePartBase {
  backgroundMaterial: string;
  kind: 'background';
}

interface CoursePartRequirements extends ExtendedCoursePartBase {
  requirements: string[];
  kind: 'special';
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartRequirements;
