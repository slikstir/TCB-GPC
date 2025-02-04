import { createAttendee, getAttendees, getAttendee, buyChud } from './attendees';
import { getProphets, spendChud } from './prophets';
import { getVouchers, redeemVoucher } from './vouchers';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    try {
      switch (request.method) {
        case 'POST':
          if (path === '/create-attendee') {
            return await createAttendee(request, env);
          } else if (path === '/buy-chud') {
            return await buyChud(request, env);
          } else if (path === '/spend-chud') {
            return await spendChud(request, env);
          } else if (path === '/redeem-voucher') {
            return await redeemVoucher(request, env);
          }
          break;

        case 'GET':
          if (path === '/attendees') {
            return await getAttendees(request, env);
          } else if (path === '/vouchers') {
              return await getVouchers(request, env);
          }  else if (path.startsWith('/attendee/')) {
            const email = path.split('/')[2];
            if (email) {
              return await getAttendee(email, env);
            } else {
              return new Response('Email parameter is required', { status: 400 });
            }
          } else if (path === '/get-prophets') {
            return await getProphets(request, env);
          }
          break;

        default:
          return new Response('Method Not Allowed', { status: 405 });
      }

      return new Response('Not Found', { status: 404 });
    } catch (error) {
      return new Response(`Error: ${error.message}`, { status: 500 });
    }
  },
};
