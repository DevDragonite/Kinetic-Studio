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
                    before_photos: string[] | null
                    after_photos: string[] | null
                    total_amount: number
                    paid_amount: number
                    payment_status: 'Unpaid' | 'Partial' | 'Paid'
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
                    before_photos?: string[] | null
                    after_photos?: string[] | null
                    total_amount?: number
                    paid_amount?: number
                    payment_status?: 'Unpaid' | 'Partial' | 'Paid'
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
                    before_photos?: string[] | null
                    after_photos?: string[] | null
                    total_amount?: number
                    paid_amount?: number
                    payment_status?: 'Unpaid' | 'Partial' | 'Paid'
                    created_at?: string
                    updated_at?: string
                }
            }
            payments: {
                Row: {
                    id: string
                    created_at: string
                    job_id: string
                    amount: number
                    currency: string
                    method: 'Pago_Movil' | 'Zelle' | 'Cash' | 'Binance' | 'Cashea'
                    reference: string | null
                    status: 'Pending' | 'Verified' | 'Rejected'
                    proof_url: string | null
                }
                Insert: {
                    id?: string
                    created_at?: string
                    job_id: string
                    amount: number
                    currency?: string
                    method: 'Pago_Movil' | 'Zelle' | 'Cash' | 'Binance' | 'Cashea'
                    reference?: string | null
                    status?: 'Pending' | 'Verified' | 'Rejected'
                    proof_url?: string | null
                }
                Update: {
                    id?: string
                    created_at?: string
                    job_id?: string
                    amount?: number
                    currency?: string
                    method?: 'Pago_Movil' | 'Zelle' | 'Cash' | 'Binance' | 'Cashea'
                    reference?: string | null
                    status?: 'Pending' | 'Verified' | 'Rejected'
                    proof_url?: string | null
                }
            }
        }
    }
}
