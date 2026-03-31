export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      cheers: {
        Row: {
          cheer_type: string
          created_at: string
          family_id: string
          from_user_id: string
          id: string
          to_user_id: string
        }
        Insert: {
          cheer_type?: string
          created_at?: string
          family_id: string
          from_user_id: string
          id?: string
          to_user_id: string
        }
        Update: {
          cheer_type?: string
          created_at?: string
          family_id?: string
          from_user_id?: string
          id?: string
          to_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cheers_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "family_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_phrase_log: {
        Row: {
          created_at: string
          id: string
          phrase_date: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          phrase_date?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          phrase_date?: string
          user_id?: string
        }
        Relationships: []
      }
      duel_results: {
        Row: {
          challenger_id: string
          challenger_score: number
          created_at: string
          family_id: string
          id: string
          opponent_id: string
          opponent_score: number
        }
        Insert: {
          challenger_id: string
          challenger_score?: number
          created_at?: string
          family_id: string
          id?: string
          opponent_id: string
          opponent_score?: number
        }
        Update: {
          challenger_id?: string
          challenger_score?: number
          created_at?: string
          family_id?: string
          id?: string
          opponent_id?: string
          opponent_score?: number
        }
        Relationships: [
          {
            foreignKeyName: "duel_results_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "family_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      family_groups: {
        Row: {
          code: string
          created_at: string
          id: string
          name: string
          quest_progress: number | null
          quest_target: number | null
          quest_title: string | null
          quest_week: string | null
        }
        Insert: {
          code?: string
          created_at?: string
          id?: string
          name?: string
          quest_progress?: number | null
          quest_target?: number | null
          quest_title?: string | null
          quest_week?: string | null
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          name?: string
          quest_progress?: number | null
          quest_target?: number | null
          quest_title?: string | null
          quest_week?: string | null
        }
        Relationships: []
      }
      family_members: {
        Row: {
          color: string
          family_id: string
          id: string
          joined_at: string
          role: string
          user_id: string
        }
        Insert: {
          color?: string
          family_id: string
          id?: string
          joined_at?: string
          role?: string
          user_id: string
        }
        Update: {
          color?: string
          family_id?: string
          id?: string
          joined_at?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "family_members_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "family_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      learned_words: {
        Row: {
          id: string
          learned_at: string
          user_id: string
          word_id: string
        }
        Insert: {
          id?: string
          learned_at?: string
          user_id: string
          word_id: string
        }
        Update: {
          id?: string
          learned_at?: string
          user_id?: string
          word_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          emoji: string
          id: string
          last_active_date: string
          level: string
          name: string
          scenarios_completed: number
          streak: number
          weekly_xp: number
          words_learned: number
        }
        Insert: {
          created_at?: string
          emoji?: string
          id: string
          last_active_date?: string
          level?: string
          name?: string
          scenarios_completed?: number
          streak?: number
          weekly_xp?: number
          words_learned?: number
        }
        Update: {
          created_at?: string
          emoji?: string
          id?: string
          last_active_date?: string
          level?: string
          name?: string
          scenarios_completed?: number
          streak?: number
          weekly_xp?: number
          words_learned?: number
        }
        Relationships: []
      }
      review_cards: {
        Row: {
          ease_factor: number
          id: string
          interval: number
          next_review: string
          repetitions: number
          scenario_id: string
          user_id: string
          word_id: string
        }
        Insert: {
          ease_factor?: number
          id?: string
          interval?: number
          next_review?: string
          repetitions?: number
          scenario_id?: string
          user_id: string
          word_id: string
        }
        Update: {
          ease_factor?: number
          id?: string
          interval?: number
          next_review?: string
          repetitions?: number
          scenario_id?: string
          user_id?: string
          word_id?: string
        }
        Relationships: []
      }
      story_sentences: {
        Row: {
          created_at: string
          family_id: string
          id: string
          order_num: number
          sentence: string
          user_id: string
          week: string
        }
        Insert: {
          created_at?: string
          family_id: string
          id?: string
          order_num?: number
          sentence: string
          user_id: string
          week?: string
        }
        Update: {
          created_at?: string
          family_id?: string
          id?: string
          order_num?: number
          sentence?: string
          user_id?: string
          week?: string
        }
        Relationships: [
          {
            foreignKeyName: "story_sentences_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "family_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      voice_posts: {
        Row: {
          created_at: string
          family_id: string
          id: string
          reactions: Json
          text: string
          user_id: string
        }
        Insert: {
          created_at?: string
          family_id: string
          id?: string
          reactions?: Json
          text?: string
          user_id: string
        }
        Update: {
          created_at?: string
          family_id?: string
          id?: string
          reactions?: Json
          text?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voice_posts_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "family_groups"
            referencedColumns: ["id"]
          },
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
