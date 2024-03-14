import { format, parseISO } from 'date-fns';
import { enUS } from 'date-fns/locale';

const formatDate = (dateCompleted) => {
    const date = parseISO(dateCompleted);
    const formattedDate = format(date, "MMMM dd, yyyy", { locale: enUS });
    return formattedDate;
}

export default formatDate;