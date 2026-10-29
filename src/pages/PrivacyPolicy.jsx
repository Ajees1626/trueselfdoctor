import { Helmet } from 'react-helmet'
import { motion } from 'motion/react'
import SEO from '../components/SEO'

// cspell:ignore Trueself Tele-MANAS
const sections = [
  {
    title: '1. About Trueself',
    body: [
      'Trueself Counselling Services (“Trueself”, “we”, “us”, or “our”) is a mental-health counselling platform providing access to professional counselling and psychological support services through qualified mental-health professionals.',
      'Our services include individual counselling, couples counselling, family counselling, and group counselling services where applicable.',
      'By accessing our website, booking a session, communicating with Trueself, or using any of our services, you acknowledge that you have read, understood and agreed to these Terms & Conditions.',
      'If you do not agree with these Terms, please do not use our services.',
    ],
  },
  {
    title: '2. Eligibility',
    body: [
      'Our services are primarily intended for adults aged 18 years and above.',
      'Individuals below 18 years may be accepted only where Trueself determines that appropriate parental/guardian consent and safeguards are in place.',
      'Where required, Trueself may request age verification or additional consent before commencing services.',
    ],
  },
  {
    title: '3. Nature of Our Services',
    body: [
      'Trueself provides counselling and psychological support. Counselling is intended to assist individuals in addressing emotional, psychological, relational and behavioural concerns.',
      'Our services:',
    ],
    bullets: [
      'do not guarantee a particular psychological or life outcome;',
      'are not a substitute for emergency medical or psychiatric care;',
      'do not constitute medical diagnosis unless expressly provided by an appropriately qualified professional;',
      'do not replace treatment prescribed by a psychiatrist or other medical professional;',
      'may involve referral to another healthcare professional when clinically appropriate.',
    ],
    after: [
      'The effectiveness of counselling varies between individuals and depends on several factors, including the nature of the concern, individual circumstances, participation and continuity of care.',
    ],
  },
  {
    title: '4. Therapist Allocation',
    body: [
      'Trueself may recommend or assign a therapist based on the information provided by the client, therapist availability, area of concern, therapist expertise and other relevant considerations.',
      'A client may request a change of therapist. Trueself will make reasonable efforts to accommodate such requests, subject to therapist availability.',
      'A particular therapist cannot be guaranteed unless expressly confirmed by Trueself.',
    ],
  },
  {
    title: '5. Booking and Payment',
    body: [
      'Sessions must be booked through the channels authorised by Trueself.',
      'Payment must be completed according to the applicable fee communicated at the time of booking.',
      'Session fees may vary depending on:',
    ],
    bullets: [
      'therapist',
      'service type',
      'duration',
      'package',
      'promotional or community pricing',
      'or other applicable pricing structures',
    ],
    after: ['All applicable fees will be communicated before or at the time of booking.'],
  },
  {
    title: '6. Session Duration',
    body: [
      'Unless otherwise specified, a standard Trueself counselling session is 45 minutes.',
      'Clients are expected to join the session on time.',
      'If a client arrives late, the session may still end at the originally scheduled time.',
      'Where a session extends beyond the scheduled duration at the client’s request or due to circumstances attributable to the client, an applicable extension fee may be charged.',
    ],
  },
  {
    title: '7. Cancellation and Rescheduling',
    body: [
      'Clients are requested to provide at least 3 hours’ notice when cancelling or rescheduling a session.',
      'Cancellations made with less than the required notice may be treated as a late cancellation and may be chargeable.',
      'Repeated late cancellations or no-shows may result in:',
    ],
    bullets: [
      'loss of the session fee',
      'loss of package benefits',
      'restrictions on future bookings',
      'or discontinuation of services at Trueself’s discretion',
    ],
    after: ['Trueself may make reasonable exceptions in genuine emergencies or exceptional circumstances.'],
  },
  {
    title: '8. No-Show Policy',
    body: [
      'If a client does not attend a scheduled session and does not notify Trueself within the applicable cancellation period, the session may be considered a no-show.',
      'A no-show may be charged in full.',
    ],
  },
  {
    title: '9. Therapist Cancellation',
    body: [
      'If a therapist is unable to attend a scheduled session, Trueself will make reasonable efforts to:',
    ],
    bullets: [
      'reschedule the session',
      'provide another suitable therapist where appropriate',
      'or provide an applicable refund or credit where rescheduling is not possible',
    ],
  },
  {
    title: '10. Technical Issues',
    body: [
      'Online sessions depend on internet connectivity and third-party technology.',
      'Trueself is not responsible for interruptions caused by:',
    ],
    bullets: [
      'the client’s internet connection',
      'device problems',
      'power failures',
      'third-party platforms',
      'network outages',
      'or circumstances outside Trueself’s reasonable control',
    ],
    after: [
      'Where a significant technical disruption prevents the session from taking place, Trueself may, at its discretion, reschedule the session or provide an appropriate alternative.',
    ],
  },
  {
    title: '11. Confidentiality',
    body: [
      'Counselling sessions are confidential.',
      'Information shared by a client during counselling will generally not be disclosed to third parties without the client’s consent, except where disclosure is:',
    ],
    bullets: [
      'required or permitted by applicable law',
      'necessary because there is a serious and imminent risk of harm',
      'necessary to protect a child or vulnerable person',
      'required by a court or lawful authority',
      'necessary for professional consultation or supervision',
      'or otherwise permitted under applicable law',
    ],
    after: ['Confidentiality has legal and professional limits.'],
  },
  {
    title: '12. Emergency Situations',
    body: [
      'Trueself is not an emergency or crisis-response service.',
      'If you are experiencing an immediate risk of harm, please contact emergency services or the nearest hospital.',
      'In India, you may contact Tele-MANAS: 14416 / 1800-89-14416.',
    ],
  },
  {
    title: '13. Client Responsibility',
    body: ['Clients are responsible for:'],
    bullets: [
      'providing accurate information',
      'attending sessions on time',
      'participating honestly',
      'following counselling recommendations',
      'informing about relevant medical treatment',
      'seeking emergency care when required',
    ],
  },
  {
    title: '14. Professional Boundaries',
    body: [
      'Trueself maintains strict professional boundaries.',
      'Therapists will not engage in inappropriate personal, romantic, or exploitative relationships with clients.',
    ],
  },
  {
    title: '15. Communication Outside Sessions',
    body: ['Communication channels are for administrative purposes only, such as:'],
    bullets: ['scheduling', 'payment confirmation', 'reminders', 'rescheduling'],
    after: ['They are not crisis support channels.'],
  },
  {
    title: '16. Recording of Sessions',
    body: ['Recording sessions without prior written consent is strictly prohibited.'],
  },
  {
    title: '17. Intellectual Property',
    body: ['All Trueself content is protected and may not be copied or distributed without permission.'],
  },
  {
    title: '18. Group Counselling Services',
    body: [
      'Participants must maintain confidentiality and respect other members.',
      'Recording or sharing group content is strictly prohibited.',
    ],
  },
  {
    title: '19. Inappropriate Behaviour',
    body: ['Trueself may suspend services for abusive, threatening, or unsafe behaviour.'],
  },
  {
    title: '20. Refunds',
    body: ['Refunds are subject to service type, usage, and discretion of Trueself.'],
  },
  {
    title: '21. Packages',
    body: [
      'Package terms will be communicated at purchase. Sessions are non-transferable unless stated otherwise.',
    ],
  },
  {
    title: '22. Third-Party Platforms',
    body: ['Services may rely on third-party tools governed by their own policies.'],
  },
  {
    title: '23. Website and Educational Content',
    body: ['Content is for educational purposes only and not medical advice.'],
  },
  {
    title: '24. Limitation of Liability',
    body: ['Trueself is not liable for indirect or consequential losses to the extent permitted by law.'],
  },
  {
    title: '25. Service Availability',
    body: ['Services may be modified or discontinued when necessary.'],
  },
  {
    title: '26. Privacy',
    body: ['Personal data is handled according to Trueself’s Privacy Policy.'],
  },
  {
    title: '27. Changes to These Terms',
    body: ['Trueself may update these Terms at any time. Continued use implies acceptance.'],
  },
  {
    title: '28. Governing Law and Jurisdiction',
    body: ['These Terms are governed by the laws of India. Jurisdiction: Chennai, Tamil Nadu.'],
  },
  {
    title: '29. Acceptance',
    body: ['By using Trueself services, you agree to these Terms.'],
  },
]

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <Helmet>
        <title>Terms & Conditions | TRUESELF COUNSELLING</title>
        <link rel="icon" href="/logotop.webp" />
      </Helmet>
      <SEO
        title="Terms & Conditions | TRUESELF COUNSELLING SERVICES"
        description="Terms & Conditions for TRUESELF COUNSELLING SERVICES, covering bookings, sessions, confidentiality, cancellations, and client responsibilities."
        keywords="terms and conditions, counselling terms, online therapy terms, TRUESELF COUNSELLING"
        path="/privacy-policy"
      />

      <section className="pt-24 sm:pt-28 pb-10 sm:pb-12 px-4 sm:px-6 bg-[#FFFFFF] text-center">
        <motion.p
          className="text-xs sm:text-sm tracking-[0.18em] uppercase text-[var(--color-sage-dark)] font-medium mb-2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          TRUESELF COUNSELLING SERVICES
        </motion.p>
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3d3d3d] mb-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Terms &amp; Conditions
        </motion.h1>
        <p className="text-sm sm:text-base text-[#5a5a5a]">Last updated: 17 August 2026</p>
      </section>

      <section className="py-10 sm:py-14 px-4 sm:px-6 bg-[#FFFFFF]">
        <article className="max-w-3xl mx-auto space-y-8">
          {sections.map(({ title, body, bullets, after }) => (
            <div key={title}>
              <h2 className="text-lg sm:text-xl font-semibold text-[var(--color-sage-dark)] mb-3">{title}</h2>
              {body?.map((p) => (
                <p key={p} className="text-sm sm:text-base text-[#5a5a5a] leading-relaxed mb-3">
                  {p}
                </p>
              ))}
              {bullets && (
                <ul className="list-disc pl-5 sm:pl-6 mb-3 space-y-1.5">
                  {bullets.map((item) => (
                    <li key={item} className="text-sm sm:text-base text-[#5a5a5a] leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {after?.map((p) => (
                <p key={p} className="text-sm sm:text-base text-[#5a5a5a] leading-relaxed mb-3">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </article>
      </section>
    </div>
  )
}
