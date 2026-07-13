import { useState } from 'react';
import { Download, Eye, FileText, Pencil, Trash2, X } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import ConfirmDialog from './ConfirmDialog';

function getStatusClasses(status) {
  switch (status) {
    case 'Applied':
      return 'border-blue-300 bg-blue-50 text-blue-700';

    case 'Phone Screen':
      return 'border-purple-300 bg-purple-50 text-purple-700';

    case 'Interview':
      return 'border-yellow-300 bg-yellow-50 text-yellow-700';

    case 'Rejected':
      return 'border-red-300 bg-red-50 text-red-700';

    case 'Offer':
      return 'border-green-300 bg-green-50 text-green-700';

    default:
      return 'border-input bg-background text-foreground';
  }
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
    `Date Applied: ${job.dateApplied || 'N/A'}`,
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
        <p><strong>Date Applied:</strong> ${escapeHtml(job.dateApplied || 'N/A')}</p>
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

function DetailRow({ label, children }) {
  return (
    <div className="grid gap-1 rounded-lg border border-slate-200 bg-white/80 p-3 sm:grid-cols-[140px_1fr]">
      <dt className="text-sm font-medium text-slate-500">{label}</dt>
      <dd className="text-sm text-slate-800">{children || 'N/A'}</dd>
    </div>
  );
}

export default function JobList({ jobs, onDeleteJob, onStartEdit }) {
  const [viewingJob, setViewingJob] = useState(null);

  return (
    <>
      <Card className="border-indigo-100 bg-white/85 shadow-sm shadow-indigo-100/50 backdrop-blur">
        <CardHeader>
          <CardTitle>Applications</CardTitle>
        </CardHeader>
        <CardContent>
          {jobs.length === 0 ? (
            <p className="text-slate-600">No job applications added yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No.</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Date Applied</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.map((job, i) => (
                  <TableRow key={job.id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{job.companyName}</TableCell>
                    <TableCell>{job.roleTitle}</TableCell>
                    <TableCell>{job.dateApplied}</TableCell>
                    <TableCell>
                      <Badge
                        className={`w-24 ${getStatusClasses(job.status)}`}
                      >
                        {job.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="icon-sm"
                          variant="outline"
                          onClick={() => setViewingJob(job)}
                          className="border-sky-300 text-sky-700 hover:bg-sky-50"
                          title="View application"
                          aria-label={`View ${job.roleTitle} at ${job.companyName}`}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon-sm"
                          variant="outline"
                          onClick={() => onStartEdit(job)}
                          className="border-indigo-300 text-indigo-700 hover:bg-indigo-50"
                          title="Edit application"
                          aria-label={`Edit ${job.roleTitle} at ${job.companyName}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <ConfirmDialog
                          trigger={
                            <Button
                              size="icon-sm"
                              variant="outline"
                              className="border-red-300 text-red-600 hover:bg-red-50"
                              title="Delete application"
                              aria-label={`Delete ${job.roleTitle} at ${job.companyName}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          }
                          title="Delete application?"
                          description={`This will remove the application for ${job.roleTitle} at ${job.companyName}.`}
                          confirmText="Delete"
                          variant="danger"
                          onConfirm={() => onDeleteJob(job.id)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={Boolean(viewingJob)} onOpenChange={() => setViewingJob(null)}>
        <DialogContent className="sm:max-w-2xl">
          {viewingJob && (
            <>
              <DialogHeader>
                <DialogTitle>{viewingJob.roleTitle || 'Job Details'}</DialogTitle>
              </DialogHeader>

              <dl className="space-y-3">
                <DetailRow label="Company">
                  {viewingJob.companyName || 'N/A'}
                </DetailRow>
                <DetailRow label="Role">{viewingJob.roleTitle || 'N/A'}</DetailRow>
                <DetailRow label="Date Applied">
                  {viewingJob.dateApplied || 'N/A'}
                </DetailRow>
                <DetailRow label="Status">
                  <Badge className={getStatusClasses(viewingJob.status)}>
                    {viewingJob.status || 'N/A'}
                  </Badge>
                </DetailRow>
                <DetailRow label="Job URL">
                  {viewingJob.jobLink ? (
                    <a
                      href={viewingJob.jobLink}
                      target="_blank"
                      rel="noreferrer"
                      className="break-all text-blue-700 underline underline-offset-2"
                    >
                      {viewingJob.jobLink}
                    </a>
                  ) : (
                    'N/A'
                  )}
                </DetailRow>
                <DetailRow label="Description">
                  <span className="whitespace-pre-wrap">
                    {viewingJob.jobDescription || 'N/A'}
                  </span>
                </DetailRow>
              </dl>

              <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => downloadJobAsPdf(viewingJob)}
                >
                  <Download className="h-4 w-4" />
                  PDF
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => downloadJobAsDoc(viewingJob)}
                >
                  <FileText className="h-4 w-4" />
                  DOC
                </Button>
                <Button type="button" onClick={() => setViewingJob(null)}>
                  <X className="h-4 w-4" />
                  Close
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
