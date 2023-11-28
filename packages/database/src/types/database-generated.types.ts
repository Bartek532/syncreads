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
      Account: {
        Row: {
          access_token: string | null
          expires_at: number | null
          id: number
          id_token: string | null
          provider: string
          providerAccountId: string
          refresh_token: string | null
          refresh_token_expires_in: number | null
          scope: string | null
          session_state: string | null
          token_type: string | null
          type: string
          userId: number
        }
        Insert: {
          access_token?: string | null
          expires_at?: number | null
          id?: number
          id_token?: string | null
          provider: string
          providerAccountId: string
          refresh_token?: string | null
          refresh_token_expires_in?: number | null
          scope?: string | null
          session_state?: string | null
          token_type?: string | null
          type: string
          userId: number
        }
        Update: {
          access_token?: string | null
          expires_at?: number | null
          id?: number
          id_token?: string | null
          provider?: string
          providerAccountId?: string
          refresh_token?: string | null
          refresh_token_expires_in?: number | null
          scope?: string | null
          session_state?: string | null
          token_type?: string | null
          type?: string
          userId?: number
        }
        Relationships: [
          {
            foreignKeyName: "Account_userId_fkey"
            columns: ["userId"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      Device: {
        Row: {
          id: number
          registeredAt: string
          token: string
          userId: number
        }
        Insert: {
          id?: number
          registeredAt?: string
          token: string
          userId: number
        }
        Update: {
          id?: number
          registeredAt?: string
          token?: string
          userId?: number
        }
        Relationships: [
          {
            foreignKeyName: "Device_userId_fkey"
            columns: ["userId"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      Feed: {
        Row: {
          id: number
          url: string
        }
        Insert: {
          id?: number
          url: string
        }
        Update: {
          id?: number
          url?: string
        }
        Relationships: []
      }
      Log: {
        Row: {
          createdAt: string
          id: number
          json: Json
          syncId: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id?: number
          json: Json
          syncId: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          id?: number
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
      Session: {
        Row: {
          expires: string
          id: number
          sessionToken: string
          userId: number
        }
        Insert: {
          expires: string
          id?: number
          sessionToken: string
          userId: number
        }
        Update: {
          expires?: string
          id?: number
          sessionToken?: string
          userId?: number
        }
        Relationships: [
          {
            foreignKeyName: "Session_userId_fkey"
            columns: ["userId"]
            referencedRelation: "User"
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
          userId: number
        }
        Insert: {
          finishedAt?: string | null
          id: string
          startedAt?: string
          status: Database["public"]["Enums"]["SyncStatus"]
          syncedArticlesCount?: number
          trigger: Database["public"]["Enums"]["SyncTrigger"]
          userId: number
        }
        Update: {
          finishedAt?: string | null
          id?: string
          startedAt?: string
          status?: Database["public"]["Enums"]["SyncStatus"]
          syncedArticlesCount?: number
          trigger?: Database["public"]["Enums"]["SyncTrigger"]
          userId?: number
        }
        Relationships: [
          {
            foreignKeyName: "Sync_userId_fkey"
            columns: ["userId"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      User: {
        Row: {
          email: string | null
          emailVerified: string | null
          folder: string
          id: number
          image: string | null
          name: string | null
          password: string | null
        }
        Insert: {
          email?: string | null
          emailVerified?: string | null
          folder?: string
          id?: number
          image?: string | null
          name?: string | null
          password?: string | null
        }
        Update: {
          email?: string | null
          emailVerified?: string | null
          folder?: string
          id?: number
          image?: string | null
          name?: string | null
          password?: string | null
        }
        Relationships: []
      }
      UserFeed: {
        Row: {
          feedId: number
          lastSyncDate: string | null
          startArticlesCount: number
          userId: number
        }
        Insert: {
          feedId: number
          lastSyncDate?: string | null
          startArticlesCount?: number
          userId: number
        }
        Update: {
          feedId?: number
          lastSyncDate?: string | null
          startArticlesCount?: number
          userId?: number
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
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      VerificationToken: {
        Row: {
          expires: string
          identifier: string
          token: string
        }
        Insert: {
          expires: string
          identifier: string
          token: string
        }
        Update: {
          expires?: string
          identifier?: string
          token?: string
        }
        Relationships: []
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

