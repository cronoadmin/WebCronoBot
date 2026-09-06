// app/actions/email-actions.ts
'use server'

import nodemailer, { type Transporter } from 'nodemailer'

// DEBUG - Verificar variables de entorno
console.log('=== VERIFICANDO VARIABLES DE ENTORNO ===')
console.log('EMAIL_USER:', process.env.EMAIL_USER ? '✅ Configurado' : '❌ No configurado')
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '✅ Configurado' : '❌ No configurado')
console.log('RESEND_TO_EMAIL:', process.env.RESEND_TO_EMAIL || 'No configurado')
console.log('=========================================')

// Leer variables de entorno
const EMAIL_USER = process.env.EMAIL_USER || ''
const EMAIL_PASS = process.env.EMAIL_PASS || ''
const RESEND_TO_EMAIL = process.env.RESEND_TO_EMAIL || ''

console.log('📧 EMAIL_USER (desde .env):', EMAIL_USER ? '✅' : '❌')
console.log('📧 EMAIL_PASS (desde .env):', EMAIL_PASS ? '✅' : '❌')
console.log('📧 RESEND_TO_EMAIL (desde .env):', RESEND_TO_EMAIL)

// Crear transporter
let transporter: Transporter | null = null

if (EMAIL_USER && EMAIL_PASS) {
  try {
    // Eliminar espacios de la contraseña
    const cleanPass = EMAIL_PASS.replace(/\s/g, '').trim()
    
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: cleanPass,
      },
    })
    
    console.log('✅ Email transporter configurado correctamente')
    console.log('📧 Enviando desde:', EMAIL_USER)
  } catch (error) {
    console.error('❌ Error configurando email:', error)
  }
} else {
  console.error('❌ Credenciales no configuradas en .env')
  console.error('   EMAIL_USER:', EMAIL_USER ? '✅' : '❌')
  console.error('   EMAIL_PASS:', EMAIL_PASS ? '✅' : '❌')
  console.error('   Verifica que el archivo .env.local tenga:')
  console.error('   EMAIL_USER=orlandoaldair1998@gmail.com')
  console.error('   EMAIL_PASS=tu_contraseña_de_16_digitos')
}

interface EnviarEmailClienteProps {
  nombre: string
  email: string
  servicio: string
  curso?: string
  mensaje: string
}

interface EnviarEmailAdminProps {
  nombre: string
  email: string
  telefono: string
  servicio: string
  curso?: string
  mensaje: string
}

export async function enviarEmailCliente({ nombre, email, servicio, curso, mensaje }: EnviarEmailClienteProps) {
  try {
    if (!transporter) {
      console.error('❌ Transporter no configurado')
      return { success: false, error: 'Email no configurado. Verifica las credenciales en .env.local' }
    }

    // Construir el mensaje para el cliente
    let mensajeCompleto = `¡Hola ${nombre}! 👋\n\n`
    mensajeCompleto += `Hemos recibido tu solicitud de información correctamente. Nuestro equipo se pondrá en contacto contigo en las próximas 24 horas.\n\n`
    mensajeCompleto += `📋 Detalles de tu solicitud:\n`
    mensajeCompleto += `Servicio: ${servicio}\n`
    if (curso) mensajeCompleto += `Curso: ${curso}\n`
    if (mensaje) mensajeCompleto += `\nMensaje: ${mensaje}`

    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: '¡Hemos recibido tu solicitud! - CRONO BOT',
      text: mensajeCompleto,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { 
              font-family: Arial, sans-serif; 
              background: #0a0a0a; 
              color: #ffffff; 
              padding: 20px; 
              margin: 0;
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              background: #111111; 
              border-radius: 16px; 
              padding: 40px; 
              border: 1px solid #1a1a1a; 
            }
            .header { 
              text-align: center; 
              border-bottom: 1px solid #1a1a1a; 
              padding-bottom: 20px; 
              margin-bottom: 30px; 
            }
            .logo { 
              font-size: 28px; 
              font-weight: bold; 
              color: #ffffff;
            }
            .logo span { 
              color: #22c55e; 
            }
            .content { 
              line-height: 1.8; 
              color: #ffffff;
            }
            .content h2 { 
              color: #22c55e; 
            }
            .content p {
              color: #ffffff;
            }
            .content strong {
              color: #ffffff;
            }
            .info-box { 
              background: #1a1a1a; 
              padding: 15px; 
              border-radius: 8px; 
              margin: 15px 0; 
              border-left: 3px solid #22c55e; 
            }
            .info-box p {
              color: #ffffff;
            }
            .info-box strong {
              color: #ffffff;
            }
            .footer { 
              text-align: center; 
              border-top: 1px solid #1a1a1a; 
              padding-top: 20px; 
              margin-top: 30px; 
              color: #888888; 
              font-size: 12px; 
            }
            .btn { 
              display: inline-block; 
              background: #22c55e; 
              color: #000000; 
              padding: 12px 24px; 
              border-radius: 8px; 
              text-decoration: none; 
              font-weight: bold; 
            }
            .btn:hover {
              background: #16a34a;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">CRONO<span>BOT</span></div>
              <p style="color: #888888; margin-top: 5px;">Soluciones tecnológicas</p>
            </div>
            
            <div class="content">
              <h2>¡Hola ${nombre}! 👋</h2>
              <p>Hemos recibido tu solicitud de información correctamente. Nuestro equipo se pondrá en contacto contigo en las próximas 24 horas.</p>
              
              <div class="info-box">
                <p><strong>📋 Detalles de tu solicitud:</strong></p>
                <p><strong>Servicio:</strong> ${servicio}</p>
                ${curso ? `<p><strong>Curso:</strong> ${curso}</p>` : ''}
                <p><strong>Mensaje:</strong> ${mensaje || 'Sin mensaje adicional'}</p>
              </div>
              
              <p style="text-align: center; margin: 25px 0;">
                <a href="https://wa.me/51918570834" class="btn">📱 Contáctanos por WhatsApp</a>
              </p>
              
              <p style="color: #888888; font-size: 14px;">Mientras tanto, puedes visitar nuestra web para conocer más sobre nuestros servicios.</p>
            </div>
            
            <div class="footer">
              <p>© 2024 CRONO BOT. Todos los derechos reservados.</p>
              <p>Lima, Perú</p>
            </div>
          </div>
        </body>
        </html>
      `
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('✅ Email al cliente enviado:', info.messageId)
    return { success: true, data: info }
  } catch (error) {
    console.error('❌ Error enviando email al cliente:', error)
    return { success: false, error: String(error) }
  }
}

export async function enviarEmailAdmin({ nombre, email, telefono, servicio, curso, mensaje }: EnviarEmailAdminProps) {
  try {
    if (!transporter) {
      console.error('❌ Transporter no configurado')
      return { success: false, error: 'Email no configurado. Verifica las credenciales en .env.local' }
    }

    // Construir el mensaje para el admin
    let mensajeCompleto = `📩 Nueva solicitud de contacto\n\n`
    mensajeCompleto += `👤 Nombre: ${nombre}\n`
    mensajeCompleto += `📧 Email: ${email}\n`
    mensajeCompleto += `📱 Teléfono: ${telefono || 'No especificado'}\n`
    mensajeCompleto += `📋 Servicio: ${servicio}\n`
    if (curso) mensajeCompleto += `🎓 Curso: ${curso}\n`
    if (mensaje) mensajeCompleto += `\n💬 Mensaje:\n${mensaje}`

    const mailOptions = {
      from: EMAIL_USER,
      to: RESEND_TO_EMAIL || EMAIL_USER,
      subject: `Nueva solicitud de contacto - ${servicio}`,
      text: mensajeCompleto,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { 
              font-family: Arial, sans-serif; 
              background: #0a0a0a; 
              color: #ffffff; 
              padding: 20px; 
              margin: 0;
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              background: #111111; 
              border-radius: 16px; 
              padding: 40px; 
              border: 1px solid #1a1a1a; 
            }
            .header { 
              border-bottom: 1px solid #1a1a1a; 
              padding-bottom: 20px; 
              margin-bottom: 30px; 
            }
            .header h2 {
              color: #22c55e;
            }
            .badge { 
              display: inline-block; 
              background: #22c55e; 
              color: #000000; 
              padding: 4px 12px; 
              border-radius: 20px; 
              font-size: 12px; 
              font-weight: bold; 
            }
            .content { 
              line-height: 1.8; 
              color: #ffffff;
            }
            .content p {
              color: #ffffff;
            }
            .content strong {
              color: #ffffff;
            }
            .info-box { 
              background: #1a1a1a; 
              padding: 20px; 
              border-radius: 8px; 
              margin: 15px 0; 
              border-left: 3px solid #22c55e; 
            }
            .info-row { 
              display: flex; 
              padding: 8px 0; 
              border-bottom: 1px solid #222222; 
            }
            .info-label { 
              font-weight: bold; 
              color: #22c55e; 
              width: 120px; 
              flex-shrink: 0; 
            }
            .info-value { 
              color: #ffffff; 
            }
            .footer { 
              text-align: center; 
              border-top: 1px solid #1a1a1a; 
              padding-top: 20px; 
              margin-top: 30px; 
              color: #888888; 
              font-size: 12px; 
            }
            .action-box {
              background: #1a1a1a; 
              padding: 15px; 
              border-radius: 8px; 
              margin-top: 20px;
            }
            .action-box p {
              color: #888888;
            }
            .action-box a {
              color: #22c55e;
              text-decoration: none;
            }
            .action-box a:hover {
              text-decoration: underline;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>📩 Nueva solicitud de contacto</h2>
              <span class="badge">${servicio}</span>
            </div>
            
            <div class="content">
              <div class="info-box">
                <div class="info-row">
                  <span class="info-label">👤 Nombre:</span>
                  <span class="info-value">${nombre}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">📧 Email:</span>
                  <span class="info-value">${email}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">📱 Teléfono:</span>
                  <span class="info-value">${telefono || 'No especificado'}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">📋 Servicio:</span>
                  <span class="info-value">${servicio}</span>
                </div>
                ${curso ? `
                <div class="info-row">
                  <span class="info-label">🎓 Curso:</span>
                  <span class="info-value">${curso}</span>
                </div>
                ` : ''}
                <div class="info-row" style="border-bottom: none;">
                  <span class="info-label">💬 Mensaje:</span>
                  <span class="info-value">${mensaje || 'Sin mensaje adicional'}</span>
                </div>
              </div>
              
              <p style="color: #888888; font-size: 14px; margin-top: 20px;">
                📌 Responde a este cliente lo antes posible. Puedes contactarlo directamente por email o teléfono.
              </p>
              
              <div class="action-box">
                <p>
                  <strong style="color: #ffffff;">📎 Acciones rápidas:</strong><br>
                  <a href="mailto:${email}">Responder por email</a> • 
                  <a href="tel:${telefono}">Llamar</a> • 
                  <a href="https://wa.me/51${telefono?.replace(/\s/g, '')}">WhatsApp</a>
                </p>
              </div>
            </div>
            
            <div class="footer">
              <p>© 2024 CRONO BOT - Sistema de gestión de contactos</p>
              <p>Este email fue enviado automáticamente desde el formulario de contacto</p>
            </div>
          </div>
        </body>
        </html>
      `
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('✅ Email al admin enviado:', info.messageId)
    return { success: true, data: info }
  } catch (error) {
    console.error('❌ Error enviando email al admin:', error)
    return { success: false, error: String(error) }
  }
}