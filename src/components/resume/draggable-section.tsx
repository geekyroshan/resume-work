"use client";

import { useState } from "react";
import { SectionWrapper } from "./section-wrapper";
import { ResumeSection } from "@/lib/types";

interface DraggableSectionProps {
  section: ResumeSection;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  isFirst: boolean;
  isLast: boolean;
}

export function DraggableSection({
  section,
  onDelete,
  onEdit,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: DraggableSectionProps) {
  const [isDragging, setIsDragging] = useState(false);

  // Placeholder content based on section type
  const renderSectionContent = () => {
    switch (section.type) {
      case "contact":
        return (
          <div className="space-y-2">
            <p className="font-semibold">
              {(section as any).fullName || "Your Name"}
            </p>
            <p className="text-sm text-muted-foreground">
              {(section as any).email || "email@example.com"}
            </p>
            {(section as any).phone && (
              <p className="text-sm text-muted-foreground">
                {(section as any).phone}
              </p>
            )}
            {(section as any).location && (
              <p className="text-sm text-muted-foreground">
                {(section as any).location}
              </p>
            )}
          </div>
        );
      case "summary":
        return (
          <p className="text-sm">
            {(section as any).content ||
              "Professional summary will appear here..."}
          </p>
        );
      case "experience":
        return (
          <div>
            {(section as any).items?.length > 0 ? (
              <div className="space-y-4">
                {(section as any).items.map((item: any) => (
                  <div key={item.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{item.position}</p>
                        <p className="text-sm">{item.company}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.startDate} - {item.endDate || "Present"}
                      </p>
                    </div>
                    <p className="text-sm mt-2">{item.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Add work experience items...
              </p>
            )}
          </div>
        );
      case "education":
        return (
          <div>
            {(section as any).items?.length > 0 ? (
              <div className="space-y-4">
                {(section as any).items.map((item: any) => (
                  <div key={item.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{item.degree}</p>
                        <p className="text-sm">{item.institution}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.startDate} - {item.endDate || "Present"}
                      </p>
                    </div>
                    {item.field && <p className="text-sm mt-1">{item.field}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Add education items...
              </p>
            )}
          </div>
        );
      case "skills":
        return (
          <div>
            {(section as any).categories?.length > 0 ? (
              <div className="space-y-3">
                {(section as any).categories.map((category: any) => (
                  <div key={category.id}>
                    <p className="font-semibold mb-1">{category.name}</p>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill: string, i: number) => (
                        <span
                          key={i}
                          className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Add skills...</p>
            )}
          </div>
        );
      case "projects":
        return (
          <div>
            {(section as any).items?.length > 0 ? (
              <div className="space-y-4">
                {(section as any).items.map((item: any) => (
                  <div key={item.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex justify-between items-start">
                      <p className="font-semibold">{item.name}</p>
                      {(item.startDate || item.endDate) && (
                        <p className="text-sm text-muted-foreground">
                          {item.startDate && item.startDate}
                          {item.startDate && item.endDate && " - "}
                          {item.endDate && item.endDate}
                        </p>
                      )}
                    </div>
                    <p className="text-sm mt-1">{item.description}</p>
                    {item.technologies?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.technologies.map((tech: string, i: number) => (
                          <span
                            key={i}
                            className="bg-secondary/50 px-1.5 py-0.5 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Add projects...</p>
            )}
          </div>
        );
      default:
        return <p className="text-sm text-muted-foreground">Empty section</p>;
    }
  };

  return (
    <div
      className={`transition-transform ${
        isDragging ? "scale-105 opacity-75" : ""
      }`}
      draggable={true}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
    >
      <SectionWrapper
        title={section.title}
        onDelete={() => onDelete(section.id)}
        onEdit={() => onEdit(section.id)}
        onMoveUp={!isFirst ? () => onMoveUp(section.id) : undefined}
        onMoveDown={!isLast ? () => onMoveDown(section.id) : undefined}
        className="mb-4"
      >
        {renderSectionContent()}
      </SectionWrapper>
    </div>
  );
} 