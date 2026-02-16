'use client';

import { Draggable } from '@hello-pangea/dnd';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, AlertCircle } from 'lucide-react';

interface JobCardProps {
    job: {
        id: string;
        vehicle: string;
        plate: string;
        status: string;
        priority: 'Normal' | 'High' | 'Urgent';
        client: string;
    };
    index: number;
}

export function JobCard({ job, index }: JobCardProps) {
    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'Urgent': return 'bg-red-500/10 text-red-500 border-red-500/20';
            case 'High': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
            default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
        }
    };

    return (
        <Draggable draggableId={job.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="mb-3"
                    style={{ ...provided.draggableProps.style }}
                >
                    <Card className={`bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors ${snapshot.isDragging ? 'shadow-xl ring-2 ring-primary border-transparent' : ''}`}>
                        <CardContent className="p-3 space-y-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-semibold text-white text-sm">{job.vehicle}</h4>
                                    <p className="text-xs text-slate-400">{job.plate}</p>
                                </div>
                                <Badge variant="outline" className={`text-[10px] px-1 py-0 h-5 ${getPriorityColor(job.priority)}`}>
                                    {job.priority}
                                </Badge>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center gap-1 text-xs text-slate-500">
                                    <Clock className="w-3 h-3" />
                                    <span>2d ago</span>
                                </div>
                                <div className="text-xs text-slate-400 font-medium">
                                    {job.client.split(' ')[0]}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </Draggable>
    );
}
