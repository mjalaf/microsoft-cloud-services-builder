import React from 'react';
import { IDocument, ISectionBase } from 'shared/interfaces';

export default function DocsContent(props: {selectedSectionContents: ISectionBase[]}) {
    const { selectedSectionContents } = props;
    
    return (
        <>
            {selectedSectionContents.length > 0 && selectedSectionContents.map((content: ISectionBase) => (
                <div key={content.name} className="list">
                    {content.documents && (
                        <div>
                            <div className="image-title-container mb-10 bg-light-gray">
                                <span className="bg-main">
                                    <img src={content.image ? `${content.image}` : '/images/microsoft-docs.svg'}
                                        alt={`Microsoft Docs for ${content.name}`} className="microsoft-image" />
                                </span>
                                <span className="docs-learn-title">{content.name} Docs</span>
                            </div>
                            <ul>
                                {content.documents && content.documents.length > 0 && content.documents.map((document: IDocument) => (
                                    <li key={document.name}>
                                        <a href={document.url} target="_blank" rel="noopener noreferrer">{document.name}</a>
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