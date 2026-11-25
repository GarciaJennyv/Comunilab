import { supabase } from '@/lib/supabase/client';

export interface NuevoLaboratorioExterno {
  nombre: string;
  tiempo_sla_horas: number;
}

export async function listarLaboratoriosExternos() {
  const { data, error } = await supabase
    .from('laboratorios_externos')
    .select('*')
    .order('nombre', { ascending: true });

  if (error) throw error;
  return data;
}

export async function crearLaboratorioExterno(laboratorio: NuevoLaboratorioExterno) {
  const { data, error } = await supabase
    .from('laboratorios_externos')
    .insert([laboratorio])
    .select()
    .single();

  if (error) throw error;
  return data;
}