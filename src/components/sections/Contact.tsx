'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { useTranslations } from '@/hooks/useTranslations'

export function Contact() {
  const ref = useRef(null)
  const { t } = useTranslations()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // Parallax para Contact
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])
  const elementsY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"])

  // Validación de email
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Validación de contenido (anti-spam básico)
  const containsSpamKeywords = (text: string) => {
    const spamKeywords = ['viagra', 'casino', 'lottery', 'winner', 'congratulations', 'click here', 'free money']
    return spamKeywords.some(keyword => text.toLowerCase().includes(keyword))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    // Validaciones del lado del cliente
    if (!formData.name.trim() || formData.name.length < 2) {
      setErrorMessage(t('contact.form.error'))
      setStatus('error')
      return
    }

    if (!isValidEmail(formData.email)) {
      setErrorMessage(t('contact.form.error'))
      setStatus('error')
      return
    }

    if (!formData.message.trim() || formData.message.length < 10) {
      setErrorMessage(t('contact.form.error'))
      setStatus('error')
      return
    }

    if (containsSpamKeywords(formData.message) || containsSpamKeywords(formData.name)) {
      setErrorMessage(t('contact.form.error'))
      setStatus('error')
      return
    }

    try {
      // Configuración de EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'einzunza2@gmail.com',
        reply_to: formData.email,
      }

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
      )

      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Error sending email:', error)
      setErrorMessage(t('contact.form.error'))
      setStatus('error')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    // Limpiar errores cuando el usuario empiece a escribir
    if (status === 'error') {
      setStatus('idle')
      setErrorMessage('')
    }
  }

  return (
    <section ref={ref} id="contact" className="py-20 relative overflow-hidden">
      {/* Fondo parallax elegante */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-secondary/3" />
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-secondary/8 rounded-full blur-3xl" />
      </motion.div>

      {/* Elementos flotantes */}
      <motion.div
        className="absolute inset-0 z-1"
        style={{ y: elementsY }}
      >
        <div className="absolute top-1/4 right-10 w-2 h-2 bg-primary/30 rounded-full" />
        <div className="absolute top-3/4 left-10 w-1 h-1 bg-secondary/40 rounded-full" />
        <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-primary/20 rounded-full" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('contact.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold mb-6">{t('contact.title')}</h3>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{t('contact.form.email')}</p>
                <p className="text-muted-foreground">{t('contact.info.email')}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Teléfono</p>
                <p className="text-muted-foreground">+56 9 XXXX XXXX</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Ubicación</p>
                <p className="text-muted-foreground">{t('contact.info.location')}</p>
              </div>
            </div>

            {/* Información sobre privacidad */}
            <div className="mt-8 p-4 bg-muted/30 rounded-lg backdrop-blur-sm">
              <h4 className="font-medium mb-2">{t('contact.privacy.title')}</h4>
              <p className="text-sm text-muted-foreground">
                {t('contact.privacy.description')}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {status === 'success' ? (
              <div className="text-center p-8 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800 backdrop-blur-sm">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-400 mb-2">
                  {t('contact.form.success')}
                </h3>
                <p className="text-green-600 dark:text-green-300">
                  {t('contact.form.successDescription')}
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setStatus('idle')} 
                  className="mt-4"
                >
                  {t('contact.form.sendAnother')}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    {t('contact.form.name')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('contact.form.namePlaceholder')}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background/80 backdrop-blur-sm"
                    required
                    minLength={2}
                    maxLength={100}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    {t('contact.form.email')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('contact.form.emailPlaceholder')}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background/80 backdrop-blur-sm"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {t('contact.helpers.emailHelper')}
                  </p>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    {t('contact.form.message')} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder={t('contact.form.messagePlaceholder')}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background/80 backdrop-blur-sm resize-none"
                    required
                    minLength={10}
                    maxLength={1000}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {formData.message.length}/1000 {t('contact.helpers.charactersCount')}
                  </p>
                </div>

                {errorMessage && (
                  <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">{errorMessage}</span>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                      {t('contact.form.sending')}
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      {t('contact.form.send')}
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
