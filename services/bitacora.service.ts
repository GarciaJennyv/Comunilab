import { supabase } from '@/lib/supabase/client';

export interface RegistroBitacora {
  orden_id?: string | null;
  usuario_identificador?: string | null;
  rol_usuario?: string | null;
  accion: string;
}

export async function registrarBitacora(registro: RegistroBitacora) {
  const { data, error } = await supabase
    .from('bitacora_accesos')
    .insert([
      {
        orden_id: registro.orden_id ?? null,
        usuario_identificador: registro.usuario_identificador ?? null,
        rol_usuario: registro.rol_usuario ?? null,
        accion: registro.accion,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function listarBitacora(limite = 100) {
  const { data, error } = await supabase
    .from('bitacora_accesos')
    .select(`
      *,
      ordenes_muestras (codigo_orden)
    `)
    .order('fecha_hora', { ascending: false })
    .limit(limite);

  if (error) throw error;
  return data;
}