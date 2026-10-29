export const RESULT_TIER_CONTENT = {
  rarely: {
    badge: 'Mostly Never or Rarely',
    heading: 'If your responses were mostly “Never” or “Rarely”',
    summary:
      'Your responses suggest you may currently feel relatively balanced and emotionally resourced.',
    paragraphs: [
      'Your responses suggest that you may currently feel relatively balanced and emotionally resourced. While everyone experiences difficult days, you may be finding ways to navigate challenges without feeling consistently overwhelmed by them.',
      'This can be a sign that your current coping strategies, support systems, routines, or boundaries are working well for you.',
      'Even so, emotional wellbeing isn’t something we achieve once and keep forever—it requires ongoing care. Continuing to make space for rest, reflection, meaningful relationships, and self-care can help you maintain that sense of balance.',
      'Think of this as an invitation to keep checking in with yourself, not because something is wrong, but because your wellbeing matters.',
    ],
  },
  sometimes: {
    badge: 'Mostly Sometimes',
    heading: 'If your responses were mostly “Sometimes”',
    summary:
      'Your responses suggest some emotional challenges may be present, even if they don’t feel overwhelming all the time.',
    paragraphs: [
      'Your responses suggest that some emotional challenges may be present in your life, even if they don’t feel overwhelming all the time.',
      'Perhaps you find yourself overthinking more than you’d like, feeling emotionally drained after certain interactions, struggling to prioritise your own needs, or carrying stress that never fully switches off.',
      'Many people in this range continue to function well on the outside while quietly carrying a significant amount internally. Because the challenges come and go, it’s easy to dismiss them or tell yourself they’re “not serious enough” to pay attention to.',
      'However, emotional difficulties don’t need to reach a crisis point before they deserve care.',
      'This may be an opportunity to become curious about what’s beneath these experiences, develop healthier coping tools, and create more space for your own emotional needs.',
    ],
  },
  often: {
    badge: 'Mostly Often or Almost Always',
    heading: 'If your responses were mostly “Often” or “Almost Always”',
    summary:
      'Your responses suggest you may be carrying a considerable emotional load right now.',
    paragraphs: [
      'Your responses suggest that you may be carrying a considerable emotional load right now.',
      'You may have become so accustomed to pushing through stress, worry, exhaustion, self-doubt, or emotional overwhelm that it has started to feel normal. Yet constantly functioning while feeling depleted can take a significant toll on your wellbeing over time.',
      'You might be finding it difficult to switch off, feeling emotionally disconnected, questioning yourself more often, struggling in relationships, or feeling as though you’re holding everything together while quietly running on empty.',
      'If this resonates with you, know that these experiences deserve attention, support, and compassion.',
      'You do not need to wait until things become unbearable before seeking help. Sometimes support is most effective when we reach for it while we are still functioning, rather than after we’ve reached breaking point.',
    ],
  },
}

export const GENTLE_REFLECTION = {
  heading: 'A Gentle Reflection',
  intro:
    'Whatever your responses may have been, this check-in offers just a snapshot of how things have felt recently. It is not a diagnosis, a label, or a measure of your strength.',
  subIntro: 'Instead, think of it as a conversation with yourself.',
  questions: [
    'What have you been carrying lately?',
    'What emotions have been asking for your attention?',
    'What support have you been needing but perhaps not giving yourself permission to seek?',
  ],
  closing: 'The answers to these questions can often tell us more than any score ever could.',
}

export const WHAT_NEXT = {
  heading: 'What Next?',
  paragraphs: [
    'If this check-in highlighted patterns of stress, burnout, self-doubt, relationship challenges, emotional overwhelm, or a sense that you’ve been struggling for longer than you’d like, it may be helpful to explore these experiences further.',
    'At Trueself, therapy offers a confidential, compassionate space where you can slow down, make sense of what you’re experiencing, and understand yourself more deeply.',
    'Together with a qualified therapist, you can explore recurring patterns, process difficult emotions, strengthen coping strategies, and build a healthier relationship with yourself.',
    'You don’t need to have all the answers before reaching out. Sometimes the first step is simply acknowledging that you’ve been carrying more than you realise.',
  ],
}

export const TIER_STYLES = {
  rarely: {
    badge: 'bg-[var(--color-mint)] text-[var(--color-sage-dark)] border-[var(--color-sage)]/50',
    accent: 'border-l-[var(--color-sage-dark)]',
    icon: 'bg-[var(--color-mint)] text-[var(--color-sage-dark)]',
  },
  sometimes: {
    badge: 'bg-[#FFF4E5] text-[#8B6914] border-[#E8C97A]/60',
    accent: 'border-l-[#C68532]',
    icon: 'bg-[#FFF4E5] text-[#8B6914]',
  },
  often: {
    badge: 'bg-[#F5EDE8] text-[#6B4A3A] border-[#C68532]/40',
    accent: 'border-l-[#A66B2E]',
    icon: 'bg-[#F5EDE8] text-[#6B4A3A]',
  },
}
