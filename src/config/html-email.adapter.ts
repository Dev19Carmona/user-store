export class HtmlEmailAdapter {
  constructor() {}
  static htmlValidateEmail(link: string) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Validar correo electrónico</title>
      <style>
      .divContainer {
        background: #A3E4D7 ;
        width: max-content;
        display: grid;
        place-items: center;
        padding-bottom: 20px; 
        padding-left: 20px;
        padding-right: 20px;
        flex-direction: column;
        border-radius: 5px;
        font-family: Arial, sans-serif;
      }
        
        a {
          background: #1ABC9C ;
          padding: 7px;
          border-radius: 5px;
          width: max-content;
          text-decoration: none;
          color: #EAF2F8;
        }
        
        .title {
          font-size: 25px;
          font-weight: 600;
          letter-spacing: 1;
        }
      </style>
    </head>
    <body>
      <div class="divContainer">
        <p class="title">Validate your Email</p>
        <p>Click on the following to validate your email</p>
        <a href="${link}">Validate your email</a>
      </div>
    </body>
    </html>
    `
  }
  static htmlValidatedEmailSuccess() {
    return `
    <!DOCTYPE html>
<html>
<head>
  <title>Validación de correo electrónico exitosa</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      padding: 20px;
    }

    .success-container {
      background-color: #d4edda;
      border: 1px solid #c3e6cb;
      border-radius: 4px;
      padding: 20px;
      max-width: 500px;
      margin: 0 auto;
    }

    .success-container h2 {
      color: #155724;
      margin-top: 0;
    }

    .success-container p {
      color: #0f5132;
    }
  </style>
</head>
<body>
  <div class="success-container">
    <h2>¡Validación exitosa!</h2>
    <p>Tu correo electrónico ha sido validado correctamente.</p>
  </div>
</body>
</html>
    `
  }
  static htmlValidatedEmailFailure() {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Validación de correo electrónico fallida</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          text-align: center;
          padding: 20px;
        }
    
        .error-container {
          background-color: #f8d7da;
          border: 1px solid #f5c6cb;
          border-radius: 4px;
          padding: 20px;
          max-width: 500px;
          margin: 0 auto;
        }
    
        .error-container h2 {
          color: #842029;
          margin-top: 0;
        }
    
        .error-container p {
          color: #721c24;
        }
      </style>
    </head>
    <body>
      <div class="error-container">
        <h2>Error en la validación</h2>
        <p>No se pudo validar tu correo electrónico. Por favor, inténtalo de nuevo.</p>
      </div>
    </body>
    </html>
    `
  }
}
