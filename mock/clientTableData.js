import { http, HttpResponse } from 'msw';

const clientTableData = () => [
  http.get('/table/clientTableData', () => {
    return HttpResponse.json(
      [
        {
          id: '1',
          firstName: 'Karel',
          lastName: 'Prvni',
          email: 'ja1@ja.cz',
          phoneNumber: '111',
          address: 'moje adresa 1',
        },
        {
          id: '2',
          firstName: 'Matej',
          lastName: 'Druhy',
          email: 'ja2@ja.cz',
          phoneNumber: '222',
          address: 'moje adresa 2',
        },
        {
          id: '3',
          firstName: 'Jan',
          lastName: 'Treti',
          email: 'ja3@ja.cz',
          phoneNumber: '333',
          address: 'moje adresa 3',
        },
        {
          id: '4',
          firstName: 'Jan',
          lastName: 'Stvrty',
          email: 'ja4@ja.cz',
          phoneNumber: '444',
          address: 'moje adresa 4',
        },
        {
          id: '5',
          firstName: 'Jan',
          lastName: 'Paty',
          email: 'ja5@ja.cz',
          phoneNumber: '555',
          address: 'moje adresa 5',
        },
      ],
      {
        status: 202,
        statusText: 'Mocked status',
      },
    );
  }),
];

export default clientTableData;
