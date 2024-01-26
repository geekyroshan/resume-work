'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useResumeStore } from '@/lib/store/store';
import { EducationItem } from '@/lib/types/resume';
import { Label } from '@/components/ui/label';

type EducationFormProps = {
  education?: EducationItem;
  onComplete?: () => void;
};

export function EducationForm({ education, onComplete }: EducationFormProps) {
  const { addEducationItem, updateEducationItem } = useResumeStore();
  const [currentEducation, setCurrentEducation] = useState(education?.current || false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<
    Omit<EducationItem, 'id'>
  >({
    defaultValues: education 
      ? {
          ...education,
        }
      : {
          institution: '',
          degree: '',
          field: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          gpa: '',
          highlights: [],
        },
  });

  const onSubmit = (data: Omit<EducationItem, 'id'>) => {
    // Update the current flag from the checkbox
    data.current = currentEducation;
    
    // If endDate is empty and it's current, set it to undefined
    if (data.current) {
      data.endDate = undefined;
    }
    
    // Convert empty string highlights to a proper array structure
    if (typeof data.highlights === 'string') {
      data.highlights = (data.highlights as any)
        .split('\n')
        .filter((item: string) => item.trim() !== '')
        .map((item: string) => item.trim());
    }

    if (education) {
      // Editing an existing education
      updateEducationItem(education.id, data);
    } else {
      // Adding a new education
      addEducationItem(data);
    }
    
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="institution">Institution</Label>
        <Input
          id="institution"
          placeholder="University or School name"
          {...register('institution', { required: true })}
          aria-invalid={errors.institution ? 'true' : 'false'}
        />
        {errors.institution && (
          <p className="text-sm text-destructive">Institution name is required</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="degree">Degree</Label>
        <Input
          id="degree"
          placeholder="e.g. Bachelor of Science"
          {...register('degree', { required: true })}
          aria-invalid={errors.degree ? 'true' : 'false'}
        />
        {errors.degree && (
          <p className="text-sm text-destructive">Degree is required</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="field">Field of Study</Label>
        <Input
          id="field"
          placeholder="e.g. Computer Science"
          {...register('field')}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          placeholder="City, State or Country"
          {...register('location')}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            {...register('startDate', { required: true })}
            aria-invalid={errors.startDate ? 'true' : 'false'}
          />
          {errors.startDate && (
            <p className="text-sm text-destructive">Start date is required</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="date"
            {...register('endDate', { 
              required: !currentEducation,
              validate: value => currentEducation || !!value
            })}
            aria-invalid={errors.endDate ? 'true' : 'false'}
            disabled={currentEducation}
          />
          {errors.endDate && !currentEducation && (
            <p className="text-sm text-destructive">End date is required</p>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="current"
          checked={currentEducation}
          onCheckedChange={(value) => setCurrentEducation(!!value)}
        />
        <Label htmlFor="current">I am currently studying here</Label>
      </div>

      <div className="space-y-2">
        <Label htmlFor="gpa">GPA (optional)</Label>
        <Input
          id="gpa"
          placeholder="e.g. 3.8"
          {...register('gpa')}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="highlights">
          Highlights, Achievements, or Coursework (one per line)
        </Label>
        <Textarea
          id="highlights"
          placeholder="• Dean's List 3 semesters&#10;• Relevant coursework: Data Structures, Algorithms&#10;• Senior thesis on machine learning"
          {...register('highlights')}
          rows={5}
        />
      </div>

      <div className="flex justify-end space-x-4">
        {onComplete && (
          <Button type="button" variant="outline" onClick={onComplete}>
            Cancel
          </Button>
        )}
        <Button type="submit">
          {education ? 'Update Education' : 'Add Education'}
        </Button>
      </div>
    </form>
  );
} 