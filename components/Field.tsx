import type { ReactNode } from "react";

type Props = {
  id: string;
  label: string;
  icon: ReactNode;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  labelRight?: ReactNode;
  right?: ReactNode;
};

export default function Field({ id, label, icon, value, onChange, type = "text", autoComplete, labelRight, right }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <label htmlFor={id} className="text-ink">{label}</label>
        {labelRight}
      </div>
      <div className="mt-2 flex items-center gap-3 rounded-lg border border-slate-300 bg-surface px-3 py-3 focus-within:ring-2 focus-within:ring-navy">
        <span className="text-slate-500">{icon}</span>
        <input
          id={id}
          type={type}
          value={value}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent outline-none"
        />
        {right}
      </div>
    </div>
  );
}
