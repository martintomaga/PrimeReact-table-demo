import { setupWorker } from 'msw/browser';

import tableColumns from './tableColumns';
import clientTableData from './clientTableData';
import serverTableData from './serverTableData';

const worker = setupWorker(...tableColumns(), ...clientTableData(), ...serverTableData());

worker.start();
