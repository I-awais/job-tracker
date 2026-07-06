import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

const initialFormData = {
  companyName: '',
  roleTitle: '',
  jobLink: '',
  jobDescription: '',
  dateApplied: '',
  status: 'Applied',
};
export default function AddJobForm({ onAddJob }) {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.companyName.trim()) {
      setError('Company name is required.');
      return;
    }

    // if (!formData.roleTitle.trim()) {
    //   setError('Role title is required.');
    //   return;
    // }
    // if (!formData.jobDescription.trim()) {
    //   setError('Job description is required.');
    //   return;
    // }
    // if (!formData.dateApplied.trim()) {
    //   setError('Applying date is required.');
    //   return;
    // }
    // if (!formData.jobLink.trim()) {
    //   setError('Job URL is required.');
    //   return;
    // }
    onAddJob(formData);
    setFormData(initialFormData);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Tracker</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2 mb-1">
            <Label>Company Name</Label>
            <Input
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Google"
            />
          </div>
          <div className="space-y-2 mb-1">
            <Label>Role Title</Label>
            <Input
              name="roleTitle"
              value={formData.roleTitle}
              onChange={handleChange}
              placeholder="Frontend Developer"
            />
          </div>

          <div className="space-y-2 mb-1">
            <Label>Job Description</Label>
            <Textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              placeholder="Paste job description here..."
            />
          </div>
          <div className="space-y-2 mb-1">
            <Label>Job Link</Label>
            <Input
              name="jobLink"
              value={formData.jobLink}
              onChange={handleChange}
              placeholder="https://example.com/job"
            />
          </div>
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
          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="submit" className="w-full">
            Add Job
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
