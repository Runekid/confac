import { ProjectConfig } from './models';


const projectConfig: ProjectConfig = {
  amount: 1, // amount of projects to insert

  // endDate: new Date('2023-02-01'),
  startDate: new Date('2023-04-01'),

  partnerProbability: 0.5,
  noEndDateProbability: 0.2,
};


const projectMonthsConfig = {
  amount: 1,
};


const invoicesConfig = {
  amount: 1,
}


export const config = {
  clients: 0, // amount of clients to insert
  consultants: 0, // amount of consultants to insert
  projects: projectConfig,
  invoices: invoicesConfig,
  projectMonths: projectMonthsConfig,
  roles: ['admin'], // insert basic admin role if it doesn't yet exist
};
