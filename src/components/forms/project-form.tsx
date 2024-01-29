'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useResumeStore } from '@/lib/store/store';
import { ProjectItem } from '@/lib/types/resume';
import { Label } from '@/components/ui/label';

type ProjectFormProps = {
  project?: ProjectItem;
  onComplete?: () => void;
};

export function ProjectForm({ project, onComplete }: ProjectFormProps) {
  const { addProjectItem, updateProjectItem } = useResumeStore();
  const [currentProject, setCurrentProject] = useState(project?.current || false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<
    Omit<ProjectItem, 'id' | 'technologies' | 'highlights'>
  >({
    defaultValues: project 
      ? {
          name: project.name,
          description: project.description,
          url: project.url,
          startDate: project.startDate,
          endDate: project.endDate,
          current: project.current,
        }
      : {
          name: '',
          description: '',
          url: '',
          startDate: '',
          endDate: '',
          current: false,
        },
  });

  const onSubmit = (data: Omit<ProjectItem, 'id' | 'technologies' | 'highlights'>) => {
    // Get the technologies and highlights from the form
    const technologiesInput = document.getElementById('technologies') as HTMLTextAreaElement;
    const highlightsInput = document.getElementById('highlights') as HTMLTextAreaElement;
    
    // Process technologies string into array
    const technologies = technologiesInput.value
      .split(',')
      .map(tech => tech.trim())
      .filter(tech => tech.length > 0);
    
    // Process highlights text into array
    const highlights = highlightsInput.value
      .split('\n')
      .map(item => item.trim())
      .filter(item => item.length > 0);
    
    // Update the current flag from the checkbox
    data.current = currentProject;
    
    // If endDate is empty and it's a current project, set it to undefined
    if (data.current) {
      data.endDate = undefined;
    }
    
    // Combine all the data
    const fullData = {
      ...data,
      technologies,
      highlights
    };

    if (project) {
      // Editing an existing project
      updateProjectItem(project.id, fullData);
    } else {
      // Adding a new project
      addProjectItem(fullData);
    }
    
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Project Name</Label>
        <Input
          id="name"
          placeholder="e.g. E-commerce Website"
          {...register('name', { required: true })}
          aria-invalid={errors.name ? 'true' : 'false'}
        />
        {errors.name && (
          <p className="text-sm text-destructive">Project name is required</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Brief description of the project"
          {...register('description', { required: true })}
          aria-invalid={errors.description ? 'true' : 'false'}
          rows={3}
        />
        {errors.description && (
          <p className="text-sm text-destructive">Description is required</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="url">Project URL (optional)</Label>
        <Input
          id="url"
          placeholder="e.g. https://github.com/yourusername/project"
          {...register('url')}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            {...register('startDate')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="date"
            {...register('endDate')}
            disabled={currentProject}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="current"
          checked={currentProject}
          onCheckedChange={(value) => setCurrentProject(!!value)}
        />
        <Label htmlFor="current">This is an ongoing project</Label>
      </div>

      <div className="space-y-2">
        <Label htmlFor="technologies">
          Technologies Used (comma separated)
        </Label>
        <Textarea
          id="technologies"
          placeholder="React, Node.js, MongoDB, Express"
          defaultValue={project?.technologies.join(', ')}
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="highlights">
          Highlights or Key Features (one per line)
        </Label>
        <Textarea
          id="highlights"
          placeholder="• Implemented responsive design&#10;• Integrated payment gateway&#10;• Built RESTful API"
          defaultValue={project?.highlights.join('\n')}
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
          {project ? 'Update Project' : 'Add Project'}
        </Button>
      </div>
    </form>
  );
} 