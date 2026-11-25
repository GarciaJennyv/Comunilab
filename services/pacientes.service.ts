import { supabase } from '@/lib/supabase/client';

export interface NuevoPaciente {
  cedula: string;
  codigo_paciente?: string;
  nombres: string;
  apellidos: string;
  fecha_nacimiento?: string;
  telefono?: string;
  correo?: string;
  perfil_id?: string;
}

export async function listarPacientes() {
  const { data, error } = await supabase
    .from('pacientes')
    .select('*')
    .order('creado_en', { ascending: false });

  if (error) throw error;
  return data;
}

export async function buscarPacientePorCedula(cedula: string) {
  const { data, error } = await supabase
    .from('pacientes')
    .select('*')
    .eq('cedula', cedula)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function crearPaciente(paciente: NuevoPaciente) {
  const { data, error } = await supabase
    .from('pacientes')
    .insert([paciente])
    .select()
    .single();

  if (error) throw error;
  return data;
}