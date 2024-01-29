'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useResumeStore } from '@/lib/store/store';
import { SkillItem } from '@/lib/types/resume';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

type SkillFormProps = {
  skill?: SkillItem;
  onComplete?: () => void;
};

const skillLevels = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'expert', label: 'Expert' }
];

export function SkillForm({ skill, onComplete }: SkillFormProps) {
  const { addSkillItem, updateSkillItem } = useResumeStore();
  const [skillLevel, setSkillLevel] = useState<'beginner' | 'intermediate' | 'advanced' | 'expert' | undefined>(
    skill?.level
  );
  
  const { register, handleSubmit, formState: { errors } } = useForm<
    Omit<SkillItem, 'id' | 'level'>
  >({
    defaultValues: skill 
      ? {
          name: skill.name,
          category: skill.category
        }
      : {
          name: '',
          category: ''
        },
  });

  const onSubmit = (data: Omit<SkillItem, 'id' | 'level'>) => {
    // Combine form data with the selected skill level
    const fullData = {
      ...data,
      level: skillLevel
    };

    if (skill) {
      // Editing an existing skill
      updateSkillItem(skill.id, fullData);
    } else {
      // Adding a new skill
      addSkillItem(fullData);
    }
    
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Skill Name</Label>
        <Input
          id="name"
          placeholder="e.g. JavaScript, Project Management, Photoshop"
          {...register('name', { required: true })}
          aria-invalid={errors.name ? 'true' : 'false'}
        />
        {errors.name && (
          <p className="text-sm text-destructive">Skill name is required</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="level">Proficiency Level</Label>
        <Select 
          value={skillLevel} 
          onValueChange={(value) => setSkillLevel(value as any)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your proficiency level" />
          </SelectTrigger>
          <SelectContent>
            {skillLevels.map((level) => (
              <SelectItem key={level.value} value={level.value}>
                {level.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category (optional)</Label>
        <Input
          id="category"
          placeholder="e.g. Programming, Design, Languages"
          {...register('category')}
        />
      </div>

      <div className="flex justify-end space-x-4">
        {onComplete && (
          <Button type="button" variant="outline" onClick={onComplete}>
            Cancel
          </Button>
        )}
        <Button type="submit">
          {skill ? 'Update Skill' : 'Add Skill'}
        </Button>
      </div>
    </form>
  );
} 