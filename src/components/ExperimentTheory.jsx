import React, { useState, useEffect } from 'react';
// import { BlockMath } from 'react-katex';
import ReactMarkdown from 'react-markdown';
import 'katex/dist/katex.min.css';
import '../pages/experiments/ExperimentPage.css'; // Reuse existing styles
import { Link } from 'react-router-dom';

import { useActivityLogger } from '../hooks/useActivityLogger';

const ExperimentTheory = ({ experiment }) => {
    const [activeTab, setActiveTab] = useState('theory');
    const { logActivity } = useActivityLogger();

    useEffect(() => {
        if (experiment?.id) {
            logActivity('experiment_view', experiment.id);
        }
    }, [experiment?.id, logActivity]);

    if (!experiment) return <div>Loading experiment data...</div>;

    return (
        <div className="experiment-page">
            <div className="experiment-header">
                <h1>{experiment.title}</h1>
                <p>{experiment.category} Lab</p>
            </div>

            <div className="experiment-tabs-nav">
                <button
                    className={`tab-btn ${activeTab === 'theory' ? 'active' : ''}`}
                    onClick={() => setActiveTab('theory')}
                >
                    1. Learn Theory
                </button>
                <button
                    className={`tab-btn ${activeTab === 'procedure' ? 'active' : ''}`}
                    onClick={() => setActiveTab('procedure')}
                >
                    2. Procedure
                </button>
                <Link
                    to={`?tab=simulation`}
                    className="tab-btn action-btn"
                >
                    3. Launch Simulation 🚀
                </Link>
            </div>

            <div className="experiment-content">
                {activeTab === 'theory' && (
                    <div className="theory-section">
                        <h3>Theory & Concepts</h3>
                        <div className="theory-content">
                            <ReactMarkdown>{experiment.theory}</ReactMarkdown>
                            {/* <p>Theory content temporarily disabled for debugging.</p> */}
                        </div>

                        {experiment.advantages && experiment.advantages.length > 0 && (
                            <div className="content-block">
                                <h4>Advantages</h4>
                                <ul>
                                    {experiment.advantages.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </div>
                        )}

                        {experiment.disadvantages && experiment.disadvantages.length > 0 && (
                            <div className="content-block">
                                <h4>Disadvantages</h4>
                                <ul>
                                    {experiment.disadvantages.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </div>
                        )}

                        <div className="formulas-section">
                            <h3>Key Formulas</h3>
                            <div className="formulas-grid">
                                {/* {experiment.formulas?.map((formula, index) => (
                                    <div key={index} className="formula-card">
                                        <span className="formula-label">{formula.label}</span>
                                        <code className="formula-equation">
                                            <BlockMath math={formula.equation} />
                                        </code>
                                    </div>
                                ))} */}
                                <p>Formulas temporarily disabled for debugging.</p>
                            </div>
                        </div>

                        {experiment.images && experiment.images.length > 0 && (
                            <div className="experiment-images">
                                {experiment.images.map((img, i) => (
                                    <img key={i} src={img} alt={`${experiment.title} diagram`} />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'procedure' && (
                    <div className="procedure-section">
                        <h3>Experimental Procedure</h3>
                        <div className="procedure-content">
                            <ol className="procedure-list">
                                {experiment.procedure?.map((step, index) => (
                                    <li key={index} className="procedure-step">
                                        <ReactMarkdown>{step}</ReactMarkdown>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExperimentTheory;
