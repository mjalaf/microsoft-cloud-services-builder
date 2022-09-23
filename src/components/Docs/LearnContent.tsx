import React from 'react';
import { IDocument, ILearnContent, ISectionBase } from 'shared/interfaces';

export default function LearnContent(props: { selectedSectionContents: ISectionBase[] }) {
    const { selectedSectionContents } = props;

    return (
        <>
            {selectedSectionContents.length > 0 && selectedSectionContents.map((content: ISectionBase) => (
                <div key={content.name}>
                    {content.learnContent && (
                        <div className="list">
                            <div className="image-title-container mb-10 bg-light-gray">
                                <span className="bg-main">
                                    <img src={content.image ? `${content.image}` : '/images/microsoft-docs.svg'}
                                        alt={`Microsoft Docs for ${content.name}`} className="microsoft-image" />
                                </span>
                                <span className="docs-learn-title">{content.name}</span>
                            </div>
                            <ul>
                                {content.learnContent && content.learnContent.map((learnContent: ILearnContent) => (
                                    <li key={learnContent.name}>
                                        <div className="image-title-container mb-10">
                                            <img src={learnContent.image ? learnContent.image : 'https://docs.microsoft.com/learn/achievements/generic-trophy.svg'}
                                                alt={learnContent.name} className="microsoft-image" />
                                            <a href={learnContent.url} target="_blank" rel="noopener noreferrer" className="docs-learn-title">{learnContent.name}</a>
                                        </div>

                                        {learnContent.modules && (
                                            <ol>
                                                {learnContent.modules && learnContent.modules.map((module: IDocument) => (
                                                    <li key={module.name}>
                                                        <a href={module.url} target="_blank" rel="noopener noreferrer">{module.name}</a>
                                                    </li>
                                                ))}
                                            </ol>
                                        )}

                                    </li>
                                ))}
                            </ul>
                            <br />
                        </div>
                    )}
                </div>
            ))}
            {!selectedSectionContents.length && (
                <div>No services selected</div>
            )}
        </>
    );
}