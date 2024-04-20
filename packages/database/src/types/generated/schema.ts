export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Customer: {
        Row: {
          id: string
          stripeId: string
        }
        Insert: {
          id?: string
          stripeId: string
        }
        Update: {
          id?: string
          stripeId?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_Customer_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      CustomerSubscription: {
        Row: {
          customerId: string | null
          id: string
          status: Database["public"]["Enums"]["SubscriptionStatus"]
        }
        Insert: {
          customerId?: string | null
          id: string
          status: Database["public"]["Enums"]["SubscriptionStatus"]
        }
        Update: {
          customerId?: string | null
          id?: string
          status?: Database["public"]["Enums"]["SubscriptionStatus"]
        }
        Relationships: [
          {
            foreignKeyName: "public_CustomerSubscription_customerId_fkey"
            columns: ["customerId"]
            isOneToOne: false
            referencedRelation: "Customer"
            referencedColumns: ["id"]
          },
        ]
      }
      Feed: {
        Row: {
          id: string
          site: string
          url: string
        }
        Insert: {
          id?: string
          site: string
          url: string
        }
        Update: {
          id?: string
          site?: string
          url?: string
        }
        Relationships: []
      }
      Sync: {
        Row: {
          deviceId: string | null
          finishedAt: string | null
          id: string
          startedAt: string
          status: Database["public"]["Enums"]["SyncStatus"]
          trigger: Database["public"]["Enums"]["SyncTrigger"]
          userId: string
        }
        Insert: {
          deviceId?: string | null
          finishedAt?: string | null
          id?: string
          startedAt?: string
          status: Database["public"]["Enums"]["SyncStatus"]
          trigger: Database["public"]["Enums"]["SyncTrigger"]
          userId: string
        }
        Update: {
          deviceId?: string | null
          finishedAt?: string | null
          id?: string
          startedAt?: string
          status?: Database["public"]["Enums"]["SyncStatus"]
          trigger?: Database["public"]["Enums"]["SyncTrigger"]
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_Sync_deviceId_fkey"
            columns: ["deviceId"]
            isOneToOne: false
            referencedRelation: "UserDevice"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Sync_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      SyncArticle: {
        Row: {
          syncedAt: string
          syncId: string
          url: string
        }
        Insert: {
          syncedAt?: string
          syncId: string
          url: string
        }
        Update: {
          syncedAt?: string
          syncId?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "Article_syncId_fkey"
            columns: ["syncId"]
            isOneToOne: false
            referencedRelation: "Sync"
            referencedColumns: ["id"]
          },
        ]
      }
      SyncLog: {
        Row: {
          createdAt: string
          json: Json
          syncId: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          json: Json
          syncId: string
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          json?: Json
          syncId?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Log_syncId_fkey"
            columns: ["syncId"]
            isOneToOne: true
            referencedRelation: "Sync"
            referencedColumns: ["id"]
          },
        ]
      }
      UserApiKey: {
        Row: {
          createdAt: string
          key: string
          updatedAt: string
          userId: string
        }
        Insert: {
          createdAt?: string
          key?: string
          updatedAt?: string
          userId?: string
        }
        Update: {
          createdAt?: string
          key?: string
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "ApiKey_userId_fkey"
            columns: ["userId"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      UserDevice: {
        Row: {
          id: string
          registeredAt: string
          token: string
          type: Database["public"]["Enums"]["DeviceType"]
          userId: string
        }
        Insert: {
          id?: string
          registeredAt?: string
          token: string
          type?: Database["public"]["Enums"]["DeviceType"]
          userId: string
        }
        Update: {
          id?: string
          registeredAt?: string
          token?: string
          type?: Database["public"]["Enums"]["DeviceType"]
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Device_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      UserFeed: {
        Row: {
          createdAt: string
          feedId: string
          lastSyncedAt: string | null
          startArticlesCount: number
          userId: string
        }
        Insert: {
          createdAt?: string
          feedId: string
          lastSyncedAt?: string | null
          startArticlesCount?: number
          userId: string
        }
        Update: {
          createdAt?: string
          feedId?: string
          lastSyncedAt?: string | null
          startArticlesCount?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "UserFeed_feedId_fkey"
            columns: ["feedId"]
            isOneToOne: false
            referencedRelation: "Feed"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "UserFeed_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      gen_random_string: {
        Args: {
          length: number
        }
        Returns: string
      }
    }
    Enums: {
      DeviceType: "KINDLE" | "REMARKABLE"
      SubscriptionStatus:
        | "ACTIVE"
        | "CANCELED"
        | "INCOMPLETE"
        | "INCOMPLETE_EXPIRED"
        | "PAST_DUE"
        | "PAUSED"
        | "TRIALING"
        | "UNPAID"
      SyncStatus: "SUCCESS" | "FAILED" | "QUEUED" | "IN_PROGRESS" | "UNKNOWN"
      SyncTrigger: "MANUAL" | "SCHEDULE"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

