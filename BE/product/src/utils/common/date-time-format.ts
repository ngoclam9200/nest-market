import moment from 'moment';


export function formatDateTime (dateTimeString: any): string {
    return moment(dateTimeString).format('DD/MM/YYYY HH:mm');
};