try {
    require('/Users/ankit/Documents/folio/node_modules/next/dist/server/require-hook');
    require('/Users/ankit/Documents/folio/node_modules/next/dist/server/node-environment-baseline.js');
    console.log('Successfully required node-environment-baseline');
} catch (e) {
    console.error('Failed to require node-environment-baseline');
    console.error(e);
}
