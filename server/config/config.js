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