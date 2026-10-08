import { Sparkle } from "lucide-react";

export default function Logo() {
  return (
    <span className="flex items-center gap-2">
      <span className="grid h-8 w-8 place-items-center bg-white">
        <Sparkle className="h-4 w-4 fill-blue-600 text-blue-600" />
      </span>
      <span className="font-display text-xl font-bold text-navy">Max Solution</span>
    </span>
  );
}
