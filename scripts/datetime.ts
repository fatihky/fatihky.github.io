// Local (not UTC) ISO-8601 datetime with offset, e.g. 2026-10-11T14:30:05+03:00
export function nowLocalISO(): string {
  const d = new Date();
  const pad = (n: number, len = 2) => String(Math.abs(n)).padStart(len, "0");
  const offset = -d.getTimezoneOffset();
  const sign = offset >= 0 ? "+" : "-";
  const hh = Math.floor(Math.abs(offset) / 60);
  const mm = Math.abs(offset) % 60;
  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
    `T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}` +
    `${sign}${pad(hh)}:${pad(mm)}`
  );
}
