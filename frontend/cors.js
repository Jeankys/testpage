module.exports = (req, res, next) => {
    // Añade los encabezados CORS necesarios
    res.setHeader('Access-Control-Allow-Origin', 'https://testpage-orpin.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
    // Finaliza la solicitud OPTIONS exitosamente
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
  
    // Llama al siguiente middleware
    next();
  };
  