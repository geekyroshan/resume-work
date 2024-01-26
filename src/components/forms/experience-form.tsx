'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useResumeStore } from '@/lib/store/store';
import { ExperienceItem } from '@/lib/types/resume';
import { Label } from '@/components/ui/label';

type ExperienceFormProps = {
  experience?: ExperienceItem;
  onComplete?: () => void;
};

export function ExperienceForm({ experience, onComplete }: ExperienceFormProps) {
  const { addExperienceItem, updateExperienceItem } = useResumeStore();
  const [currentJob, setCurrentJob] = useState(experience?.current || false);
  
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<
    Omit<ExperienceItem, 'id'>
  >({
    defaultValues: experience 
      ? {
          ...experience,
        }
      : {
          company: '',
          position: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
          highlights: [],
        },
  });

  const onSubmit = (data: Omit<ExperienceItem, 'id'>) => {
    // Update the current flag from the checkbox
    data.current = currentJob;
    
    // If endDate is empty and it's a current job, set it to undefined
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

    if (experience) {
      // Editing an existing experience
      updateExperienceItem(experience.id, data);
    } else {
      // Adding a new experience
      addExperienceItem(data);
    }
    
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          placeholder="Company name"
          {...register('company', { required: true })}
          aria-invalid={errors.company ? 'true' : 'false'}
        />
        {errors.company && (
          <p className="text-sm text-destructive">Company name is required</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="position">Position</Label>
        <Input
          id="position"
          placeholder="Your job title"
          {...register('position', { required: true })}
          aria-invalid={errors.position ? 'true' : 'false'}
        />
        {errors.position && (
          <p className="text-sm text-destructive">Position is required</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          placeholder="City, State or Remote"
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
              required: !currentJob,
              validate: value => currentJob || !!value
            })}
            aria-invalid={errors.endDate ? 'true' : 'false'}
            disabled={currentJob}
          />
          {errors.endDate && !currentJob && (
            <p className="text-sm text-destructive">End date is required</p>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="current"
          checked={currentJob}
          onCheckedChange={(value) => setCurrentJob(!!value)}
        />
        <Label htmlFor="current">I currently work here</Label>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Brief description of your role"
          {...register('description')}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="highlights">
          Highlights or Accomplishments (one per line)
        </Label>
        <Textarea
          id="highlights"
          placeholder="• Increased sales by 20%&#10;• Implemented new CRM system&#10;• Led team of 5 developers"
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
          {experience ? 'Update Experience' : 'Add Experience'}
        </Button>
      </div>
    </form>
  );
} 