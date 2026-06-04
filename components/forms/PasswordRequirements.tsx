import React from "react";
import { Check, X } from "lucide-react";

interface PasswordRequirementsProps {
  password?: string;
}

export const PasswordRequirements = ({ password = "" }: PasswordRequirementsProps) => {
  const requirements = [
    {
      id: "length",
      label: "At least 8 characters",
      met: password.length >= 8,
    },
    {
      id: "uppercase",
      label: "At least one uppercase letter",
      met: /[A-Z]/.test(password),
    },
    {
      id: "lowercase",
      label: "At least one lowercase letter",
      met: /[a-z]/.test(password),
    },
    {
      id: "number",
      label: "At least one number",
      met: /\d/.test(password),
    },
  ];

  return (
    <div className="space-y-2 rounded-lg bg-gray-900/50 p-3 border border-gray-800 text-xs">
      <p className="font-medium text-gray-400">Password requirements:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {requirements.map((req) => (
          <div key={req.id} className="flex items-center gap-2">
            {req.met ? (
              <Check className="h-4.5 w-4.5 text-green-500 bg-green-500/10 p-0.5 rounded-full" />
            ) : (
              <X className="h-4.5 w-4.5 text-gray-500 bg-gray-800 p-0.5 rounded-full" />
            )}
            <span className={req.met ? "text-gray-300" : "text-gray-500"}>
              {req.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
