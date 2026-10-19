"use client";

import { useState } from "react";

interface ContactFormProps {
  recipientEmail: string;
  labels: {
    sendMessage: string;
    formDescription: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendButton: string;
    copyEmail: string;
    emailCopied: string;
    openGmail: string;
  };
}

export function ContactForm({ recipientEmail, labels }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  function handleCopyEmail() {
    navigator.clipboard.writeText(recipientEmail).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const mailSubject = encodeURIComponent(
      subject || `${labels.sendMessage} - ${name || "Portfolio"}`
    );
    const bodyContent = `${labels.nameLabel}: ${name}\n${labels.emailLabel}: ${email}\n\n${labels.messageLabel}:\n${message}`;
    const mailBody = encodeURIComponent(bodyContent);

    // Open default email client
    window.location.href = `mailto:${recipientEmail}?subject=${mailSubject}&body=${mailBody}`;
  }

  function handleOpenGmail() {
    const mailSubject = encodeURIComponent(
      subject || `${labels.sendMessage} - ${name || "Portfolio"}`
    );
    const bodyContent = `${labels.nameLabel}: ${name}\n${labels.emailLabel}: ${email}\n\n${labels.messageLabel}:\n${message}`;
    const mailBody = encodeURIComponent(bodyContent);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      recipientEmail
    )}&su=${mailSubject}&body=${mailBody}`;

    window.open(gmailUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 sm:p-8 lg:p-9 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-5">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            {labels.sendMessage}
          </h3>
          <p className="mt-1 text-xs text-muted sm:text-sm">
            {labels.formDescription}
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopyEmail}
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-soft px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <svg
            className="size-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {copied ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            )}
          </svg>
          <span>{copied ? labels.emailCopied : labels.copyEmail}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4 sm:space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="contact-name"
              className="block text-xs font-medium text-foreground sm:text-sm"
            >
              {labels.nameLabel} <span className="text-red-500">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={labels.namePlaceholder}
              className="mt-1.5 w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-subtle/70 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          <div>
            <label
              htmlFor="contact-email"
              className="block text-xs font-medium text-foreground sm:text-sm"
            >
              {labels.emailLabel} <span className="text-red-500">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={labels.emailPlaceholder}
              className="mt-1.5 w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-subtle/70 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="contact-subject"
            className="block text-xs font-medium text-foreground sm:text-sm"
          >
            {labels.subjectLabel} <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-subject"
            type="text"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder={labels.subjectPlaceholder}
            className="mt-1.5 w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-subtle/70 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        <div>
          <label
            htmlFor="contact-message"
            className="block text-xs font-medium text-foreground sm:text-sm"
          >
            {labels.messageLabel} <span className="text-red-500">*</span>
          </label>
          <textarea
            id="contact-message"
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={labels.messagePlaceholder}
            className="mt-1.5 w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-subtle/70 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent resize-y"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 w-full sm:w-auto"
          >
            <svg
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span>{labels.sendButton}</span>
          </button>

          <button
            type="button"
            onClick={handleOpenGmail}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-border-strong hover:bg-surface-soft focus-visible:outline-2 focus-visible:outline-offset-2 w-full sm:w-auto"
          >
            <svg
              className="size-4 text-red-500"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.272H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
            </svg>
            <span>{labels.openGmail}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
