import { useState } from 'react';
import {
  ArrowDown,
  Download,
  Eye,
  FileText,
  Filter,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import ConfirmDialog from './ConfirmDialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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

function getJobFileName(job, extension) {
  const baseName = `${job.companyName || 'company'}-${job.roleTitle || 'job'}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  return `${baseName || 'job-application'}.${extension}`;
}

function getJobDetailsText(job) {
  return [
    `Company: ${job.companyName || 'N/A'}`,
    `Role: ${job.roleTitle || 'N/A'}`,
    `Date Applied: ${formatDate(job.dateApplied)}`,
    `Status: ${job.status || 'N/A'}`,
    `Job URL: ${job.jobLink || 'N/A'}`,
    '',
    'Description:',
    job.jobDescription || 'N/A',
  ].join('\n');
}

function downloadBlob(content, fileName, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapePdfText(value) {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

function wrapText(text, maxLength = 86) {
  return text.split('\n').flatMap((line) => {
    if (!line) return [''];

    const words = line.split(' ');
    const lines = [];
    let currentLine = '';

    words.forEach((word) => {
      const nextLine = currentLine ? `${currentLine} ${word}` : word;

      if (nextLine.length > maxLength && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = nextLine;
      }
    });

    return [...lines, currentLine];
  });
}

function downloadJobAsDoc(job) {
  const html = `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>${escapeHtml(job.roleTitle || 'Job Application')}</title>
      </head>
      <body>
        <h1>${escapeHtml(job.roleTitle || 'Job Application')}</h1>
        <p><strong>Company:</strong> ${escapeHtml(job.companyName || 'N/A')}</p>
        <p><strong>Date Applied:</strong> ${escapeHtml(formatDate(job.dateApplied))}</p>
        <p><strong>Status:</strong> ${escapeHtml(job.status || 'N/A')}</p>
        <p><strong>Job URL:</strong> ${escapeHtml(job.jobLink || 'N/A')}</p>
        <h2>Description</h2>
        <p>${escapeHtml(job.jobDescription || 'N/A').replace(/\n/g, '<br />')}</p>
      </body>
    </html>
  `;

  downloadBlob(
    html,
    getJobFileName(job, 'doc'),
    'application/msword;charset=utf-8',
  );
}

function downloadJobAsPdf(job) {
  const lines = wrapText(getJobDetailsText(job));
  const contentLines = lines
    .slice(0, 44)
    .map((line, index) => {
      const y = 760 - index * 16;
      return `BT /F1 11 Tf 48 ${y} Td (${escapePdfText(line)}) Tj ET`;
    })
    .join('\n');
  const stream = `${contentLines}\n`;
  const objects = [
    '1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj',
    '2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj',
    '3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >> endobj',
    '4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj',
    `5 0 obj << /Length ${stream.length} >> stream\n${stream}endstream endobj`,
  ];
  let pdf = '%PDF-1.4\n';
  const offsets = [0];

  objects.forEach((object) => {
    offsets.push(pdf.length);
    pdf += `${object}\n`;
  });

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
  });
  pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\n`;
  pdf += `startxref\n${xrefOffset}\n%%EOF`;

  downloadBlob(pdf, getJobFileName(job, 'pdf'), 'application/pdf');
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
  const [viewingJob, setViewingJob] = useState(null);
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
                        className="job-listing-ui__icon-button job-listing-ui__icon-button--view"
                        type="button"
                        onClick={() => setViewingJob(job)}
                        aria-label={`View ${job.companyName} application`}
                        title="View application"
                      >
                        <Eye size={19} strokeWidth={2.2} />
                      </button>

                      <button
                        className="job-listing-ui__icon-button job-listing-ui__icon-button--edit"
                        type="button"
                        onClick={() => {
                          if (!isDemoTable) onStartEdit(job);
                        }}
                        aria-label={`Edit ${job.companyName} application`}
                        title="Edit application"
                        disabled={isDemoTable}
                      >
                        <Pencil size={18} strokeWidth={2.2} />
                      </button>

                      <ConfirmDialog
                        trigger={
                          <button
                            className="job-listing-ui__icon-button job-listing-ui__icon-button--delete"
                            type="button"
                            aria-label={`Delete ${job.companyName} application`}
                            title="Delete application"
                            disabled={isDemoTable}
                          >
                            <Trash2 size={18} strokeWidth={2.2} />
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

      <Dialog open={Boolean(viewingJob)} onOpenChange={() => setViewingJob(null)}>
        <DialogContent className="sm:max-w-2xl">
          {viewingJob && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {viewingJob.roleTitle || 'Application Details'}
                </DialogTitle>
              </DialogHeader>

              <dl className="job-listing-ui__detail-list">
                <div className="job-listing-ui__detail-row">
                  <dt>Company</dt>
                  <dd>{viewingJob.companyName || 'N/A'}</dd>
                </div>
                <div className="job-listing-ui__detail-row">
                  <dt>Role</dt>
                  <dd>{viewingJob.roleTitle || 'N/A'}</dd>
                </div>
                <div className="job-listing-ui__detail-row">
                  <dt>Date Applied</dt>
                  <dd>{formatDate(viewingJob.dateApplied)}</dd>
                </div>
                <div className="job-listing-ui__detail-row">
                  <dt>Status</dt>
                  <dd>
                    <span
                      className={`job-listing-ui__status job-listing-ui__status--${getStatusSlug(
                        viewingJob.status,
                      )}`}
                    >
                      {viewingJob.status || 'N/A'}
                    </span>
                  </dd>
                </div>
                <div className="job-listing-ui__detail-row">
                  <dt>Job URL</dt>
                  <dd>
                    {viewingJob.jobLink ? (
                      <a
                        href={viewingJob.jobLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {viewingJob.jobLink}
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </dd>
                </div>
                <div className="job-listing-ui__detail-row job-listing-ui__detail-row--description">
                  <dt>Description</dt>
                  <dd>{viewingJob.jobDescription || 'N/A'}</dd>
                </div>
              </dl>

              <div className="job-listing-ui__modal-actions">
                <button type="button" onClick={() => downloadJobAsPdf(viewingJob)}>
                  <Download size={18} strokeWidth={2.2} />
                  <span>PDF</span>
                </button>
                <button type="button" onClick={() => downloadJobAsDoc(viewingJob)}>
                  <FileText size={18} strokeWidth={2.2} />
                  <span>DOC</span>
                </button>
                <button type="button" onClick={() => setViewingJob(null)}>
                  <X size={18} strokeWidth={2.2} />
                  <span>Close</span>
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
