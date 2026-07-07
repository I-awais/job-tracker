import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

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

export default function JobList({ jobs, onUpdateStatus, onDeleteJob }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Applications</CardTitle>
      </CardHeader>
      <CardContent>
        {jobs.length === 0 ? (
          <p>No job applications added yet.</p>
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
                    <select
                      name="status"
                      value={job.status}
                      onChange={(e) => onUpdateStatus(job.id, e.target.value)}
                      className={`rounded-md border px-3 py-2 text-sm font-medium ${getStatusClasses(
                        job.status,
                      )}`}
                    >
                      <option value="Applied">Applied</option>
                      <option value="Phone Screen">Phone Screen</option>
                      <option value="Interview">Interview</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Offer">Offer</option>
                    </select>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => onDeleteJob(job.id)}
                      className="rounded-md border border-red-300 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
