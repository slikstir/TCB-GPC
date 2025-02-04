export async function getVouchers(request, env) {
  const { results } = await env.DB.prepare(`SELECT * FROM vouchers`).all();
  return new Response(JSON.stringify(results), { headers: { "Content-Type": "application/json" } });
}

export async function redeemVoucher(request, env) {
  const body = await request.json();
  // Logic to handle voucher redemption
  return new Response(JSON.stringify({ message: 'Voucher redeemed successfully!' }), { status: 200 });
}
