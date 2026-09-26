"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { QUESTION_BANK } from '../data/questions';
import { NEW_QUESTIONS } from '../data/new_questions';

// Combine both question banks
const ALL_QUESTIONS = [...QUESTION_BANK, ...NEW_QUESTIONS];

type ViewState = 'HOME' | 'QUIZ' | 'RESULTS' | 'HISTORY';

interface QuizState {
    domainId: number; // 0 for all
    mode: 'practice' | 'exam';
    totalQuestions: number;
    questions: any[];
    currentIndex: number;
    answers: Record<number, number>; // question id -> selected option index
    flagged: Record<number, boolean>;
    startTime: number;
    timeRemaining: number; // in seconds, 90 mins for exam
}

interface HistoryEntry {
    date: string;
    score: number;
    total: number;
    percent: number;
    mode: string;
}

export default function Home() {
    const [view, setView] = useState<ViewState>('HOME');
    
    // Config State
    const [cfgDomain, setCfgDomain] = useState(0);
    const [cfgCount, setCfgCount] = useState<number | 'all'>(25);
    const [cfgMode, setCfgMode] = useState<'practice' | 'exam'>('practice');

    // Quiz State
    const [quiz, setQuiz] = useState<QuizState | null>(null);
    const [showGrid, setShowGrid] = useState(false);
    
    // History State
    const [history, setHistory] = useState<HistoryEntry[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('aws-simulado-history');
        if (saved) {
            try { setHistory(JSON.parse(saved)); } catch (e) {}
        }
        
        // Timer for exam mode
        let interval: any;
        if (view === 'QUIZ' && quiz?.mode === 'exam' && quiz.timeRemaining > 0) {
            interval = setInterval(() => {
                setQuiz(prev => {
                    if (!prev || prev.timeRemaining <= 0) return prev;
                    if (prev.timeRemaining === 1) {
                        finishQuiz(prev); // Auto finish
                    }
                    return { ...prev, timeRemaining: prev.timeRemaining - 1 };
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [view, quiz?.mode]); // removed quiz reference in dependencies to avoid re-running every second if possible, but actually we need to be careful with interval.
    
    const startQuiz = () => {
        // Filter questions
        let filtered = cfgDomain === 0 ? ALL_QUESTIONS : ALL_QUESTIONS.filter(q => q.domainId === cfgDomain);
        
        // Shuffle
        filtered = [...filtered].sort(() => Math.random() - 0.5);
        
        // Limit
        if (cfgCount !== 'all' && typeof cfgCount === 'number') {
            filtered = filtered.slice(0, cfgCount);
        }

        if (filtered.length === 0) {
            alert('Não há questões suficientes para este filtro.');
            return;
        }

        setQuiz({
            domainId: cfgDomain,
            mode: cfgMode,
            totalQuestions: filtered.length,
            questions: filtered,
            currentIndex: 0,
            answers: {},
            flagged: {},
            startTime: Date.now(),
            timeRemaining: 90 * 60 // 90 minutes
        });
        setView('QUIZ');
    };

    const finishQuiz = (currentQuizState = quiz) => {
        if (!currentQuizState) return;
        
        let correctCount = 0;
        currentQuizState.questions.forEach(q => {
            if (currentQuizState.answers[q.id] === q.answer) correctCount++;
        });
        
        const percent = Math.round((correctCount / currentQuizState.totalQuestions) * 100);
        const score = Math.round((percent / 100) * 1000);

        const newHistory = [{
            date: new Date().toLocaleString(),
            score,
            total: currentQuizState.totalQuestions,
            percent,
            mode: currentQuizState.mode
        }, ...history];
        
        setHistory(newHistory);
        localStorage.setItem('aws-simulado-history', JSON.stringify(newHistory));
        
        setShowGrid(false);
        setView('RESULTS');
    };

    const handleAnswer = (optIndex: number) => {
        if (!quiz) return;
        // In practice mode, allow changing if not answered yet, or if we want to allow changing. Let's say once answered in practice, they see explanation.
        // Actually, let's allow changing in exam mode, but in practice mode, selecting shows feedback.
        if (quiz.mode === 'practice' && quiz.answers[quiz.questions[quiz.currentIndex].id] !== undefined) {
            return; // already answered this question in practice mode
        }
        
        setQuiz(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                answers: { ...prev.answers, [prev.questions[prev.currentIndex].id]: optIndex }
            };
        });
    };

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const renderHome = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="fade-in">
            <div className="hero-banner">
                <span style={{ backgroundColor: 'var(--aws-orange)', color: 'var(--aws-navy)', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', padding: '0.25rem 0.625rem', borderRadius: '9999px', marginBottom: '0.75rem', display: 'inline-block' }}>
                    AWS Certified Cloud Practitioner
                </span>
                <h2 style={{ fontSize: '2rem', fontWeight: '800', margin: '0 0 0.5rem 0' }}>Simulado AWS - Praticando e Aprendendo</h2>
                <p style={{ color: '#d1d5db', margin: 0, maxWidth: '600px' }}>
                    Estude e pratique para o exame <strong>CLF-C02</strong>. Escolha um domínio específico ou simule a prova oficial com cronômetro regressivo.
                </p>
            </div>

            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h3 style={{ fontSize: '1.125rem', margin: 0, paddingBottom: '0.75rem', borderBottom: '1px solid #eaeded', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--aws-navy)' }}>
                    Configurar Sessão de Estudo
                </h3>

                <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>1. Selecione o Domínio</label>
                    <div className="grid-cards">
                        {[
                            { id: 0, title: 'Todos os Domínios', desc: 'Questões mistas da prova oficial.' },
                            { id: 1, title: 'Domínio 1: Conceitos de Nuvem', desc: '24% da prova' },
                            { id: 2, title: 'Domínio 2: Segurança e Conformidade', desc: '30% da prova' },
                            { id: 3, title: 'Domínio 3: Tecnologia e Serviços', desc: '34% da prova' },
                            { id: 4, title: 'Domínio 4: Cobrança, Finanças e Suporte', desc: '12% da prova' }
                        ].map(d => (
                            <div key={d.id} className={`selectable-card ${cfgDomain === d.id ? 'selected' : ''}`} onClick={() => setCfgDomain(d.id)}>
                                <input type="radio" checked={cfgDomain === d.id} readOnly style={{ marginTop: '0.25rem' }} />
                                <div>
                                    <strong style={{ display: 'block', fontSize: '0.875rem', color: 'var(--aws-navy)' }}>{d.title}</strong>
                                    <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{d.desc}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>2. Quantidade de Questões</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.75rem' }}>
                        {[25, 45, 65, 'all'].map(c => (
                            <button key={c} type="button" onClick={() => setCfgCount(c as any)} 
                                style={{ 
                                    padding: '0.75rem', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer',
                                    border: cfgCount === c ? '2px solid var(--aws-orange)' : '2px solid #e5e7eb',
                                    backgroundColor: cfgCount === c ? '#fffbeb' : 'white',
                                    color: 'var(--aws-navy)'
                                }}>
                                {c === 'all' ? 'Todas' : `${c} Questões`}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>3. Modo de Execução</label>
                    <div className="grid-cards">
                        <div className={`selectable-card ${cfgMode === 'practice' ? 'selected' : ''}`} onClick={() => setCfgMode('practice')}>
                            <input type="radio" checked={cfgMode === 'practice'} readOnly style={{ marginTop: '0.25rem' }} />
                            <div>
                                <strong style={{ display: 'block', fontSize: '0.875rem', color: 'var(--aws-navy)' }}>Modo Teste (Prática)</strong>
                                <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Feedback imediato e sem tempo limite.</span>
                            </div>
                        </div>
                        <div className={`selectable-card ${cfgMode === 'exam' ? 'selected' : ''}`} onClick={() => setCfgMode('exam')}>
                            <input type="radio" checked={cfgMode === 'exam'} readOnly style={{ marginTop: '0.25rem' }} />
                            <div>
                                <strong style={{ display: 'block', fontSize: '0.875rem', color: 'var(--aws-navy)' }}>Modo Exame</strong>
                                <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Cronômetro de 90 min, sem feedback durante.</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                    <button className="btn-primary" onClick={startQuiz} style={{ flexGrow: 1 }}>
                        Iniciar Simulado Agora
                    </button>
                    <button className="btn-secondary" onClick={() => setView('HISTORY')} style={{ flexGrow: 0 }}>
                        Histórico de Provas
                    </button>
                </div>
            </div>
        </div>
    );

    const renderQuiz = () => {
        if (!quiz) return null;
        const q = quiz.questions[quiz.currentIndex];
        const selectedOpt = quiz.answers[q.id];
        const isAnswered = selectedOpt !== undefined;
        
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="fade-in">
                <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <span style={{ backgroundColor: '#dbeafe', color: '#1e40af', padding: '0.25rem 0.5rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '600' }}>
                            Domínio {q.domainId}
                        </span>
                        <span style={{ backgroundColor: '#fef3c7', color: '#92400e', padding: '0.25rem 0.5rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '600' }}>
                            {quiz.mode === 'practice' ? 'Modo Teste' : 'Modo Exame'}
                        </span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn-secondary" style={{ padding: '0.5rem 0.75rem', fontSize: '0.75rem' }} 
                            onClick={() => setQuiz({ ...quiz, flagged: { ...quiz.flagged, [q.id]: !quiz.flagged[q.id] } })}>
                            {quiz.flagged[q.id] ? '🚩 Sinalizado' : 'Sinalizar'}
                        </button>
                        <button className="btn-primary" style={{ padding: '0.5rem 0.75rem', fontSize: '0.75rem' }} onClick={() => setShowGrid(true)}>
                            Ver Grade
                        </button>
                    </div>
                </div>

                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <div style={{ color: 'var(--aws-orange)', fontWeight: 'bold', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                            Questão {quiz.currentIndex + 1} de {quiz.totalQuestions}
                        </div>
                        <h2 style={{ margin: 0, fontSize: '1.125rem', color: 'var(--aws-navy)' }}>{q.question}</h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {q.options.map((opt: string, idx: number) => {
                            let className = 'question-option';
                            if (isAnswered) {
                                if (quiz.mode === 'practice') {
                                    if (idx === q.answer) className += ' correct';
                                    else if (idx === selectedOpt) className += ' incorrect';
                                } else {
                                    if (idx === selectedOpt) className += ' selected';
                                }
                            }

                            return (
                                <div key={idx} className={className} onClick={() => handleAnswer(idx)}>
                                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', background: idx === selectedOpt ? 'var(--aws-blue)' : 'transparent', flexShrink: 0 }}>
                                        {idx === selectedOpt && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'white' }} />}
                                    </div>
                                    <span>{opt}</span>
                                </div>
                            );
                        })}
                    </div>

                    {quiz.mode === 'practice' && isAnswered && (
                        <div className="explanation">
                            <strong style={{ color: 'var(--aws-navy)' }}>Explicação: </strong>
                            <span style={{ color: '#374151', fontSize: '0.875rem' }}>{q.explanation}</span>
                        </div>
                    )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button className="btn-secondary" disabled={quiz.currentIndex === 0} 
                        onClick={() => setQuiz({ ...quiz, currentIndex: quiz.currentIndex - 1 })}
                        style={{ opacity: quiz.currentIndex === 0 ? 0.5 : 1 }}>
                        Anterior
                    </button>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {quiz.currentIndex < quiz.totalQuestions - 1 ? (
                            <button className="btn-primary" onClick={() => setQuiz({ ...quiz, currentIndex: quiz.currentIndex + 1 })}>
                                Próxima
                            </button>
                        ) : (
                            <button className="btn-primary" style={{ backgroundColor: '#16a34a' }} onClick={() => finishQuiz()}>
                                Finalizar
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const renderResults = () => {
        if (!quiz) return null;
        
        let correctCount = 0;
        quiz.questions.forEach(q => {
            if (quiz.answers[q.id] === q.answer) correctCount++;
        });
        const percent = Math.round((correctCount / quiz.totalQuestions) * 100);
        const score = Math.round((percent / 100) * 1000);
        const passed = score >= 700;

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="fade-in">
                <div className="hero-banner" style={{ background: passed ? 'linear-gradient(135deg, #15803d 0%, #16a34a 100%)' : 'linear-gradient(135deg, #be123c 0%, #dc2626 100%)', textAlign: 'center' }}>
                    <div style={{ display: 'inline-block', padding: '0.25rem 1rem', background: 'rgba(255,255,255,0.2)', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '1rem' }}>
                        {passed ? 'Aprovado' : 'Reprovado'}
                    </div>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.8 }}>Pontuação Escalada AWS (100 - 1000)</div>
                    <h2 style={{ fontSize: '3rem', margin: '0.5rem 0', fontWeight: '800' }}>{score}</h2>
                    <p style={{ margin: 0, fontWeight: '600' }}>Aproveitamento de {percent}% (Nota de corte: 700)</p>
                    <p style={{ margin: '1rem 0 0 0', fontSize: '0.875rem', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '1rem' }}>
                        Você acertou {correctCount} de {quiz.totalQuestions} questões.
                    </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                    <button className="btn-primary" onClick={() => setView('HOME')}>Novo Simulado</button>
                    <button className="btn-secondary" onClick={() => setView('HISTORY')}>Ver Histórico</button>
                </div>

                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h3 style={{ margin: 0 }}>Revisão Detalhada</h3>
                    {quiz.questions.map((q, idx) => {
                        const userAns = quiz.answers[q.id];
                        const isCorrect = userAns === q.answer;
                        return (
                            <div key={q.id} style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong style={{ fontSize: '0.875rem', color: isCorrect ? '#16a34a' : '#dc2626' }}>Questão {idx + 1} {quiz.flagged[q.id] ? '🚩' : ''} - {isCorrect ? 'Correta' : 'Incorreta'}</strong>
                                </div>
                                <p style={{ fontSize: '0.9rem', margin: '0.5rem 0' }}>{q.question}</p>
                                <div style={{ fontSize: '0.875rem', background: '#f9fafb', padding: '0.5rem', borderRadius: '0.25rem', marginBottom: '0.5rem' }}>
                                    <strong>Sua resposta: </strong> {userAns !== undefined ? q.options[userAns] : 'Não respondida'}
                                </div>
                                {!isCorrect && (
                                    <div style={{ fontSize: '0.875rem', background: '#f0fdf4', padding: '0.5rem', borderRadius: '0.25rem', marginBottom: '0.5rem' }}>
                                        <strong>Resposta Correta: </strong> {q.options[q.answer]}
                                    </div>
                                )}
                                <div style={{ fontSize: '0.875rem', color: '#4b5563', borderTop: '1px solid #e5e7eb', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
                                    <strong>Explicação: </strong>{q.explanation}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    };

    const renderHistory = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>
                <div>
                    <h2 style={{ margin: 0, color: 'var(--aws-navy)' }}>Histórico de Simulados</h2>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>Resultados salvos localmente.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn-secondary" style={{ color: '#dc2626' }} onClick={() => { setHistory([]); localStorage.removeItem('aws-simulado-history'); }}>Limpar</button>
                    <button className="btn-secondary" onClick={() => setView('HOME')}>Voltar</button>
                </div>
            </div>

            {history.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>Nenhum simulado concluído ainda.</div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {history.map((h, i) => (
                        <div key={i} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
                            <div>
                                <div style={{ fontWeight: 'bold', color: 'var(--aws-navy)' }}>Score: {h.score} ({h.percent}%)</div>
                                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{h.date} • {h.total} Questões • Modo: {h.mode}</div>
                            </div>
                            <div style={{ fontWeight: 'bold', color: h.score >= 700 ? '#16a34a' : '#dc2626' }}>
                                {h.score >= 700 ? 'Aprovado' : 'Reprovado'}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <>
            <header className="header">
                <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => setView('HOME')}>
                        <div style={{ background: 'var(--aws-orange)', color: 'var(--aws-navy)', borderRadius: '0.5rem', width: '2.5rem', height: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.25rem' }}>
                            ☁
                        </div>
                        <div>
                            <h1 style={{ margin: 0, fontSize: '1.125rem', lineHeight: '1.2' }}>AWS Simulado</h1>
                            <div style={{ fontSize: '0.75rem', color: '#d1d5db' }}>praticando e aprendendo</div>
                        </div>
                    </div>
                    {view === 'QUIZ' && quiz && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            {quiz.mode === 'exam' && (
                                <div style={{ background: 'var(--aws-dark)', border: '1px solid #374151', padding: '0.25rem 0.5rem', borderRadius: '0.5rem', fontFamily: 'monospace', color: '#fbbf24', fontWeight: 'bold' }}>
                                    {formatTime(quiz.timeRemaining)}
                                </div>
                            )}
                            <div style={{ fontSize: '0.875rem', background: '#1f2937', padding: '0.25rem 0.5rem', borderRadius: '0.5rem' }}>
                                {quiz.currentIndex + 1}/{quiz.totalQuestions}
                            </div>
                            <button onClick={() => setShowGrid(true)} style={{ background: 'var(--aws-orange)', color: 'var(--aws-navy)', padding: '0.25rem 0.5rem', borderRadius: '0.5rem', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
                                Grade
                            </button>
                        </div>
                    )}
                </div>
            </header>

            <main className="main-content">
                {view === 'HOME' && renderHome()}
                {view === 'QUIZ' && renderQuiz()}
                {view === 'RESULTS' && renderResults()}
                {view === 'HISTORY' && renderHistory()}
            </main>

            <footer className="footer">
                <p style={{ margin: 0 }}>Simulado AWS • Exame AWS Certified Cloud Practitioner (CLF-C02) • Atualizado com novas questões.</p>
            </footer>

            {/* Grid Drawer */}
            {showGrid && quiz && (
                <div className="drawer-overlay" onClick={() => setShowGrid(false)}>
                    <div className="drawer-content" onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>
                            <h3 style={{ margin: 0, color: 'var(--aws-navy)' }}>Grade de Questões</h3>
                            <button style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#9ca3af' }} onClick={() => setShowGrid(false)}>&times;</button>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem', overflowY: 'auto', flexGrow: 1, alignContent: 'start' }}>
                            {quiz.questions.map((q, idx) => {
                                const isAns = quiz.answers[q.id] !== undefined;
                                const isCur = quiz.currentIndex === idx;
                                const isFlg = quiz.flagged[q.id];
                                return (
                                    <div key={q.id} style={{ position: 'relative' }}>
                                        <button className={`question-grid-btn ${isCur ? 'current' : ''} ${isAns && !isCur ? 'answered' : ''}`} onClick={() => { setQuiz({ ...quiz, currentIndex: idx }); setShowGrid(false); }}>
                                            {idx + 1}
                                        </button>
                                        {isFlg && <div style={{ position: 'absolute', top: '-4px', right: '-4px', fontSize: '0.75rem' }}>🚩</div>}
                                    </div>
                                );
                            })}
                        </div>
                        <div style={{ marginTop: '1rem', borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
                            <button className="btn-primary" style={{ width: '100%', backgroundColor: '#16a34a', color: 'white' }} onClick={() => finishQuiz()}>
                                Finalizar Simulado
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
