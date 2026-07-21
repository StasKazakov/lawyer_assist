export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  documents?: CaseDocument[];
};

export type CaseDocument = {
  doc_id: string;
  cause_num: string;
  doc_url: string;
};