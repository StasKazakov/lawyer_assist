"use client";

import Composer from "@/components/Composer";
import Header from "@/components/Header";
import { EmptyState } from "@/components/EmptyState";
import { MessageList } from "@/components/MessageList";
import { useChat } from "@/hooks/useChat";

export default function HomePage() {
  const {
    messages,
    input,
    setInput,
    isLoading,
    hasMessages,
    textareaRef,
    handleSubmit,
    handleKeyDown,
  } = useChat();

  const composerProps = {
    value: input,
    onChange: setInput,
    onSubmit: handleSubmit,
    onKeyDown: handleKeyDown,
    isLoading,
    textareaRef,
  };

  return (
    <main className="flex h-screen flex-col bg-background">
      <Header />

      {!hasMessages ? (
        <EmptyState {...composerProps} />
      ) : (
        <>
          <MessageList messages={messages} isLoading={isLoading} />
          <div className="shrink-0 border-t border-border bg-background px-4 py-4">
            <div className="mx-auto max-w-3xl">
              <Composer {...composerProps} />
            </div>
          </div>
        </>
      )}
    </main>
  );
}