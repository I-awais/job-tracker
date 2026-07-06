import { useState } from 'react';
import './App.css';
import AddJobForm from './components/AddJobForm';
import JobList from './components/JobList';
import DashboardStats from './components/DashboardStats';

const sampleList = [
  {
    id: 1,
    companyName: 'google',
    roleTitle: 'frontend',
    jobLink: '',
    jobDescription: 'reactjs developer',
    dateApplied: '',
    status: 'Applied',
  },
  {
    id: 2,
    companyName: 'Meta',
    roleTitle: 'Backend Developer',
    jobLink: '',
    jobDescription: 'Nodejs experience req',
    dateApplied: '',
    status: 'Rejected',
  },
  {
    id: 3,
    companyName: 'Amazon',
    roleTitle: 'Software Engineer',
    jobLink: '',
    jobDescription: 'needs 4 yr experiene',
    dateApplied: '',
    status: 'Offer',
  },
  {
    id: 4,
    companyName: 'Netflix',
    roleTitle: 'Software Engineer',
    jobLink: '',
    jobDescription: 'needs 4 yr experiene',
    dateApplied: '',
    status: 'Interview',
  },
  {
    id: 5,
    companyName: 'Youtube',
    roleTitle: 'Software Engineer',
    jobLink: '',
    jobDescription: 'needs 4 yr experiene',
    dateApplied: '',
    status: 'Offer',
  },
  {
    id: 6,
    companyName: 'Amazon',
    roleTitle: 'Software Engineer',
    jobLink: '',
    jobDescription: 'needs 4 yr experiene',
    dateApplied: '',
    status: 'Phone Screen',
  },
];
export default function App() {
  const [jobs, setJobs] = useState(sampleList);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.roleTitle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
    return matchesStatus && matchesSearch;
  });

  function handleDeleteJob(jobId) {
    setJobs(jobs.filter((job) => job.id !== jobId));
  }
  function handleUpdateStatus(jobId, newStatus) {
    setJobs(
      jobs.map((job) =>
        job.id === jobId ? { ...job, status: newStatus } : job,
      ),
    );
  }

  function handleAddJob(newJob) {
    const jobWithId = {
      id: Date.now(),
      ...newJob,
    };

    console.log(newJob);

    setJobs([jobWithId, ...jobs]);
  }
  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-2xl">
        <DashboardStats jobs={jobs} />
        <AddJobForm onAddJob={handleAddJob} />

        <div className="flex flex-col gap-4 rounded-lg border bg-white p-4 sm:flex-row">
          <input
            type="text"
            placeholder="Search by company or role.."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="All">All Statuses</option>
            <option value="Applied">Applied</option>
            <option value="Phone Screen">Phone Screen</option>
            <option value="Interview">Interview</option>
            <option value="Rejected">Rejected</option>
            <option value="Offer">Offer</option>
          </select>
        </div>

        <JobList
          jobs={filteredJobs}
          onUpdateStatus={handleUpdateStatus}
          onDeleteJob={handleDeleteJob}
        />
      </div>
    </main>
  );
}
