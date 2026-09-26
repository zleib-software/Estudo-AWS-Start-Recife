import type { ApiResponse, Question, Domain } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json?.error?.message || `Erro HTTP ${res.status}`);
  }

  return json;
}

export async function fetchDomains(): Promise<Domain[]> {
  const res = await request<ApiResponse<Domain[]>>('/api/domains');
  return res.data;
}

export async function fetchQuestions(params?: {
  domainId?: number;
  count?: number;
}): Promise<Question[]> {
  const searchParams = new URLSearchParams();
  if (params?.domainId) searchParams.set('domainId', String(params.domainId));
  if (params?.count) searchParams.set('count', String(params.count));

  const query = searchParams.toString();
  const path = `/api/questions${query ? `?${query}` : ''}`;
  const res = await request<ApiResponse<Question[]>>(path);
  return res.data;
}

export async function fetchQuestion(id: string): Promise<Question> {
  const res = await request<ApiResponse<Question>>(`/api/questions/${id}`);
  return res.data;
}
