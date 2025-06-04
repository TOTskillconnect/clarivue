import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Criterion } from "../types";

interface Props {
  criterion: Criterion;
  onSave: (updated: Criterion) => void;
  onClose: () => void;
}

export function EditCriterionModal({ criterion, onSave, onClose }: Props) {
  const [label, setLabel] = useState(criterion.label);
  const [description, setDescription] = useState(criterion.description);
  const [synonymsText, setSynonymsText] = useState(criterion.synonyms.join(", "));
  const [weight, setWeight] = useState(criterion.weight.toString());

  function handleSave() {
    const updated: Criterion = {
      ...criterion,
      label: label.trim(),
      description: description.trim(),
      synonyms: synonymsText.split(",").map((s) => s.trim()).filter(Boolean),
      weight: parseInt(weight, 10) || criterion.weight,
    };
    onSave(updated);
  }

  return (
    <Dialog open onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Criterion</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Label</span>
            <Input
              value={label}
              onChange={(e) => setLabel(e.currentTarget.value)}
              className="mt-1"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Description / Example Phrase</span>
            <Textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
              className="mt-1"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Synonyms / Keywords (comma-separated)</span>
            <Input
              value={synonymsText}
              onChange={(e) => setSynonymsText(e.currentTarget.value)}
              placeholder="e.g. AWS, Azure, Kubernetes"
              className="mt-1"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Weight (1–5)</span>
            <Input
              type="number"
              min="1"
              max="5"
              value={weight}
              onChange={(e) => setWeight(e.currentTarget.value)}
              className="mt-1 w-20"
            />
          </label>
        </div>
        <DialogFooter className="mt-6">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 