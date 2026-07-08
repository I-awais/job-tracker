export default function JobFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-indigo-100 bg-white/85 p-4 shadow-sm shadow-indigo-100/50 backdrop-blur dark:border-violet-300/20 dark:bg-slate-950/55 dark:shadow-violet-950/30 sm:flex-row">
      <input
        type="text"
        placeholder="Search by company or role.."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm dark:border-violet-300/20 dark:bg-indigo-950/70 dark:text-slate-50 dark:placeholder:text-slate-50"
      />
      <select
        value={statusFilter}
        onChange={(e) => onStatusFilterChange(e.target.value)}
        className="rounded-md border border-input bg-background px-3 py-2 text-sm dark:border-violet-300/20 dark:bg-indigo-950/70 dark:text-slate-50"
      >
        <option value="All">All Statuses</option>
        <option value="Applied">Applied</option>
        <option value="Phone Screen">Phone Screen</option>
        <option value="Interview">Interview</option>
        <option value="Rejected">Rejected</option>
        <option value="Offer">Offer</option>
      </select>
    </div>
  );
}
