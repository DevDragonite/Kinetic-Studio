'use client';

import { Droppable } from '@hello-pangea/dnd';
import { JobCard } from './JobCard';
import { Database } from '@/types/database';

type Job = Database['public']['Tables']['job_cards']['Row'];

interface JobColumnProps {
    column: {
        id: string;
        title: string;
        jobs: Job[];
    };
}

export function JobColumn({ column }: JobColumnProps) {
    return (
        <div className="flex flex-col w-80 shrink-0">
            <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="font-semibold text-slate-200 text-sm uppercase tracking-wider">
                    {column.title}
                </h3>
                <span className="text-xs text-slate-500 font-medium bg-slate-800 px-2 py-1 rounded-full">
                    {column.jobs.length}
                </span>
            </div>

            <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex-1 bg-slate-900/50 rounded-lg p-2 min-h-[500px] border border-transparent transition-colors ${snapshot.isDraggingOver ? 'bg-slate-800/80 border-primary/20' : ''
                            }`}
                    >
                        {column.jobs.map((job, index) => (
                            <JobCard key={job.id} job={job} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}
