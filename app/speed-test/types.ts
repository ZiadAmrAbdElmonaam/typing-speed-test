export interface TypingTest {
  paragraph: string;
  level: number;
  testTime: number;
  companyId: number;
  jobAssignmentId: number;
  passCriteria: string;
  id: number;
}

export interface TestResult {
  wordsPerMinute: number;
  consumedTime: number;
  accuracy: number;
  keyStrokesPerMinute: number;
  countOfWrongLetters: number;
  urlRootParameterGuid: string;
  isDeleted: boolean;
}

export interface TypingResult {
  wordsPerMinute: number;
  accuracy: number;
  totalCharacters: number;
  timeInSeconds: number;
  // ... other fields
} 