import { createClient, GoTrueClient, Provider, Session, User } from '@supabase/supabase-js';
import appConfig from './AppConfig';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from 'react-native';
import { createContext } from 'react';

const { supabaseUrl, supabaseKey } = appConfig;

export const supabase = createClient(supabaseUrl, supabaseKey, {localStorage: AsyncStorage});

// User Context broadcast globally for all components
export const UserContext = createContext<{user: User | null; session: Session | null}>({
  user: null,
  session: null
})

export const handleEmailLogin = async(email: string, password: string) => {
  const {user, session, error} = await supabase.auth.signIn({email: password, password: password});
  if (!error) Alert.alert("Account created!", "Check your inbox to verify your email.")
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
