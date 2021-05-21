import { useQuery } from "react-query";
import { supabase, userId } from "../data/SupabaseUtil"
import { fromCloud } from "../data/UserDataLocal";

// User Data

export const fetchUserData = async () => {
  const { data, error } = await supabase
  .from('user_data')
  .select(`
    name, 
    bio, 
    habit_stats->total, 
    habit_stats->last_month
  `)
  .eq('user_id', userId());
  if (error) console.log(error.message);
  else if (data == null) return;
  else {
    return data[0];
  }
}

export const setUserData = async (newData: object) => {
  const {data, error} = await supabase.from('user_data')
  .update(newData)
  // *dog sitting in flaming building* this is fine.
  .match({user_id: userId() ?? ""});

  // TEMPORARILY DISABLE
  // const {error} = await supabase.from('user_data')
  // .upsert(newData, {onConflict: 'user_id'});

  if (error) console.log(error.message);
  return data;
}

// Habits

export const fetchHabits = async () => {
  const { data } = await supabase
  .from('habits')
  .select(`
    id,
    title,
    description,
    public
  `)
  .eq('user_id', userId());
  return data;
}

export const fetchHabit = async (id: string) => {
  const { data } = await supabase
  .from('habits')
  .select(`
  id,
  title, 
  description, 
  public
  `).eq('id', id);
  // @ts-ignore
  return data[0];
}

export const setHabits = async (newData: object) => {
  const { data } = await supabase
  .from('habits')
  .update(newData)
  .match({user_id: userId() ?? ""})
}

export const setHabit = async (newData: any) => {
  newData.user_id = userId();
  console.log(newData);
  const { data, error } = await supabase
  .from('habits')
  .upsert(newData)
  if (error) console.log(error);
}

export const removeHabit = async (id: string) => {
  const { error } = await supabase
  .from('habits')
  .delete()
  .match({id: id})
  if (error) console.log(error.message);
}

// Todo

export const fetchTodoLists = async () => {
  const { data } = await supabase.from('todolists')
  .select(`
    id,
    title,
    description
  `).eq('user_id', userId());
  return data;
}

export const setTodoLists = async(newData: object) => {
  const { data } = await supabase.from('todoLists')
  .update(newData)
  .match({userId: userId() ?? ""});
}