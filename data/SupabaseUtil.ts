import { createClient, GoTrueClient, Provider, Session, User } from '@supabase/supabase-js';
import appConfig from './AppConfig';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from 'react-native';
import { createContext, useEffect, useState } from 'react';

const { supabaseUrl, supabaseKey } = appConfig;

export const supabase = createClient(supabaseUrl, supabaseKey, {localStorage: AsyncStorage});

// Get current user id
export const userId = () => {
  const user = supabase.auth.user();
  if (!user) return null;
  else return user.id;
}

export const handleOAuthLogin = async (provider: Provider) => {
  // const {user, session, error} = await supabase.auth.signIn({ provider });
  supabase.auth.signIn({ provider: provider }).then(({user, session, error}) => {
    console.log(`USER ${user} SESSION ${session}`)
    if (error) console.log(`OAUTH LOGIN ERROR - ${error.message}`);
  })
  // console.log(`USER ${user} SESSION ${session}`)
  // if (error) console.log(`HANDLE OAUTH LOGIN ERROR ${error.message}`);
}
