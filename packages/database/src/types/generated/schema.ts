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
      Device: {
        Row: {
          id: string
          registeredAt: string
          token: string
          userId: string
        }
        Insert: {
          id: string
          registeredAt?: string
          token: string
          userId: string
        }
        Update: {
          id?: string
          registeredAt?: string
          token?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Device_userId_fkey"
            columns: ["userId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      Feed: {
        Row: {
          id: string
          url: string
        }
        Insert: {
          id: string
          url: string
        }
        Update: {
          id?: string
          url?: string
        }
        Relationships: []
      }
      Log: {
        Row: {
          createdAt: string
          id: string
          json: Json
          syncId: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id: string
          json: Json
          syncId: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          id?: string
          json?: Json
          syncId?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Log_syncId_fkey"
            columns: ["syncId"]
            referencedRelation: "Sync"
            referencedColumns: ["id"]
          }
        ]
      }
      Sync: {
        Row: {
          finishedAt: string | null
          id: string
          startedAt: string
          status: Database["public"]["Enums"]["SyncStatus"]
          syncedArticlesCount: number
          trigger: Database["public"]["Enums"]["SyncTrigger"]
          userId: string
        }
        Insert: {
          finishedAt?: string | null
          id: string
          startedAt?: string
          status: Database["public"]["Enums"]["SyncStatus"]
          syncedArticlesCount?: number
          trigger: Database["public"]["Enums"]["SyncTrigger"]
          userId: string
        }
        Update: {
          finishedAt?: string | null
          id?: string
          startedAt?: string
          status?: Database["public"]["Enums"]["SyncStatus"]
          syncedArticlesCount?: number
          trigger?: Database["public"]["Enums"]["SyncTrigger"]
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Sync_userId_fkey"
            columns: ["userId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      UserFeed: {
        Row: {
          feedId: string
          lastSyncDate: string | null
          startArticlesCount: number
          userId: string
        }
        Insert: {
          feedId: string
          lastSyncDate?: string | null
          startArticlesCount?: number
          userId: string
        }
        Update: {
          feedId?: string
          lastSyncDate?: string | null
          startArticlesCount?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "UserFeed_feedId_fkey"
            columns: ["feedId"]
            referencedRelation: "Feed"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "UserFeed_userId_fkey"
            columns: ["userId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      SyncStatus: "SUCCESS" | "FAILED" | "PENDING" | "UNKNOWN"
      SyncTrigger: "MANUAL" | "SCHEDULE"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

