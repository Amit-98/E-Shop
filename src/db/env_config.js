const db_key = "local";// local, devlopment, production

const PORT_CONFIG = db_key === "devlopment" ? 5001 : 5000;

export { db_key, PORT_CONFIG };
