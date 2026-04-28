try {
    process.chdir('/Users/ankit/Documents/folio/node_modules/next/dist/server');
    require('./node-environment');
    console.log('Successfully required node-environment relatively');
} catch (e) {
    console.error('Failed to require node-environment relatively');
    console.error(e);
}
