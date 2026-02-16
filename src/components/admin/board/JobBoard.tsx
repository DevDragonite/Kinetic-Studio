'use client';

import { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { JobColumn } from './JobColumn';
import { createClient } from '@/utils/supabase/client';
import { Database } from '@/types/database';

type Job = Database['public']['Tables']['job_cards']['Row'];

type Column = {
    id: string;
    title: string;
    jobIds: string[];
};

const initialColumns: Record<string, Column> = {
    'reception': { id: 'reception', title: 'Recepción', jobIds: [] },
    'diagnosis': { id: 'diagnosis', title: 'Diagnóstico', jobIds: [] },
    'approval': { id: 'approval', title: 'Aprobación', jobIds: [] },
    'in_progress': { id: 'in_progress', title: 'En Progreso', jobIds: [] },
    'quality_control': { id: 'quality_control', title: 'Control Calidad', jobIds: [] },
    'ready': { id: 'ready', title: 'Listo', jobIds: [] },
};

const columnOrder = ['reception', 'diagnosis', 'approval', 'in_progress', 'quality_control', 'ready'];

export function JobBoard() {
    const [jobs, setJobs] = useState<Record<string, Job>>({});
    const [columns, setColumns] = useState(initialColumns);
    const supabase = createClient();

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        const { data, error } = await supabase
            .from('job_cards')
            .select('*');

        if (error) {
            console.error('Error fetching jobs:', error);
            return;
        }

        if (data) {
            const newJobs: Record<string, Job> = {};
            const newColumns = { ...initialColumns };

            // Reset column jobIds
            Object.keys(newColumns).forEach(key => {
                newColumns[key].jobIds = [];
            });

            data.forEach(job => {
                newJobs[job.id] = job;
                if (newColumns[job.status]) {
                    newColumns[job.status].jobIds.push(job.id);
                }
            });

            setJobs(newJobs);
            setColumns(newColumns);
        }
    };

    const onDragEnd = async (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = columns[source.droppableId];
        const finish = columns[destination.droppableId];

        // Optimistic Update
        const startJobIds = Array.from(start.jobIds);
        startJobIds.splice(source.index, 1);
        const newStart = {
            ...start,
            jobIds: startJobIds,
        };

        const finishJobIds = Array.from(finish.jobIds);
        finishJobIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            jobIds: finishJobIds,
        };

        setColumns({
            ...columns,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish,
        });

        const newJob = { ...jobs[draggableId], status: finish.id as Job['status'] };
        setJobs({
            ...jobs,
            [draggableId]: newJob
        });

        // Valid Status Cast
        const newStatus = finish.id as Database['public']['Tables']['job_cards']['Row']['status'];

        // Persist to Supabase
        const { error } = await supabase
            .from('job_cards')
            .update({ status: newStatus })
            .eq('id', draggableId);

        if (error) {
            console.error('Error updating status:', error);
            // Revert on error (optional implementation)
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex h-full gap-4 overflow-x-auto pb-4">
                {columnOrder.map((columnId) => {
                    const column = columns[columnId];
                    const columnJobs = column.jobIds.map((jobId) => jobs[jobId]);

                    return <JobColumn key={column.id} column={{ ...column, jobs: columnJobs }} />;
                })}
            </div>
        </DragDropContext>
    );
}
