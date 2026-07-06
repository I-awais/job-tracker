import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export default function DashboardStats({ jobs }) {
  const total = jobs.length;
  const applied = jobs.filter((job) => job.status === 'Applied').length;
  const phoneScreen = jobs.filter(
    (job) => job.status === 'Phone Screen',
  ).length;
  const interviews = jobs.filter((job) => job.status === 'Interview').length;
  const offers = jobs.filter((job) => job.status === 'Offer').length;
  const rejected = jobs.filter((job) => job.status === 'Rejected').length;
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <Card className={'border-taupe-300 bg-taupe-50 text-taupe-700'}>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Total</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{total}</p>
        </CardContent>
      </Card>

      <Card className="border-blue-300 bg-blue-50 text-blue-700">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Applied</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{applied}</p>
        </CardContent>
      </Card>
      <Card className="border-purple-300 bg-purple-50 text-purple-700">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Phone Screen</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{phoneScreen}</p>
        </CardContent>
      </Card>
      <Card className="border-yellow-300 bg-yellow-50 text-yellow-700">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Interviews</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{interviews}</p>
        </CardContent>
      </Card>
      <Card className={'border-green-300 bg-green-50 text-green-700'}>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Offers</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{offers}</p>
        </CardContent>
      </Card>
      <Card className={'border-red-300 bg-red-50 text-red-700'}>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Rejected</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{rejected}</p>
        </CardContent>
      </Card>
    </div>
  );
}
