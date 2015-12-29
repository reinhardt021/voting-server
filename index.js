import makeStore from './src/store';
import startServer from './src/server';

export const store = makeStore();
startServer(); // server starts when app starts