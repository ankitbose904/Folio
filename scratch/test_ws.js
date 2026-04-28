try {
    const ws = require('/Users/ankit/Documents/folio/node_modules/next/dist/compiled/ws');
    console.log('Successfully required next/dist/compiled/ws');
    console.log('WebSocket exists:', !!ws.WebSocket);
} catch (e) {
    console.error('Failed to require next/dist/compiled/ws');
    console.error(e);
}
