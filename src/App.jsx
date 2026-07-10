import { useEffect, useState } from 'react';
import './App.css';
import JobFormModal from './components/JobFormModal';
import DashboardUI from './components/DashboardUI';
import HeaderUI from './components/HeaderUI';
import JobListingUI from './components/JobListingUI';

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
    <main className="job-tracker-shell">
      <HeaderUI />

      <div className="job-tracker-content">
        <JobFormModal
          key={editingJob ? editingJob.id : 'new'}
          isOpen={isModalOpen}
          onOpenChange={handleModalOpenChange}
          onAddJob={handleAddJob}
          onEditJob={handleEditJob}
          editingJob={editingJob}
        />

        <DashboardUI jobs={jobs} />

        <JobListingUI
          jobs={filteredJobs}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          onDeleteJob={handleDeleteJob}
          onStartEdit={handleOpenEditModal}
          onAddApplication={handleOpenAddModal}
          showDemoRows={
            jobs.length === 0 && searchTerm === '' && statusFilter === 'All'
          }
        />
      </div>
    </main>
  );
}
