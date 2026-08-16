"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { LoaderCircle, Mail, MessageCircle, Minus, RotateCcw, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ChatMessage = { id: string; role: "user" | "assistant"; content: string };

async function readAnswer(reader: ReadableStreamDefaultReader<Uint8Array>, decoder: TextDecoder, assistantId: string, update: React.Dispatch<React.SetStateAction<ChatMessage[]>>) {
  for (;;) {
    const { done, value } = await reader.read();
    if (done) return;
    const chunk = decoder.decode(value, { stream: true });
    update((current) => current.map((message) => message.id === assistantId ? { ...message, content: message.content + chunk } : message));
  }
}

const starterPrompts = [
  "What Has Samay Built?",
  "Tell Me About His Experience",
  "Which Technologies Does He Use?",
  "Contact Samay",
];

function suggestionsFor(content: string) {
  const value = content.toLowerCase();
  if (value.includes("contact") || value.includes("email") || value.includes("available")) {
    return ["Send Samay An Email", "View His LinkedIn", "See Featured Projects"];
  }
  if (value.includes("project") || value.includes("built") || value.includes("wealth")) {
    return ["Tell Me About Wealth One", "How Does AI Interviewer Work?", "Contact Samay"];
  }
  if (value.includes("experience") || value.includes("edmo") || value.includes("work")) {
    return ["What Did He Build At EDMO?", "Which Technologies Does He Use?", "Contact Samay"];
  }
  if (value.includes("technolog") || value.includes("skill") || value.includes("stack")) {
    return ["What Has Samay Built?", "Tell Me About His AI Work", "Contact Samay"];
  }
  return starterPrompts;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactError, setContactError] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I can answer questions about Samay's experience, projects, skills, and availability.",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, contactOpen]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  async function ask(question: string) {
    const prompt = question.trim();
    if (!prompt || sending) return;
    if (prompt.toLowerCase().includes("contact") || prompt.toLowerCase().includes("email")) {
      setContactOpen(true);
    }

    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: "user", content: prompt };
    const assistantId = crypto.randomUUID();
    const history = [...messages, userMessage];
    setMessages([...history, { id: assistantId, role: "assistant", content: "" }]);
    setInput("");
    setSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.map(({ role, content }) => ({ role, content })) }),
      });
      if (!response.ok || !response.body) throw new Error("Chat request failed");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      await readAnswer(reader, decoder, assistantId, setMessages);
    } catch {
      setMessages((current) => current.map((message) => message.id === assistantId
        ? { ...message, content: "I couldn't reach the assistant just now. You can still contact Samay directly at samayrathod1@gmail.com." }
        : message));
    } finally {
      setSending(false);
    }
  }

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setSending(true);
    setContactError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const result = await response.json();
      if (!response.ok) {
        setContactError(result.error ?? "That didn't go through. Please check the fields and try again.");
        return;
      }
      if (result.mailto) window.location.href = result.mailto;
      setMessages((current) => [...current, {
        id: crypto.randomUUID(),
        role: "assistant",
        content: result.sent ? "Your message was sent to Samay." : "Your email app is ready with the message addressed to Samay.",
      }]);
      setContactOpen(false);
      form.reset();
    } catch {
      setContactError("Couldn't reach the server. Opening your email app instead.");
      window.location.href = "mailto:samayrathod1@gmail.com";
    } finally {
      setSending(false);
    }
  }

  const latest = [...messages].reverse().find((message) => message.role === "assistant")?.content ?? "";
  const asked = new Set(messages.filter((message) => message.role === "user").map((message) => message.content.toLowerCase()));
  const suggestions = (messages.length === 1 ? starterPrompts : suggestionsFor(latest)).filter((suggestion) => !asked.has(suggestion.toLowerCase()));

  if (!open) {
    return (
      <button className="chat-launcher" onClick={() => setOpen(true)} aria-label="Open Ask About Samay chatbot">
        <MessageCircle className="size-5" />
      </button>
    );
  }

  return (
    <aside className={cn("chat-shell", minimized && "chat-minimized")} aria-label="Ask About Samay chatbot">
      <header className="chat-header">
        <span className="status-dot" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">Ask About Samay</p>
          <p className="text-[11px] text-muted-foreground">Online · Portfolio Assistant</p>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setMinimized((value) => !value)} aria-label={minimized ? "Restore chat" : "Minimize chat"}>
          <Minus className="size-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close chat"><X className="size-4" /></Button>
      </header>

      {!minimized && (
        <>
          <div ref={scrollRef} className="chat-scroll" aria-live="polite">
            {messages.map((message) => (
              <div key={message.id} className={cn("chat-message", message.role === "user" && "chat-message-user")}>
                {message.content || <LoaderCircle className="size-4 animate-spin" />}
              </div>
            ))}

            {contactOpen && (
              <form className="contact-form" onSubmit={submitContact}>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold">Email Samay</p>
                  <button type="button" onClick={() => { setContactOpen(false); setContactError(""); }} aria-label="Close contact form"><X className="size-3.5" /></button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input required name="name" placeholder="Name" aria-label="Name" />
                  <input required type="email" name="email" placeholder="Email" aria-label="Email" />
                </div>
                <input required name="subject" placeholder="Subject" aria-label="Subject" />
                <textarea required name="message" rows={3} placeholder="Message" aria-label="Message" />
                {contactError && <p className="chat-error" role="alert">{contactError}</p>}
                <Button size="sm" type="submit" disabled={sending}><Mail className="size-3.5" />Send Email</Button>
              </form>
            )}
          </div>

          <div className="chat-controls">
            {suggestions.length > 0 && <div className="chat-pills">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className="chat-pill"
                  disabled={sending}
                  onClick={() => suggestion.includes("Email") ? setContactOpen(true) : ask(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>}
            <form className="chat-composer" onSubmit={(event) => { event.preventDefault(); ask(input); }}>
              <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask a question..." aria-label="Ask a question" />
              <Button size="icon" type="submit" disabled={!input.trim() || sending} aria-label="Send question"><Send className="size-4" /></Button>
            </form>
            <button type="button" className="chat-reset" onClick={() => { setMessages((current) => current.slice(0, 1)); setContactOpen(false); setContactError(""); }}><RotateCcw className="size-3" />Reset conversation</button>
          </div>
        </>
      )}
    </aside>
  );
}
