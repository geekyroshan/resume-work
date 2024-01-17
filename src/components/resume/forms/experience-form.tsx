'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

interface ExperienceFormData {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  highlights: string[];
}

interface ExperienceFormProps {
  initialData?: Partial<ExperienceFormData>;
  onSave: (data: ExperienceFormData) => void;
  onCancel: () => void;
}

export function ExperienceForm({ initialData, onSave, onCancel }: ExperienceFormProps) {
  const [formData, setFormData] = useState<ExperienceFormData>({
    id: initialData?.id || uuidv4(),
    company: initialData?.company || '',
    position: initialData?.position || '',
    location: initialData?.location || '',
    startDate: initialData?.startDate || '',
    endDate: initialData?.endDate || '',
    current: initialData?.current || false,
    description: initialData?.description || '',
    highlights: initialData?.highlights || [''],
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }
    
    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
    }
    
    if (!formData.startDate.trim()) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    const validHighlights = formData.highlights.filter(h => h.trim().length > 0);
    if (validHighlights.length === 0) {
      newErrors.highlights = 'Add at least one accomplishment';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Update form fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle checkbox change
  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ 
      ...prev, 
      current: checked,
      ...(checked ? { endDate: '' } : {})
    }));
  };
  
  // Update a highlight at a specific index
  const updateHighlight = (index: number, value: string) => {
    const newHighlights = [...formData.highlights];
    newHighlights[index] = value;
    setFormData(prev => ({ ...prev, highlights: newHighlights }));
  };
  
  // Add a new highlight field
  const addHighlight = () => {
    setFormData(prev => ({
      ...prev,
      highlights: [...prev.highlights, ''],
    }));
  };
  
  // Remove a highlight at a specific index
  const removeHighlight = (index: number) => {
    if (formData.highlights.length > 1) {
      const newHighlights = formData.highlights.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, highlights: newHighlights }));
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Filter out empty highlights
      const filteredHighlights = formData.highlights.filter(h => h.trim().length > 0);
      
      const cleanedData = {
        ...formData,
        highlights: filteredHighlights,
      };
      
      onSave(cleanedData);
      toast.success(initialData?.id ? 'Experience updated' : 'Experience added');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="company" className="text-sm font-medium">
            Company*
          </label>
          <Input 
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="Company name" 
          />
          {errors.company && (
            <p className="text-xs text-destructive">{errors.company}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="position" className="text-sm font-medium">
            Position*
          </label>
          <Input 
            id="position"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            placeholder="Job title" 
          />
          {errors.position && (
            <p className="text-xs text-destructive">{errors.position}</p>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="location" className="text-sm font-medium">
          Location
        </label>
        <Input 
          id="location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          placeholder="City, State or Remote" 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="startDate" className="text-sm font-medium">
            Start Date*
          </label>
          <Input 
            id="startDate"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleInputChange}
          />
          {errors.startDate && (
            <p className="text-xs text-destructive">{errors.startDate}</p>
          )}
        </div>
        
        {!formData.current && (
          <div className="space-y-2">
            <label htmlFor="endDate" className="text-sm font-medium">
              End Date
            </label>
            <Input 
              id="endDate"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleInputChange}
            />
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="current"
          checked={formData.current}
          onCheckedChange={handleCheckboxChange}
        />
        <label 
          htmlFor="current"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I currently work here
        </label>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description*
        </label>
        <Textarea 
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Describe your role and responsibilities" 
          rows={4}
        />
        {errors.description && (
          <p className="text-xs text-destructive">{errors.description}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Key Accomplishments*
        </label>
        <p className="text-xs text-muted-foreground">
          Add bullet points highlighting your achievements
        </p>
        
        {formData.highlights.map((highlight, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              value={highlight}
              onChange={(e) => updateHighlight(index, e.target.value)}
              placeholder="Accomplished X by doing Y which resulted in Z"
            />
            {formData.highlights.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeHighlight(index)}
              >
                ✕
              </Button>
            )}
          </div>
        ))}
        
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addHighlight}
        >
          Add Accomplishment
        </Button>
        
        {errors.highlights && (
          <p className="text-xs text-destructive">{errors.highlights}</p>
        )}
      </div>
      
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData?.id ? 'Update' : 'Add'} Experience
        </Button>
      </div>
    </form>
  );
} 