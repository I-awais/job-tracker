import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const initialFormData = {
  companyName: '',
  roleTitle: '',
  jobLink: '',
  jobDescription: '',
  dateApplied: '',
  status: 'Applied',
};

function getInitialFormData(editingJob) {
  if (!editingJob) return initialFormData;

  return {
    companyName: editingJob.companyName || '',
    roleTitle: editingJob.roleTitle || '',
    jobLink: editingJob.jobLink || '',
    jobDescription: editingJob.jobDescription || '',
    dateApplied: editingJob.dateApplied || '',
    status: editingJob.status || 'Applied',
  };
}

function JobFormModal({
  isOpen,
  onOpenChange,
  onAddJob,
  onEditJob,
  editingJob,
}) {
  const [formData, setFormData] = useState(() =>
    getInitialFormData(editingJob),
  );

  const [error, setError] = useState('');
  const [isEditConfirmOpen, setIsEditConfirmOpen] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function resetForm() {
    setFormData(initialFormData);
    setError('');
  }

  function validateForm() {
    if (!formData.companyName.trim()) {
      setError('Company name is required.');
      return false;
    }

    if (!formData.roleTitle.trim()) {
      setError('Role title is required.');
      return false;
    }

    setError('');
    return true;
  }

  function handleCloseModal() {
    onOpenChange(false);

    if (!editingJob) {
      resetForm();
    }
  }

  function handleAddApplication() {
    if (!validateForm()) return;

    onAddJob(formData);

    resetForm();
    onOpenChange(false);
  }

  function handleUpdateClick() {
    if (!validateForm()) return;

    setIsEditConfirmOpen(true);
  }

  function handleConfirmEdit() {
    onEditJob({
      ...editingJob,
      ...formData,
    });

    setIsEditConfirmOpen(false);
    resetForm();
    onOpenChange(false);
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingJob ? 'Edit Application' : 'Add Application'}
            </DialogTitle>
          </DialogHeader>

          <form className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Google"
                />
              </div>

              <div className="space-y-2">
                <Label>Role Title</Label>
                <Input
                  name="roleTitle"
                  value={formData.roleTitle}
                  onChange={handleChange}
                  placeholder="Frontend Developer"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Job Link</Label>
              <Input
                name="jobLink"
                value={formData.jobLink}
                onChange={handleChange}
                placeholder="https://example.com/job"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Date Applied</Label>
                <Input
                  type="date"
                  name="dateApplied"
                  value={formData.dateApplied}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="Applied">Applied</option>
                  <option value="Phone Screen">Phone Screen</option>
                  <option value="Interview">Interview</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Offer">Offer</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Job Description</Label>
              <Textarea
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
                placeholder="Paste job description here..."
                className="min-h-32"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>

              {editingJob ? (
                <Button type="button" onClick={handleUpdateClick}>
                  Update Application
                </Button>
              ) : (
                <Button type="button" onClick={handleAddApplication}>
                  Add Application
                </Button>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isEditConfirmOpen} onOpenChange={setIsEditConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Update application?</AlertDialogTitle>
            <AlertDialogDescription>
              This will save your changes to this application.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction onClick={handleConfirmEdit}>
              Update
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default JobFormModal;
