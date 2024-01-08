'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ExperienceItem } from '@/lib/types';

interface ExperienceFormProps {
  initialData?: ExperienceItem;
  onSave: (data: ExperienceItem) => void;
  onCancel: () => void;
}

export function ExperienceForm({ initialData, onSave, onCancel }: ExperienceFormProps) {
  const [formData, setFormData] = useState<ExperienceItem>(
    initialData || {
      id: uuidv4(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      highlights: [''],
    }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleHighlightChange = (index: number, value: string) => {
    const newHighlights = [...formData.highlights];
    newHighlights[index] = value;
    setFormData((prev) => ({ ...prev, highlights: newHighlights }));
  };

  const addHighlight = () => {
    setFormData((prev) => ({
      ...prev,
      highlights: [...prev.highlights, ''],
    }));
  };

  const removeHighlight = (index: number) => {
    const newHighlights = [...formData.highlights];
    newHighlights.splice(index, 1);
    setFormData((prev) => ({ ...prev, highlights: newHighlights }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter out empty highlights
    const cleanedData = {
      ...formData,
      highlights: formData.highlights.filter((h) => h.trim() !== ''),
    };
    onSave(cleanedData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="position" className="block text-sm font-medium mb-1">
            Position *
          </label>
          <input
            id="position"
            name="position"
            type="text"
            required
            value={formData.position}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-1">
            Company *
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            value={formData.company}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-1">
            Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            value={formData.location || ''}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="startDate" className="block text-sm font-medium mb-1">
              Start Date *
            </label>
            <input
              id="startDate"
              name="startDate"
              type="text"
              placeholder="e.g., Jan 2020"
              required
              value={formData.startDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="endDate" className="block text-sm font-medium mb-1">
              End Date
            </label>
            <input
              id="endDate"
              name="endDate"
              type="text"
              placeholder="e.g., Present"
              value={formData.endDate || ''}
              onChange={handleInputChange}
              disabled={formData.current}
              className="w-full p-2 border rounded-md disabled:bg-muted"
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center mb-4">
          <input
            id="current"
            name="current"
            type="checkbox"
            checked={formData.current || false}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label htmlFor="current" className="ml-2 block text-sm">
            I currently work here
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={formData.description || ''}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Key Achievements/Responsibilities</label>
        {formData.highlights.map((highlight, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={highlight}
              onChange={(e) => handleHighlightChange(index, e.target.value)}
              className="flex-1 p-2 border rounded-md"
              placeholder="e.g., Increased sales by 20%"
            />
            <button
              type="button"
              onClick={() => removeHighlight(index)}
              className="px-2 py-1 text-sm bg-destructive/10 text-destructive rounded-md hover:bg-destructive/20"
              disabled={formData.highlights.length <= 1}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addHighlight}
          className="text-sm text-primary hover:underline"
        >
          + Add Another Highlight
        </button>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded-md text-muted-foreground hover:bg-muted"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Save
        </button>
      </div>
    </form>
  );
} 