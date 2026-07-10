import {
  BriefcaseBusiness,
  FileCheck2,
  Phone,
  Send,
  UsersRound,
  X,
} from 'lucide-react';
import './DashboardUI.css';

const demoStats = {
  total: 42,
  applied: 18,
  phoneScreen: 7,
  interview: 9,
  offer: 3,
  rejected: 5,
};

function countByStatus(jobs, status) {
  return jobs.filter((job) => job.status === status).length;
}

function getStats(jobs) {
  if (!jobs.length) {
    return demoStats;
  }

  return {
    total: jobs.length,
    applied: countByStatus(jobs, 'Applied'),
    phoneScreen: countByStatus(jobs, 'Phone Screen'),
    interview: countByStatus(jobs, 'Interview'),
    offer: countByStatus(jobs, 'Offer'),
    rejected: countByStatus(jobs, 'Rejected'),
  };
}

export default function DashboardUI({ jobs }) {
  const stats = getStats(jobs);
  const statCards = [
    {
      label: 'Total',
      value: stats.total,
      icon: FileCheck2,
      variant: 'blue',
    },
    {
      label: 'Applied',
      value: stats.applied,
      icon: Send,
      variant: 'sky',
    },
    {
      label: 'Phone Screen',
      value: stats.phoneScreen,
      icon: Phone,
      variant: 'violet',
    },
    {
      label: 'Interview',
      value: stats.interview,
      icon: UsersRound,
      variant: 'amber',
    },
    {
      label: 'Offer',
      value: stats.offer,
      icon: BriefcaseBusiness,
      variant: 'emerald',
    },
    {
      label: 'Rejected',
      value: stats.rejected,
      icon: X,
      variant: 'rose',
    },
  ];

  return (
    <section className="dashboard-ui" aria-labelledby="dashboard-title">
      <div className="dashboard-ui__heading">
        <h1 id="dashboard-title">Dashboard</h1>
        <p>Track your job applications and progress at a glance.</p>
      </div>

      <div className="dashboard-ui__stats" aria-label="Application stats">
        {statCards.map(({ label, value, icon: Icon, variant }) => (
          <article
            className={`dashboard-ui__stat-card dashboard-ui__stat-card--${variant}`}
            key={label}
          >
            <span className="dashboard-ui__stat-icon" aria-hidden="true">
              <Icon size={29} strokeWidth={2.3} />
            </span>
            <div>
              <p className="dashboard-ui__stat-label">{label}</p>
              <strong className="dashboard-ui__stat-value">{value}</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
