import { supabase } from '@/lib/supabase/client';

export async function listarResultadosPorOrden(ordenId: string) {
  const { data, error } = await supabase
    .from('resultados')
    .select('*')
    .eq('orden_id', ordenId)
    .order('fecha_carga', { ascending: false });

  if (error) throw error;
  return data;
}

export async function subirResultadoOrden(params: {
  ordenId: string;
  archivo: File;
  observaciones?: string;
  subidoPor?: string;
}) {
  const { ordenId, archivo, observaciones, subidoPor } = params;
  const rutaArchivo = `${ordenId}/${Date.now()}_${archivo.name}`;

  const { error: errorStorage } = await supabase.storage
    .from('resultados')
    .upload(rutaArchivo, archivo);

  if (errorStorage) throw errorStorage;

  const { data, error } = await supabase
    .from('resultados')
    .insert([
      {
        orden_id: ordenId,
        ruta_archivo: rutaArchivo,
        nombre_archivo: archivo.name,
        observaciones: observaciones ?? null,
        subido_por: subidoPor ?? null,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}