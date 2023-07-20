export const newFormattedDate = () => {

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

export const converteToDate = (date: string) => {
  return new Date(date);
};

export const difference = (dateIni: string, dateTermino: string) => {
    const date1 = new Date(dateIni);
    const date2 = new Date(dateTermino);
    const differenceInMilliseconds: number = Math.abs(date2.getTime() - date1.getTime());
    const differenceInMinutes = differenceInMilliseconds / (1000 * 60);
    return differenceInMinutes.toFixed(2);
};

export const isValid = (dateIni: string, tempo:number) => {
  const date1 = new Date(dateIni);
  const newDate = new Date();
  const differenceInMilliseconds: number = Math.abs(newDate.getTime() - date1.getTime());
  const differenceInMinutes = differenceInMilliseconds / (1000 * 60);
  return differenceInMinutes < tempo ? true : false;
};
