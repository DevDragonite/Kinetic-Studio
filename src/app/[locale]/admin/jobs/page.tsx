import { JobBoard } from '@/components/admin/board/JobBoard';

export default function JobBoardPage() {
    return (
        <div className="h-full flex flex-col space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-white">Job Cards</h2>
                <p className="text-slate-400">Track vehicle progress from reception to delivery.</p>
            </div>

            <div className="flex-1 overflow-x-auto">
                <JobBoard />
            </div>
        </div>
    );
}
