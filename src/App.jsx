import { useEffect, useState } from 'react';
import './App.css';
import JobList from './components/JobList';
import DashboardStats from './components/DashboardStats';
import JobFormModal from './components/JobFormModal';
import JobFilters from './components/JobFilters';
import { Button } from '@/components/ui/button';
//import { Separator } from '@base-ui/react';

// const sampleList = [
//   {
//     id: 1,
//     companyName: 'google',
//     roleTitle: 'frontend',
//     jobLink: '',
//     jobDescription: 'reactjs developer',
//     dateApplied: '',
//     status: 'Applied',
//   },
//   {
//     id: 2,
//     companyName: 'Meta',
//     roleTitle: 'Backend Developer',
//     jobLink: '',
//     jobDescription: 'Nodejs experience req',
//     dateApplied: '',
//     status: 'Rejected',
//   },
//   {
//     id: 3,
//     companyName: 'Amazon',
//     roleTitle: 'Software Engineer',
//     jobLink: '',
//     jobDescription: 'needs 4 yr experiene',
//     dateApplied: '',
//     status: 'Offer',
//   },
//   {
//     id: 4,
//     companyName: 'Netflix',
//     roleTitle: 'Software Engineer',
//     jobLink: '',
//     jobDescription: 'needs 4 yr experiene',
//     dateApplied: '',
//     status: 'Interview',
//   },
//   {
//     id: 5,
//     companyName: 'Youtube',
//     roleTitle: 'Software Engineer',
//     jobLink: '',
//     jobDescription: 'needs 4 yr experiene',
//     dateApplied: '',
//     status: 'Offer',
//   },
//   {
//     id: 6,
//     companyName: 'Amazon',
//     roleTitle: 'Software Engineer',
//     jobLink: '',
//     jobDescription: 'needs 4 yr experiene',
//     dateApplied: '',
//     status: 'Phone Screen',
//   },
// ];
export default function App() {
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem('jobs');

    if (savedJobs) {
      return JSON.parse(savedJobs);
    }

    return [];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  function handleAddJob(newJob) {
    const jobWithId = {
      id: Date.now(),
      ...newJob,
    };

    console.log(newJob);

    setJobs([jobWithId, ...jobs]);
  }
  function handleEditJob(updatedJob) {
    setJobs(jobs.map((job) => (job.id === updatedJob.id ? updatedJob : job)));
  }

  function handleDeleteJob(jobId) {
    setJobs(jobs.filter((job) => job.id !== jobId));
  }

  function handleOpenAddModal() {
    setEditingJob(null);
    setIsModalOpen(true);
  }

  function handleOpenEditModal(job) {
    setEditingJob(job);
    setIsModalOpen(true);
  }
  function handleModalOpenChange(open) {
    setIsModalOpen(open);

    if (!open) {
      setEditingJob(null);
    }
  }

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.roleTitle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
    return matchesStatus && matchesSearch;
  });
  return (
    <main
      className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.16),transparent_32%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.16),transparent_30%),linear-gradient(135deg,#f8fafc_0%,#eef2ff_45%,#f8fafc_100%)] px-4 py-6 text-slate-800 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl space-y-6 rounded-2xl border border-sky-100/70 bg-sky-50/55 p-4 shadow-xl shadow-blue-950/10 backdrop-blur-md sm:p-6">
        <div className="flex flex-col gap-4 rounded-xl border border-indigo-100 bg-white/85 p-6 shadow-sm shadow-indigo-100/60 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="bg-gradient-to-r from-indigo-800 via-blue-700 to-sky-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
              Job Tracker
            </h1>

            <p className="mt-1 text-sm text-slate-600">
              Track your applications, statuses, and job details in one place.
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleOpenAddModal}
              className="bg-indigo-500 text-white shadow-sm shadow-indigo-200 hover:bg-indigo-600"
            >
              Add Application
            </Button>
          </div>
        </div>
        <JobFormModal
          key={editingJob ? editingJob.id : 'new'}
          isOpen={isModalOpen}
          onOpenChange={handleModalOpenChange}
          onAddJob={handleAddJob}
          onEditJob={handleEditJob}
          editingJob={editingJob}
        />
        <DashboardStats jobs={jobs} />

        <JobFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />

        <JobList
          jobs={filteredJobs}
          onDeleteJob={handleDeleteJob}
          onStartEdit={handleOpenEditModal}
        />
      </div>
    </main>
    // <main className="min-h-screen bg-slate-100 p-6">
    //   <div className="mx-auto max-w-6xl space-y-6">
    //     <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
    //       <div>
    //         <h1 className="text-3xl font-bold tracking-tight">Job Tracker</h1>
    //         <p className="text-sm text-slate-500">
    //           Track applications, statuses, and job details in one place.
    //         </p>
    //       </div>

    //       <Button onClick={handleOpenAddModal}>Add Application</Button>
    //     </div>
    //     <Separator />
    //     <DashboardStats jobs={jobs} />
    //     <Separator />
    //     <JobFilters
    //       searchTerm={searchTerm}
    //       onSearchChange={setSearchTerm}
    //       statusFilter={statusFilter}
    //       onStatusFilterChange={setStatusFilter}
    //     />

    //     <JobList
    //       jobs={filteredJobs}
    //       onUpdateStatus={handleUpdateStatus}
    //       onDeleteJob={handleDeleteJob}
    //       onStartEdit={handleOpenEditModal}
    //     />

    //     <JobFormModal
    //       key={editingJob ? editingJob.id : 'new'}
    //       isOpen={isModalOpen}
    //       onOpenChange={handleModalOpenChange}
    //       onAddJob={handleAddJob}
    //       onEditJob={handleEditJob}
    //       editingJob={editingJob}
    //     />
    //   </div>
    // </main>
  );
}
