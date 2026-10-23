'use client';

import { useRef, useState } from 'react';
import { ArrowUpRight, Check, LoaderCircle } from 'lucide-react';
import { Github, Linkedin } from './BrandIcons';
import { profile } from '../data/portfolio';
import Reveal from './Reveal';
import SectionLabel from './SectionLabel';

export default function Contact() {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const submitting = useRef(false);
  const onSubmit = async (event) => {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const formData = new FormData(form);
    if (formData.get('botcheck')) return;
    // Web3Forms access keys are public form identifiers, not private API credentials.
    formData.append(
      'access_key',
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '27b9bde2-2cc1-41ab-a92c-d1123430e015',
    );
    formData.append('subject', 'Portfolio — new conversation');
    submitting.current = true;
    setStatus('sending');
    setMessage('Sending your message…');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error('Message delivery failed');
      setStatus('success');
      setMessage('Thanks for reaching out. Your message has been sent!');
      form.reset();
    } catch {
      setStatus('error');
      setMessage(
        'Your message could not be sent. Please try again, or connect with me on LinkedIn.',
      );
    } finally {
      clearTimeout(timeout);
      submitting.current = false;
    }
  };

  return (
    <section id="contact" className="contact-section section">
      <div className="shell">
        <Reveal>
          <SectionLabel number="06">GOOD THINGS START WITH A CONVERSATION</SectionLabel>
        </Reveal>
        <div className="contact-layout">
          <Reveal className="contact-copy">
            <span className="contact-star" aria-hidden="true">
              ✳
            </span>
            <h2>
              Have an idea?
              <br />
              Let’s make
              <br />
              <span>it happen.</span>
            </h2>
            <p>
              A project, an opportunity, or an interesting question.
              <br />
              I’d love to hear what you’re thinking.
            </p>
            <div className="contact-socials">
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin size={17} />
                LinkedIn
                <ArrowUpRight size={14} />
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                <Github size={17} />
                GitHub
                <ArrowUpRight size={14} />
              </a>
            </div>
          </Reveal>
          <Reveal className="contact-form-wrap">
            <form onSubmit={onSubmit} className="contact-form">
              <p className="form-intro">Tell me a little about it.</p>
              <div className="form-row">
                <label>
                  Your name
                  <input
                    name="name"
                    autoComplete="name"
                    placeholder="What should I call you?"
                    required
                    maxLength={100}
                  />
                </label>
                <label>
                  Email address
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                    maxLength={254}
                  />
                </label>
              </div>
              <label>
                What’s on your mind?
                <textarea
                  name="message"
                  placeholder="A little about your idea, project, or question…"
                  rows={4}
                  required
                  minLength={10}
                  maxLength={5000}
                />
              </label>
              <input
                name="botcheck"
                className="honeypot"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              <button
                className="button button-primary send-button"
                type="submit"
                disabled={status === 'sending'}
              >
                {status === 'sending'
                  ? 'Sending…'
                  : status === 'success'
                    ? 'Send another message'
                    : 'Send your message'}
                {status === 'sending' ? (
                  <LoaderCircle size={17} className="spinner" />
                ) : status === 'success' ? (
                  <Check size={18} />
                ) : (
                  <ArrowUpRight size={18} />
                )}
              </button>
              <p className={`form-status ${status}`} role="status" aria-live="polite">
                {message}
              </p>
              <p className="form-privacy">Messages are delivered through Web3Forms.</p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
