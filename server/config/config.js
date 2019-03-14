// ============
// Puerto
// ============

process.env.PORT = process.env.PORT || 3000;


// ============
// Entorno
// ============

/**
 * se verifica si estamos local o en produccion osea online
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============
// Db
// ============

let urlDb;

if (process.env.NODE_ENV === 'dev') {
    process.env.URLDB = 'mongodb://localhost:27017/cafe';
} else {
    process.env.URLDB = process.env.MONGO_URI;
}

// ========================
// vencimiento del token
// ========================

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30; // 30 dias
// ===================================
// seed || token secret auntenticacion
// ===================================

process.env.SEED = process.env.SEED || 'seed-de-la-aplicacion';

// ===================================
// google client id
// ===================================

process.env.CLIENT_ID = process.env.CLIENT_ID || '660910679754-7tgt311r4fd02nmubaj439bmo8ou36jl.apps.googleusercontent.com';