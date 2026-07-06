import { useState } from 'react';
import './App.css';
import AddJobForm from './components/AddJobForm';
import JobList from './components/JobList';
import DashboardStats from './components/DashboardStats';

function App() {
  const [jobs, setJobs] = useState([
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
  ]);

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
        <JobList
          jobs={jobs}
          onUpdateStatus={handleUpdateStatus}
          onDeleteJob={handleDeleteJob}
        />
      </div>
    </main>
  );
}

export default App;
