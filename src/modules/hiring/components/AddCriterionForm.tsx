import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Criterion } from "../types";

interface Props {
  onAdd: (newCriterion: Criterion) => void;
}

export function AddCriterionForm({ onAdd }: Props) {
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");

  function handleAdd() {
    if (!label.trim()) return;
    const newCriterion: Criterion = {
      id: `manual-${Date.now()}`,
      label: label.trim(),
      description: description.trim(),
      synonyms: [],
      weight: 3,
      isFromJD: false,
    };
    onAdd(newCriterion);
    setLabel("");
    setDescription("");
  }

  return (
    <div className="flex flex-col space-y-2 bg-gray-50 p-4 rounded-lg">
      <h4 className="text-sm font-medium text-gray-700">+ Add a new criterion</h4>
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          placeholder="Criterion label (e.g. 'Design Thinking')"
          value={label}
          onChange={(e) => setLabel(e.currentTarget.value)}
          className="flex-1"
        />
        <Input
          placeholder="Short description (optional)"
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
          className="flex-1"
        />
      </div>
      <Button
        onClick={handleAdd}
        disabled={!label.trim()}
        className="self-start"
      >
        Add Criterion
      </Button>
    </div>
  );
} 