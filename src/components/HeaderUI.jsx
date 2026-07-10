import {
  BriefcaseBusiness,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  UserRound,
} from 'lucide-react';
import './HeaderUI.css';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, isActive: true },
  { label: 'Profile', icon: UserRound },
  { label: 'Docs', icon: FileText },
  { label: 'Settings', icon: Settings },
];

export default function HeaderUI() {
  return (
    <header className="header-ui">
      <a className="header-ui__brand" href="/" aria-label="Job Tracker home">
        <span className="header-ui__logo" aria-hidden="true">
          <BriefcaseBusiness size={30} strokeWidth={2.6} />
        </span>
        <span className="header-ui__brand-text">Job Tracker</span>
      </a>

      <nav className="header-ui__nav" aria-label="Main navigation">
        {navItems.map(({ label, icon: Icon, isActive }) => (
          <button
            className={`header-ui__nav-item ${
              isActive ? 'header-ui__nav-item--active' : ''
            }`}
            type="button"
            key={label}
          >
            <Icon size={20} strokeWidth={2.2} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <button className="header-ui__logout" type="button">
        <LogOut size={19} strokeWidth={2.1} />
        <span>Logout</span>
      </button>
    </header>
  );
}
