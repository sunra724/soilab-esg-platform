import { Badge } from "@/components/ui/badge";

const users = [
  ["admin@soilabcoop.kr", "admin", "소이랩"],
  ["consultant@soilabcoop.kr", "consultant", "SOILAB ESG"],
  ["company@example.com", "company", "데모기업"]
];

export default function AdminUsersPage() {
  return (
    <div className="grid gap-6">
      <div>
        <span className="text-sm font-bold text-water-600">Users</span>
        <h1 className="mt-2 text-3xl font-black text-ink-950">사용자 역할</h1>
      </div>
      <div className="grid gap-3">
        {users.map(([email, role, org]) => (
          <div className="surface grid gap-4 rounded-md p-5 md:grid-cols-[1fr_auto] md:items-center" key={email}>
            <div>
              <h2 className="text-lg font-bold text-ink-950">{email}</h2>
              <p className="mt-1 text-sm text-ink-600">{org}</p>
            </div>
            <Badge tone={role === "admin" ? "earth" : role === "consultant" ? "water" : "ink"}>{role}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
