export async function createAttendee(request, env) {
  const body = await request.json();
  await env.DB.prepare(
    `INSERT INTO attendees (email, name, seat_number, chuds, performance_points, level) VALUES (?, ?, ?, ?, ?, ?)`
  )
    .bind(body.email, body.name, body.seat_number, body.chuds, body.performance_points, body.level)
    .run();
  return new Response(JSON.stringify({ message: 'Attendee created successfully!' }), { status: 201 });
}

export async function getAttendee(email, env) {
  if (!email) {
    return new Response(JSON.stringify({ error: 'Email query parameter is required' }), { status: 400 });
  }
  const result = await env.DB.prepare(`SELECT * FROM attendees WHERE email = ?`).bind(email).first();
  if (!result) {
    return new Response(JSON.stringify({ error: 'Attendee not found' }), { status: 404 });
  }
  return new Response(JSON.stringify(result), { status: 200 });
}

export async function getAttendees(request, env) {
  try {
    const { results } = await env.DB.prepare(`SELECT * FROM attendees`).all();
    return new Response(JSON.stringify(results), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function buyChud(request, env) {
  const body = await request.json();
  const { email, amount } = body;
  if (!email || typeof amount !== 'number') {
    return new Response(JSON.stringify({ error: 'Invalid request parameters' }), { status: 400 });
  }
  const attendee = await env.DB.prepare('SELECT chuds FROM attendees WHERE email = ?').bind(email).first();
  if (!attendee) {
    return new Response(JSON.stringify({ error: 'Attendee not found' }), { status: 404 });
  }
  const newChudBalance = attendee.chuds + amount;
  await env.DB.prepare('UPDATE attendees SET chuds = ? WHERE email = ?').bind(newChudBalance, email).run();
  return new Response(JSON.stringify({ message: 'Chuds added successfully!', newChudBalance }), { status: 200 });
}

