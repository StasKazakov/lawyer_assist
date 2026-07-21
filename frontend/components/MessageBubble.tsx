import { Scale } from "lucide-react";
import type { Message } from "@/types/message";

export function MessageBubble({ message }: { message: Message }) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-br-md bg-secondary px-4 py-2.5 text-[15px] leading-relaxed text-foreground">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary">
        <Scale className="h-3.5 w-3.5 text-primary-foreground" />
      </div>
      <div className="max-w-[85%] space-y-3">
        {message.content && (
          <div className="whitespace-pre-wrap text-[15px] leading-relaxed text-foreground">
            {message.content}
          </div>
        )}

        {message.documents && message.documents.length > 0 && (
          <div className="rounded-2xl bg-secondary px-4 py-3 text-[15px] leading-relaxed text-foreground">
            {message.documents.map((doc, index) => (
              <div
                key={doc.doc_id}
                className={index > 0 ? "mt-4" : undefined}
              >
                <div>ID: {doc.doc_id}</div>
                <div>Справа: {doc.cause_num}</div>
                <div>
                  URL:{" "}
                  <a
                    href={doc.doc_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all text-sm text-blue-600 underline underline-offset-2 hover:text-primary"
                  >
                    {doc.doc_url}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}