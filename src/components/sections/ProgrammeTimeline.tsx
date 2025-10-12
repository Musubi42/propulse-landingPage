'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FadeIn } from '@/components/animations/FadeIn';
import type { Phase } from '@/components/timeline';

interface ProgrammeTimelineProps {
  phases: Phase[];
}

const colorClasses = {
  accent: {
    border: 'border-accent',
    bg: 'bg-accent',
    text: 'text-accent',
    bgLight: 'bg-accent/10',
  },
  primary: {
    border: 'border-primary',
    bg: 'bg-primary',
    text: 'text-primary',
    bgLight: 'bg-primary/10',
  },
  secondary: {
    border: 'border-secondary',
    bg: 'bg-secondary',
    text: 'text-secondary',
    bgLight: 'bg-secondary/10',
  },
};

export function ProgrammeTimeline({ phases }: ProgrammeTimelineProps) {
  return (
    <div className="relative">
      {/* Vertical pen line connecting phases - hidden on mobile, visible on tablet+ */}
      <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-primary to-secondary opacity-30 hidden md:block" />

      <Accordion type="single" collapsible className="space-y-4 md:space-y-6">
        {phases.map((phase, index) => {
          const colors = colorClasses[phase.color];
          // Handle both emoji strings and icon components
          const isEmojiIcon = typeof phase.icon === 'string';

          return (
            <FadeIn key={phase.id} delay={index * 0.1} direction="up">
              <AccordionItem
                value={phase.id}
                className={`border ${colors.border} rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300`}
              >
                <AccordionTrigger className="px-4 py-4 md:px-6 md:py-6 hover:no-underline group">
                  <div className="flex items-start gap-3 md:gap-4 text-left w-full">
                    {/* Phase Number Badge - Responsive sizing */}
                    <div
                      className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full ${colors.bg} flex items-center justify-center text-black font-bold text-base md:text-lg shadow-md z-10`}
                    >
                      {phase.number}
                    </div>

                    {/* Phase Content */}
                    <div className="flex-1 min-w-0">
                      {/* Title and Duration - Stack on mobile, row on tablet+ */}
                      <div className="flex flex-col gap-2 mb-2">
                        <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {phase.title}
                        </h3>
                        <span
                          className={`text-xs md:text-sm font-semibold ${colors.text} ${colors.bgLight} px-2 md:px-3 py-1 rounded-full w-fit`}
                        >
                          {phase.duration}
                        </span>
                      </div>
                      {/* Brief description - responsive text size */}
                      <p className="text-sm md:text-base text-text-secondary line-clamp-2 md:line-clamp-none">
                        {phase.brief}
                      </p>
                    </div>

                    {/* Icon - Show on tablet+ */}
                    <div className="hidden md:flex flex-shrink-0 items-center justify-center">
                      {isEmojiIcon ? (
                        <span className="text-3xl md:text-4xl">{phase.icon as string}</span>
                      ) : (
                        <span className={`${colors.text} text-3xl md:text-4xl`}>
                          {/* Icon component would go here if needed */}
                        </span>
                      )}
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-4 md:px-6 pb-4 md:pb-6">
                  {/* Responsive padding - less on mobile */}
                  <div className="pt-3 md:pt-4 pl-10 md:pl-16 space-y-3 md:space-y-4">
                    <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                      {phase.details.description}
                    </p>

                    <div>
                      <h4 className="text-sm md:text-base font-semibold text-foreground mb-2 md:mb-3 flex items-center gap-2">
                        <span
                          className={`w-1 h-4 md:h-5 ${colors.bg} rounded-full`}
                        />
                        Activités et contenus
                      </h4>
                      <ul className="space-y-2 md:space-y-2.5">
                        {phase.details.activities.map((activity, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 md:gap-3 text-sm md:text-base text-text-secondary"
                          >
                            <span
                              className={`flex-shrink-0 w-1.5 h-1.5 rounded-full ${colors.bg} mt-1.5 md:mt-2`}
                            />
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </FadeIn>
          );
        })}
      </Accordion>
    </div>
  );
}
