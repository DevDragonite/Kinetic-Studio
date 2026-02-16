export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            job_cards: {
                Row: {
                    id: string
                    vehicle_brand: string
                    vehicle_model: string
                    license_plate: string
                    status: 'reception' | 'diagnosis' | 'approval' | 'in_progress' | 'quality_control' | 'ready' | 'delivered'
                    priority: 'Normal' | 'High' | 'Urgent'
                    client_name: string
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    vehicle_brand: string
                    vehicle_model: string
                    license_plate: string
                    status?: 'reception' | 'diagnosis' | 'approval' | 'in_progress' | 'quality_control' | 'ready' | 'delivered'
                    priority?: 'Normal' | 'High' | 'Urgent'
                    client_name: string
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    vehicle_brand?: string
                    vehicle_model?: string
                    license_plate?: string
                    status?: 'reception' | 'diagnosis' | 'approval' | 'in_progress' | 'quality_control' | 'ready' | 'delivered'
                    priority?: 'Normal' | 'High' | 'Urgent'
                    client_name?: string
                    created_at?: string
                    updated_at?: string
                }
            }
        }
    }
}
