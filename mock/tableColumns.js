import { http, HttpResponse } from 'msw';

const tableColumns = () => [
  http.get('/table/tableColumns?tableName=:tableName', ({ request }) => {
    let tableName = new URL(request.url).searchParams.get('tableName');

    if (tableName === 'ServerSideTable') {
      return HttpResponse.json(
        ['firstName', 'lastName', 'email', 'phoneNumber', 'note', 'address', 'weight', 'height'],
        {
          status: 202,
          statusText: 'Mocked status',
        },
      );
    } else {
      return HttpResponse.json(['firstName', 'lastName', 'email', 'phoneNumber'], {
        status: 202,
        statusText: 'Mocked status',
      });
    }
  }),

  http.post('/table/tableColumns', () => {
    return HttpResponse.json(
      {},
      {
        status: 202,
        statusText: 'Mocked status',
      },
    );
  }),
];

export default tableColumns;
