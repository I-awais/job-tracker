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
    <main className="min-h-screen bg-slate-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 rounded-xl border bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Job Tracker
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Track your applications, statuses, and job details in one place.
            </p>
          </div>

          <Button onClick={handleOpenAddModal}>Add Application</Button>
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
