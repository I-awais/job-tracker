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
    <div className="grid gap-4  sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
      <Card className="border border-taupe-700 bg-taupe-50 text-taupe-700 flex-row justify-between dark:border-slate-300/40 dark:bg-slate-300/70 dark:text-slate-100">
        <CardHeader className={'self-center'}>
          <CardTitle className="text-sm font-medium">Total</CardTitle>
        </CardHeader>
        <CardContent className={'self-center'}>
          <p className="text-2xl font-bold">{total}</p>
        </CardContent>
      </Card>

      <Card className=" border border-blue-700 bg-blue-50 text-blue-700 flex flex-row justify-between dark:border-blue-300/40 dark:bg-blue-300/55 dark:text-blue-100 ">
        <CardHeader className={'self-center'}>
          <CardTitle className="text-sm font-medium">Applied</CardTitle>
        </CardHeader>
        <CardContent className={'self-center'}>
          <p className="text-2xl font-bold">{applied}</p>
        </CardContent>
      </Card>
      <Card className="border border-purple-300 bg-purple-50 text-purple-700 flex flex-row justify-between dark:border-violet-300/40 dark:bg-violet-300/55 dark:text-violet-100 ">
        <CardHeader className={'self-center grow'}>
          <CardTitle className="text-sm font-medium">Phone Screen</CardTitle>
        </CardHeader>
        <CardContent className={'self-center'}>
          <p className="text-2xl font-bold">{phoneScreen}</p>
        </CardContent>
      </Card>
      <Card className="border border-yellow-300 bg-yellow-50 text-yellow-700 flex flex-row justify-between dark:border-amber-300/40 dark:bg-amber-300/45 dark:text-amber-100 ">
        <CardHeader className={'self-center'}>
          <CardTitle className="text-sm font-medium">Interviews</CardTitle>
        </CardHeader>
        <CardContent className={'self-center'}>
          <p className="text-2xl font-bold">{interviews}</p>
        </CardContent>
      </Card>
      <Card
        className={
          'border border-green-300 bg-green-50 text-green-700 flex flex-row justify-between dark:border-emerald-300/40 dark:bg-emerald-300/45 dark:text-emerald-100 '
        }
      >
        <CardHeader className={'self-center'}>
          <CardTitle className="text-sm font-medium">Offers</CardTitle>
        </CardHeader>
        <CardContent className={'self-center'}>
          <p className="text-2xl font-bold">{offers}</p>
        </CardContent>
      </Card>
      <Card
        className={
          'border border-red-300 bg-red-50 text-red-700 flex flex-row justify-between dark:border-rose-300/40 dark:bg-rose-300/45 dark:text-rose-100 '
        }
      >
        <CardHeader className={'self-center'}>
          <CardTitle className="text-sm font-medium">Rejected</CardTitle>
        </CardHeader>
        <CardContent className={'self-center'}>
          <p className="text-2xl font-bold">{rejected}</p>
        </CardContent>
      </Card>
    </div>
  );
}
