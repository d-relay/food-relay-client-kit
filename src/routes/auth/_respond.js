export function respond(body) {
    if (body.errors) {
        return { status: 401, body };
    }

    const json = JSON.stringify(body.user);
    const value = Buffer.from(json).toString('base64');
    const date = new Date()
    date.setTime(date.getTime() + (60 * 60 * 1000));
    const expires = date.toUTCString();

    console.log(`jwt=${value}; Path=/; HttpOnly; Secure; Expires=${expires}`);
    return {
        headers: {
            'set-cookie': `jwt=${value}; Path=/; HttpOnly; Secure; Expires=${expires}`
        },
        body
    };
}
