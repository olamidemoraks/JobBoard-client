export interface User {
  Email: string;
  Password: string;
  AccountType: string;
}

export interface Profile {
  _id: string;
  Email: string;
  FName: string;
  LName: string;
  Headline: string;
  Country: string;
  Address: string;
  PCode: string;
  City_State: string;
  Mobileno: string;
  Gender: string;
  Skills: [string];
  Education: [Education];
  Work: [Work];
  Relocate: boolean;
  Remote: boolean;
  Website: [string];
  JobTitle: string;
  JobType: [string];
  Visibility: boolean;
  updatedAt: string;
  Photo: string;
  DOB: string;
}

export interface Education {
  Level: string;
  Field: string;
  CollegeName: string;
  EducationPeriod: string;
  Country: string;
  City_State: string;
}

export interface Applicant {
  Status: string;
  _id: string;
  JId: string;
  profile: Profile;
  createdAt: string;
  File: string;
  Title: string;
  Notes: string;
}

export interface Application {
  Status: string;
  _id: string;
  JId: string;
  Photo: string;
  Name: string;
  createdAt: string;
  File: string;
  Title: string;
}
export interface Work {
  JobTitle: string;
  Company: string;
  WorkPeriod: string;
  Description: string;
  Country: string;
  City_State: string;
}

export interface Company {
  _id: string;
  UId: string;
  Name: string;
  CompanyName: string;
  CompanyDesc: string;
  Location: string;
  Title: string;
  Url: string;
  CompanySize: string;
  Email: string;
  MobileNo: string;
  Logo: string;
  CompanySnippet: string;
  Status: string;
}

export interface Job {
  _id: string;
  CId: string;
  UId: string;
  saveId: string;
  Contact: string;
  Title: string;
  Description: string;
  CompanyName: string;
  CompanyLogo: string;
  Location: string;
  Address: string;
  EmploymentType: string;
  Deadline: string;
  HireNumber: string;
  isRemote: boolean;
  resume: string;
  Benefits: string[];
  PayMin: number;
  PayMax: number;
  Pitch: string;
  currency: "USD" | "CAD" | "NGN" | "GBP" | "AUD";
  frequency: "mo" | "yr" | "wk" | "day" | "hr";
  Skills: string[];
  Experience: string;
  isActive: boolean;
  Applicants: number;
  createdAt: string;
}

export interface Overview {
  firstFiveJob: Job[];
  applicantWithProfile: Applicant[];
  totalCandidates: number;
  totalJobs: number;
}
