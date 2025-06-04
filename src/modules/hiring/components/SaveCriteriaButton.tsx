import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Criterion } from "../types";
import { Loader2 } from "lucide-react";

interface Props {
  criteriaList: Criterion[];
}

export function SaveCriteriaButton({ criteriaList }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleSave() {
    setLoading(true);
    setError(null);
    try {
      const resp = await fetch("/api/criteria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ criteria: criteriaList }),
      });
      if (!resp.ok) throw new Error("Failed to save criteria");
      // Navigate to next step (e.g. live interview setup)
      navigate("/dashboard/interview-setup");
    } catch (err: any) {
      setError(err.message || "Could not save criteria");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
      <p className="text-sm text-gray-600">
        Need to make more edits? Use the Edit buttons or drag cards above.
      </p>
      <div className="flex flex-col items-end">
        <Button
          onClick={handleSave}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save & Continue"
          )}
        </Button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
} 