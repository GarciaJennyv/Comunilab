import { supabase } from '@/lib/supabase/client';

export interface NuevaOrden {
  codigo_orden: string;
  paciente_id: string;
  medico_id?: string;
  laboratorio_externo_id?: string;
  tipo_muestra: string;
  examenes_solicitados: string;
  estado?: string;
  fecha_toma?: string;
  fecha_limite_sla?: string;
  token_acceso_qr?: string;
}

export async function listarOrdenes() {
  const { data, error } = await supabase
    .from('ordenes_muestras')
    .select(`
      *,
      pacientes (
        id,
        cedula,
        nombres,
        apellidos,
        telefono,
        correo
      ),
      laboratorios_externos (
        id,
        nombre,
        tiempo_sla_horas
      )
    `)
    .order('fecha_toma', { ascending: false });

  if (error) throw error;
  return data;
}

export async function obtenerOrdenPorId(id: string) {
  const { data, error } = await supabase
    .from('ordenes_muestras')
    .select(`
      *,
      pacientes (*),
      laboratorios_externos (*),
      resultados (*)
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function crearOrden(orden: NuevaOrden) {
  const { data, error } = await supabase
    .from('ordenes_muestras')
    .insert([orden])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function actualizarEstadoOrden(id: string, estado: string) {
  const { data, error } = await supabase
    .from('ordenes_muestras')
    .update({ estado })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}