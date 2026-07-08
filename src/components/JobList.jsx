import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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

export default function JobList({ jobs, onDeleteJob, onStartEdit }) {
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
                    <Badge className={`w-24 ${getStatusClasses(job.status)}`}>
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onStartEdit(job)}
                        className="rounded-md border px-3 py-2 text-sm hover:bg-slate-50"
                      >
                        Edit
                      </Button>
                      <ConfirmDialog
                        trigger={
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-md border border-red-300 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            Delete
                          </Button>
                        }
                        title="Delete application?"
                        description={`This will remove the application for ${job.roleTitle} at ${job.companyName}.`}
                        confirmText="Delete"
                        variant="danger"
                        onConfirm={() => onDeleteJob(job.id)}
                      />
                      {/* <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDeleteJob(job.id)}
                        className="rounded-md border border-red-300 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </Button> */}
                    </div>
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
