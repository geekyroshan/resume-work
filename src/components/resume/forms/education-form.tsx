'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EducationItem } from '@/lib/types';

interface EducationFormProps {
  initialData?: EducationItem;
  onSave: (data: EducationItem) => void;
  onCancel: () => void;
}

export function EducationForm({ initialData, onSave, onCancel }: EducationFormProps) {
  const [formData, setFormData] = useState<EducationItem>(
    initialData || {
      id: uuidv4(),
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: '',
      achievements: [''],
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

  const handleAchievementChange = (index: number, value: string) => {
    const newAchievements = [...(formData.achievements || [])];
    newAchievements[index] = value;
    setFormData((prev) => ({ ...prev, achievements: newAchievements }));
  };

  const addAchievement = () => {
    setFormData((prev) => ({
      ...prev,
      achievements: [...(prev.achievements || []), ''],
    }));
  };

  const removeAchievement = (index: number) => {
    const newAchievements = [...(formData.achievements || [])];
    newAchievements.splice(index, 1);
    setFormData((prev) => ({ ...prev, achievements: newAchievements }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter out empty achievements
    const cleanedData = {
      ...formData,
      achievements: formData.achievements?.filter((a) => a.trim() !== ''),
    };
    onSave(cleanedData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="institution" className="block text-sm font-medium mb-1">
            Institution *
          </label>
          <input
            id="institution"
            name="institution"
            type="text"
            required
            value={formData.institution}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="degree" className="block text-sm font-medium mb-1">
            Degree *
          </label>
          <input
            id="degree"
            name="degree"
            type="text"
            required
            value={formData.degree}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="field" className="block text-sm font-medium mb-1">
            Field of Study
          </label>
          <input
            id="field"
            name="field"
            type="text"
            value={formData.field || ''}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="startDate" className="block text-sm font-medium mb-1">
              Start Date *
            </label>
            <input
              id="startDate"
              name="startDate"
              type="text"
              placeholder="e.g., Sep 2018"
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
              placeholder="e.g., May 2022"
              value={formData.endDate || ''}
              onChange={handleInputChange}
              disabled={formData.current}
              className="w-full p-2 border rounded-md disabled:bg-muted"
            />
          </div>
        </div>
        <div>
          <label htmlFor="gpa" className="block text-sm font-medium mb-1">
            GPA
          </label>
          <input
            id="gpa"
            name="gpa"
            type="text"
            placeholder="e.g., 3.8/4.0"
            value={formData.gpa || ''}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
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
            I am currently studying here
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Achievements & Activities
        </label>
        {formData.achievements?.map((achievement, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={achievement}
              onChange={(e) => handleAchievementChange(index, e.target.value)}
              className="flex-1 p-2 border rounded-md"
              placeholder="e.g., Dean's List (2019-2022)"
            />
            <button
              type="button"
              onClick={() => removeAchievement(index)}
              className="px-2 py-1 text-sm bg-destructive/10 text-destructive rounded-md hover:bg-destructive/20"
              disabled={(formData.achievements?.length || 0) <= 1}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addAchievement}
          className="text-sm text-primary hover:underline"
        >
          + Add Another Achievement
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