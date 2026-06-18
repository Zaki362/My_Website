export type AgentMetric = {
  label: string;
  value: string;
  detail?: string;
};

export type AgentSection =
  | {
      type: "summary";
      title?: string;
      content: string;
    }
  | {
      type: "bullets";
      title?: string;
      items: string[];
    }
  | {
      type: "metrics";
      title?: string;
      items: AgentMetric[];
    }
  | {
      type: "note";
      title?: string;
      content: string;
    };

export type AgentAction = {
  id: string;
  label: string;
  kind: "anchor" | "copy" | "resume" | "mailto";
  href?: string;
  value?: string;
  variant?: "primary" | "secondary";
};

export type AgentSource = {
  id: string;
  title: string;
  category: string;
};

export type AgentResponse = {
  reply: string;
  refused?: boolean;
  casual?: boolean;
  fallback?: boolean;
  sections?: AgentSection[];
  sources?: AgentSource[];
  actions?: AgentAction[];
  followups?: string[];
};
