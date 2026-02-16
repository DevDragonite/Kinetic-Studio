'use client';

import { useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { JobColumn } from './JobColumn';

// Mock Data
type Job = {
    id: string;
    vehicle: string;
    plate: string;
    status: string;
    priority: 'Normal' | 'High' | 'Urgent';
    client: string;
};

type Column = {
    id: string;
    title: string;
    jobIds: string[];
};

const initialJobs: Record<string, Job> = {
    'job-1': { id: 'job-1', vehicle: 'Toyota Corolla', plate: 'AD452X', status: 'reception', priority: 'Normal', client: 'Carlos Pérez' },
    'job-2': { id: 'job-2', vehicle: 'JAC T8 Pro', plate: 'AB123CD', status: 'diagnosis', priority: 'High', client: 'Maria Rodriguez' },
    'job-3': { id: 'job-3', vehicle: 'Ford Explorer', plate: 'XYZ-987', status: 'approval', priority: 'Urgent', client: 'Pedro Mendez' },
    'job-4': { id: 'job-4', vehicle: 'Chery Tiggo 7', plate: 'EFG-456', status: 'in_progress', priority: 'Normal', client: 'Ana Silva' },
    'job-5': { id: 'job-5', vehicle: 'Mitsubishi Montero', plate: 'LMN-789', status: 'quality_control', priority: 'Normal', client: 'Luis Gomez' },
};

const initialColumns: Record<string, Column> = {
    'reception': { id: 'reception', title: 'Recepción', jobIds: ['job-1'] },
    'diagnosis': { id: 'diagnosis', title: 'Diagnóstico', jobIds: ['job-2'] },
    'approval': { id: 'approval', title: 'Aprobación', jobIds: ['job-3'] },
    'in_progress': { id: 'in_progress', title: 'En Progreso', jobIds: ['job-4'] },
    'quality_control': { id: 'quality_control', title: 'Control Calidad', jobIds: ['job-5'] },
    'ready': { id: 'ready', title: 'Listo', jobIds: [] },
};

const columnOrder = ['reception', 'diagnosis', 'approval', 'in_progress', 'quality_control', 'ready'];

export function JobBoard() {
    const [jobs, setJobs] = useState(initialJobs);
    const [columns, setColumns] = useState(initialColumns);

    const onDragEnd = (result: DropResult) => {
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

        // Moving within the same column
        if (start === finish) {
            const newJobIds = Array.from(start.jobIds);
            newJobIds.splice(source.index, 1);
            newJobIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                jobIds: newJobIds,
            };

            setColumns({
                ...columns,
                [newColumn.id]: newColumn,
            });
            return;
        }

        // Moving from one column to another
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

        // Update job status (mock)
        const newJob = { ...jobs[draggableId], status: finish.id };
        setJobs({
            ...jobs,
            [draggableId]: newJob
        });
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
