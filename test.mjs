import { printType } from './dist/lib/index.js';

const o = {
  employeeNo: 540000,
  clientOrgId: 10,
  importId: 148,
  locationId: 5,
  clientEmployeeId: 'AH5400',
  clientEmployeeManagerId: '540001',
  firstName: 'John',
  lastName: 'Sagitta',
  jobTitle: 'Program Manager',
  jobCode: 'JF540',
  email: 'john.sagitta@acmesampleco.com',
  telephoneNumber: '+54 379 411-2233',
  function: 'Engineering / Manager',
  grade: 'C',
  previousJobTitle: 'Technical Lead',
  careerGoal: 'carerGoal',
  skillSet: [
    {
      name: 'C Sharp .NET',
      source: 'HRIS',
      skillType: 'Soft',
      proficiencyLevel: 1,
      experienceInYears: 0
    },
    {
      name: 'Azure',
      source: 'EE',
      skillType: 'na',
      proficiencyLevel: 3,
      experienceInYears: 0
    },
    {
      name: 'Terraform',
      source: 'EE',
      skillType: 'na',
      proficiencyLevel: 2,
      experienceInYears: 0
    },
    {
      name: 'Python',
      source: 'EE',
      skillType: 'na',
      proficiencyLevel: 3,
      experienceInYears: 0
    },
    {
      name: 'Java',
      source: 'HRIS',
      skillType: 'Soft',
      proficiencyLevel: 1,
      experienceInYears: 0
    },
    {
      name: 'Node.js',
      source: 'EE',
      skillType: 'na',
      proficiencyLevel: 3,
      experienceInYears: 0
    },
    {
      name: 'JavaScript',
      source: 'EE',
      skillType: 'na',
      proficiencyLevel: 2,
      experienceInYears: 0
    },
    {
      name: 'Linux',
      source: 'EE',
      skillType: 'na',
      proficiencyLevel: 3,
      experienceInYears: 0
    },
    {
      name: 'HTML',
      source: 'HRIS',
      skillType: 'Soft',
      proficiencyLevel: 1,
      experienceInYears: 0
    },
    {
      name: 'Cascading Style Sheets (CSS)',
      source: 'EE',
      skillType: 'na',
      proficiencyLevel: 3,
      experienceInYears: 0
    },
    {
      name: 'C++',
      source: 'HRIS',
      skillType: 'Soft',
      proficiencyLevel: 1,
      experienceInYears: 0
    },
    {
      name: 'Action Planning',
      source: 'EE',
      skillType: 'na',
      proficiencyLevel: 3,
      experienceInYears: 0
    },
    {
      name: 'Data Structures',
      source: 'EE',
      skillType: 'na',
      proficiencyLevel: 2,
      experienceInYears: 0
    },
    {
      name: 'Assessment',
      source: 'EE',
      skillType: 'na',
      proficiencyLevel: 3,
      experienceInYears: 0
    },
    {
      name: 'SQL',
      source: 'EE',
      skillType: 'na',
      proficiencyLevel: 3,
      experienceInYears: 0
    },
    {
      name: 'Application Development',
      source: 'EE',
      skillType: 'na',
      proficiencyLevel: 3,
      experienceInYears: 0
    }
  ],
  careerExperience: [
    {
      Id: 1,
      Company: 'Korn Ferry Digital',
      JobTitle: 'Software Engineer',
      JobEndDate: '2021-11-17T15:54:01.573Z',
      Description: 'HHRR',
      JobLocation: 'Greater Philadelphia Area',
      JobStartDate: '2017-10-28T03:00:00Z',
      EmploymentType: 'FullTime'
    },
    {
      Id: 2,
      Company: 'ACME Corp',
      JobTitle: 'Junior Software Developer',
      JobEndDate: '2017-10-28T03:00:00Z',
      Description: 'HHRR',
      JobLocation: 'New York NY',
      JobStartDate: '2017-10-28T03:00:00Z',
      EmploymentType: 'FullTime'
    },
    {
      Id: 3,
      Company: 'Neobric India LLP',
      JobTitle: 'Software Developer2',
      JobEndDate: '2017-10-28T03:00:00Z',
      Description: 'HHRR',
      JobLocation: 'Hyderabad',
      JobStartDate: '2017-10-28T03:00:00Z',
      EmploymentType: 'FullTime'
    }
  ],
  openToRelocation: 'true',
  openToNewRole: true,
  openToWorkRemote: false,
  languageSpoken: 'english',
  gender: 'male',
  jobLevel: 'C',
  businessUnitName: 'Client Business Unit name',
  jobDepartment: 'Engineering',
  jobSubDepartment: 'Managers',
  isManager: true,
  numberOfDirectReport: 2,
  tenureWithCompanyEmployedDt: '2018-11-17T00:00:00',
  tenureInRole: 3,
  ethnicity: 'european',
  birthYear: '1990',
  isExpat: true,
  postalCode: '10005',
  city: 'New York',
  state: 'New York',
  country: 'United States',
  location: 'Hyderabad, Bangalore',
  locationInterested: ['India', 'Hyderabad', 'Bhubaneswar'],
  employmentStatus: 'Contractor',
  educationLevel: 'Master',
  permanentContractor: 'true',
  weeklyHoursWorked: 40,
  managerFirstName: 'Daniel',
  managerLastName: 'Tsitsipás',
  currentResponsibilitie: 'Multiple projects scoped',
  previousResponsibilitie: 'Single project scoped',
  behavioralCompetencies: 'behavioralCompetencies',
  cognitiveAbility: '',
  driver: null,
  trait: null,
  fitForRoleScore: '',
  top3Strength:
    '[{"Name":"Data Load & Storage Strategy","Score":10 },{"Name":"Software Programming","Score":10},{"Name":"Security Setup","Score":10}]',
  top3DevelopmentNeed:
    '[{"Name":"Data Load & Storage Strategy","Score":10 },{"Name":"Software Programming","Score":10},{"Name":"Security Setup","Score":10}]',
  effectivenessScore: '90',
  replacementIndex: 'replacementIndex',
  isCompletedElearning: true,
  certification: [
    {
      Id: 1,
      EndDate: '2006-09-28T03:00:00Z',
      StartDate: '2006-09-28T03:00:00Z',
      FieldOfStudy: 'Graphic Design',
      SchoolOrInstitution: 'The University of the Arts',
      DegreeOrCertification: 'BFA'
    },
    {
      Id: 2,
      EndDate: '2010-09-28T03:00:00Z',
      StartDate: '2008-10-28T03:00:00Z',
      FieldOfStudy: 'Software development',
      SchoolOrInstitution: 'Harvard',
      DegreeOrCertification: 'Azure Practitioner'
    },
    {
      Id: 3,
      EndDate: '2012-09-28T03:00:00Z',
      StartDate: '2006-11-01T03:00:00Z',
      FieldOfStudy: 'Electrical Engineering',
      SchoolOrInstitution: 'MIT',
      DegreeOrCertification: 'Cable management expert'
    }
  ],
  qualification: '',
  additionalFieldOfStudy: 'Graphic Design',
  performanceRating: 85,
  performanceAgainstCurrentSpResponsibilitie: '80',
  spontaneousPerformanceFeedback: 'Exceeding Expectations',
  isHiPoStatus: true,
  jobRequisition: 'jobRequisition',
  projectTermAssignmentRequisition: 'projectTermAssignmentRequisition',
  internalCandidateResume: 'internalCandidateResume',
  marketInsightForRecruitingManager: 'marketInsightForRecruitingManager',
  companyId: 5405,
  industry: 'Oil Industry',
  ownershipType: 'ownershipType',
  ownershipTypeDetail: 'ownershipTypeDetail',
  isSubsidiaryStatus: true,
  isFamilyControl: true,
  annualBaseSalary: 120000,
  isAnnualIncentiveEligibility: true,
  actualAnnualIncentivePaid: 15000,
  annualTargetIncentive: 23000,
  kfSuccessProfileId: '540001',
  businessGroup: 'businessGroup',
  jobSubFunction: 'Project Development',
  previousJobTitleStartDt: '2015-08-28T00:00:00',
  previousJobTitleEndDt: '2021-10-14T00:00:00',
  systemField: 'employee',
  addedBy: 'Employee Experience',
  addedDt: '2021-11-08T12:19:53.756',
  updatedBy: 'EmployeeExperience',
  updatedDt: '2021-12-01T12:10:11.659793',
  isDeleted: false
};

printType(o);

