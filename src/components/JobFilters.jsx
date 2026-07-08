export default function JobFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-white p-4 sm:flex-row">
      <input
        type="text"
        placeholder="Search by company or role.."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
      />
      <select
        value={statusFilter}
        onChange={(e) => onStatusFilterChange(e.target.value)}
        className="rounded-md border border-input bg-background px-3 py-2 text-sm"
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
