// supabase.service.ts
import { Injectable } from '@nestjs/common';
import {
  AuthResponse,
  createClient,
  SupabaseClient,
} from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly supabase: SupabaseClient;

  constructor() {
    const supabaseURL = process.env.SUPABASE_URL;
    const supabaseAPIKey = process.env.SUPABASE_KEY;

    this.supabase = createClient(supabaseURL, supabaseAPIKey);
  }

  async signUp(email: string, password: string): Promise<any> {
    // const { data, error }: AuthResponse = await this.supabase.auth.signUp({
    //   email,
    //   password,
    // });

    const { data, error }: any = await this.supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}
