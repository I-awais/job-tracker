import {
  ArrowDown,
  Eye,
  Filter,
  MoreVertical,
  Plus,
  Search,
} from 'lucide-react';
import ConfirmDialog from './ConfirmDialog';
import './JobListingUI.css';

const demoApplications = [
  {
    id: 'demo-google',
    companyName: 'Google',
    roleTitle: 'Software Engineer II',
    dateApplied: 'May 12, 2024',
    status: 'Interview',
    logo: 'G',
  },
  {
    id: 'demo-microsoft',
    companyName: 'Microsoft',
    roleTitle: 'Product Manager',
    dateApplied: 'May 8, 2024',
    status: 'Phone Screen',
    logo: 'M',
  },
  {
    id: 'demo-shopify',
    companyName: 'Shopify',
    roleTitle: 'Backend Developer',
    dateApplied: 'May 5, 2024',
    status: 'Applied',
    logo: 'S',
  },
  {
    id: 'demo-amazon',
    companyName: 'Amazon',
    roleTitle: 'Software Development Engineer',
    dateApplied: 'Apr 30, 2024',
    status: 'Interview',
    logo: 'a',
  },
  {
    id: 'demo-meta',
    companyName: 'Meta',
    roleTitle: 'Data Scientist',
    dateApplied: 'Apr 25, 2024',
    status: 'Rejected',
    logo: 'M',
  },
  {
    id: 'demo-notion',
    companyName: 'Notion',
    roleTitle: 'Frontend Engineer',
    dateApplied: 'Apr 20, 2024',
    status: 'Offer',
    logo: 'N',
  },
  {
    id: 'demo-airbnb',
    companyName: 'Airbnb',
    roleTitle: 'Product Designer',
    dateApplied: 'Apr 18, 2024',
    status: 'Applied',
    logo: 'A',
  },
];

const statusOptions = [
  'All',
  'Applied',
  'Phone Screen',
  'Interview',
  'Offer',
  'Rejected',
];

function formatDate(dateApplied) {
  if (!dateApplied) return 'Not set';

  const parsedDate = new Date(`${dateApplied}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return dateApplied;
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(parsedDate);
}

function getStatusSlug(status) {
  return status.toLowerCase().replace(/\s+/g, '-');
}

function getCompanySlug(companyName) {
  return companyName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

export default function JobListingUI({
  jobs,
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onDeleteJob,
  onStartEdit,
  onAddApplication,
  showDemoRows = false,
}) {
  const applications = showDemoRows ? demoApplications : jobs;
  const isDemoTable = showDemoRows;

  return (
    <section className="job-listing-ui" aria-label="Job applications">
      <div className="job-listing-ui__toolbar">
        <label className="job-listing-ui__search">
          <Search size={21} strokeWidth={2.1} aria-hidden="true" />
          <span className="sr-only">Search applications</span>
          <input
            type="search"
            placeholder="Search companies or roles..."
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </label>

        <label className="job-listing-ui__filter">
          <Filter size={20} strokeWidth={2.1} aria-hidden="true" />
          <span className="sr-only">Filter by status</span>
          <select
            value={statusFilter}
            onChange={(event) => onStatusFilterChange(event.target.value)}
          >
            {statusOptions.map((status) => (
              <option value={status} key={status}>
                {status === 'All' ? 'All Statuses' : status}
              </option>
            ))}
          </select>
        </label>

        <button
          className="job-listing-ui__add-button"
          type="button"
          onClick={onAddApplication}
        >
          <Plus size={22} strokeWidth={2.2} />
          <span>Add Application</span>
        </button>
      </div>

      <div className="job-listing-ui__table-wrap">
        <table className="job-listing-ui__table">
          <thead>
            <tr>
              <th scope="col">Company</th>
              <th scope="col">Role</th>
              <th scope="col">
                <span className="job-listing-ui__sortable-heading">
                  Date Applied
                  <ArrowDown size={16} strokeWidth={2.1} aria-hidden="true" />
                </span>
              </th>
              <th scope="col">Status</th>
              <th scope="col" className="job-listing-ui__actions-heading">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td className="job-listing-ui__empty" colSpan="5">
                  No applications match your current filters.
                </td>
              </tr>
            ) : (
              applications.map((job) => (
                <tr key={job.id}>
                  <td>
                    <div className="job-listing-ui__company">
                      <span
                        className={`job-listing-ui__company-logo job-listing-ui__company-logo--${getCompanySlug(
                          job.companyName,
                        )}`}
                        aria-hidden="true"
                      >
                        {job.logo || job.companyName.charAt(0)}
                      </span>
                      <span>{job.companyName}</span>
                    </div>
                  </td>
                  <td>{job.roleTitle}</td>
                  <td>{formatDate(job.dateApplied)}</td>
                  <td>
                    <span
                      className={`job-listing-ui__status job-listing-ui__status--${getStatusSlug(
                        job.status,
                      )}`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td>
                    <div className="job-listing-ui__actions">
                      <button
                        className="job-listing-ui__icon-button"
                        type="button"
                        onClick={() => {
                          if (!isDemoTable) onStartEdit(job);
                        }}
                        aria-label={`View ${job.companyName} application`}
                      >
                        <Eye size={19} strokeWidth={2.2} />
                      </button>

                      <ConfirmDialog
                        trigger={
                          <button
                            className="job-listing-ui__icon-button"
                            type="button"
                            aria-label={`Delete ${job.companyName} application`}
                          >
                            <MoreVertical size={19} strokeWidth={2.2} />
                          </button>
                        }
                        title="Delete application?"
                        description={`This will remove the application for ${job.roleTitle} at ${job.companyName}.`}
                        confirmText="Delete"
                        variant="danger"
                        onConfirm={() => {
                          if (!isDemoTable) onDeleteJob(job.id);
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
