export const formatDate = (fechaActual: Date) => {
  const formatoLocal = new Intl.DateTimeFormat(undefined, {
    timeZoneName: 'short'
  });
  const { timeZone } = formatoLocal.resolvedOptions();

  const formatoFechaLocal = new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timeZone
  });
  const fechaFormateada = formatoFechaLocal.format(fechaActual);

  return fechaFormateada
}
