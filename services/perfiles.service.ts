import { supabase } from '@/lib/supabase/client';

export interface ActualizarPerfil {
  nombres?: string;
  apellidos?: string;
  cedula?: string;
  rol?: string;
  laboratorio_externo_id?: string | null;
  telefono?: string;
}

export async function obtenerPerfilActual() {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw authError;
  if (!user) return null;

  const { data, error } = await supabase
    .from('perfiles')
    .select(`
      *,
      laboratorios_externos (nombre, tiempo_sla_horas)
    `)
    .eq('id', user.id)
    .single();

  if (error) throw error;
  return data;
}

export async function listarPerfiles() {
  const { data, error } = await supabase
    .from('perfiles')
    .select(`
      *,
      laboratorios_externos (nombre)
    `)
    .order('creado_en', { ascending: false });

  if (error) throw error;
  return data;
}

export async function actualizarPerfil(id: string, cambios: ActualizarPerfil) {
  const { data, error } = await supabase
    .from('perfiles')
    .update(cambios)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}