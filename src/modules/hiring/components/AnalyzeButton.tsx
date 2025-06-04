import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface Props {
  loading: boolean;
  error: string | null;
  onClick: () => void;
}

export function AnalyzeButton({ loading, error, onClick }: Props) {
  return (
    <div className="flex flex-col items-start space-y-2 mt-6">
      <Button
        onClick={onClick}
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          "Analyze JD & Extract Criteria"
        )}
      </Button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
} 